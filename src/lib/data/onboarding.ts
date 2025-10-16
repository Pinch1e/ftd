"use server"
import { cookies as nextCookies } from "next/headers"
import { redirect } from "next/navigation"

export async function resetOnboardingState(orderId: string) {
  const cookies = await nextCookies()
  cookies.set("_medusa_onboarding", "false", { maxAge: -1 })
  const adminUrl = process.env.MEDUSA_ADMIN_URL || "http://localhost:7001"
  redirect(`${adminUrl}/a/orders/${orderId}`)
}
