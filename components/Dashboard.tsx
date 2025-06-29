import React, { useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import tw from '~/tw.config'
import { useLocalSearchParams } from 'expo-router'
import {
  useFuelRecords,
  useRepairRecords,
  useServiceRecords,
  useTaxRecords,
  useUpgradeRecords,
} from '~/hooks/api'
import ExpenseOverview from './ExpenseOverview'
import DateHandler from '~/utils/DateHandler'
import { Bar, CartesianChart, useChartPressState } from 'victory-native'
import { DashPathEffect, LinearGradient, useFont, vec, Text as SKText, Circle } from '@shopify/react-native-skia'
import inter from '../assets/fonts/HankenGrotesk-Medium.ttf'
import { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'

const Dashboard = () => {
  const { id: CarId }: { id: string } = useLocalSearchParams()
  const carId = parseInt(CarId.toString())

  const { data: ServiceRecords } = useServiceRecords(carId)
  const { data: RepairRecords } = useRepairRecords(carId)
  const { data: UpgradeRecords } = useUpgradeRecords(carId)
  const { data: FuelRecords } = useFuelRecords(carId)
  const { data: TaxRecords } = useTaxRecords(carId)

  const allRecords = [
    ...(ServiceRecords || []),
    ...(RepairRecords || []),
    ...(UpgradeRecords || []),
    ...(FuelRecords || []),
    ...(TaxRecords || []),
  ]

  const getYear = (date: string) => {
    const d = DateHandler(date, true) as Date
    return d.getFullYear()
  }
  const getMonth = (date: string) => {
    const d = DateHandler(date, true) as Date
    return d.getMonth() + 1
  }

  const availableYears = useMemo(() => {
    const yearSet = new Set<number>()
    allRecords.forEach((r) => {
      if (r.date) {
        yearSet.add(getYear(r.date))
      }
    })
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [allRecords])

  const [yearFilter, setYearFilter] = useState<number | 'all'>(
    availableYears[0] || 'all'
  )

  // Calculate total expenses per month for all record types
  const totalExpensesPerMonth = useMemo(() => {
    const monthly: { [month: number]: number } = {}
    allRecords.forEach((r) => {
      if (r.date) {
        const y = getYear(r.date)
        const m = getMonth(r.date)
        const cost = parseFloat(r.cost)
        if (
          (yearFilter === 'all' || y === yearFilter) &&
          !isNaN(cost) &&
          isFinite(cost)
        ) {
          monthly[m] = (monthly[m] || 0) + cost
        }
      }
    })
    // Fill missing months with 0
    const totalExpenses = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1
      return {
        month,
        totalMonthlyCost: (Math.round(monthly[month] * 100) / 100) || 0,
      }
    })
    //console.log('Total Expenses Per Month:', JSON.stringify(totalExpenses))
    return totalExpenses
  }, [allRecords, yearFilter])

  const font = useFont(inter, 12)
  

  const { state, isActive } = useChartPressState({
    x: 0,
    y: { totalMonthlyCost: 0 },
  })

  const value = useDerivedValue(() => {
    return "$" + state.y.totalMonthlyCost.value.value;
  }, [state]);

  const textYPosition = useDerivedValue(() => {
    return state.y.totalMonthlyCost.position.value - 15;
  }, [value]);

  const textXPosition = useDerivedValue(() => {
    if (!font) {
      return 0;
    }
    return (
      state.x.position.value - font.measureText(value.value).width / 2
    );
  }, [value, font]);


  if (!font) return null

  return (
    <View style={tw`flex-1 bg-gray-100 gap-4`}>
      <ExpenseOverview
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        availableYears={availableYears}
      />
      <View style={tw`h-65 bg-white rounded-3xl p-4 py-3`}>
        <Text style={tw`text-lg font-HKGrotesk-Bold mb-2`}>
          Monthly Expenses
        </Text>
        <CartesianChart
          chartPressState={state}
          data={totalExpensesPerMonth}
          transformConfig={{ pinch: { enabled: true } }}
          xKey="month"
          yKeys={['totalMonthlyCost']}
          domainPadding={{ left: 15, right: 15, top: 2 }}
          xAxis={{
            font,
            labelColor: "black",
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
            labelColor: "black",
            lineColor: "#f7a33990",
            tickCount: 5,
            linePathEffect: <DashPathEffect intervals={[0, 0]} />,
          },
          ]}>


          {({ points, chartBounds }) => {
            return (
              <>
                <Bar
                  points={points.totalMonthlyCost}
                  chartBounds={chartBounds}
                  color="#6366f1"
                  //labels={{ position: 'top', font, color: '#000' }}
                  barWidth={15}
                  animate={{
                    type: 'spring',}}
                  roundedCorners={{ topLeft: 4, topRight: 4 }}>

                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(0, 300)}
                    colors={["#f28800", "#f2880040"]} />
                </Bar>

                {isActive ? (
                  <>
                    <SKText
                      font={font}
                      color={"black"}
                      x={textXPosition}
                      y={textYPosition}
                      text={value}
                    />
                    <Circle
                      cx={state.x.position}
                      cy={state.y.totalMonthlyCost.position}
                      r={8}
                      color={"grey"}
                      opacity={0.8}
                    />
                  </>
                ) : null}
              </>
            );
          }}
        </CartesianChart>
      </View>
    </View>
  )
}

export default Dashboard
