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
      <Redirect href="/(tabs)/garage" />
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View style={tw`flex p-5`}>
        <Text style={tw`text-2xl mt-4 font-HKGrotesk-Black`}>Hi Thomas</Text>
        <Text style={tw`text-sm mb-4 font-HKGrotesk-Regular`}>How&apos;s the car doing ?</Text>
        <View style={tw`rounded-full overflow-hidden mb-4`}>
          <Pressable android_ripple={{ color: '#f87171', borderless: false, foreground: true }}
            style={tw`rounded-full`} onPress={() => {
              try {
                console.log("trying to add new data...")
              } catch (Err) { console.error(Err) }
            }}>
            <Text style={tw`p-4 bg-red-200 font-HKGrotesk-Medium rounded-full text-center`}>
              Add New Service Record
            </Text>
          </Pressable>
        </View>

        <FavoriteCarShowcase Name="Porsche 911 Carrera 3.2" Mileage="320125km" PlateNumber="ZH47589" Year="1985" CarPhotoUri="https://www.williamscrawford.co.uk/wp-content/uploads/2023/09/Porsche-911-carrera-3.2-polo-red-for-sale-williams-crawford-40.jpg" />

        <GroupActionButtons />
        <NextReminder DueDate="10/25/2024" DueOdometer="185643KM" Urgency="urgent" Description="Change left tire Hankook or Continental. Make sure to change air filters and padding breaks..." />
      </View>
    </ScrollView>
  );
}