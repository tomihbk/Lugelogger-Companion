import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import useThemeStore from '~/stores/themeStore'
import { shade } from 'polished'
import AnimatedPressable from './Animations/AnimatedPressable'

type PillRecordNavigationPropType = {
    buttonIndex: string
    color: string
    selectedTabName: string
    label: string
    onClick: ((event: GestureResponderEvent) => void) | undefined
}

const PillRecordNavigation = (props: PillRecordNavigationPropType) => {
    const { colorScheme } = useThemeStore()

    return (
        <AnimatedPressable onPress={props.onClick}>
            <Text
                style={[tw`p-1 px-4 text-lg font-HKGrotesk-Medium rounded-full mr-2 ${props.selectedTabName === props.buttonIndex
                    ? `bg-[${colorScheme === 'dark' ? shade(0.5, props.color) : props.color}] text-white`
                    : `bg-[${props.color}]/10 text-[${props.color}]`
                    }`]}>
                {props.label}
            </Text>
        </AnimatedPressable>
    )
}

export default PillRecordNavigation