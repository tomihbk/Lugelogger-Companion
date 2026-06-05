import React, { useMemo } from "react"
import { View, Text } from "react-native"
import tw from "~/tw.config"

type Props = {
    brand?: string
    userName: string
}

const getTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 18) return "afternoon"
    return "evening"
}

const getGreeting = (time: string) => {
    switch (time) {
        case "morning":
            return "Good morning"
        case "afternoon":
            return "Good afternoon"
        default:
            return "Good evening"
    }
}

const phrasesByTime = {
    morning: [
        (brand?: string) => `Your ${brand || "car"} is ready to start the day 🚗`,
        () => "Fresh start, let’s go",
    ],
    afternoon: [
        (brand?: string) => `Your ${brand || "car"} is still going strong 💪`,
        () => "Ready for another drive?",
    ],
    evening: [
        (brand?: string) => `Your ${brand || "car"} had a good run today 👌`,
        () => "Parked and proud",
    ],
}

const GreetingHeader = ({ brand, userName }: Props) => {
    const timeOfDay = getTimeOfDay()

    const phrase = useMemo(() => {
        const options = phrasesByTime[timeOfDay]
        const random = options[Math.floor(Math.random() * options.length)]
        return typeof random === "function" ? random(brand) : random
    }, [])

    return (
        <View style={tw`mb-4`}>
            <Text style={tw`text-xl mt-4 font-HKGrotesk-Bold`}>
                {getGreeting(timeOfDay)}, {userName}
            </Text>
            <Text style={tw`text-sm font-HKGrotesk-Regular text-gray-700`}>{phrase}</Text>
        </View>
    )
}

export default GreetingHeader