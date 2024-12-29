import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { FlashList } from '@shopify/flash-list'
import { RecordBase } from '~/api/records-base.types'
import { useOdometerRecords, useServiceRecords, useRepairRecords, useUpgradeRecords } from '~/hooks/api/index'
import { GasRecordAdd, OdometerRecord } from '~/api/index-records.types'
import { PlusIcon } from 'lucide-react-native'
import { OdometerFunctionStore, ServiceFunctionStore, RepairFunctionStore, UpgradeFunctionStore } from '~/stores/RecordButtons'
import GlobalStateStore from '~/stores/globalStateStore'
import StatsComponent from '~/components/StatsComponent'

const CarDetail = () => {
  const { id: CarId, actionType }: { id: string, actionType: string } = useLocalSearchParams()

  const carId = parseInt(CarId.toString());
  const { data: ServiceRecords, isLoading: isServiceRecordsFetching } = useServiceRecords(carId)
  const { data: OdometerRecords, isLoading: isOdometerRecordsFetching } = useOdometerRecords(carId)
  const { data: RepairRecords, isLoading: isRepairRecordsFetching } = useRepairRecords(carId)
  const { data: UpgradeRecords, isLoading: isUpgradeRecordsFetching } = useUpgradeRecords(carId)

  const { setSelectedTabName, selectedTabName, preferredCurrencySymbol, preferredDistanceMeasurement } = GlobalStateStore((state) => state)

  const ActionButtons = [
    { key: 'home', label: 'Home', color: '#f28900' },
    { key: OdometerFunctionStore.key, label: 'Odometer', color: OdometerFunctionStore.buttonColor },
    { key: ServiceFunctionStore.key, label: 'Service', color: ServiceFunctionStore.buttonColor },
    { key: RepairFunctionStore.key, label: 'Repairs', color: RepairFunctionStore.buttonColor },
    { key: UpgradeFunctionStore.key, label: 'Upgrades', color: UpgradeFunctionStore.buttonColor },
    { key: 'fuel', label: 'Fuel', color: '#BF0296' },
    { key: 'taxes', label: 'Taxes', color: '#5e636e' },
    { key: 'notes', label: 'Notes', color: '#009476' },
  ]

  const [selectedDataSet, setSelectedDataSet] = useState<RecordBase | OdometerRecord | GasRecordAdd | undefined>([])
  const [selectedButtonHexColor, setSelectedButtonHexColor] = useState<string>(ActionButtons.filter((button) => button.key == actionType)[0].color)
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const [totalDistance, setTotalDistance] = useState<number>(0)
  const averageExpense = (Math.round((totalExpense / (selectedDataSet?.length || 1)) * 10) / 10)
  let didInit = false
  const [showPlusButton, setShowPlusButton] = useState<boolean>(true)

  const changeDataSet = async (serviceName: string) => {
    try {
      let dataSource: RecordBase | OdometerRecord | GasRecordAdd | undefined;

      switch (serviceName) {
        case "service":
          dataSource = ServiceRecords
          break
        case "odometer":
          dataSource = OdometerRecords
          break
        case "repair":
          dataSource = RepairRecords
          break
        case "upgrade":
          dataSource = UpgradeRecords
          break
        default:
          dataSource = []
          break
      }

      if (Array.isArray(dataSource)) {
        const orderedDataByLatestDate = dataSource.slice().reverse()
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
    if (Array.isArray(selectedDataSet) && selectedDataSet.every(item => 'cost' in item)) {
      calculateTotalExpense(selectedDataSet as RecordBase)
    }
    if (Array.isArray(selectedDataSet) && selectedDataSet.every(item => 'odometer' in item)) {
      calculateTotalDistance(selectedDataSet as unknown as OdometerRecord)
    }
  }, [selectedDataSet])

  useEffect(() => {
    if (OdometerRecords || ServiceRecords || RepairRecords || UpgradeRecords) {
      changeDataSet(selectedTabName)
      setSelectedTabName(selectedTabName)
    }
    return () => {
      setSelectedTabName(actionType)
    }
  }, [OdometerRecords, ServiceRecords, RepairRecords, UpgradeRecords]) // TODO Add other records services with time

  const calculateTotalExpense = (recordDataObject: RecordBase) => {
    let totalCost = 0
    for (const record of recordDataObject) totalCost += parseFloat(record.cost)
    setTotalExpense(totalCost)
  }

  const calculateTotalDistance = (recordDataObject: OdometerRecord) => {
    if (recordDataObject.length === 0) return 0;
    let totolOdometer = 0
    let initialOdometerTotal = 0

    for (const record of recordDataObject) totolOdometer += parseFloat(record.odometer)
    for (const record of recordDataObject) initialOdometerTotal += parseFloat(record.initialOdometer)
    setTotalDistance(totolOdometer - initialOdometerTotal)
  }

  const dateHandler = (date: string, getISODate: boolean = false): Date | string => {
    if (!getISODate) {
      const [MM, DD, YYYY] = date.split('/')
      // Months start by 0 and not 1, don't ask me why
      return (new Date(parseInt(YYYY), parseInt(MM) - 1, parseInt(DD)).toLocaleDateString('de-DE', { year: '2-digit', month: '2-digit', day: '2-digit' }))
    } else {
      const [MM, DD, YYYY] = date.split('/').map(part => parseInt(part, 10))
      return new Date(YYYY, MM - 1, DD)
    }
  }

  const StatsComponentHandler = (actiontype: string) => {
    switch (actiontype) {
      case 'odometer':
        return (
          <View style={tw`flex flex-row flex-wrap justify-between gap-3 mb-3`}>
            <StatsComponent themeColor={selectedButtonHexColor} cost={totalDistance} symbol={preferredDistanceMeasurement} description={`Total\nDriven Distance`} />
            <StatsComponent themeColor={selectedButtonHexColor} cost={(selectedDataSet?.length || 0)} symbol={"±"} description={`Amount of\n${selectedTabName[0].toUpperCase()}${selectedTabName.substring(1, 99)} Records`} />
          </View>)
      case 'service':
        return (
          <View style={tw`flex flex-row flex-wrap justify-between gap-3 mb-3`}>
            <StatsComponent themeColor={selectedButtonHexColor} cost={totalExpense} symbol={preferredCurrencySymbol} description={`Total\n${selectedTabName[0].toUpperCase()}${selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={selectedButtonHexColor} cost={47} symbol={"📆"} description={`Days Since\nLast Repair`} />
            <StatsComponent themeColor={selectedButtonHexColor} cost={averageExpense} symbol={preferredCurrencySymbol} description={`Average\n${selectedTabName[0].toUpperCase()}${selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={selectedButtonHexColor} cost={(selectedDataSet?.length || 0)} symbol={"±"} description={`Amount of\n${selectedTabName[0].toUpperCase()}${selectedTabName.substring(1, 99)} Records`} />
          </View>
        )
      case 'repair':
        return (
          <View style={tw`flex flex-row flex-wrap justify-between gap-3 mb-3`}>
            <StatsComponent themeColor={selectedButtonHexColor} cost={totalExpense} symbol={preferredCurrencySymbol} description={`Total\n${selectedTabName[0].toUpperCase()}${selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={selectedButtonHexColor} cost={47} symbol={"📆"} description={`Days Since\nLast Repair`} />
            <StatsComponent themeColor={selectedButtonHexColor} cost={averageExpense} symbol={preferredCurrencySymbol} description={`Average\n${selectedTabName[0].toUpperCase()}${selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={selectedButtonHexColor} cost={(selectedDataSet?.length || 0)} symbol={"±"} description={`Amount of\n${selectedTabName[0].toUpperCase()}${selectedTabName.substring(1, 99)} Records`} />
          </View>
        )
      case 'upgrade':
        return (
          <View style={tw`flex flex-row flex-wrap justify-between gap-3 mb-3`}>
            <StatsComponent themeColor={selectedButtonHexColor} cost={totalExpense} symbol={preferredCurrencySymbol} description={`Total\n${selectedTabName[0].toUpperCase()}${selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={selectedButtonHexColor} cost={47} symbol={"📆"} description={`Days Since\nLast Upgrade`} />
            <StatsComponent themeColor={selectedButtonHexColor} cost={averageExpense} symbol={preferredCurrencySymbol} description={`Average\n${selectedTabName[0].toUpperCase()}${selectedTabName.substring(1, 99)} Expenses`} />
            <StatsComponent themeColor={selectedButtonHexColor} cost={(selectedDataSet?.length || 0)} symbol={"±"} description={`Amount of\n${selectedTabName[0].toUpperCase()}${selectedTabName.substring(1, 99)} Records`} />
          </View>
        )
      case 'fuel':
        return (<><Text>Fuel Stats component</Text></>)
      case 'tax':
        return (<><Text>Taxes Stats component</Text></>)
      case 'notes':
        return (<><Text>Notes Stats component</Text></>)
    }
  }

  return (
    <View style={tw`flex flex-col p-5 pb-0 w-full h-full dark:bg-slate-900`}>
      <Stack.Screen options={{ title: CarId as string, headerShown: false }} />
      <Text style={tw`text-2xl mt-4 font-HKGrotesk-Bold`}>{CarId}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={tw`flex flex-row flex-wrap flex-grow-0 p-2 -mx-5 mb-1`}>
        {ActionButtons.map((button) => (
          <TouchableOpacity key={button.key} onPress={() => {
            setSelectedTabName(button.key)
            setSelectedButtonHexColor(button.color)
            changeDataSet(button.key)
          }}>
            <Text
              style={tw`p-1 px-4 text-lg font-HKGrotesk-Medium rounded-full mr-2 ${selectedTabName === button.key
                ? `bg-[${button.color}] text-white`
                : `bg-[${button.color}]/10 text-[${button.color}]`
                }`}>
              {button.label}
            </Text>
          </TouchableOpacity>

        ))}
      </ScrollView>

      {(isOdometerRecordsFetching || isServiceRecordsFetching || isRepairRecordsFetching) ? (
        <>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color={selectedButtonHexColor} />
        </>
      ) : (
        selectedTabName != 'home' && selectedTabName != 'notes' &&
        <>
          <FlashList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={StatsComponentHandler(selectedTabName)}
            data={selectedDataSet}
            onScrollEndDrag={() => setShowPlusButton(true)}
            onScrollBeginDrag={() => setShowPlusButton(false)}
            renderItem={({ item }) => {
              return (
                <View style={tw`p-4 pb-0 mb-2 bg-white dark:bg-green-950 rounded-3xl`}>
                  <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{dateHandler(item.date).toString()}</Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>${item?.cost}</Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{item.odometer}{preferredDistanceMeasurement}</Text>
                  </View>
                  <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`}>{item.description && item.description.substring(0, 58)}{item.description?.length > 58 && "..."}</Text>
                  <Text>{item.notes}</Text>
                </View>
              )
            }}
            estimatedItemSize={10} />
          {showPlusButton &&
            <TouchableOpacity style={tw`rounded-full right-5 bottom-4 p-3 bg-[${selectedButtonHexColor}] ${selectedTabName == "home" ? 'hidden' : 'absolute'}`} onPress={() => {
              router.push({
                pathname: "/new-record/[id]",
                params: { id: CarId, actionType: selectedTabName }
              })
            }}>
              <PlusIcon size={35} color="white" />
            </TouchableOpacity>
          }
        </>
      )}
    </View>
  )
}

export default CarDetail