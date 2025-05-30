import { View } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import StatsComponent from '../StatsComponent'

type ServiceStatsPropType = {
    selectedButtonHexColor: string
    totalExpense: number
    selectedTabName: string
    selectedDataSet: number
    averageExpense: number
    daysSinceLastService: number
}

const ServiceStats = (props: ServiceStatsPropType) => {
    return (
        <View style={tw`flex flex-row flex-wrap justify-between gap-3 mb-3`}>
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.totalExpense} symbol="money" description={`Total\n${props.selectedTabName[0].toUpperCase()}${props.selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.daysSinceLastService} symbol="calendar" description={`Days Since\nLast Service`} />
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.averageExpense} symbol="average" description={`Average\n${props.selectedTabName[0].toUpperCase()}${props.selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.selectedDataSet} symbol="total" description={`Number of\n${props.selectedTabName[0].toUpperCase()}${props.selectedTabName.substring(1, 99)} Records`} />
        </View>
    )
}

export default ServiceStats