import React from "react"
import { Stack } from "expo-router"
import { useTheme } from "~/hooks/useTheme"
import useThemeStore from "~/stores/themeStore"

export default function CarDetailLayout() {
    const theme = useTheme()
    const { colorScheme } = useThemeStore()

    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTransparent: false,
                    headerTintColor: theme.colors.text.primary,
                    headerStyle: { backgroundColor: theme.colors.background.default },
                    contentStyle: { backgroundColor: theme.colors.background.default },
                    statusBarStyle: colorScheme === "light" ? "dark" : "light"
                }}
            />
        </Stack>
    )
}