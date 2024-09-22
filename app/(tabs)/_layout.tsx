import React from "react"
import { Tabs } from "expo-router";
import tw, { useAppColorScheme, useDeviceContext } from "twrnc";

import "../../i18n/i18n.config";

import { Home, Warehouse, Settings } from 'lucide-react-native';

export default function TabLayout() {
  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: "light", // 'light' | 'dark' | 'device'
  })  
  const [colorScheme] = useAppColorScheme(tw)
  
  return (
    <Tabs
      key={tw.memoBuster}
      screenOptions={{
        headerShadowVisible: false,
        tabBarStyle: {
          height: 58,
          backgroundColor: colorScheme == 'light' ? '#fafafa' : '#0d1117' // Bottom bar color
        },
        tabBarLabelStyle: {
          marginBottom: 7,
        },
        headerStyle: { backgroundColor: colorScheme == 'light' ? '#fafafa' : '#0d1117' } // Header background color
      }}
      sceneContainerStyle={{ backgroundColor: colorScheme == 'light' ? '#fafafa' : '#0d1117' }} // Body background color
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="garage"
        options={{
          title: "Garage",
          tabBarIcon: ({ color }) => <Warehouse color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
}