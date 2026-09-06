// components/ErrorFallback.tsx
import React from "react"
import { Text, View } from "react-native"
import { router } from "expo-router"
import tw from "twrnc"
import AnimatedPressable from "./Animations/AnimatedPressable"


export default function ErrorFallback() {
    return (
        <View style={tw`flex-1 items-center justify-center px-8 font-HKGrotesk-Bold`}>
            <Text style={tw`text-xl font-bold text-center`}>
                Something went wrong
            </Text>

            <Text style={tw`text-center mt-3 opacity-70 font-HKGrotesk-Bold`}>
                An unexpected error occurred.
            </Text>

            <AnimatedPressable
                onPress={() => router.replace("/")}
                style={tw`mt-6 rounded-full px-6 py-3 font-HKGrotesk-Bold`}
            >
                <Text>Go back</Text>
            </AnimatedPressable>
        </View>
    )
}