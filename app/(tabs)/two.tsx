import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import tw,{ useDeviceContext, useAppColorScheme } from 'twrnc';


export default function Home() {
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
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
