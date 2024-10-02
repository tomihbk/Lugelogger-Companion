import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { FlashList } from '@shopify/flash-list'
import { useServiceRecords } from '~/hooks/api/use-get-servicerecords'
import { RecordBase } from '~/api/records-base.types'
import { useOdometerRecords } from '~/hooks/api/use-get-odometerrecords'
import { GasRecordAdd, OdometerRecord } from '~/api/index-records.types'
import { PlusIcon } from 'lucide-react-native'

const CarDetail = () => {
  const { id: CarTitle } = useLocalSearchParams()
  const { data: ServiceRecords } = useServiceRecords(1)
  const { data: OdometerRecords } = useOdometerRecords(1)

  const ActionButtons = [
    { label: 'Home', color: '#f28900' },
    { label: 'Odometer', color: '#C09F1A' },
    { label: 'Service', color: '#1C06DC' },
    { label: 'Repairs', color: '#00892B' },
    { label: 'Upgrades', color: '#E00004' },
    { label: 'Fuel', color: '#BF0296' },
    { label: 'Taxes', color: '#5e636e' },
    { label: 'Notes', color: '#009476' },
  ]

  const [selectedButton, setSelectedButton] = useState<string>("Repairs")
  const [selectedDataSet, setSelectedDataSet] = useState<RecordBase | OdometerRecord | GasRecordAdd | undefined>(OdometerRecords)
  const [selectedButtonColor, setSelectedButtonColor] = useState<string>(ActionButtons.filter((button) => button.label == selectedButton)[0].color)

  const changeDataSet = (serviceName: string) => {
    switch (serviceName) {
      case "Service":
        setSelectedDataSet(ServiceRecords)
        break;
      case "Odometer":
        setSelectedDataSet(OdometerRecords)
        break;
      default:
        setSelectedDataSet([])
        break;
    }
  }

  const dateHandler = (date: string) => {
    const [MM, DD, YYYY] = date.split('/')
    return new Date(parseInt(YYYY), parseInt(MM), parseInt(DD)).toLocaleDateString('de-DE', { year: 'numeric', month: 'numeric', day: '2-digit' })
  }

  return (
    <View style={tw`flex flex-col p-5 pb-0 w-full h-full dark:bg-slate-900`}>
      <Stack.Screen options={{ title: CarTitle as string, headerShown: false }} />
      <Text style={tw`text-2xl mt-4 font-HKGrotesk-Bold`}>{CarTitle}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={tw`flex flex-row flex-wrap flex-grow-0 p-2 -mx-5 mb-1 md:mx-auto`}>
        {ActionButtons.map((button, index) => (
          <TouchableOpacity key={index} onPress={() => {
            setSelectedButton(button.label)
            setSelectedButtonColor(button.color)
            changeDataSet(button.label)
          }}>
            <Text
              style={tw`p-1 px-4 text-lg font-HKGrotesk-Medium rounded-full mr-2 ${selectedButton === button.label
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
                <Text style={tw`font-HKGrotesk-Medium text-base`}>{dateHandler(item.date)}</Text>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>{item.odometer}</Text>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>${item.cost}</Text>
              </View>
              <Text style={tw`bg-[${selectedButtonColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`}>{item.description}</Text>
              <Text>{item.notes}</Text>
            </View>
          )
        }}
        estimatedItemSize={15}
      />
      <TouchableOpacity style={tw`rounded-full right-5 bottom-4 p-3 bg-[${selectedButtonColor}] ${selectedButton == "Home" ? 'hidden' : 'absolute'}`} onPress={() =>
        router.push({
          pathname: "/new-record/[id]",
          params: { id: CarTitle as string, actionType: selectedButton, themeColor: selectedButtonColor as string}
        })
      }>
        <PlusIcon size={35} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default CarDetail