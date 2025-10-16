import Medusa from "@medusajs/js-sdk"

const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL

if (!MEDUSA_BACKEND_URL) {
  throw new Error(
    "MEDUSA_BACKEND_URL environment variable is required. Please set it to your Medusa backend URL."
  )
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})
