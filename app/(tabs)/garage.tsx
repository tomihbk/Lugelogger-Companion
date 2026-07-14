import React from "react"
import { Stack } from 'expo-router'
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Pressable } from 'react-native'
import tw from '~/tw.config'
import { useTranslation } from "react-i18next"
import CarShowCase from "~/components/CarShowCase"
import { useGetAllVehicles } from "~/hooks/api"
import { VehicleInfo } from "~/api/index-records.types"
import { useTheme } from "~/hooks/useTheme"


export default function garage() {
  const { t } = useTranslation()
  const { data: vehicleList, isError, error, isLoading, refetch } = useGetAllVehicles()
  const theme = useTheme()

  return (
    <SafeAreaView>
      <Stack.Screen options={{
        headerShadowVisible: false,
        headerShown: true,
        headerStyle: { backgroundColor: `transparent` },
        headerTitle: () => <Text style={[tw`text-2xl font-HKGrotesk-Black`, { color: theme.colors.text.primary }]} numberOfLines={1}>{t("Garage")}</Text>,
        statusBarStyle: 'dark',
        statusBarColor: '#f2f2f2',
        headerTransparent: false,
      }} />
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
            <Pressable onPress={() => refetch()} style={tw`mb-4`}>
              <Text style={[tw`mt-4 p-2 text-white font-HKGrotesk-Medium rounded-full text-base text-center`, { backgroundColor: theme.colors.brand.primary }]}>
                Retry
              </Text>
            </Pressable>
          </View>

          // TODO: Rework the lost connection logic 
        }
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
          <View style={tw`flex flex-row flex-wrap mb-16`}>
            {/* <TouchableOpacity style={tw`flex flex-row w-7/12 text-2xl mt-4 font-bold bg-blue-500 p-2 rounded-xl`} onPress={() => router.push({
          pathname: "/car/NewCarForm"
        })}> // Function not supported by API yet
          <CirclePlus color="white" size={24} />
          <Text style={tw`text-center font-semibold self-center ml-3 text-white`}>{t("Add_New_Vehicle").toUpperCase()}</Text>
        </TouchableOpacity> */}
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
