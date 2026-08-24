import React from "react"
import { ViewStyle } from "react-native"
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInLeft,
    FadeInRight,
    FadeInUp,
} from "react-native-reanimated"

interface AnimatedSectionProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    style?: ViewStyle | ViewStyle[]
    direction?: "up" | "down" | "left" | "right" | "fade"
}

const AnimatedSection = ({
    children,
    delay = 0,
    duration = 300,
    direction = "up",
    style,
}: AnimatedSectionProps) => {

    const animations = {
        up: FadeInUp,
        down: FadeInDown,
        left: FadeInLeft,
        right: FadeInRight,
        fade: FadeIn,
    }

    const animation = animations[direction]

    return (
        <Animated.View
            entering={animation
                .delay(delay)
                .duration(duration)}
            style={style}>
            {children}
        </Animated.View>
    )
}

export default AnimatedSection