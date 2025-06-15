import React, { useState } from 'react'
import { View, Text, FlatList, Pressable, Modal, ScrollView } from 'react-native'
import tw from '~/tw.config'
import { lighten } from 'polished'
import NumberHandler from '~/utils/NumberHandler'
import DateHandler from '~/utils/DateHandler'
import {
    FuelFunctionStore,
    RepairFunctionStore,
    ServiceFunctionStore,
    TaxFunctionStore,
    UpgradeFunctionStore,
} from '~/stores/RecordButtons'
import GlobalStateStore from '~/stores/globalStateStore'
import { useLocalSearchParams } from 'expo-router'
import { useFuelRecords, useRepairRecords, useServiceRecords, useTaxRecords, useUpgradeRecords } from '~/hooks/api'

interface ExpenseOverviewProps {
    yearFilter: number | 'all'
    setYearFilter: (year: number | 'all') => void
    availableYears: number[]
}

const ExpenseOverview: React.FC<ExpenseOverviewProps> = ({
    yearFilter,
    setYearFilter,
    availableYears,
}) => {
    const { id: CarId }: { id: string } = useLocalSearchParams()
    const carId = parseInt(CarId.toString())
    const { data: ServiceRecords } = useServiceRecords(carId)
    const { data: RepairRecords } = useRepairRecords(carId)
    const { data: UpgradeRecords } = useUpgradeRecords(carId)
    const { data: FuelRecords } = useFuelRecords(carId)
    const { data: TaxRecords } = useTaxRecords(carId)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const { preferredCurrencySymbol } = GlobalStateStore((state) => state)

    const sumAmounts = (records?: any[]) =>
        Array.isArray(records)
            ? records.reduce((sum, r) => parseFloat(sum) + (parseFloat(r.cost) || 0), 0)
            : 0

    const getYear = (date: string) => {
        const d = DateHandler(date, true) as Date
        return d.getFullYear()
    }

    const filterByYear = (records?: any[]) =>
        Array.isArray(records)
            ? yearFilter === 'all'
                ? records
                : records.filter(r => r.date && getYear(r.date) === yearFilter)
            : []

    // Calculate totals for each type (filtered)
    const carTotalExpenses = [
        {
            type: ServiceFunctionStore.key,
            amount: sumAmounts(filterByYear(ServiceRecords)),
            color: ServiceFunctionStore.buttonColor,
        },
        {
            type: RepairFunctionStore.key,
            amount: sumAmounts(filterByYear(RepairRecords)),
            color: RepairFunctionStore.buttonColor,
        },
        {
            type: UpgradeFunctionStore.key,
            amount: sumAmounts(filterByYear(UpgradeRecords)),
            color: UpgradeFunctionStore.buttonColor,
        },
        {
            type: FuelFunctionStore.key,
            amount: sumAmounts(filterByYear(FuelRecords)),
            color: FuelFunctionStore.buttonColor,
        },
        {
            type: TaxFunctionStore.key,
            amount: sumAmounts(filterByYear(TaxRecords)),
            color: TaxFunctionStore.buttonColor,
        },
    ].filter(e => e.amount > 0)

    const total = carTotalExpenses.reduce((sum, item) => sum + item.amount, 0)

    if (total === 0) {
        return (
            <View style={tw`bg-white rounded-3xl p-4 py-3`}>
                <Text style={tw`text-lg font-HKGrotesk-Bold`}>Expense Overview</Text>
                <Text style={tw`text-gray-500 mt-2 font-HKGrotesk-Regular`}>No expenses recorded for this car.</Text>
            </View>
        )
    }

    return (
        <View style={tw`bg-white rounded-3xl p-4 py-3`}>
            <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-lg font-HKGrotesk-Bold`}>Expense Overview</Text>
                <View>
                    <Pressable
                        style={tw`flex-row items-center px-3 py-1 rounded-lg border border-gray-200 bg-gray-50 mt-1`}
                        onPress={() => setDropdownVisible(true)}
                    >
                        <Text style={tw`text-gray-700 mr-1 font-HKGrotesk-Regular`}>
                            {yearFilter === 'all' ? 'All Years' : yearFilter}
                        </Text>
                        <Text style={tw`text-gray-400`}>▼</Text>
                    </Pressable>
                    <Modal
                        visible={dropdownVisible}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setDropdownVisible(false)}
                    >
                        <Pressable style={tw`flex-1`} onPress={() => setDropdownVisible(false)}>
                            <View style={tw`absolute top-16 right-6 bg-white rounded-lg shadow-md border border-gray-200`}>
                                <ScrollView>
                                    <Pressable
                                        style={tw`px-4 py-2`}
                                        onPress={() => {
                                            setYearFilter('all')
                                            setDropdownVisible(false)
                                        }}
                                    >
                                        <Text style={tw`text-black text-base font-HKGrotesk-Regular`}>All Years</Text>
                                    </Pressable>
                                    {availableYears.map(year => (
                                        <Pressable
                                            key={year}
                                            style={tw`px-6 py-3`}
                                            onPress={() => {
                                                setYearFilter(year)
                                                setDropdownVisible(false)
                                            }}
                                        >
                                            <Text style={tw`text-black text-base font-HKGrotesk-Regular`}>{year}</Text>
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            </View>
                        </Pressable>
                    </Modal>
                </View>
            </View>
            <View style={tw`flex-row`}>
                <Text style={tw`text-3xl font-HKGrotesk-Bold mt-3`} numberOfLines={1}>
                    {preferredCurrencySymbol} {NumberHandler(total)}
                </Text>
            </View>
            <View style={tw`flex-row my-2 h-12 gap-[2px] rounded-[11px] border border-gray-200 p-[3px] font-HKGrotesk-Regular -mx-1 `}>
                {carTotalExpenses.map((item) => (
                    <View
                        key={item.type}
                        style={[tw`bg-[${lighten(0.1, item.color)}] rounded-lg`, { flex: item.amount }]} />
                ))}
            </View>

            <FlatList
                data={carTotalExpenses}
                keyExtractor={(item) => item.type}
                renderItem={({ item }) => {
                    const percentage = total > 0 ? (item.amount / total) * 100 : 0
                    return (
                        <View style={tw`flex-row items-center justify-between mt-2`}>
                            <View style={tw`flex-row items-center`}>
                                <View style={tw`w-3 h-3 rounded-full mr-2 bg-[${lighten(0.1, item.color)}]`} />
                                <Text style={tw`text-gray-700 font-HKGrotesk-Medium`}>{item.type}</Text>
                                <Text style={tw`text-gray-700 text-xs font-HKGrotesk-Regular`}> ({percentage.toFixed(1).replace(/\.0$/, '')}%)</Text>
                            </View>
                            <View style={tw`flex-row items-center`}>
                                <Text style={tw`font-HKGrotesk-Bold`}>{preferredCurrencySymbol} {NumberHandler(item.amount)}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default ExpenseOverview