import type { Handler } from "@netlify/functions";
import type { License } from "./types";

import getLicenseData from "./src/util/getLicenseData";
import * as Sentry from "@sentry/node";
import sendEmails from "./src/util/sendEmails";
import headers from "./src/constants/defaultHeaders";
import { getStripe } from "./src/util/getStripe";

let sentryInitialized = false;
const initSentry = () => {
  if (!sentryInitialized) {
    Sentry.init({ dsn: process.env.SENTRY_DSN || "" });
    sentryInitialized = true;
  }
};

export const handler: Handler = async (event) => {
  initSentry();

  if (event.httpMethod !== "POST") {
    return { statusCode: 200, headers };
  }

  const stripe = getStripe();
  const sig =
    event.headers["stripe-signature"] || event.headers["Stripe-Signature"];

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body || "",
      sig || "",
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err: any) {
    Sentry.captureException(err);
    console.error("Stripe signature verification failed:", err.message);

    return {
      statusCode: 400,
      headers,
      body: `Webhook Error: ${err.message}`,
    };
  }

  // ✅ ACK all other event types
  if (stripeEvent.type !== "checkout.session.completed") {
    return { statusCode: 200, headers };
  }

  const sessionData = stripeEvent.data.object;

  const session = await stripe.checkout.sessions.retrieve(sessionData.id, {
    expand: ["line_items"],
  });

  const customer = (await stripe.customers.retrieve(
    sessionData.customer as string,
  )) as any;

  if (!session.line_items?.data?.length) {
    return { statusCode: 200, headers };
  }

  for (const item of session.line_items.data) {
    const productId = item.price?.product as string;
    if (!productId) continue;

    const product = await stripe.products.retrieve(productId);
    const slug = product.metadata.slug;
    const licenseData: License | undefined = getLicenseData(slug);

    if (!licenseData) {
      Sentry.captureMessage(`Unknown license slug: ${slug}`);
      continue;
    }

    try {
      await sendEmails({
        emailAddress: customer.email,
        licenseData,
      });
    } catch (err: any) {
      Sentry.captureException(err);
      console.error(err.message);

      return { statusCode: 500, headers };
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: "We good." }),
  };
};
