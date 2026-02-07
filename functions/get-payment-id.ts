import type { Handler } from "@netlify/functions";
import Stripe from "stripe";
import * as Sentry from "@sentry/node";
import { default as headers } from "./src/constants/defaultHeaders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-01-28.clover" as const,
});

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
});

const statusCode = 200;

const handler: Handler = async (event, _context) => {
  const id = event.queryStringParameters?.id;

  if (event.httpMethod !== "GET" || !id) {
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        message: "Not a valid request!",
      }),
    };
  }

  const session = await stripe.checkout.sessions.retrieve(id);

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      paymentId: session.payment_intent,
    }),
  };
};

export { handler };
