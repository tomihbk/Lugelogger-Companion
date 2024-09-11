import React from "react"
import { View, Text, Switch } from "react-native"
import tw, { useAppColorScheme } from "twrnc";

const Settings = () => {

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  return (
    <View>
      <Text style={tw`text-lg text-red-500 p-4 bg-red-100 dark:bg-red-950 rounded-2xl`}>Settings page</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={colorScheme ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleColorScheme}
        value={colorScheme === 'dark'}
      />
    </View>
  )
}

export default Settings