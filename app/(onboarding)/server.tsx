import React from "react"
import { Text, View } from "react-native"
import Screen from "~/components/ui/Screen"
import { useTheme } from "~/hooks/useTheme"
import tw from "~/tw.config"

export default function ServerScreen() {
    const theme = useTheme()

    return (
        <Screen keyboardAware scrollable>
            <View style={tw`flex-1 justify-center`}>
                <Text
                    style={[tw`text-3xl font-HKGrotesk-Bold`, { color: theme.colors.text.primary }]}>
                    Server Settings
                </Text>

                <Text
                    style={[tw`mt-2 text-base font-HKGrotesk-Regular`, { color: theme.colors.text.secondary }]}>
                    Configure your server connection.
                </Text>
            </View>
        </Screen>
    )
}