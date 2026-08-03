import React from "react"
import { Text, View } from "react-native"
import Screen from "~/components/ui/Screen"
import { useTheme } from "~/hooks/useTheme"
import tw from "~/tw.config"

export default function WelcomeScreen() {
    const theme = useTheme()

    return (
        <Screen>
            <View style={tw`flex-1 items-center justify-center`}>
                <Text
                    style={[tw`text-3xl font-HKGrotesk-Bold text-center`, { color: theme.colors.text.primary }]}>
                    Welcome
                </Text>

                <Text
                    style={[tw`text-base font-HKGrotesk-Regular text-center mt-3`, { color: theme.colors.text.secondary, }]}>
                    Set up your server and preferences to get started.
                </Text>
            </View>
        </Screen>
    )
}