import React from "react"
import { Stack, Tabs } from "expo-router"
import { Home, Warehouse, Settings } from 'lucide-react-native'
import { View } from 'react-native'
import "../../i18n/i18n.config"
import useThemeStore from "~/stores/themeStore"
import tw from "~/tw.config"
import { useDeviceContext } from "twrnc"
import { useTheme } from "~/hooks/useTheme"

export default function TabLayout() {
  const globalStoreThemeColor = useThemeStore((color) => color.colorScheme)
  const { colorScheme: colorSchemeStore } = useThemeStore()
  const theme = useTheme()

  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: globalStoreThemeColor,
  })

  return (
    <>
      <Stack.Screen options={{
        statusBarStyle: colorSchemeStore == 'light' ? 'dark' : 'light',
        statusBarColor: colorSchemeStore == 'light' ? '#fafafa' : '#121212',
      }} />
      <Tabs
        sceneContainerStyle={{ backgroundColor: theme.colors.background.default }} // Body background color colorSchemeStore == 'light' ? '#fafafa' : '#121212'
        screenOptions={{
          // tabBarActiveTintColor: '#000',
          // tabBarInactiveTintColor: '#fff',
          headerShown: false,
          tabBarBackground: () =>
            <View
              style={[tw`h-full mx-4 rounded-tr-2xl rounded-tl-2xl shadow-2xl shadow-blue-700/80`,
              { shadowOffset: { width: 0, height: -5 }, elevation: colorSchemeStore === 'light' ? 18 : 0, backgroundColor: theme.colors.surface.card }]} />,
          tabBarStyle: {
            position: 'absolute',
            shadowColor: 'transparent',
            height: 62,
            borderColor: 'transparent',
            borderWidth: 0,
          },
          tabBarLabelStyle: {
            marginBottom: 7,
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