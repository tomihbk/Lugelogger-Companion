import React from "react"
import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import tw from 'twrnc';


export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Garage' }} />
      <View style={styles.container}>
      <Text>Tab two</Text>
      <Text style={tw`text-black dark:text-white`}>Switch Color Scheme</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
