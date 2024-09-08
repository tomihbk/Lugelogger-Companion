import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import tw from 'twrnc';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <Text style={tw`text-lg text-red-500 p-4 bg-red-100 rounded-2xl`}>Tab One</Text>
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
