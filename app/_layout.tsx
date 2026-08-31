import React, { useEffect } from "react"
import { Stack } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { KeyboardController, KeyboardProvider } from "react-native-keyboard-controller"
import * as Sentry from "@sentry/react-native"

export const queryClient = new QueryClient()

Sentry.init({
  dsn: "https://3ddb7d96c7ee4b67b6a3ae86e0d11b03@o4512006388121600.ingest.de.sentry.io/4512006390415440",
  sendDefaultPii: false,
})

export default Sentry.wrap(function RootLayout() {
  useEffect(() => {
    KeyboardController.preload()
  }, [])

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(tabs)" />

          <Stack.Screen
            name="car-detail"
            options={{
              animation: "fade",
            }}
          />

          <Stack.Screen
            name="new-record/[id]"
            options={{
              animation: "fade",
            }}
          />

          <Stack.Screen
            name="update-record/[id]"
            options={{
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
      </QueryClientProvider>
    </KeyboardProvider>
  )
})
