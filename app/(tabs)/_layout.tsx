import React from "react"
import { Tabs } from "expo-router";
import tw from "twrnc";

import "../../i18n/i18n.config";

import { Home, Warehouse, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      key={tw.memoBuster}
      screenOptions={{
        headerShadowVisible: false,
        tabBarStyle: {
          height: 58,
          
          backgroundColor: '#fafafa' // Bottom bar color
        },
        tabBarLabelStyle: {
          marginBottom: 7,
        },
        headerStyle: { backgroundColor: '#fafafa' } // Header background color
      }}
      sceneContainerStyle={{ backgroundColor: '#fafafa' }} // Body background color
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hi Thomas",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
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