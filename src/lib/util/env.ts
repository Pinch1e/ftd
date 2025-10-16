export const getBaseURL = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_BASE_URL environment variable is required. Please set it to your storefront's base URL."
    )
  }
  return baseUrl
}
