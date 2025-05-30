import { View, Text } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import { Banknote, CalendarDays, Coins, Hash, Ruler } from 'lucide-react-native'
type StatsComponentPropType = {
    themeColor: string
    cost: number
    symbol: "money" | "calendar" | "average" | "total" | "distance"
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

    const IconSet = () => {
        switch (props.symbol) {
            case 'money':
                return <Banknote style={tw`absolute top-5 right-2`} color={props.themeColor} size={25} />
            case 'calendar':
                return <CalendarDays style={tw`absolute top-5 right-2`} color={props.themeColor} size={25} />
            case 'average':
                return <Coins style={tw`absolute top-5 right-2`} color={props.themeColor} size={25} />
            case 'total':
                return <Hash style={tw`absolute top-5 right-2`} color={props.themeColor} size={25} />
            case 'distance':
                return <Ruler style={tw`absolute top-5 right-2`} color={props.themeColor} size={25} />
        }
    }

    return (
        <View style={tw`flex flex-row flex-wrap p-3 w-[48%] bg-[${props.themeColor}]/5 dark:bg-green-950 rounded-3xl border-[${props.themeColor}]/20 border`}>
            <Text style={tw`font-HKGrotesk-Bold text-[1.75rem] w-2/3 z-50 text-[${props.themeColor}]`}>{formatAmount(props.cost)}</Text>
            {IconSet()}
            <Text style={tw`font-HKGrotesk-Medium text-xs text-[${props.themeColor}]`}>{props.description}</Text>
        </View>
    )
}

export default StatsComponent