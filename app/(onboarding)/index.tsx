import React, { useEffect } from "react"
import { Text, View, Image } from "react-native"
import { Href, router } from "expo-router"
import { ChevronRight } from "lucide-react-native"
import Screen from "~/components/ui/Screen"
import { useTheme } from "~/hooks/useTheme"
import useOnboardingStore from "~/stores/onboardingStore"
import tw from "~/tw.config"
import { APP } from "~/constants/app"
import AppBackground from "~/components/ui/AppBackground"
import AnimatedPressable from "~/components/Animations/AnimatedPressable"

export default function WelcomeScreen() {
    const theme = useTheme()
    const { completeStep } = useOnboardingStore()

    const handleGetStarted = () => {
        completeStep("index")
        router.push("/(onboarding)/server" as Href)
    }

    return (
        <Screen>
            <AppBackground />
            <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                        Welcome
                    </Text>
                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                        Step 1 of 5
                    </Text>
                </View>

                <View style={[tw`h-1.5 w-full rounded-full mt-3 overflow-hidden`, { backgroundColor: theme.colors.background.default }]}>
                    <View style={{ width: "20%", height: "100%", borderRadius: 999, backgroundColor: "#0743f7" }} />
                </View>
                <View style={tw`flex-1 items-center justify-center`}>
                    <Image source={require('~/assets/welcome-car.png')} style={tw`w-4/6 h-1/6`} resizeMode="contain" />

                    <Text style={[tw`text-3xl font-HKGrotesk-Bold text-center`, { color: theme.colors.text.primary }]}>
                        Welcome to{"\n"}<Text style={[tw`text-2xl font-HKGrotesk-Bold text-center`, { color: theme.colors.text.primary }]}>{APP.NAME}</Text>
                    </Text>

                    <Text style={[tw`text-base font-HKGrotesk-Regular text-center mt-4 leading-6 px-3`, { color: theme.colors.text.secondary }]}>
                        Your complete vehicle history, always with you.
                    </Text>
                </View>

                <AnimatedPressable
                    onPress={handleGetStarted}
                    style={[
                        tw`w-full rounded-full py-4 px-5 flex-row items-center justify-center`,
                        { backgroundColor: theme.colors.brand.primary },
                    ]}>
                    <Text style={tw`text-white text-base font-HKGrotesk-SemiBold`}>
                        Get Started
                    </Text>
                    <ChevronRight size={20} color="white" style={tw`ml-2`} />
                </AnimatedPressable>
            </View>
        </Screen>
    )
}