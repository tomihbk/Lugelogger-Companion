import React from "react"
import { Stack } from 'expo-router'
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Pressable } from 'react-native'
import tw from '~/tw.config'
import { useTranslation } from "react-i18next"
import CarShowCase from "~/components/CarShowCase"
import { useGetAllVehicles } from "~/hooks/api"
import { VehicleInfo } from "~/api/index-records.types"

export default function garage() {
  const { t } = useTranslation()
  const { data: vehicleList, isError, error, isLoading, refetch } = useGetAllVehicles()

  return (
    <SafeAreaView>
      <Stack.Screen options={{
        headerShadowVisible: false,
        headerShown: true,
        headerStyle: { backgroundColor: `transparent` },
        headerTitle: () => <Text style={tw`text-2xl dark:text-white font-HKGrotesk-Black`} numberOfLines={1}>{t("Garage")}</Text>,
        statusBarStyle: 'dark',
        statusBarColor: '#f2f2f2',
        headerTransparent: false,
      }} />
      <View style={tw`p-5 py-0`}>
        {isLoading && <View style={tw`flex flex-col items-center justify-center`}>
          <Text style={tw`text-lg font-HKGrotesk-Medium`}>Fetching data...</Text>
          <ActivityIndicator size="large" color={"#3b82f6"} />
        </View>}
      
        {isError &&
          <View style={tw`h-full w-full justify-center`}>
            <Text>API Error {error.message}</Text>
            <Text>Make sure the server is running and server setting has been correctly setup</Text>
            <Pressable onPress={() => refetch()} style={tw`mb-4`}>
              <Text style={tw`mt-4 p-2 bg-blue-500 text-white font-HKGrotesk-Medium rounded-full text-base text-center`}>
                Retry
              </Text>
            </Pressable>
          </View>
          
          // TODO: Rework the lost connection logic 
          }
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
          <View style={tw`flex flex-row flex-wrap`}>
            {/* <TouchableOpacity style={tw`flex flex-row w-7/12 text-2xl mt-4 font-bold bg-blue-500 p-2 rounded-xl`} onPress={() => router.push({
          pathname: "/car/NewCarForm"
        })}> // Function not supported by API yet
          <CirclePlus color="white" size={24} />
          <Text style={tw`text-center font-semibold self-center ml-3 text-white`}>{t("Add_New_Vehicle").toUpperCase()}</Text>
        </TouchableOpacity> */}
            {!isError && vehicleList?.map((vehicle: VehicleInfo, index: number) => (
              <CarShowCase key={index} Name={`${vehicle.make} ${vehicle.model}`} PlateNumber={vehicle.licensePlate} Year={vehicle.year} CarPhotoUri={`${process.env.EXPO_PUBLIC_API_URL}${vehicle.imageLocation}`} carId={vehicle.id} />

              // TODO: Don't forget to modify the process.env in prod for carphotouri
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
