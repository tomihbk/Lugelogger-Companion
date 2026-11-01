import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { FlashList } from '@shopify/flash-list'
import { RecordBase } from '~/api/records-base.types'
import { useOdometerRecords, useServiceRecords, useRepairRecords, useUpgradeRecords, useFuelRecords, useTaxRecords, useReminderRecords } from '~/hooks/api/index'
import { FuelRecordAdd, OdometerRecord, FuelRecordGet, ReminderRecord } from '~/api/index-records.types'
import { OdometerFunctionStore, ServiceFunctionStore, RepairFunctionStore, UpgradeFunctionStore, FuelFunctionStore, TaxFunctionStore, ReminderFunctionStore } from '~/stores/RecordButtons'
import GlobalStateStore from '~/stores/globalStateStore'
import FuelCard from '~/components/Cards/FuelCard'
import NewRecordButton from '~/components/NewRecordButton'
import PillRecordNavigation from '~/components/PillRecordNavigation'
import { OdometerStats, FuelStats, RepairStats, ServiceStats, TaxStats, UpgradeStats } from '~/components/StatsComponents'
import OdometerCard from '~/components/Cards/OdometerCard'
import ServiceCard from '~/components/Cards/ServiceCard'
import TaxCard from '~/components/Cards/TaxCard'
import RepairCard from '~/components/Cards/RepairCard'
import UpgradeCard from '~/components/Cards/UpgradeCard'
import DateHandler from '~/utils/DateHandler'
import Dashboard from '~/components/Dashboard'
import ReminderCard from '~/components/Cards/ReminderCard'
import useThemeStore from '~/stores/themeStore'
import { useTheme } from '~/hooks/useTheme'
import AnimatedSection from "~/components/Animations/AnimatedSection"
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useAnalytics } from '~/utils/Analytics'


const CarDetail = () => {
  const { id: CarId, actionType, vehicleName }: { id: string, actionType: string, vehicleName: string } = useLocalSearchParams()

  const carId = parseInt(CarId)
  const { data: ServiceRecords, isPending: isServiceRecordsFetching, isError: isServiceError } = useServiceRecords(carId)
  const { data: OdometerRecords, isPending: isOdometerRecordsFetching, isError: isOdometerError } = useOdometerRecords(carId)
  const { data: RepairRecords, isPending: isRepairRecordsFetching, isError: isRepairError } = useRepairRecords(carId)
  const { data: UpgradeRecords, isPending: isUpgradeRecordsFetching, isError: isUpgradeError } = useUpgradeRecords(carId)
  const { data: FuelRecords, isPending: isFuelRecordsFetching, isError: isFuelError } = useFuelRecords(carId)
  const { data: TaxRecords, isPending: isTaxRecordsFetching, isError: isTaxError } = useTaxRecords(carId)
  const { data: ReminderRecords, isPending: isReminderRecordsFetching, isError: isReminderError } = useReminderRecords(carId)

  const { setSelectedTabName, selectedTabName } = GlobalStateStore((state) => state)
  const currentWorldYear = new Date().getFullYear()
  const { colorScheme } = useThemeStore()
  const theme = useTheme()
  const analytics = useAnalytics()

  const ActionButtons = [
    { key: 'home', label: 'Home', color: '#f28900' },
    { key: OdometerFunctionStore.key, label: 'Odometer', color: OdometerFunctionStore.buttonColor[colorScheme] },
    { key: ServiceFunctionStore.key, label: 'Service', color: ServiceFunctionStore.buttonColor[colorScheme] },
    { key: RepairFunctionStore.key, label: 'Repairs', color: RepairFunctionStore.buttonColor[colorScheme] },
    { key: UpgradeFunctionStore.key, label: 'Upgrades', color: UpgradeFunctionStore.buttonColor[colorScheme] },
    { key: FuelFunctionStore.key, label: 'Fuel', color: FuelFunctionStore.buttonColor[colorScheme] },
    { key: TaxFunctionStore.key, label: 'Taxes', color: TaxFunctionStore.buttonColor[colorScheme] },
    { key: ReminderFunctionStore.key, label: 'Reminders', color: ReminderFunctionStore.buttonColor[colorScheme] },
    // { key: 'notes', label: 'Notes', color: '#BF0296' },
  ]

  const calculateOrderedDataByUrgency = (dataSource: ReminderRecord) => {
    const urgencyGrade = {
      'PastDue': 0,
      'VeryUrgent': 1,
      'Urgent': 2,
      'NotUrgent': 3
    } as const

    type UrgencyType = keyof typeof urgencyGrade
    const reminderData = dataSource as ReminderRecord

    const orderedDataByUrgency = [...reminderData].sort((a, b) => {
      // First sort by urgency
      const urgencyA = urgencyGrade[(a.urgency || 'NotUrgent') as UrgencyType]
      const urgencyB = urgencyGrade[(b.urgency || 'NotUrgent') as UrgencyType]

      if (urgencyA !== urgencyB) {
        return urgencyA - urgencyB
      }

      // If urgency is the same, sort by dueDate or dueOdometer
      if (a.userMetric === 'Date' || a.userMetric === 'Both') {
        const dateA = DateHandler(a.dueDate, true) as Date
        const dateB = DateHandler(b.dueDate, true) as Date
        return dateA.getTime() - dateB.getTime() // Earlier dates first
      } else if (a.userMetric === 'Odometer') {
        return parseInt(a.dueOdometer) - parseInt(b.dueOdometer) // Lower odometer first
      }
      return 0
    })
    return orderedDataByUrgency
  }

  const selectedDataSet = useMemo<RecordBase | OdometerRecord | FuelRecordAdd | FuelRecordGet | ReminderRecord>(() => {
    let dataSource

    switch (selectedTabName) {
      case ServiceFunctionStore.key:
        dataSource = ServiceRecords
        break

      case OdometerFunctionStore.key:
        dataSource = OdometerRecords
        break

      case RepairFunctionStore.key:
        dataSource = RepairRecords
        break

      case UpgradeFunctionStore.key:
        dataSource = UpgradeRecords
        break

      case FuelFunctionStore.key:
        dataSource = FuelRecords
        break

      case TaxFunctionStore.key:
        dataSource = TaxRecords
        break

      case ReminderFunctionStore.key:
        return calculateOrderedDataByUrgency(
          ReminderRecords ?? [],
        )

      default:
        return []
    }

    if (!Array.isArray(dataSource)) {
      return []
    }

    return [...dataSource].sort((a, b) => {
      const dateA = DateHandler(a.date, true) as Date
      const dateB = DateHandler(b.date, true) as Date

      return dateB.getTime() - dateA.getTime()
    })
  }, [selectedTabName, ServiceRecords, OdometerRecords, RepairRecords, UpgradeRecords, FuelRecords, TaxRecords, ReminderRecords,
  ])

  const [selectedButtonHexColor, setSelectedButtonHexColor] = useState<string>(ActionButtons.filter((button) => button.key == actionType)[0].color)
  const scrollViewRef = useRef<ScrollView>(null)
  const flashListRef = useRef<FlashList<any>>(null)
  const plusButtonVisible = useSharedValue(1)

  useEffect(() => {
    if (!actionType) return

    setSelectedTabName(actionType)
    analytics.recordTypeViewed(actionType)

    const button = ActionButtons.find(b => b.key === actionType)
    if (button) {
      setSelectedButtonHexColor(button.color)
    }
  }, [actionType])

  useEffect(() => {
    flashListRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    })
  }, [selectedTabName])

  const totalExpense = useMemo(() => {
    if (
      !Array.isArray(selectedDataSet) ||
      selectedDataSet.length === 0 ||
      !("cost" in selectedDataSet[0])
    ) {
      return 0
    }

    return selectedDataSet.reduce(
      (total, record) => total + (parseFloat(record.cost) || 0),
      0,
    )
  }, [selectedDataSet])

  const totalDistance = useMemo(() => {
    if (
      !Array.isArray(selectedDataSet) ||
      selectedDataSet.length === 0 ||
      !("odometer" in selectedDataSet[0]) ||
      !("initialOdometer" in selectedDataSet[0])
    ) {
      return 0
    }

    return selectedDataSet.reduce(
      (total, record) =>
        total +
        (parseFloat(record.odometer) || 0) -
        (parseFloat(record.initialOdometer) || 0),
      0,
    )
  }, [selectedDataSet])

  const odometerDelta = useMemo(() => {
    if (!Array.isArray(FuelRecords) || FuelRecords.length < 2) {
      return []
    }

    const deltas: number[] = []

    for (let i = 1; i < FuelRecords.length; i++) {
      const previous = Number(FuelRecords[i - 1].odometer)
      const current = Number(FuelRecords[i].odometer)

      deltas.push(current - previous)
    }

    return deltas.reverse()
  }, [FuelRecords])

  const daysSinceLastRecord = useMemo(() => {
    if (
      !Array.isArray(selectedDataSet) ||
      selectedDataSet.length === 0 ||
      !("date" in selectedDataSet[0])
    ) {
      return 0
    }

    const lastRecordDate = DateHandler(
      selectedDataSet[0].date,
      true,
    ) as Date

    const today = new Date()

    return (
      Math.ceil(
        (today.getTime() - lastRecordDate.getTime()) /
        (1000 * 60 * 60 * 24),
      ) - 1
    )
  }, [selectedDataSet])

  const averageExpense = (Math.round((totalExpense / (selectedDataSet?.length || 1)) * 10) / 10)

  const menuScrollX = useSharedValue(0)

  const handleMarginMenuScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      menuScrollX.value = event.contentOffset.x
    },
  })

  const pillMenuStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          menuScrollX.value,
          [0, 24],
          [12, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }))
  useEffect(() => {
    if (!scrollViewRef.current) return

    if (selectedTabName === "home") {
      scrollViewRef.current.scrollTo({
        x: 0,
        animated: true,
      })
      return
    }

    const selectedTabIndex = ActionButtons.findIndex(
      button => button.key === selectedTabName,
    )

    if (selectedTabIndex === -1) return

    const scrollPosition =
      selectedTabIndex *
      (Dimensions.get("window").width / ActionButtons.length * 2)

    scrollViewRef.current.scrollTo({
      x: scrollPosition,
      animated: true,
    })
  }, [selectedTabName])

  const StatsComponentHandler = (actiontype: string) => {
    switch (actiontype) {
      case OdometerFunctionStore.key:
        return <OdometerStats selectedButtonHexColor={selectedButtonHexColor} selectedTabName={selectedTabName} totalDistance={totalDistance} selectedDataSet={(selectedDataSet?.length || 0)} daysSinceLastOdometer={daysSinceLastRecord} />
      case ServiceFunctionStore.key:
        return <ServiceStats averageExpense={averageExpense} selectedButtonHexColor={selectedButtonHexColor} selectedDataSet={(selectedDataSet?.length || 0)} selectedTabName={selectedTabName} totalExpense={totalExpense} daysSinceLastService={daysSinceLastRecord} />
      case RepairFunctionStore.key:
        return <RepairStats averageExpense={averageExpense} selectedButtonHexColor={selectedButtonHexColor} selectedDataSet={(selectedDataSet?.length || 0)} selectedTabName={selectedTabName} totalExpense={totalExpense} daysSinceLastRepair={daysSinceLastRecord} />
      case UpgradeFunctionStore.key:
        return <UpgradeStats averageExpense={averageExpense} selectedButtonHexColor={selectedButtonHexColor} selectedDataSet={(selectedDataSet?.length || 0)} selectedTabName={selectedTabName} totalExpense={totalExpense} daysSinceLastUpgrade={daysSinceLastRecord} />
      case FuelFunctionStore.key:
        return <FuelStats averageExpense={averageExpense} selectedButtonHexColor={selectedButtonHexColor} selectedDataSet={(selectedDataSet?.length || 0)} selectedTabName={selectedTabName} totalExpense={totalExpense} daysSinceLastFuel={daysSinceLastRecord} />
      case TaxFunctionStore.key:
        return <TaxStats averageExpense={averageExpense} selectedButtonHexColor={selectedButtonHexColor} selectedDataSet={(selectedDataSet?.length || 0)} selectedTabName={selectedTabName} totalExpense={totalExpense} daysSinceLastTax={daysSinceLastRecord} />
      case 'notes':
        return (<><Text>Notes Stats component</Text></>)
    }
  }

  const plusButtonStyle = useAnimatedStyle(() => ({
    opacity: plusButtonVisible.value,
    transform: [
      {
        translateY: (1 - plusButtonVisible.value) * 20,
      },
    ],
  }))

  return (
    <View style={[tw`flex-1 px-3`, { backgroundColor: theme.colors.background.default }]}>
      <Stack.Screen options={{
        headerTitle: () => <Text style={[tw`text-xl font-HKGrotesk-Medium`, { color: theme.colors.text.primary }]} numberOfLines={1}>{vehicleName}</Text>,
      }} />
      <AnimatedSection delay={60} duration={400} direction='right'>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`flex-row flex-wrap flex-grow-0 p-2 -mx-5 pt-0`}
          scrollEventThrottle={16}
          onScroll={handleMarginMenuScroll}>
          <Animated.View style={[tw`flex-row`, pillMenuStyle]}>
            {ActionButtons.map((button) => (
              <PillRecordNavigation
                color={button.color} key={button.key} buttonIndex={button.key} label={button.label}
                onClick={() => {
                  setSelectedTabName(button.key)
                  analytics.recordTypeViewed(button.key)
                  setSelectedButtonHexColor(button.color)
                }} selectedTabName={selectedTabName} />
            ))}
          </Animated.View>
        </Animated.ScrollView>
      </AnimatedSection>

      {(isOdometerRecordsFetching || isServiceRecordsFetching || isRepairRecordsFetching || isUpgradeRecordsFetching || isFuelRecordsFetching || isTaxRecordsFetching || isReminderRecordsFetching) ? (
        <AnimatedSection direction="fade" duration={200}>
          <View style={tw`flex-1 items-center justify-center`}>
            <Text style={{ color: theme.colors.text.secondary }}>
              Loading records...
            </Text>
          </View>
        </AnimatedSection>
      ) : isServiceError || isFuelError || isOdometerError || isReminderError || isRepairError || isTaxError || isUpgradeError ? (
        <AnimatedSection direction="fade" duration={200}>
          <View style={tw`flex-1 items-center justify-center`}>
            <Text style={{ color: theme.colors.text.primary }}>
              Something went wrong
            </Text>
          </View>
        </AnimatedSection>
      ) : selectedDataSet.length === 0 && selectedTabName != 'home' && selectedTabName != 'notes' ? (
        <AnimatedSection direction="up" duration={250}>
          <View style={tw`items-center justify-center h-11/12`}>
            <Text style={[tw`text-base font-HKGrotesk-Medium`, { color: theme.colors.text.primary }]}>
              No records yet
            </Text>

            <Text style={[tw`text-sm font-HKGrotesk-Regular mt-1`, { color: theme.colors.text.secondary }]}>
              Add your first record to get started
            </Text>
            <View style={tw`absolute bottom-1 right-1`}>
              <NewRecordButton
                selectedButtonHexColor={selectedButtonHexColor}
                selectedTabName={selectedTabName}
                carId={CarId}
              />
            </View>
          </View>
        </AnimatedSection>
      ) : (
        selectedTabName != 'home' && selectedTabName != 'notes' &&
        <>
          <FlashList
            ref={flashListRef}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={StatsComponentHandler(selectedTabName)}
            data={selectedDataSet}
            onMomentumScrollEnd={() => {
              plusButtonVisible.value = withTiming(1, { duration: 180 })
            }}
            onScrollEndDrag={(event) => {
              const velocity = event.nativeEvent.velocity?.y ?? 0

              // If there is no momentum, show immediately.
              if (Math.abs(velocity) < 0.1) {
                plusButtonVisible.value = withTiming(1, { duration: 180 })
              }
            }}
            onScrollBeginDrag={() => {
              plusButtonVisible.value = withTiming(0, { duration: 150 })
            }}
            renderItem={({ index, item }) => {

              let previousYear, showYearHeader, previousItem, currentYear

              // Section will be skipped for ReminderRecord
              if (!('userMetric' in (item))) {
                currentYear = (DateHandler(item.date, true) as Date).getFullYear()
                previousItem = index > 0 && selectedDataSet ? selectedDataSet[index - 1] : null
                previousYear = previousItem
                  ? (DateHandler(previousItem.date, true) as Date).getFullYear()
                  : null
                showYearHeader = (index === 0 || currentYear !== previousYear) && currentYear < currentWorldYear
              }

              const renderCard = () => {
                switch (selectedTabName) {
                  case FuelFunctionStore.key:
                    return <FuelCard item={item} odometerDelta={odometerDelta[index]} selectedButtonHexColor={selectedButtonHexColor} vehicleId={carId} />
                  case OdometerFunctionStore.key:
                    return <OdometerCard item={item} selectedButtonHexColor={selectedButtonHexColor} vehicleId={carId} />
                  case ServiceFunctionStore.key:
                    return <ServiceCard item={item} selectedButtonHexColor={selectedButtonHexColor} vehicleId={carId} />
                  case TaxFunctionStore.key:
                    return <TaxCard item={item} selectedButtonHexColor={selectedButtonHexColor} vehicleId={carId} />
                  case RepairFunctionStore.key:
                    return <RepairCard item={item} selectedButtonHexColor={selectedButtonHexColor} vehicleId={carId} />
                  case UpgradeFunctionStore.key:
                    return <UpgradeCard item={item} selectedButtonHexColor={selectedButtonHexColor} vehicleId={carId} />
                  case ReminderFunctionStore.key:
                    return <ReminderCard item={item} selectedButtonHexColor={selectedButtonHexColor} vehicleId={carId} />
                  // default:
                  //   return <RecordCard item={item} selectedButtonHexColor={selectedButtonHexColor} />
                }
              }
              return (
                <View>
                  {showYearHeader && (
                    <Text style={[tw`text-sm font-HKGrotesk-Regular bg-[${selectedButtonHexColor}]/5 p-1 text-center w-1/2 mx-auto rounded-tr-xl rounded-tl-xl border-[${selectedButtonHexColor}]/20 border border-b-0`, { color: theme.colors.text.primary }]}>
                      {currentYear}
                    </Text>
                  )}
                  {renderCard()}
                </View>
              )
            }}
            estimatedItemSize={10} />

          <Animated.View
            pointerEvents="box-none"
            style={plusButtonStyle}>
            <NewRecordButton
              selectedButtonHexColor={selectedButtonHexColor}
              selectedTabName={selectedTabName}
              carId={CarId}
            />
          </Animated.View>
        </>
      )}
      {selectedTabName === 'home' && <Dashboard />}
    </View>
  )
}

export default CarDetail