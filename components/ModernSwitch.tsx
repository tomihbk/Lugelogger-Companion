import { Pressable, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from '~/tw.config'

type ModernSwitchProps = {
    value: boolean
    onValueChange: (value: boolean) => void
    activeColor: string
}

const ModernSwitch = ({ value, onValueChange, activeColor }: ModernSwitchProps) => {
    const translateX = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.spring(translateX, {
            toValue: value ? 23 : 0,
            useNativeDriver: true,
            bounciness: 2,
        }).start()
    }, [value])

    return (
        <Pressable
            onPress={() => onValueChange(!value)}
            style={tw`w-12 h-6 rounded-full justify-center ${value ? `bg-[${activeColor}]/60` : 'bg-gray-200 dark:bg-gray-700'}`}
        >
            <Animated.View
                style={[
                    tw`w-5 h-5 rounded-full bg-white shadow-sm absolute`,
                    {
                        transform: [{ translateX }],
                        left: 2,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    },
                ]}
            />
        </Pressable>
    )
}

export default ModernSwitch 