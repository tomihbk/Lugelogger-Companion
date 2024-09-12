import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcon';
import tw, { useDeviceContext, useAppColorScheme } from 'twrnc';

export default function TabLayout() {
  return (
    <Tabs
      key={tw.memoBuster}
      screenOptions={{
        tabBarActiveTintColor: 'black',
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
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="truck" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
