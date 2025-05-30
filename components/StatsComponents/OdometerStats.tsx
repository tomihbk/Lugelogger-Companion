import { View } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import StatsComponent from '../StatsComponent'

type OdometerStatsPropType = {
    selectedButtonHexColor: string
    totalDistance: number
    selectedTabName: string
    selectedDataSet: number
    daysSinceLastOdometer: number
}

const OdometerStats = (props: OdometerStatsPropType) => {
    return (
        <View style={tw`flex flex-row flex-wrap justify-between gap-3 mb-3`}>
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.totalDistance} symbol="distance" description={`Total\nDriven Distance`} />
            <StatsComponent themeColor={props.selectedButtonHexColor} cost={props.selectedDataSet} symbol="total" description={`Number of\n${props.selectedTabName[0].toUpperCase()}${props.selectedTabName.substring(1, 99)} Records`} />
        </View>
    )
}

export default OdometerStats