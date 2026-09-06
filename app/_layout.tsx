import React, { useEffect } from "react"
import { Stack } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { KeyboardController, KeyboardProvider } from "react-native-keyboard-controller"
import * as Sentry from "@sentry/react-native"
import { Platform } from "react-native"
import useThemeStore from "~/stores/themeStore"
import Constants from "expo-constants"
import ErrorFallback from "~/components/ErrorFallback"
import { PostHogProvider } from "posthog-react-native"
import TelemetryManager from "~/components/TelemetryManager"
import GlobalStateStore from "~/stores/globalStateStore"

export const queryClient = new QueryClient()

Sentry.init({
  dsn: "https://3ddb7d96c7ee4b67b6a3ae86e0d11b03@o4512006388121600.ingest.de.sentry.io/4512006390415440",
  sendDefaultPii: false,
  beforeSend(event) {
    return GlobalStateStore.getState().optInCrashReports
      ? event
      : null
  },

  beforeBreadcrumb(breadcrumb) {
    return GlobalStateStore.getState().optInCrashReports
      ? breadcrumb
      : null
  },
})

Sentry.setTag("platform", Platform.OS)
Sentry.setTag("app_version", Constants.expoConfig?.version ?? "unknown")

export default Sentry.wrap(function RootLayout() {
  const { colorScheme } = useThemeStore()

  useEffect(() => {
    KeyboardController.preload()
  }, [])

  useEffect(() => {
    Sentry.setTag("theme", colorScheme)
  }, [colorScheme])

  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <PostHogProvider
        apiKey={process.env.EXPO_PUBLIC_POSTHOG_KEY!}
        options={{
          host: process.env.EXPO_PUBLIC_POSTHOG_HOST,
        }}>
        <TelemetryManager />
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(onboarding)" />
              <Stack.Screen name="(tabs)" />

              <Stack.Screen
                name="car-detail"
                options={{
                  animation: "fade",
                }} />

              <Stack.Screen
                name="new-record/[id]"
                options={{
                  animation: "fade",
                }} />

              <Stack.Screen
                name="update-record/[id]"
                options={{
                  animation: "slide_from_bottom",
                }} />

            </Stack>
          </QueryClientProvider>
        </KeyboardProvider>
      </PostHogProvider>
    </Sentry.ErrorBoundary>
  )
})
