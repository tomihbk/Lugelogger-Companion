import React from "react"
import { Redirect, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, Pressable } from 'react-native';
import tw from '~/tw.config';
import GroupActionButtons from "~/components/GroupActionButtons";
import NextReminder from "~/components/NextReminder";
import FavoriteCarShowcase from "~/components/FavoriteCarShowcase";

export default function Home() {
  const { t } = useTranslation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <Redirect href="/(tabs)/garage" /> */}
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View style={tw`p-5 py-0 mb-16`}>
        <Text style={tw`text-2xl mt-4 font-HKGrotesk-Black`}>Hi Thomas</Text>
        <Text style={tw`text-sm mb-4 font-HKGrotesk-Regular`}>How&apos;s the car doing ?</Text>

        <FavoriteCarShowcase Name="Porsche 911 Carrera 3.2" Mileage="320125km" PlateNumber="ZH47589" Year="1985" CarPhotoUri="https://www.williamscrawford.co.uk/wp-content/uploads/2023/09/Porsche-911-carrera-3.2-polo-red-for-sale-williams-crawford-40.jpg" />

        <GroupActionButtons />
        <NextReminder DueDate="10/25/2024" DueOdometer="185643KM" Urgency="urgent" Description="Change left tire Hankook or Continental. Make sure to change air filters and padding breaks..." />
      </View>
    </ScrollView>
  );
}