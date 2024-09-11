import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import tw, { useAppColorScheme } from 'twrnc';

export default function Home() {
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> toggleColorScheme()}>
          <Text style={tw`text-lg text-red-500 p-4 bg-red-100 dark:bg-red-950 rounded-2xl`}>lilow la rebaile
            
          </Text>
        </TouchableOpacity>
        
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
