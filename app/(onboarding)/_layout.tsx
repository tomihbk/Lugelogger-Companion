import React from "react"
import { Stack } from "expo-router"
import { useTheme } from "~/hooks/useTheme"
import useThemeStore from "~/stores/themeStore"

export default function OnboardingLayout() {
    const theme = useTheme()
    const { colorScheme } = useThemeStore()

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                fullScreenGestureEnabled: false,
                animation: "slide_from_right",
                statusBarStyle: colorScheme == 'light' ? 'dark' : 'light',
                statusBarColor: theme.colors.background.default,
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="server" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="preferences" />
            <Stack.Screen name="finish" />
        </Stack>
    )
}