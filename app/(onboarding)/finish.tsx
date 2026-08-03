import React from "react"
import { Text, View } from "react-native"
import Screen from "~/components/ui/Screen"
import { useTheme } from "~/hooks/useTheme"
import tw from "~/tw.config"

export default function FinishScreen() {
    const theme = useTheme()

    return (
        <Screen>
            <View style={tw`flex-1 justify-center`}>
                <Text
                    style={[tw`text-3xl font-HKGrotesk-Bold`, { color: theme.colors.text.primary }]}>
                    You're Ready!
                </Text>

                <Text
                    style={[tw`mt-2 text-base font-HKGrotesk-Regular`, { color: theme.colors.text.secondary }]}>
                    Your garage has been configured successfully.
                </Text>
            </View>
        </Screen>
    )
}