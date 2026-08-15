import React from "react"
import { View, Text, ScrollView, ActivityIndicator} from 'react-native'
import tw from '~/tw.config'
import { useTranslation } from "react-i18next"
import CarShowCase from "~/components/CarShowCase"
import { useGetAllVehicles } from "~/hooks/api"
import { VehicleInfo } from "~/api/index-records.types"
import { useTheme } from "~/hooks/useTheme"
import { SafeAreaView } from "react-native-safe-area-context"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import AnimatedPressable from "~/components/Animations/AnimatedPressable"


export default function garage() {
  const { t } = useTranslation()
  const { data: vehicleList, isError, error, isLoading, refetch } = useGetAllVehicles()
  const theme = useTheme()
  const tabBarHeight = useBottomTabBarHeight()

  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <View style={tw`px-5 mb-5`}>
        <Text style={[tw`text-2xl font-HKGrotesk-Black`, { color: theme.colors.text.primary }]} numberOfLines={1}>{t("Garage")}</Text>
      </View>
      <View style={tw`p-5 py-0`}>
        {isLoading && <View style={tw`flex flex-col items-center justify-center`}>
          <Text style={[tw`text-lg font-HKGrotesk-Medium`, { color: theme.colors.text.primary }]}>Fetching data...</Text>
          <ActivityIndicator size="large" color={theme.colors.brand.primary} />
        </View>}

        {isError &&
          <View style={tw`h-full w-full justify-center`}>
            <View style={[tw`border p-4 rounded-lg mb-4`, { backgroundColor: theme.colors.status.danger + "40", borderColor: theme.colors.status.danger }]}>
              <Text style={[tw`font-HKGrotesk-SemiBold`, { color: theme.colors.text.primary }]}>API Error : {error.message}</Text>
              <Text style={[tw`font-HKGrotesk-Regular`, { color: theme.colors.text.primary }]}>Make sure the server is running and server settings have been correctly configured</Text>
            </View>
            <AnimatedPressable onPress={() => refetch()} style={tw`mb-4`}>
              <Text style={[tw`mt-4 p-2 text-white font-HKGrotesk-Medium rounded-full text-base text-center`, { backgroundColor: theme.colors.brand.primary }]}>
                Retry
              </Text>
             </AnimatedPressable>
          </View>

          // TODO: Rework the lost connection logic 
        }
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarHeight + 30 }}>
          <View style={tw`flex flex-row flex-wrap mb-16`}>
            {/* <AnimatedPressable style={tw`flex flex-row w-7/12 text-2xl mt-4 font-bold bg-blue-500 p-2 rounded-xl`} onPress={() => router.push({
          pathname: "/car/NewCarForm"
        })}> // Function not supported by API yet
          <CirclePlus color="white" size={24} />
          <Text style={tw`text-center font-semibold self-center ml-3 text-white`}>{t("Add_New_Vehicle").toUpperCase()}</Text>
        </AnimatedPressable> */}
            {!isError && vehicleList?.map((vehicle: VehicleInfo, index: number) => (
              <CarShowCase key={index} Name={`${vehicle.make} ${vehicle.model}`} PlateNumber={vehicle.licensePlate} Year={vehicle.year} CarPhotoUri={`${process.env.EXPO_PUBLIC_API_URL}${vehicle.imageLocation}`} carId={vehicle.id} />

              // TODO: Don't forget to modify the process.env in prod for carphotouri and repace the image fetching with other component
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
