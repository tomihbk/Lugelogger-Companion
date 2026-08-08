import React from "react"
import { Href, router } from "expo-router"
import { Text, View } from "react-native"

import Screen from "~/components/ui/Screen"
import ServerSettings from "~/components/ServerSettings"
import { useTheme } from "~/hooks/useTheme"
import useOnboardingStore from "~/stores/onboardingStore"
import tw from "~/tw.config"

export default function ServerScreen() {
    const theme = useTheme()
    const { completeStep } = useOnboardingStore()

    const handleSave = () => {
        completeStep("server")
        router.push("/(onboarding)/favorite-vehicle" as Href)
    }

    return (
        <Screen>
            <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                        Server
                    </Text>

                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                       Step 2 of 5
                    </Text>
                </View>

                <View style={[tw`h-1.5 w-full rounded-full mt-3 overflow-hidden`, { backgroundColor: theme.colors.background.default }]}>
                    <View style={{ width: "40%", height: "100%", borderRadius: 999, backgroundColor: theme.colors.brand.primary }} />
                </View>

                <View style={tw`mt-6`}>
                    <Text style={[tw`text-3xl font-HKGrotesk-Bold`, { color: theme.colors.text.primary }]}>
                        Connect your server
                    </Text>

                    <Text style={[tw`text-base font-HKGrotesk-Regular mt-2`, { color: theme.colors.text.secondary }]}>
                        Enter your server address and credentials, then verify the connection.
                    </Text>
                </View>

                <View style={tw`flex-1 -mx-4`}>
                    <ServerSettings
                        submitLabel="Continue"
                        requireSuccessfulTest
                        refreshQueriesOnSave={false}
                        onSave={handleSave}
                        buttonColor={theme.colors.brand.primary}
                    />
                </View>
            </View>
        </Screen>
    )
}