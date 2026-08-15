import React from "react"
import { ViewStyle } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"

interface AnimatedSectionProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    style?: ViewStyle | ViewStyle[]
}

const AnimatedSection = ({
    children,
    delay = 0,
    duration = 300,
    style,
}: AnimatedSectionProps) => {
    return (
        <Animated.View entering={FadeInUp
            .delay(delay)
            .duration(duration)}
            style={style}>
            {children}
        </Animated.View>
    )
}

export default AnimatedSection