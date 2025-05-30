import { View } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import StatsComponent from '../StatsComponent'

type TaxStatsPropType = {
    selectedButtonHexColor: string
    totalExpense: number
    selectedTabName: string
    selectedDataSet: number
    averageExpense: number
    daysSinceLastTax: number
}

const TaxStats = (props: TaxStatsPropType) => {
    return (
        <View style={tw`flex flex-row flex-wrap justify-between gap-3 mb-3`}>
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.totalExpense} symbol="money" description={`Total\n${props.selectedTabName[0].toUpperCase()}${props.selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.daysSinceLastTax} symbol="calendar" description={`Days Since\nLast Tax`} />
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.averageExpense} symbol="average" description={`Average\n${props.selectedTabName[0].toUpperCase()}${props.selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.selectedDataSet} symbol="total" description={`Number of\n${props.selectedTabName[0].toUpperCase()}${props.selectedTabName.substring(1, 99)} Records`} />
        </View>
    )
}

export default TaxStats