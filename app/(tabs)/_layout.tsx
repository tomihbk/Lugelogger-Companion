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
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          height: 58,
        },
        tabBarLabelStyle: {
          marginBottom: 7,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
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
