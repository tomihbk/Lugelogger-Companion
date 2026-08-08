import React, { useEffect, useRef } from "react"
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
  const { setupVersion, steps } = useOnboardingStore()
  const segments = useSegments()
  const hasHandledInitialResume = useRef(false)
  const setupComplete = setupVersion >= CURRENT_SETUP_VERSION

  useEffect(() => {
    const isInsideOnboarding = segments[0] === "(onboarding)"

    // Setup has been completed: onboarding should no longer be visible.
    if (setupComplete) {
      if (isInsideOnboarding) {
        router.replace("/(tabs)")
      }
      return
    }

    // Setup is incomplete and we're somewhere in the main app.
    // This also handles your "Reset app setup" button.
    if (!isInsideOnboarding) {
      hasHandledInitialResume.current = true
      router.replace(getResumeRoute(steps))
      return
    }

    // On initial app launch/reload, Expo may mount Welcome first.
    // Correct it once to the first incomplete step.
    if (!hasHandledInitialResume.current) {
      hasHandledInitialResume.current = true
      router.replace(getResumeRoute(steps))
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