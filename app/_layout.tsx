import React from "react"
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DevToolsBubble } from "react-native-react-query-devtools"

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

export const queryClient = new QueryClient()
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <DevToolsBubble />
    </QueryClientProvider>
  )
}