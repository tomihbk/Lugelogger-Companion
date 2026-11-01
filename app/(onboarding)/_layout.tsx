import React from "react"
import { Redirect, Stack } from "expo-router"
import useThemeStore from "~/stores/themeStore"
import useOnboardingStore, { CURRENT_SETUP_VERSION } from "~/stores/onboardingStore"

export default function OnboardingLayout() {
    const { colorScheme } = useThemeStore()
    const { setupVersion } = useOnboardingStore()
    const setupComplete = setupVersion >= CURRENT_SETUP_VERSION

    if (setupComplete) {
        return <Redirect href="/(tabs)" />
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                fullScreenGestureEnabled: false,
                animation: "slide_from_right",
                statusBarStyle: colorScheme == 'light' ? 'dark' : 'light',
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="server" />
            <Stack.Screen name="favorite-vehicle" />
            <Stack.Screen name="preferences" />
            <Stack.Screen name="finish" />
        </Stack>
    )
}