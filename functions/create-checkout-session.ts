import type { Handler } from "@netlify/functions";
import * as Sentry from "@sentry/node";
import { default as headers } from "./src/constants/defaultHeaders";
import isProduction from "./src/util/isProduction";
import getLicenseData from "./src/util/getLicenseData";
import { getStripe } from "./src/util/getStripe";

const statusCode = 200;

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
});

const domain = isProduction()
  ? "https://typeitjs.com"
  : "http://localhost:3000";

const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        message: "Not a valid request!",
      }),
    };
  }

  const stripe = getStripe();
  const slug = new URLSearchParams(event.body as string).get("slug");
  const licenseData = getLicenseData(slug);

  if (!licenseData) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: "Not a valid license!",
      }),
    };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: licenseData.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${domain}/confirmation/${licenseData.friendlySlug}?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domain}/licenses/purchase`,
  });

  const location = session.url;
  if (!location) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Failed to create checkout session.",
      }),
    };
  }

  return {
    statusCode: 303,
    headers: {
      ...headers,
      Location: location,
    },
  };
};

export { handler };
