import React, { useEffect } from "react"
import { Redirect, Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { View, ScrollView } from 'react-native'
import tw from '~/tw.config'
import GroupActionButtons from "~/components/GroupActionButtons"
import FavoriteCarShowcase from "~/components/FavoriteCarShowcase"
import { useGetUserInfo } from "~/hooks/api"
import CapitalizeFirstLetter from "~/utils/StringCapitalizer"
import GlobalStateStore from '~/stores/globalStateStore'
import { useGetVehicle } from "~/hooks/api"
import ServerSettingsStore from "~/stores/serverSettingsStore"
import NextReminderCard from "~/components/Cards/NextReminderCard"
import GreetingHeader from "~/components/GreetingHeader"
import { SafeAreaView } from "react-native-safe-area-context"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import AnimatedSection from "~/components/Animations/AnimatedSection"

export default function Home() {
  const { t } = useTranslation()
  const { favoriteCarId } = GlobalStateStore((state) => state)
  const { data: UserInfo } = useGetUserInfo()
  const { data: vehicleData, isPending } = useGetVehicle(favoriteCarId)
  const { getSettings } = ServerSettingsStore()
  const savedSettings = getSettings()
  const tabBarHeight = useBottomTabBarHeight()


  const vehicleWithoutStats = vehicleData?.[0]?.vehicleData ?? {}
  const vehicleWithStats = vehicleData?.[0] ?? {}

  useEffect(() => {
    // console.log("Vehicle Data:", vehicleWithoutStats)
    // console.log("vehicleWithStats:", vehicleWithStats)
  }, [vehicleWithoutStats, vehicleWithStats])

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarHeight + 30 }}>
        {/* <Redirect href="/(tabs)/garage" /> */}
        <Stack.Screen options={{ title: 'Home', headerShown: false }} />
        <View style={tw`p-5 py-0`}>
          <AnimatedSection>
            <GreetingHeader brand={vehicleWithoutStats.make} userName={CapitalizeFirstLetter(UserInfo?.username as string)} />
          </AnimatedSection>

          <AnimatedSection delay={60}>
            {!isPending && <FavoriteCarShowcase Name={`${vehicleWithoutStats.make} ${vehicleWithoutStats.model}`} PlateNumber={vehicleWithoutStats.licensePlate} Year={vehicleWithoutStats.year} CarPhotoUri={`${savedSettings?.serverURL}${vehicleWithoutStats.imageLocation}`} Mileage={vehicleWithStats.lastReportedOdometer} CarID={favoriteCarId} />}
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <GroupActionButtons />
          </AnimatedSection>

          <AnimatedSection delay={180}>
            <View style={tw`-mt-3`}>
              <NextReminderCard carId={favoriteCarId} />
            </View>
          </AnimatedSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}