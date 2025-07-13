import { View } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import StatsComponent from '../StatsComponent'

type HomeStatsPropType = {
    totalRecords: number
    totalExpensesPerMonth: { month: number; totalMonthlyCost: number }[]
}

const HomeStats = (props: HomeStatsPropType) => {

    const monthlyAverageExpense = Math.round(props.totalExpensesPerMonth.reduce((sum, item) => sum + (item.totalMonthlyCost || 0), 0) / 12)

    return (
        <View style={tw`flex-row flex-wrap gap-3 bg-white p-3 rounded-[2.1rem]`}>
            <StatsComponent
                symbol="money"
                themeColor="#f28800"
                cost={monthlyAverageExpense}
                description={'Average Expense\nPer Month'}
            />
            <StatsComponent
                symbol="total"
                themeColor="#f28800"
                cost={props.totalRecords}
                description={'Total Record\nEntries'}
            />
        </View>
    )
}

export default HomeStats