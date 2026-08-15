import React from "react"
import { Redirect, Stack, Tabs } from "expo-router"
import { Home, Warehouse, Settings } from 'lucide-react-native'
import { View } from 'react-native'
import "../../i18n/i18n.config"
import useThemeStore from "~/stores/themeStore"
import tw from "~/tw.config"
import { useDeviceContext } from "twrnc"
import { useTheme } from "~/hooks/useTheme"
import useOnboardingStore, { CURRENT_SETUP_VERSION } from "~/stores/onboardingStore"

export default function TabLayout() {
  const globalStoreThemeColor = useThemeStore((color) => color.colorScheme)
  const { colorScheme: colorSchemeStore } = useThemeStore()
  const theme = useTheme()

  const { setupVersion, steps } = useOnboardingStore()
  const setupComplete = setupVersion >= CURRENT_SETUP_VERSION

  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: globalStoreThemeColor,
  })

  if (!setupComplete) {
    if (!steps.index) return <Redirect href="/(onboarding)" />
    if (!steps.server) return <Redirect href="/(onboarding)/server" />
    if (!steps["favorite-vehicle"]) return <Redirect href="/(onboarding)/favorite-vehicle" />
    if (!steps.preferences) return <Redirect href="/(onboarding)/preferences" />

    return <Redirect href="/(onboarding)/finish" />
  }

  return (
    <>
      <Stack.Screen options={{
        statusBarStyle: colorSchemeStore == 'light' ? 'dark' : 'light',
      }} />
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: '#000',
          // tabBarInactiveTintColor: '#fff',
          animation: "shift",
          sceneStyle: { backgroundColor: theme.colors.background.default }, // Body background color colorSchemeStore == 'light' ? '#fafafa' : '#121212'
          headerShown: false,
          tabBarBackground: () =>
            <View
              style={[tw`h-full mx-4 rounded-tr-2xl rounded-tl-2xl shadow-2xl shadow-blue-700/80`,
              { shadowOffset: { width: 0, height: -5 }, elevation: colorSchemeStore === 'light' ? 18 : 0, backgroundColor: theme.colors.surface.card }]} />,
          tabBarStyle: {
            position: 'absolute',
            shadowColor: 'transparent',
            height: 68,
            borderColor: 'transparent',
            borderWidth: 0,
          },
          tabBarLabelStyle: {
            marginBottom: 10,
            fontFamily: "HankenGrotesk-Bold",
            fontSize: 12,
          },
        }}>
        {/* <Tabs
        key={tw.memoBuster}
        screenOptions={{
          headerShadowVisible: false,
          tabBarStyle: {
            height: 58,
            shadowColor: 'white',
            borderTopEndRadius: 16,
            borderTopStartRadius: 16,
            marginRight: 18,
            marginLeft: 18,
            backgroundColor: colorSchemeStore == 'light' ? '#fafafa' : '#0d1117' // Bottom bar color
          },
          tabBarLabelStyle: {
            marginBottom: 7,
          },
          headerStyle: { backgroundColor: colorSchemeStore == 'light' ? '#fafafa' : '#0d1117' } // Header background color
        }}
        sceneContainerStyle={{ backgroundColor: colorSchemeStore == 'light' ? '#fafafa' : '#0d1117' }} // Body background color
      > */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Home color={color} />,
          }} />
        <Tabs.Screen
          name="garage"
          options={{
            title: "Garage",
            tabBarIcon: ({ color }) => <Warehouse color={color} />,
          }} />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <Settings color={color} />,
          }} />
      </Tabs>
    </>
  )
}