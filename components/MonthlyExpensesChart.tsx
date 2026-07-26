import React from 'react'
import { View, Text } from 'react-native'
import { Bar, CartesianChart } from 'victory-native'
import { DashPathEffect, LinearGradient, useFont, vec } from '@shopify/react-native-skia'
import tw from '~/tw.config'
import HKGroteskMedium from '../assets/fonts/HankenGrotesk-Medium.ttf'
import { useTheme } from '~/hooks/useTheme'

interface MonthlyExpensesChartProps {
    data: { month: number; totalMonthlyCost: number }[]
}

const MonthlyExpensesChart: React.FC<MonthlyExpensesChartProps> = ({ data }) => {
    const font = useFont(HKGroteskMedium, 12)
    const theme = useTheme()

    if (!font) return null

    return (
        <View style={[tw`h-65 rounded-3xl p-4 py-3`, { backgroundColor: theme.colors.surface.neutral }]}>
            <Text style={[tw`text-lg font-HKGrotesk-Bold mb-2`, { color: theme.colors.text.primary }]}>
                Monthly Expenses
            </Text>
            <CartesianChart
                data={data}
                transformConfig={{ pinch: { enabled: true } }}
                xKey="month"
                yKeys={['totalMonthlyCost']}
                domainPadding={{ left: 15, right: 15, top: 2 }}
                xAxis={{
                    font,
                    labelColor: theme.colors.text.primary,
                    lineWidth: 0,
                    formatXLabel(value) {
                        const date = new Date(2025, value - 1)
                        return date.toLocaleString(Intl.DateTimeFormat().resolvedOptions().locale, { month: 'short' })
                    },
                    linePathEffect: <DashPathEffect intervals={[4, 4]} />
                }}
                yAxis={[{
                    font,
                    yKeys: ["totalMonthlyCost"],
                    labelColor: theme.colors.text.primary,
                    lineColor: "#f7a33990",
                    tickCount: 5,
                    linePathEffect: <DashPathEffect intervals={[0, 0]} />,
                }]}
            >
                {({ points, chartBounds }) => (
                    <>
                        <Bar
                            points={points.totalMonthlyCost}
                            chartBounds={chartBounds}
                            color="#6366f1"
                            barWidth={15}
                            roundedCorners={{ topLeft: 4, topRight: 4 }}
                        >
                            <LinearGradient
                                start={vec(0, 0)}
                                end={vec(0, 300)}
                                colors={["#f28800", "#f2880040"]}
                            />
                        </Bar>
                    </>
                )}
            </CartesianChart>
        </View>
    )
}

export default MonthlyExpensesChart