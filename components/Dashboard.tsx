import React, { useMemo, useState } from 'react'
import { ScrollView, View, LogBox } from 'react-native'
import tw from '~/tw.config'
import { useLocalSearchParams } from 'expo-router'
import {
  useFuelRecords,
  useOdometerRecords,
  useRepairRecords,
  useServiceRecords,
  useTaxRecords,
  useUpgradeRecords,
} from '~/hooks/api'
import ExpenseOverview from './ExpenseOverview'
import DateHandler from '~/utils/DateHandler'
import MonthlyExpensesChart from './MonthlyExpensesChart'
import HomeStats from './StatsComponents/HomeStats'

const Dashboard = () => {
  const { id: CarId }: { id: string } = useLocalSearchParams()
  const carId = parseInt(CarId.toString())

  const { data: ServiceRecords } = useServiceRecords(carId)
  const { data: RepairRecords } = useRepairRecords(carId)
  const { data: OdometerRecords } = useOdometerRecords(carId)
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

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // Ignore nested list warning
  ])

 // const lastEntryDays = DaysSinceLastEntry([...allRecords, OdometerRecords])
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

  const totalRecords = useMemo(() => {
    if (yearFilter === 'all') return allRecords.length
    return allRecords.filter(r => {
      if (!r.date) return false
      const d = DateHandler(r.date, true) as Date
      return d.getFullYear() === yearFilter
    }).length
  }, [allRecords, yearFilter])

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
    return totalExpenses
  }, [allRecords, yearFilter])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={tw`flex-1 bg-gray-100 gap-3 mb-3`}>
        <ExpenseOverview
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          availableYears={availableYears}
        />
        <HomeStats totalExpensesPerMonth={totalExpensesPerMonth} totalRecords={totalRecords}/>
        <MonthlyExpensesChart data={totalExpensesPerMonth} />
      </View>
    </ScrollView>
  )
}

export default Dashboard
