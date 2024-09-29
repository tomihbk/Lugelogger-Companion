import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { FlashList } from '@shopify/flash-list'
import { useServiceRecords } from '~/features/api/use-get-servicerecords'
import { RecordBase } from '~/api/records-base.types'

const CarDetail = () => {
  const { id } = useLocalSearchParams()
  const { data: ServiceRecords } = useServiceRecords(1)
  const { data: ServiceRecords_2 } = useServiceRecords(2)

  const [selectedButton, setSelectedButton] = useState<string>("Repairs")
  const [selectedDataSet, setSelectedDataSet] = useState<RecordBase | undefined>(ServiceRecords)
  const [selectedButtonColor, setSelectedButtonColor] = useState<string>("#00892B")

  const ActionButtons = [
    { label: 'Repairs', color: '#00892B' },
    { label: 'Service', color: '#1C06DC' },
    { label: 'Fuel', color: '#BF0296' },
    { label: 'Upgrades', color: '#E00004' },
    { label: 'Notes', color: '#009476' },
    { label: 'Taxes', color: '#C09F1A' },
  ]

  const chageDataSet = (serviceName: string) => {
    switch (serviceName) {
      case "Repairs":
        setSelectedDataSet(ServiceRecords)
        break;
      case "Service":
        setSelectedDataSet(ServiceRecords_2)
        break;
      default:
        setSelectedDataSet([])
        break;
    }
  }

  return (
    <View style={tw`flex flex-col p-5 w-full h-full`}>
      <Stack.Screen options={{ title: id as string, headerShown: false }} />
      <Text style={tw`text-2xl mt-4 font-HKGrotesk-Bold`}>{id}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={tw`flex flex-row flex-wrap flex-grow-0 p-2 -mx-5 mb-2 md:mx-auto`}>
        {ActionButtons.map((button, index) => (
          <TouchableOpacity key={index} onPress={() => {
            setSelectedButton(button.label)
            chageDataSet(button.label)
            setSelectedButtonColor(button.color)
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
                <Text style={tw`font-HKGrotesk-Medium text-base`}>{item.date}</Text>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>{item.odometer}</Text>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>${item.cost}</Text>
              </View>
              <Text style={tw`bg-[${selectedButtonColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`}>{item.description}</Text>
              <Text>{item.notes}</Text>
            </View>
          )
        }}
        estimatedItemSize={10}
      />
    </View>
  )
}

export default CarDetail