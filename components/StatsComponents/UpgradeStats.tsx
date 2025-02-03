import { View } from 'react-native'
import React from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import StatsComponent from '../StatsComponent'

type UpgradeStatsPropType = {
    selectedButtonHexColor: string
    totalExpense: number
    selectedTabName: string
    selectedDataSet: number
    averageExpense: number
}

const UpgradeStats = (props: UpgradeStatsPropType) => {
    const { preferredCurrencySymbol } = GlobalStateStore((state) => state)

    return (
        <View style={tw`flex flex-row flex-wrap justify-between gap-3 mb-3`}>
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.totalExpense} symbol={preferredCurrencySymbol} description={`Total\n${props.selectedTabName[0].toUpperCase()}${props.selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={47} symbol={"📆"} description={`Days Since\nLast Upgrade`} />
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.averageExpense} symbol={preferredCurrencySymbol} description={`Average\n${props.selectedTabName[0].toUpperCase()}${props.selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.selectedDataSet} symbol={"±"} description={`Amount of\n${props.selectedTabName[0].toUpperCase()}${props.selectedTabName.substring(1, 99)} Records`} />
        </View>
    )
}

export default UpgradeStats