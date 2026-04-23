import React, { useEffect } from "react"
import { Redirect, Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { View, Text, ScrollView } from 'react-native'
import tw from '~/tw.config'
import GroupActionButtons from "~/components/GroupActionButtons"
import FavoriteCarShowcase from "~/components/FavoriteCarShowcase"
import { useGetUserInfo } from "~/hooks/api"
import CapitalizeFirstLetter from "~/utils/StringCapitalizer"
import GlobalStateStore from '~/stores/globalStateStore'
import { useGetVehicle } from "~/hooks/api"
import { VehicleInfo } from "~/api/index-records.types"
import ServerSettingsStore from "~/stores/serverSettingsStore"
import NextReminderCard from "~/components/Cards/NextReminderCard"


export default function Home() {
  const { t } = useTranslation()
  const { favoriteCarId } = GlobalStateStore((state) => state)
  const { data: UserInfo } = useGetUserInfo()
  const { data: vehicleData, isPending } = useGetVehicle(favoriteCarId)
  const { getSettings } = ServerSettingsStore()
  const savedSettings = getSettings()

  const vehicleWithoutStats = vehicleData?.[0]?.vehicleData ?? {}
  const vehicleWithStats = vehicleData?.[0] ?? {}

  useEffect(() => {
    console.log("Vehicle Data:", vehicleWithoutStats)
  }, [vehicleWithoutStats])

  console.log("Favorite Car ID in Home:", savedSettings)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <Redirect href="/(tabs)/garage" /> */}
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View style={tw`p-5 py-0 mb-16`}>
        <Text style={tw`text-2xl mt-4 font-HKGrotesk-Black`}>Hi {CapitalizeFirstLetter(UserInfo?.username as string)}</Text>
        <Text style={tw`text-sm mb-4 font-HKGrotesk-Regular`}>How&apos;s the car doing ?</Text>


        {!isPending && <FavoriteCarShowcase Name={`${vehicleWithoutStats.make} ${vehicleWithoutStats.model}`} PlateNumber={vehicleWithoutStats.licensePlate} Year={vehicleWithoutStats.year} CarPhotoUri={`${savedSettings?.serverURL}${vehicleWithoutStats.imageLocation}`} Mileage={vehicleWithStats.lastReportedOdometer} />}

        <GroupActionButtons />

        <View style={tw`-mt-3 mb-4`}>
          <NextReminderCard carId={favoriteCarId} />
        </View>
      </View>
    </ScrollView>
  )
}