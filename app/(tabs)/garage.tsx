import React from "react"
import { Stack } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import tw from '~/tw.config';
import { useTranslation } from "react-i18next";
import CarShowCase from "~/components/CarShowCase";

export default function garage() {
  const { t } = useTranslation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`flex flex-col p-5`}>
      <Stack.Screen options={{ title: 'Garage', headerShown: false }} />
      <View style={tw`flex flex-row flex-wrap`}>
        <Text style={tw`w-5/12 text-2xl mt-4 mb-5 dark:text-white font-HKGrotesk-Black`}>{t("Garage")}</Text>
        {/* <TouchableOpacity style={tw`flex flex-row w-7/12 text-2xl mt-4 font-bold bg-blue-500 p-2 rounded-xl`} onPress={() => router.push({
          pathname: "/car/NewCarForm"
        })}> // Function not supported by API yet
          <CirclePlus color="white" size={24} />
          <Text style={tw`text-center font-semibold self-center ml-3 text-white`}>{t("Add_New_Vehicle").toUpperCase()}</Text>
        </TouchableOpacity> */}
        <CarShowCase Name="Porsche 911 Carrera 3.2" Mileage="320125km" PlateNumber="ZH47589" Year="1985" CarPhotoUri="https://www.williamscrawford.co.uk/wp-content/uploads/2023/09/Porsche-911-carrera-3.2-polo-red-for-sale-williams-crawford-40.jpg" />
        <CarShowCase Name="Mazda 6" Mileage="15005km" PlateNumber="FR4754" Year="2019" CarPhotoUri="https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/story/hero_image/Mazda6%20Atenza%20sedan.jpg" />
        <CarShowCase Name="Hyundai N Vision 74" Mileage="320125km" PlateNumber="GE11" Year="2077" CarPhotoUri="https://www.topgear.com/sites/default/files/2022/09/1%20Hyundai%20N%20Vision%2074.jpg" />
      </View>
    </ScrollView>
  );
}
