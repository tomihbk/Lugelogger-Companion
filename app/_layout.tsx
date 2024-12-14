import React from "react"
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DevToolsBubble } from "react-native-react-query-devtools"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};
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