import { View, Text, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { FlashList } from '@shopify/flash-list'
import { RecordBase } from '~/api/records-base.types'
import { useOdometerRecords, useServiceRecords, useRepairRecords, useUpgradeRecords, useFuelRecords, useTaxRecords } from '~/hooks/api/index'
import { FuelRecordAdd, OdometerRecord, FuelRecordGet } from '~/api/index-records.types'
import { OdometerFunctionStore, ServiceFunctionStore, RepairFunctionStore, UpgradeFunctionStore, FuelFunctionStore, TaxFunctionStore } from '~/stores/RecordButtons'
import GlobalStateStore from '~/stores/globalStateStore'
import FuelCard from '~/components/Cards/FuelCard'
import RecordCard from '~/components/Cards/RecordCard'
import NewRecordButton from '~/components/NewRecordButton'
import PillRecordNavigation from '~/components/PillRecordNavigation'
import { OdometerStats, FuelStats, RepairStats, ServiceStats, TaxStats, UpgradeStats } from '~/components/StatsComponents'
import OdometerCard from '~/components/Cards/OdometerCard'
import ServiceCard from '~/components/Cards/ServiceCard'
import TaxCard from '~/components/Cards/TaxCard'
import RepairCard from '~/components/Cards/RepairCard'
import UpgradeCard from '~/components/Cards/UpgradeCard'
import DateHandler from '~/utils/DateHandler'


const CarDetail = () => {
  const { id: CarId, actionType }: { id: string, actionType: string } = useLocalSearchParams()

  const carId = parseInt(CarId.toString())
  const { data: ServiceRecords, isPending: isServiceRecordsFetching } = useServiceRecords(carId)
  const { data: OdometerRecords, isPending: isOdometerRecordsFetching } = useOdometerRecords(carId)
  const { data: RepairRecords, isPending: isRepairRecordsFetching } = useRepairRecords(carId)
  const { data: UpgradeRecords, isPending: isUpgradeRecordsFetching } = useUpgradeRecords(carId)
  const { data: FuelRecords, isPending: isFuelRecordsFetching } = useFuelRecords(carId)
  const { data: TaxRecords, isPending: isTaxRecordsFetching } = useTaxRecords(carId)

  const { setSelectedTabName, selectedTabName } = GlobalStateStore((state) => state)

  const currentWorldYear = new Date().getFullYear()

  const ActionButtons = [
    { key: 'home', label: 'Home', color: '#f28900' },
    { key: OdometerFunctionStore.key, label: 'Odometer', color: OdometerFunctionStore.buttonColor },
    { key: ServiceFunctionStore.key, label: 'Service', color: ServiceFunctionStore.buttonColor },
    { key: RepairFunctionStore.key, label: 'Repairs', color: RepairFunctionStore.buttonColor },
    { key: UpgradeFunctionStore.key, label: 'Upgrades', color: UpgradeFunctionStore.buttonColor },
    { key: FuelFunctionStore.key, label: 'Fuel', color: FuelFunctionStore.buttonColor },
    { key: TaxFunctionStore.key, label: 'Taxes', color: TaxFunctionStore.buttonColor },
    // { key: 'notes', label: 'Notes', color: '#BF0296' },
  ]

  const [selectedDataSet, setSelectedDataSet] = useState<RecordBase | OdometerRecord | FuelRecordAdd | FuelRecordGet | undefined>([])
  const [selectedButtonHexColor, setSelectedButtonHexColor] = useState<string>(ActionButtons.filter((button) => button.key == actionType)[0].color)
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const [totalDistance, setTotalDistance] = useState<number>(0)
  const averageExpense = (Math.round((totalExpense / (selectedDataSet?.length || 1)) * 10) / 10)
  let didInit = false
  const odometerDeltas: number[] = []
  const scrollViewRef = useRef(null)
  const [odometerDelta, setOdometerDelta] = useState<number[]>([])
  const [showPlusButton, setShowPlusButton] = useState<boolean>(true)
  const [daysSinceLastRecord, setDaysSinceLastRecord] = useState<number>(0)

  const changeDataSet = async (serviceName: string) => {
    try {
      let dataSource: RecordBase | OdometerRecord | FuelRecordAdd | FuelRecordGet | undefined;
      switch (serviceName) {
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
        default:
          dataSource = []
          break
      }

      if (Array.isArray(dataSource)) {
        const orderedDataByLatestDate = dataSource
          .slice()
          .sort((a, b) => {
            const dateA = DateHandler(a.date, true) as Date;
            const dateB = DateHandler(b.date, true) as Date;
            return dateB.getTime() - dateA.getTime(); // Most recent first
          })
        setSelectedDataSet(orderedDataByLatestDate)
      } else {
        setSelectedDataSet([])
      }
    } catch (error) {
      console.error("Error changing dataset: ", error)
    }
  }

  useEffect(() => {
    if (!didInit) {  // ✅ Only runs once per app load, might run two times in development
      didInit = true
      setSelectedTabName(actionType)
      changeDataSet(actionType)
    }
  }, [])

  useEffect(() => {
    if (Array.isArray(selectedDataSet) && selectedDataSet.length > 0 && 'cost' in selectedDataSet[0]) {
      calculateTotalExpense(selectedDataSet as RecordBase)
    } else {
      setTotalExpense(0)
    }
    if (Array.isArray(selectedDataSet) && selectedDataSet.length > 0 && 'odometer' in selectedDataSet[0]) {
      calculateTotalDistance(selectedDataSet as OdometerRecord)
    } else {
      setTotalDistance(0)
    }
    if (Array.isArray(FuelRecords) && FuelRecords.length > 0 && 'fuelConsumed' in FuelRecords[0]) {
      calculateDeltaDistance(FuelRecords as FuelRecordAdd)
    } else {
      setOdometerDelta([])
    }
    if (Array.isArray(selectedDataSet) && selectedDataSet.length > 0 && 'date' in selectedDataSet[0]) {
      calculateDaysSinceLastRecord()
    } else {
      setDaysSinceLastRecord(0)
    }
    // this section handles when a tab is selected, the tab name is focused and should be shown.
    const selectedTabIndex = ActionButtons.findIndex(button => button.key === selectedTabName);
    if (scrollViewRef.current && selectedTabIndex !== -1) {
      const scrollPosition = selectedTabIndex * (Dimensions.get('window').width / ActionButtons.length * 2);
      scrollViewRef.current.scrollTo({ x: scrollPosition, animated: true });
    }
  }, [selectedDataSet])

  useEffect(() => {
    if (OdometerRecords || ServiceRecords || RepairRecords || UpgradeRecords || FuelRecords) {
      changeDataSet(selectedTabName)
      setSelectedTabName(selectedTabName)
    }
    return () => {
      setSelectedTabName(actionType)
    }
  }, [OdometerRecords, ServiceRecords, RepairRecords, UpgradeRecords, FuelRecords, TaxRecords]) // TODO Add other records services with time

  const calculateTotalExpense = (recordDataObject: RecordBase) => {
    let totalCost = 0
    for (const record of recordDataObject) totalCost += parseFloat(record.cost)
    setTotalExpense(totalCost)
  }

  const calculateTotalDistance = (recordDataObject: OdometerRecord) => {
    if (recordDataObject.length === 0) return 0;
    let totalOdometer = 0
    let initialOdometerTotal = 0

    for (const record of recordDataObject) totalOdometer += parseFloat(record.odometer)
    for (const record of recordDataObject) initialOdometerTotal += parseFloat(record.initialOdometer)
    setTotalDistance(totalOdometer - initialOdometerTotal)
  }

  const calculateDeltaDistance = (recordDataObject: FuelRecordAdd) => {
    if (recordDataObject.length === 0) return 0;
    for (let i = 1; i < recordDataObject.length; i++) {
      const prev = Number(recordDataObject[i - 1].odometer);
      const current = Number(recordDataObject[i].odometer);
      odometerDeltas.push(current - prev)
    }
    setOdometerDelta(odometerDeltas.reverse())
  }

  const calculateDaysSinceLastRecord = () => {
    const lastRecord = selectedDataSet[0]

    const lastRecordDate = DateHandler(lastRecord.date, true) as Date
    const today = new Date()
    const _daysSinceLastRecord = Math.ceil((today.getTime() - lastRecordDate.getTime()) / (1000 * 60 * 60 * 24)) - 1 // -1 because the last record is the current record
    setDaysSinceLastRecord(_daysSinceLastRecord)
  }

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

  return (
    <View style={tw`flex flex-col p-5 pb-0 w-full h-full dark:bg-slate-900`}>
      <Stack.Screen options={{ title: CarId as string, headerShown: false }} />
      <Text style={tw`text-2xl mt-4 font-HKGrotesk-Bold`}>{CarId}</Text>
      <ScrollView ref={scrollViewRef} horizontal={true} showsHorizontalScrollIndicator={false}
        style={tw`flex flex-row flex-wrap flex-grow-0 p-2 -mx-5 mb-1`}>
        {ActionButtons.map((button) => (
          <PillRecordNavigation color={button.color} key={button.key} buttonIndex={button.key} label={button.label}
            onClick={() => {
              setSelectedTabName(button.key)
              setSelectedButtonHexColor(button.color)
              changeDataSet(button.key)
            }}
            selectedTabName={selectedTabName} />
        ))}
      </ScrollView>

      {(isOdometerRecordsFetching || isServiceRecordsFetching || isRepairRecordsFetching || isUpgradeRecordsFetching || isFuelRecordsFetching || isTaxRecordsFetching) ? (
        <View style={tw`flex flex-col items-center justify-center h-4/5`}>
          <Text style={tw`text-lg font-HKGrotesk-Medium`}>Fetching data...</Text>
          <ActivityIndicator size="large" color={selectedButtonHexColor} />
        </View>
      ) : (
        selectedTabName != 'home' && selectedTabName != 'notes' &&
        <>
          <FlashList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={StatsComponentHandler(selectedTabName)}
            data={selectedDataSet}
            onScrollEndDrag={() => setShowPlusButton(true)}
            onScrollBeginDrag={() => setShowPlusButton(false)}
            renderItem={({ index, item }) => {


              const currentYear = (DateHandler(item.date, true) as Date).getFullYear()

              const previousItem = index > 0 && selectedDataSet ? selectedDataSet[index - 1] : null

              const previousYear = previousItem
                ? (DateHandler(previousItem.date, true) as Date).getFullYear()
                : null

              const showYearHeader = (index === 0 || currentYear !== previousYear) && currentYear < currentWorldYear

              const renderCard = () => {
                switch (selectedTabName) {
                  case FuelFunctionStore.key:
                    return <FuelCard item={item} odometerDelta={odometerDelta[index]} selectedButtonHexColor={selectedButtonHexColor} />
                  case OdometerFunctionStore.key:
                    return <OdometerCard item={item} selectedButtonHexColor={selectedButtonHexColor} />
                  case ServiceFunctionStore.key:
                    return <ServiceCard item={item} selectedButtonHexColor={selectedButtonHexColor} />
                  case TaxFunctionStore.key:
                    return <TaxCard item={item} selectedButtonHexColor={selectedButtonHexColor} />
                  case RepairFunctionStore.key:
                    return <RepairCard item={item} selectedButtonHexColor={selectedButtonHexColor} />
                  case UpgradeFunctionStore.key:
                    return <UpgradeCard item={item} selectedButtonHexColor={selectedButtonHexColor} />
                  default:
                    return <RecordCard item={item} selectedButtonHexColor={selectedButtonHexColor} />
                }
              }

              return (
                <View>
                  {showYearHeader && (
                    <Text style={tw`text-sm font-HKGrotesk-Regular bg-[${selectedButtonHexColor}]/5 p-1 text-center w-1/2 mx-auto rounded-tr-xl rounded-tl-xl border-[${selectedButtonHexColor}]/20 border border-b-0`}>
                      {currentYear}
                    </Text>
                  )}
                  {renderCard()}
                </View>
              )
            }}
            estimatedItemSize={10} />
          {showPlusButton &&
            <NewRecordButton
              selectedButtonHexColor={selectedButtonHexColor}
              selectedTabName={selectedTabName}
              carId={CarId}
              lastOdometer={Array.isArray(selectedDataSet) && selectedDataSet.length > 0 && selectedTabName !== TaxFunctionStore.key && 'odometer' in selectedDataSet[0] ? selectedDataSet[0].odometer : undefined}
            />
          }
        </>
      )}
    </View>
  )
}

export default CarDetail