import { Stack } from "expo-router"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { View, Text, ScrollView, Modal, Platform, TouchableOpacity } from "react-native"
import tw from "~/tw.config"

import i18n from "~/i18n/i18n.config"
import { Palette, ArrowRight, Languages, BadgeInfo, Scale, Settings2, Server, GitBranch, ArrowLeft } from 'lucide-react-native'
import useThemeStore from "~/stores/themeStore"
import { useAppColorScheme } from "twrnc"
import SettingRow from "~/components/SettingRow"
import GlobalStateStore from "~/stores/globalStateStore"
import ModernSwitch from "~/components/ModernSwitch"
import { Flag } from "~/assets/flags/"
import CurrencySelector from "~/components/CurrencySelector"

const Settings = () => {
  const { t } = useTranslation()
  const { colorScheme: colorSchemeStore, setColorScheme: setColorSchemeStore } = useThemeStore()
  const [ colorScheme, toggleColorScheme, setColorScheme ] = useAppColorScheme(tw)
  const { preferredDistanceMeasurement, setPreferredDistanceMeasurement, setOptInCrashReports, optInCrashReports, preferredCurrencySymbol } = GlobalStateStore((state) => state)

  const languageData: Record<string, string> = {
    en: "English",
    fr: "French",
    es: "Spanish",
    de: "German",
  }

  const [modalLanguageVisible, setModalLanguageVisibile] = useState(false)
  const [modalThemeVisible, setModalThemeVisible] = useState(false)
  const [modalUserPrefVisible, setModalUserPrefVisible] = useState(false)
  const [modalServerVisible, setModalServerVisible] = useState(false)

  // Sync Zustand store with twrnc
  useEffect(() => {
    setColorScheme(colorSchemeStore) // Set the twrnc color scheme whenever Zustand changes
    console.log("store : " + colorSchemeStore + " | twrn theme : " + colorScheme)
  }, [colorSchemeStore, colorScheme])


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`p-5`}>
      <Stack.Screen options={{ title: 'Settings', headerShown: false }} />
      <View style={tw`flex flex-col`}>
        <Text style={tw`w-5/12 text-2xl font-HKGrotesk-Black mb-5`}>{t("Settings")}</Text>
        <Text style={tw`font-HKGrotesk-Regular mb-1 text-gray-600 dark:text-gray-200`}>Personalisation</Text>

        <View style={tw`flex flex-col bg-[#fafcff] border-[#a6cdff]/30 border rounded-2xl dark:bg-slate-800 dark:border-gray-700`}>
          <SettingRow
            icon={<Palette size={20} color={colorSchemeStore == "dark" ? "white" : "black"} />}
            label="Theme"
            onPress={() => setModalThemeVisible(!modalThemeVisible)}
            color={colorSchemeStore == "dark" ? "white" : '#a6cdff'}
            style={tw`border-b border-blue-100`}>
            <ArrowRight size={20} color={colorSchemeStore == "dark" ? "white" : '#a6cdff'} />
            <Modal
              animationType="slide"
              visible={modalThemeVisible}
              hardwareAccelerated={true}
              onRequestClose={() => {
                setModalThemeVisible(!modalThemeVisible)
              }}>
              <View style={tw`flex flex-col flex-1 p-5 dark:bg-slate-800`}>
                <View style={tw`flex flex-row flex-wrap justify-between items-start`}>
                  <ArrowLeft color={colorSchemeStore == "dark" ? "white" : "black"} style={tw`w-full p-4 pl-0`}
                    onPress={() => { setModalThemeVisible(!modalThemeVisible) }} />
                  <Text style={tw`text-2xl font-HKGrotesk-Bold mb-5 w-5/6`} numberOfLines={1}>Theme Settings</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <SettingRow
                    icon={null}
                    label="Light"
                    onPress={() => {
                      setColorSchemeStore('light')
                      setModalThemeVisible(!modalThemeVisible)
                    }}
                    color={colorSchemeStore == "light" ? "#2563eb" : "#a6cdff"}
                    style={tw`${colorSchemeStore == "light" ? "bg-blue-200 border border-blue-400" : "bg-gray-100"} dark:text-gray-200`}
                  />
                  <SettingRow
                    icon={null}
                    label="Dark"
                    onPress={() => {
                      setColorSchemeStore('dark')
                      setModalThemeVisible(!modalThemeVisible)
                    }}
                    color={colorSchemeStore == "dark" ? "#2563eb" : "#a6cdff"}
                    style={tw`${colorSchemeStore == "dark" ? "bg-blue-200 border border-blue-400" : "bg-gray-100"} dark:text-gray-200`}
                  />
                </ScrollView>
              </View>
            </Modal>
          </SettingRow>

          <SettingRow
            icon={<Languages size={20} color={colorSchemeStore == "dark" ? "white" : "black"} />}
            label="Language"
            onPress={() => setModalLanguageVisibile(!modalLanguageVisible)}
            color={colorSchemeStore == "dark" ? "white" : '#a6cdff'}>
            <ArrowRight size={20} color={colorSchemeStore == "dark" ? "white" : '#a6cdff'} />
            <Modal
              animationType="slide"
              style={tw`bg-black`}
              visible={modalLanguageVisible}
              hardwareAccelerated={true}
              onRequestClose={() => {
                setModalLanguageVisibile(!modalLanguageVisible)
              }}>
              <View style={tw`flex flex-col p-5`}>
                <View style={tw`flex flex-row flex-wrap justify-between items-start`}>
                  <ArrowLeft color={colorSchemeStore == "dark" ? "white" : "black"} style={tw`w-full p-4 pl-0`}
                    onPress={() => { setModalLanguageVisibile(!modalLanguageVisible) }} />
                  <Text style={tw`text-2xl mb-5 w-5/6 font-HKGrotesk-Bold`} numberOfLines={1}>Language Settings</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {Object.keys(i18n.services.resourceStore.data)
                    .map((lang) => (
                      <SettingRow
                        key={lang}
                        icon={Flag(lang, { width: 40 })}
                        label={languageData[lang]}
                        onPress={() => {
                          i18n.changeLanguage(lang)
                          setModalLanguageVisibile(!modalLanguageVisible)
                        }}
                        color={i18n.language == lang ? "#2563eb" : "#a6cdff"}
                        style={tw`${i18n.language == lang ? "bg-blue-50 border border-blue-400" : "bg-gray-100"} dark:text-gray-200 py-7 mb-4`}
                      />
                    ))}
                </ScrollView>
              </View>
            </Modal>
          </SettingRow>
        </View>

        <Text style={tw`font-HKGrotesk-Regular mt-4 mb-1 text-gray-600 dark:text-gray-200`}>Preferences</Text>
        <View style={tw`flex flex-col bg-[#fafcff] border-[#a6cdff]/30 border rounded-2xl dark:bg-slate-800 dark:border-gray-700`}>

          <SettingRow
            icon={<Settings2 size={20} color={colorSchemeStore == "dark" ? "white" : "black"} />}
            label="App Preferences"
            onPress={() => setModalUserPrefVisible(!modalUserPrefVisible)}
            color={colorSchemeStore == "dark" ? "white" : '#a6cdff'}
            style={tw`border-b border-blue-100`}
          >
            <ArrowRight size={20} color={colorSchemeStore == "dark" ? "white" : '#a6cdff'} />

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
                  <ArrowLeft color={colorSchemeStore == "dark" ? "white" : "black"} style={tw`w-full p-4 pl-0`}
                    onPress={() => { setModalUserPrefVisible(!modalUserPrefVisible) }} />
                  <Text style={tw`text-2xl font-HKGrotesk-Bold mb-5 w-5/6`} numberOfLines={1}>User Preferences</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={tw`flex flex-row items-center justify-between px-4 py-2`}>
                    <Text style={tw`text-base font-HKGrotesk-Regular dark:text-gray-200`}>Use Miles</Text>
                    <ModernSwitch
                      onValueChange={(val) => setPreferredDistanceMeasurement(val ? "mi" : "km")}
                      value={preferredDistanceMeasurement === "mi"}
                      activeColor={"#2563eb"}
                    />
                  </View>
                  <View style={tw`flex flex-row items-center justify-between px-4 py-2`}>
                    <Text style={tw`text-base font-HKGrotesk-Regular dark:text-gray-200`}>Currency</Text>
                    <CurrencySelector savedCurrencyCode={preferredCurrencySymbol}/>
                  </View>

                  <View style={tw`flex flex-row items-center justify-between px-4 py-2`}>
                    <Text style={tw`text-base font-HKGrotesk-Regular dark:text-gray-200`}>Opt-in Crash log</Text>
                    <ModernSwitch
                      onValueChange={() => setOptInCrashReports(!optInCrashReports)}
                      value={!!optInCrashReports}
                      activeColor={"#2563eb"}
                    />
                  </View>
                </ScrollView>
              </View>
            </Modal>
          </SettingRow>

          <SettingRow
            icon={<Server size={20} color={colorSchemeStore == "dark" ? "white" : "black"} />}
            label="Server Settings"
            onPress={() => setModalServerVisible(!modalServerVisible)}
            color={colorSchemeStore == "dark" ? "white" : '#a6cdff'}
          >
            <ArrowRight size={20} color={colorSchemeStore == "dark" ? "white" : '#a6cdff'} />
            <Modal
              animationType="slide"
              style={tw`bg-black`}
              visible={modalServerVisible}
              hardwareAccelerated={true}
              onRequestClose={() => {
                setModalServerVisible(!modalServerVisible)
              }}>
              <View style={tw`flex flex-col p-5`}>
                <View style={tw`flex flex-row flex-wrap justify-between items-start`}>
                  <ArrowLeft color={colorSchemeStore == "dark" ? "white" : "black"} style={tw`w-full p-4 pl-0`}
                    onPress={() => { setModalServerVisible(!modalServerVisible) }} />
                  <Text style={tw`text-2xl font-HKGrotesk-Bold mb-5 w-5/6`} numberOfLines={1}>Server Settings</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Server settings content here */}
                </ScrollView>
              </View>
            </Modal>
          </SettingRow>
        </View>

        <Text style={tw`font-HKGrotesk-Regular mt-4 mb-1 text-gray-600 dark:text-gray-200`}>More</Text>
        <View style={tw`flex flex-col bg-[#fafcff] border-[#a6cdff]/30 border rounded-2xl dark:bg-slate-800 dark:border-gray-700`}>

          <SettingRow
            icon={<BadgeInfo size={20} color={colorSchemeStore == "dark" ? "white" : "black"} />}
            label="About"
            onPress={() => { }}
            color={colorSchemeStore == "dark" ? "white" : '#a6cdff'}
            style={tw`border-b border-blue-100`}
          >
            <ArrowRight size={20} color={colorSchemeStore == "dark" ? "white" : '#a6cdff'} />
          </SettingRow>

          <SettingRow
            icon={<Scale size={20} color={colorSchemeStore == "dark" ? "white" : "black"} />}
            label="Licenses"
            onPress={() => { }}
            color={colorSchemeStore == "dark" ? "white" : '#a6cdff'}
            style={tw`border-b border-blue-100`}
          >
            <ArrowRight size={20} color={colorSchemeStore == "dark" ? "white" : '#a6cdff'} />
          </SettingRow>

          <SettingRow
            icon={<GitBranch size={20} color={colorSchemeStore == "dark" ? "white" : "black"} />}
            label="Github"
            onPress={() => { }}
            color={colorSchemeStore == "dark" ? "white" : '#a6cdff'}
          >
            <ArrowRight size={20} color={colorSchemeStore == "dark" ? "white" : '#a6cdff'} />
          </SettingRow>
        </View>
      </View>
      <TouchableOpacity style={tw`bg-white mt-4 p-2 dark:bg-blue-900 dark:text-gray-200 pr-2 rounded-full border border-blue-800 dark:border-0 mb-10`}>
        <Text style={tw`text-lg font-HKGrotesk-Medium dark:text-gray-200 text-blue-950 text-center`}>Rate App on {Platform.OS == 'android' ? 'PlayStore' : 'App Store'}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Settings