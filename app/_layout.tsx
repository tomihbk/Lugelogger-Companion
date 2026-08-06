import React, { useEffect } from "react"
import {
  Href,
  Stack,
  router,
  useSegments,
} from "expo-router"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

import useOnboardingStore, {
  CURRENT_SETUP_VERSION,
  OnboardingSteps,
} from "~/stores/onboardingStore"

export const queryClient = new QueryClient()

const getResumeRoute = (steps: OnboardingSteps): Href => {

  if (!steps.index) return "/(onboarding)"
  if (!steps.server) return "/(onboarding)/server"
  if (!steps["favorite-vehicle"]) return "/(onboarding)/favorite-vehicle" as Href
  if (!steps.preferences) return "/(onboarding)/preferences"

  return "/(onboarding)/finish"
}

export default function RootLayout() {
  const { setupVersion, steps } =
    useOnboardingStore()

  const segments = useSegments()

  const setupComplete =
    setupVersion >= CURRENT_SETUP_VERSION

  useEffect(() => {
    const isInsideOnboarding =
      segments[0] === "(onboarding)"

    if (!setupComplete && !isInsideOnboarding) {
      router.replace(getResumeRoute(steps))
      return
    }

    if (setupComplete && isInsideOnboarding) {
      router.replace("/(tabs)")
    }
  }, [setupComplete, steps, segments])

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  )
}