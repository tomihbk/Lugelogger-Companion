import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import tw from '~/tw.config'
import { useLocalSearchParams } from 'expo-router'
import { useFuelRecords, useOdometerRecords, useRepairRecords, useServiceRecords, useTaxRecords, useUpgradeRecords } from '~/hooks/api'
import ExpenseOverview from './ExpenseOverview'
import DateHandler from '~/utils/DateHandler'

const Dashboard = () => {
  const { id: CarId }: { id: string } = useLocalSearchParams()
  const carId = parseInt(CarId.toString())
  const { data: ServiceRecords } = useServiceRecords(carId)
  const { data: OdometerRecords } = useOdometerRecords(carId)
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

  const availableYears = useMemo(() => {
    const yearSet = new Set<number>()
    allRecords.forEach(r => {
      if (r.date) {
        yearSet.add(getYear(r.date))
      }
    })
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [allRecords])

  const [yearFilter, setYearFilter] = useState<number | 'all'>(availableYears[0] || 'all')

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <ExpenseOverview
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        availableYears={availableYears}
      />
    </View>
  )
}

export default Dashboard
