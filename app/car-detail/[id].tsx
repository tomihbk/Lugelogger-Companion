import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { FlashList } from '@shopify/flash-list'
import { useServiceRecords } from '~/hooks/api/use-get-servicerecords'
import { RecordBase } from '~/api/records-base.types'
import { useOdometerRecords } from '~/hooks/api/use-get-odometerrecords'
import { GasRecordAdd, OdometerRecord } from '~/api/index-records.types'
import { PlusIcon } from 'lucide-react-native'
import { OdometerFunctionStore } from '~/stores/RecordButtons'
import GlobalStateStore from '~/stores/globalStateStore'

const CarDetail = () => {
  const { id: CarId } = useLocalSearchParams()
  const { data: ServiceRecords } = useServiceRecords(parseInt(CarId.toString()))
  const { data: OdometerRecords } = useOdometerRecords(parseInt(CarId.toString()))

  const OdometerButton = OdometerFunctionStore((state) => state)
  const { setSelectedTabName, isReturnFromForms, setIsReturnFromForms, selectedTabName } = GlobalStateStore((state) => state)

  const ActionButtons = [
    { key: 'home', label: 'Home', color: '#f28900' },
    { key: OdometerButton.key, label: 'Odometer', color: OdometerButton.buttonColor },
    { key: 'service', label: 'Service', color: '#1C06DC' },
    { key: 'repairs', label: 'Repairs', color: '#00892B' },
    { key: 'upgrades', label: 'Upgrades', color: '#E00004' },
    { key: 'fuel', label: 'Fuel', color: '#BF0296' },
    { key: 'taxes', label: 'Taxes', color: '#5e636e' },
    { key: 'notes', label: 'Notes', color: '#009476' },
  ]

  const [selectedDataSet, setSelectedDataSet] = useState<RecordBase | OdometerRecord | GasRecordAdd | undefined>(undefined)
  const [selectedButtonHexColor, setSelectedButtonHexColor] = useState<string>(ActionButtons.filter((button) => button.key == selectedTabName)[0].color)

  const changeDataSet = (serviceName: string) => {
    let dataSource;
    switch (serviceName) {
      case "service":
        dataSource = ServiceRecords
        break
      case "odometer":
        dataSource = OdometerRecords
        break
      default:
        dataSource = []
        break
    }

    const reversedData = dataSource?.slice().reverse()
    setSelectedDataSet(reversedData)
    // The received date doesn't contain min, sec, millisec thus sorting by date unusefull because you cannot compare two same dates
    //setSelectedDataSet(sortDataByDate(dataSource, DATEORDER.DES))
  }

  // enum DATEORDER {
  //   ASC, DES
  // }

  // const sortDataByDate = (dataSource, orderByASCDES: DATEORDER) => {
  //   return dataSource?.sort((a, b) => {
  //     const dateA = dateHandler(a.date, true)
  //     const dateB = dateHandler(b.date, true)

  //     if (!dateA || !dateB) {
  //       console.warn("Unable to sort due to invalid date:", a.date, b.date);
  //       return 0 // Keep original order if dates are invalid
  //     }
  //     switch (orderByASCDES) {
  //       case DATEORDER.ASC:
  //         return dateA - dateB
  //       case DATEORDER.DES:
  //         return dateB - dateA
  //     }
  //   })
  // }

  useEffect(() => {
    console.log("Return from forsm : " + isReturnFromForms)
    if (isReturnFromForms) {
      changeDataSet(selectedTabName)
    } else {
      setSelectedTabName('home')
      changeDataSet('home')
    }
  }, [ServiceRecords]) // TODO Add other records services 

  useFocusEffect(
    useCallback(() => {
      if (isReturnFromForms) {
        changeDataSet(selectedTabName)
      } else {
        setSelectedTabName('home')
        changeDataSet('home')
      }
      return () => {
        setIsReturnFromForms(false)
      }
    }, [isReturnFromForms])
  )

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

  return (
    <View style={tw`flex flex-col p-5 pb-0 w-full h-full dark:bg-slate-900`}>
      <Stack.Screen options={{ title: CarId as string, headerShown: false }} />
      <Text style={tw`text-2xl mt-4 font-HKGrotesk-Bold`}>{CarId}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={tw`flex flex-row flex-wrap flex-grow-0 p-2 -mx-5 mb-1 md:mx-auto`}>
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
      <FlashList
        showsVerticalScrollIndicator={false}
        data={selectedDataSet}
        renderItem={({ item }) => {
          return (
            <View style={tw`p-4 pb-0 mb-2 bg-white dark:bg-green-950 rounded-3xl`}>
              <View style={tw`flex flex-row flex-wrap justify-between`}>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>{dateHandler(item.date).toString()}</Text>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>${item.cost}</Text>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>{item.odometer}km</Text>
              </View>
              <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`}>{item.description && item.description.substring(0, 58)}{item.description.length > 58 && "..."}</Text>
              <Text>{item.notes}</Text>
            </View>
          )
        }}
        estimatedItemSize={10}
      />
      <TouchableOpacity style={tw`rounded-full right-5 bottom-4 p-3 bg-[${selectedButtonHexColor}] ${selectedTabName == "home" ? 'hidden' : 'absolute'}`} onPress={() => {
        setIsReturnFromForms(false)
        router.push({
          pathname: "/new-record/[id]",
          params: { id: CarId as string, actionType: selectedTabName }
        })
      }
      }>
        <PlusIcon size={35} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default CarDetail