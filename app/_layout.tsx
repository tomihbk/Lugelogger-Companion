import React, { useEffect } from "react"
import { Stack } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { KeyboardController, KeyboardProvider } from "react-native-keyboard-controller"

export const queryClient = new QueryClient()

export default function RootLayout() {

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
}