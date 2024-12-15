import { View, Text } from 'react-native'
import React from 'react'
import tw from '~/tw.config'

type StatsComponentPropType = {
    themeColor: string
    cost: number
    symbol: string
    description: string
}

const StatsComponent = (props: StatsComponentPropType) => {
    const formatAmount = (amount: number): string => {
        if (isNaN(amount)) return "0"
        switch (true) {
            case amount >= 1_000_000_000:
                return `${(amount / 1_000_000_000).toFixed(1)}G`
            case amount >= 1_000_000:
                return `${(amount / 1_000_000).toFixed(1)}M`
            case amount >= 1_000:
                return `${(amount / 1_000).toFixed(1)}k`
            default:
                return amount.toString()
        }
    }

    return (
        <View style={tw`flex flex-row flex-wrap p-3 w-[48%] bg-[${props.themeColor}]/5 dark:bg-green-950 rounded-3xl border-[${props.themeColor}]/20 border`}>
            <Text style={tw`font-HKGrotesk-Bold text-[1.75rem] w-2/3 z-50 text-[${props.themeColor}]`}>{formatAmount(props.cost)}</Text>
            <Text style={tw`font-HKGrotesk-Medium text-lg absolute top-5 right-2 text-[${props.themeColor}]`}>{props.symbol}</Text>
            <Text style={tw`font-HKGrotesk-Medium text-xs text-[${props.themeColor}]`}>{props.description}</Text>
        </View>
    )
}

export default StatsComponent