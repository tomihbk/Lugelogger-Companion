import React from "react"
import { Pressable, PressableProps } from "react-native"
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated"


interface AnimatedPressableProps extends PressableProps {
    scaleTo?: number
}

const AnimatedPressable = ({
    children,
    scaleTo = 0.97,
    style,
    onPressIn,
    onPressOut,
    ...props
}: AnimatedPressableProps) => {
    const scale = useSharedValue(1)
    const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))

    return (
        <AnimatedPressableBase
            {...props}
            style={[style, animatedStyle]}
            onPressIn={(event) => {
                scale.value = withSpring(scaleTo, {
                    damping: 18,
                    stiffness: 250,
                })

                onPressIn?.(event)
            }}
            onPressOut={(event) => {
                scale.value = withSpring(1, {
                    damping: 18,
                    stiffness: 250,
                })
                onPressOut?.(event)
            }}>
            {children}
        </AnimatedPressableBase>
    )
}

export default AnimatedPressable