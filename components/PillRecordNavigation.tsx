import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '~/tw.config'

type PillRecordNavigationPropType = {
    buttonIndex: string
    color: string
    selectedTabName: string
    label: string
    onClick: ((event: GestureResponderEvent) => void) | undefined
}

const PillRecordNavigation = (props: PillRecordNavigationPropType) => {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <Text
                style={tw`p-1 px-4 text-lg font-HKGrotesk-Medium rounded-full mr-2 ${props.selectedTabName === props.buttonIndex
                    ? `bg-[${props.color}] text-white`
                    : `bg-[${props.color}]/10 text-[${props.color}]`
                    }`}>
                {props.label}
            </Text>
        </TouchableOpacity>
    )
}

export default PillRecordNavigation