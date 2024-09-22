import { Stack } from "expo-router";
import React, { useState } from "react"
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native"
import tw, { useAppColorScheme } from "twrnc";
import i18n from "~/i18n/i18n.config";
import { Palette, ArrowRight, Languages, BadgeInfo, Scale, Settings2, CircleX } from 'lucide-react-native'

const Settings = () => {
  const { t } = useTranslation()
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw)
  const [modalLanguageVisible, setModalLanguageVisibile] = useState(false);
  const [modalThemeVisible, setModalThemeVisible] = useState(false);
  const [modalUserPrefVisible, setModalUserPrefVisible] = useState(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`p-5`}>
      <Stack.Screen options={{ title: 'Settings', headerShown: false }} />
      <View style={tw`flex flex-col`}>
        <Text style={tw`w-5/12 text-2xl mt-4 font-bold mb-5`}>{t("Settings")}</Text>
        <TouchableOpacity style={tw`flex flex-row flex-wrap bg-white p-4 pr-2 rounded-xl items-center mb-1 dark:bg-slate-800 dark:text-gray-200`}
          onPress={() => setModalThemeVisible(!modalThemeVisible)}>
          <Palette size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-2/12`} />
          <Text style={tw`w-9/12 ml-3 text-lg font-semibold dark:text-gray-200`}>Theme</Text>
          <ArrowRight size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-2/12`} />
          <Modal
            animationType="slide"
            visible={modalThemeVisible}
            hardwareAccelerated={true}
            onRequestClose={() => {
              setModalThemeVisible(!modalThemeVisible)
            }}>
            <View style={tw`flex flex-col flex-1 p-5 dark:bg-slate-800`}>
              <Text style={tw`text-2xl font-bold mb-5 dark:text-white`}>Theme Settings</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  onPress={() => {
                    setColorScheme('light')
                    setModalThemeVisible(!modalThemeVisible)
                  }}
                  style={tw`text-lg w-full font-semibold p-4 rounded-xl mb-1  ${colorScheme == "light" ? "bg-blue-200 border border-blue-400" : "bg-gray-100"} dark:text-gray-200`}>
                  <Text>Light</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setColorScheme('dark')
                    setModalThemeVisible(!modalThemeVisible)
                  }}
                  style={tw`text-lg w-full font-semibold p-4 rounded-xl mb-1  ${colorScheme == "dark" ? "bg-blue-200 border border-blue-400" : "bg-gray-100"} dark:text-gray-200`}>
                  <Text>Dark</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex flex-row flex-wrap bg-white p-4 dark:bg-slate-800 dark:text-gray-200 pr-2 rounded-xl items-center mb-1`}
          onPress={() => setModalLanguageVisibile(!modalLanguageVisible)}>
          <Languages size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-2/12`} />
          <Text style={tw`w-9/12 ml-3 text-lg font-semibold dark:text-gray-200`}>Language</Text>
          <ArrowRight size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-2/12`} />
          <Modal
            animationType="slide"
            style={tw`bg-black`}
            visible={modalLanguageVisible}
            hardwareAccelerated={true}
            onRequestClose={() => {
              setModalLanguageVisibile(!modalLanguageVisible)
            }}>
            <View style={tw`flex flex-col p-5`}>
              <Text style={tw`text-2xl font-bold mb-5`}>Language Settings</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {Object.keys(i18n.services.resourceStore.data)
                  .map((lang) => {
                    return (
                      <TouchableOpacity key={lang}
                        onPress={() => {
                          i18n.changeLanguage(lang)
                          setModalLanguageVisibile(!modalLanguageVisible)
                        }}
                        style={tw`text-lg w-full font-semibold p-4 rounded-xl mb-1  ${i18n.language == lang ? "bg-blue-200 border border-blue-400" : "bg-gray-100"} dark:text-gray-200`}>
                        <Text>{lang}</Text>
                      </TouchableOpacity>
                    )
                  })}
              </ScrollView>
            </View>
          </Modal>
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex flex-row flex-wrap bg-white p-4 dark:bg-slate-800 dark:text-gray-200 pr-2 rounded-xl items-center mb-1`}
          onPress={() => setModalUserPrefVisible(!modalUserPrefVisible)}>
          <Settings2 size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-2/12`} />
          <Text style={tw`w-9/12 ml-3 text-lg font-semibold dark:text-gray-200`}>User Prefrences</Text>
          <ArrowRight size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-2/12`} />

          <Modal
            animationType="slide"
            style={tw`bg-black`}
            visible={modalUserPrefVisible}
            hardwareAccelerated={true}
            onRequestClose={() => {
              setModalUserPrefVisible(!modalUserPrefVisible)
            }}>
            <View style={tw`flex flex-col p-5`}>
              <View style={tw`flex flex-row flex-wrap justify-between items-start`}>
                <Text style={tw`text-2xl font-bold mb-5 w-5/6`}>User Prefrences</Text>
                <CircleX size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-full p-4`}
                  onPress={() => { setModalUserPrefVisible(!modalUserPrefVisible) }} />
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={tw`text-lg w-full font-semibold p-4 rounded-xl mb-1  "bg-blue-200 border border-blue-400" : "bg-gray-100"} dark:text-gray-200`}>
                  <Text>KM/Miles</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`text-lg w-full font-semibold p-4 rounded-xl mb-1  bg-blue-200 border border-blue-400 dark:text-gray-200`}>
                  <Text>Date Format</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        </TouchableOpacity>


        <TouchableOpacity style={tw`flex flex-row flex-wrap bg-white p-4 dark:bg-slate-800 dark:text-gray-200 pr-2 rounded-xl items-center mb-1`}>
          <BadgeInfo size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-2/12`} />
          <Text style={tw`w-9/12 ml-3 text-lg font-semibold dark:text-gray-200`}>About</Text>
          <ArrowRight size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-2/12`} />
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex flex-row flex-wrap bg-white p-4 dark:bg-slate-800 dark:text-gray-200 pr-2 rounded-xl items-center mb-1`}>
          <Scale size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-2/12`} />
          <Text style={tw`w-9/12 ml-3 text-lg font-semibold dark:text-gray-200`}>Licenses</Text>
          <ArrowRight size={24} color={colorScheme == "dark" ? "white" : "black"} style={tw`w-2/12`} />
        </TouchableOpacity>

      </View>
      <TouchableOpacity style={tw`bg-white mt-8 p-4 dark:bg-blue-900 dark:text-gray-200 pr-2 rounded-full border border-blue-800 dark:border-0 mb-10`}>
        <Text style={tw`text-lg font-semibold dark:text-gray-200 text-blue-950 text-center`}>Rate App on PlayStore</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Settings