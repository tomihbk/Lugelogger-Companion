import React from "react"
import { Pressable, Text, View, Image } from "react-native"
import { Href, router } from "expo-router"
import { ChevronRight } from "lucide-react-native"

import Screen from "~/components/ui/Screen"
import { useTheme } from "~/hooks/useTheme"
import useOnboardingStore from "~/stores/onboardingStore"
import tw from "~/tw.config"

export default function WelcomeScreen() {
    const theme = useTheme()
    const { completeStep } = useOnboardingStore()

    const handleGetStarted = () => {
        completeStep("index")
        router.push("/(onboarding)/server" as Href)
    }

    return (
        <Screen>
            <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                        Welcome
                    </Text>
                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                        1 of 5
                    </Text>
                </View>

                <View style={[tw`h-1.5 w-full rounded-full mt-3 overflow-hidden`, { backgroundColor: theme.colors.background.default }]}>
                    <View style={{ width: "20%", height: "100%", borderRadius: 999, backgroundColor: "#0743f7" }} />
                </View>

                <View style={tw`flex-1 items-center justify-center`}>
                    <Image source={require('~/assets/welcome-car.png')} style={tw`w-4/6 h-1/6`} resizeMode="contain" />

                    <Text style={[tw`text-4xl font-HKGrotesk-Bold text-center`, { color: theme.colors.text.primary }]}>
                        Welcome to Lugelogger
                    </Text>

                    <Text style={[tw`text-base font-HKGrotesk-Regular text-center mt-4 leading-6 px-3`, { color: theme.colors.text.secondary }]}>
                        Connect to your server, sign in, choose your vehicle, and configure your preferences.
                    </Text>
                </View>

                <Pressable
                    onPress={handleGetStarted}
                    style={({ pressed }) => [
                        tw`w-full rounded-full py-4 px-5 flex-row items-center justify-center`,
                        { backgroundColor: theme.colors.brand.primary, opacity: pressed ? 0.8 : 1 },
                    ]}>
                    <Text style={tw`text-white text-base font-HKGrotesk-SemiBold`}>
                        Get Started
                    </Text>
                    <ChevronRight size={20} color="white" style={tw`ml-2`} />
                </Pressable>
            </View>
        </Screen>
    )
}