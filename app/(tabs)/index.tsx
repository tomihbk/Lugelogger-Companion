import React from "react"
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import tw, { useAppColorScheme } from 'twrnc';

export default function Home() {
  const [colorScheme,toggleColorScheme,setColorScheme] = useAppColorScheme(tw);
  const { t, i18n } = useTranslation();
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>toggleColorScheme()}>
          <Text style={tw`text-lg text-red-500 p-4 bg-red-100 dark:bg-red-950 rounded-2xl`}>{t('Settings')}

          </Text>
        </TouchableOpacity>
        <Button title="Change Langauge" onPress={changeLanguage} />
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
