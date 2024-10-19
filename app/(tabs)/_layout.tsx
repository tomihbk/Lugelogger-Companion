import React from "react"
import { Tabs } from "expo-router"
import { Home, Warehouse, Settings } from 'lucide-react-native'
import "../../i18n/i18n.config"
import { StatusBar } from "expo-status-bar"
import useThemeStore from "~/stores/themeStore"
import tw from "~/tw.config"
import { useDeviceContext } from "twrnc"

export default function TabLayout() {
  const globalStoreThemeColor = useThemeStore((color)=> color.colorScheme)

  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: globalStoreThemeColor,
  });

  const { colorScheme: colorSchemeStore } = useThemeStore()

  return (
    <>
      <StatusBar style={colorSchemeStore == 'light' ? 'dark' : 'light'} />
      <Tabs
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
      >
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
  );
}