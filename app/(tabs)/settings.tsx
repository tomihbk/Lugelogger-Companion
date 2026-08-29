import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { View, Text, ScrollView, Modal, Platform, Linking } from "react-native"
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
import ServerSettings from "~/components/ServerSettings"
import AboutScreen from "~/components/AboutPage"
import LicensesScreen from "~/components/LicencePage"
import ThemeSetting from "~/components/ThemeSettings"
import { useTheme } from "~/hooks/useTheme"
import ServerSettingsStore from "~/stores/serverSettingsStore"
import useOnboardingStore from "~/stores/onboardingStore"
import { SafeAreaView } from "react-native-safe-area-context"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import AnimatedPressable from "~/components/Animations/AnimatedPressable"
import AnimatedSection from "~/components/Animations/AnimatedSection"


const Settings = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  const { colorScheme: colorSchemeStore, setColorScheme: setColorSchemeStore } = useThemeStore()
  const [, , setColorScheme] = useAppColorScheme(tw)
  const { preferredDistanceMeasurement, setPreferredDistanceMeasurement, setOptInCrashReports, optInCrashReports, preferredCurrencySymbol } = GlobalStateStore((state) => state)
  const tabBarHeight = useBottomTabBarHeight()


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
  const [modalAboutVisible, setModalAboutVisible] = useState(false)
  const [modalLicenseVisible, setModalLicenseVisible] = useState(false)

  const resetAppSetup = () => {
    useOnboardingStore.getState().reset()
    ServerSettingsStore.getState().clearSettings()
    GlobalStateStore.getState().setFavoriteCar(0)
    GlobalStateStore.getState().setPreferredCurrencySymbol("USD")
    GlobalStateStore.getState().setPreferredDistanceMeasurement("km")
    GlobalStateStore.getState().setPreferredDLiquidMeasurement("L")
    GlobalStateStore.getState().setUseUSMPG(false)
    GlobalStateStore.getState().setUseUKMPG(false)
    useThemeStore.getState().setColorScheme("light")
  }
  // Sync Zustand store with twrnc
  useEffect(() => {
    setColorScheme(colorSchemeStore)
  }, [colorSchemeStore])

  return (
    <SafeAreaView edges={["top", "left", "right"]} >
      <AnimatedSection>
        <Text style={[tw`w-5/12 text-2xl font-HKGrotesk-Black px-5 mb-3`, { color: theme.colors.text.primary }]}>{t("Settings")}</Text>
      </AnimatedSection>
      <ScrollView showsVerticalScrollIndicator={false} style={tw`px-5`} contentContainerStyle={{ paddingBottom: tabBarHeight + 30 }}>

        <AnimatedSection delay={60}>
          <Text style={[tw`font-HKGrotesk-Regular mb-1`, { color: theme.colors.text.primary }]}>Personalisation</Text>
          <View style={[tw`flex flex-col border rounded-2xl`, { backgroundColor: theme.colors.background.subtle, borderColor: theme.colors.brand.primary + "60" }]}>
            <SettingRow
              icon={<Palette size={20} color={theme.colors.text.primary} />}
              label="Theme"
              onPress={() => setModalThemeVisible(!modalThemeVisible)}
              color={theme.colors.text.primary}>
              <ArrowRight size={20} color={theme.colors.text.primary} />
              <Modal
                animationType="slide"
                visible={modalThemeVisible}
                hardwareAccelerated={true}
                onRequestClose={() => {
                  setModalThemeVisible(!modalThemeVisible)
                }}>
                <SafeAreaView style={[tw`flex flex-col flex-1 p-5`, { backgroundColor: theme.colors.background.default }]}>
                  <View style={tw`flex flex-row flex-wrap justify-between items-start`}>
                    <ArrowLeft color={theme.colors.text.primary} style={tw`w-full p-4 pl-0`}
                      onPress={() => { setModalThemeVisible(!modalThemeVisible) }} />
                    <Text style={[tw`text-2xl font-HKGrotesk-Bold mb-5 w-5/6`, { color: theme.colors.text.primary }]} numberOfLines={1}>Theme Settings</Text>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <ThemeSetting
                      colorSchemeStore={colorSchemeStore}
                      setColorSchemeStore={setColorSchemeStore}
                      setModalThemeVisible={setModalThemeVisible}
                      modalThemeVisible={modalThemeVisible}
                    />
                  </ScrollView>
                </SafeAreaView>
              </Modal>
            </SettingRow>

            <SettingRow
              icon={<Languages size={20} color={theme.colors.text.primary} />}
              label="Language"
              onPress={() => setModalLanguageVisibile(!modalLanguageVisible)}
              color={theme.colors.text.primary}>
              <ArrowRight size={20} color={theme.colors.text.primary} />
              <Modal
                animationType="slide"
                visible={modalLanguageVisible}
                hardwareAccelerated={true}
                onRequestClose={() => {
                  setModalLanguageVisibile(!modalLanguageVisible)
                }}>
                <SafeAreaView style={[tw`flex flex-col p-5 h-full`, { backgroundColor: theme.colors.background.default }]}>
                  <View style={tw`flex flex-row flex-wrap justify-between items-start`}>
                    <ArrowLeft color={theme.colors.text.primary} style={tw`w-full p-4 pl-0`}
                      onPress={() => { setModalLanguageVisibile(!modalLanguageVisible) }} />
                    <Text style={[tw`text-2xl mb-5 w-5/6 font-HKGrotesk-Bold`, { color: theme.colors.text.primary }]} numberOfLines={1}>Language Settings</Text>
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
                          style={tw.style(
                            i18n.language === lang
                              ? "border-2 py-7 mb-4"
                              : "py-7 mb-4",
                            { backgroundColor: theme.colors.background.subtle, borderColor: theme.colors.brand.primary }
                          )}
                        />
                      ))}
                  </ScrollView>
                </SafeAreaView>
              </Modal>
            </SettingRow>
          </View>
        </AnimatedSection>

        <AnimatedSection delay={120}>
          <Text style={[tw`font-HKGrotesk-Regular mt-4 mb-1`, { color: theme.colors.text.primary }]}>Preferences</Text>
          <View style={[tw`flex flex-col border rounded-2xl`, { backgroundColor: theme.colors.background.subtle, borderColor: theme.colors.brand.primary + "60" }]}>

            <SettingRow
              icon={<Settings2 size={20} color={theme.colors.text.primary} />}
              label="App Preferences"
              onPress={() => setModalUserPrefVisible(!modalUserPrefVisible)}
              color={theme.colors.text.primary}>
              <ArrowRight size={20} color={theme.colors.text.primary} />
            </SettingRow>

              <Modal
                animationType="slide"
                visible={modalUserPrefVisible}
                hardwareAccelerated={true}
                onRequestClose={() => {
                  setModalUserPrefVisible(!modalUserPrefVisible)
                }}>
                <SafeAreaView style={[tw`flex flex-col p-5 h-full`, { backgroundColor: theme.colors.background.default }]}>
                  <View style={tw`flex flex-row flex-wrap justify-between items-start`}>
                    <ArrowLeft color={theme.colors.text.primary} style={tw`w-full p-4 pl-0`}
                      onPress={() => { setModalUserPrefVisible(!modalUserPrefVisible) }} />
                    <Text style={[tw`text-2xl font-HKGrotesk-Bold mb-5 w-5/6`, { color: theme.colors.text.primary }]} numberOfLines={1}>User Preferences</Text>
                  </View>

                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={tw`flex flex-row items-center justify-between px-4 py-2`}>
                      <Text style={[tw`text-base font-HKGrotesk-Regular `, { color: theme.colors.text.primary }]}>Use Miles</Text>
                      <ModernSwitch
                        onValueChange={(val) => setPreferredDistanceMeasurement(val ? "mi" : "km")}
                        value={preferredDistanceMeasurement === "mi"}
                        //activeColor={"#2563eb"}
                        activeColor={theme.colors.brand.primary}
                      />
                    </View>
                    <View style={tw`flex flex-row items-center justify-between px-4 py-2`}>
                      <Text style={[tw`text-base font-HKGrotesk-Regular`, { color: theme.colors.text.primary }]}>Currency</Text>
                      <CurrencySelector savedCurrencyCode={preferredCurrencySymbol} />
                    </View>

                    <View style={tw`flex flex-row items-center justify-between px-4 py-2`}>
                      <Text style={[tw`text-base font-HKGrotesk-Regular`, { color: theme.colors.text.primary }]}>Opt-in Crash log</Text>
                      <ModernSwitch
                        onValueChange={() => setOptInCrashReports(!optInCrashReports)}
                        value={!!optInCrashReports}
                        activeColor={"#2563eb"}
                      />
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </Modal>

            <SettingRow
              icon={<Server size={20} color={theme.colors.text.primary} />}
              label="Server Settings"
              onPress={() => setModalServerVisible(!modalServerVisible)}
              color={theme.colors.text.primary}>
              <ArrowRight size={20} color={theme.colors.text.primary} />
              <Modal
                animationType="slide"
                visible={modalServerVisible}
                hardwareAccelerated={true}
                onRequestClose={() => {
                  setModalServerVisible(!modalServerVisible)
                }}>

                <SafeAreaView style={[tw`flex flex-col p-5 h-full`, { backgroundColor: theme.colors.background.default }]}>
                  <View style={tw`flex flex-row flex-wrap justify-between items-start`}>
                    <ArrowLeft color={theme.colors.text.primary} style={tw`w-full p-4 pl-0`}
                      onPress={() => { setModalServerVisible(!modalServerVisible) }} />
                    <Text style={[tw`text-2xl font-HKGrotesk-Bold mb-5 w-5/6`, { color: theme.colors.text.primary }]} numberOfLines={1}>Server Settings</Text>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <ServerSettings onSave={() => { setModalServerVisible(!modalServerVisible) }} />
                  </ScrollView>
                </SafeAreaView>
              </Modal>
            </SettingRow>
          </View>
        </AnimatedSection>

        <AnimatedSection delay={180}>
          <Text style={[tw`font-HKGrotesk-Regular mt-4 mb-1`, { color: theme.colors.text.primary }]}>More</Text>
          <View style={[tw`flex flex-col border rounded-2xl`, { backgroundColor: theme.colors.background.subtle, borderColor: theme.colors.brand.primary + "60" }]}>

            <SettingRow
              icon={<BadgeInfo size={20} color={theme.colors.text.primary} />}
              label="About"
              onPress={() => { setModalAboutVisible(!modalAboutVisible) }}
              color={theme.colors.text.primary}>
              <ArrowRight size={20} color={theme.colors.text.primary} />
              <Modal
                animationType="slide"
                visible={modalAboutVisible}
                hardwareAccelerated={true}
                onRequestClose={() => {
                  setModalAboutVisible(!modalAboutVisible)
                }}>
                <SafeAreaView style={[tw`flex flex-col p-5 pb-0 h-full`, { backgroundColor: theme.colors.background.default }]}>
                  <View style={tw`flex flex-row flex-wrap justify-between items-start`}>
                    <ArrowLeft color={theme.colors.text.primary} style={tw`w-full p-4 pl-0`}
                      onPress={() => { setModalAboutVisible(!modalAboutVisible) }} />
                    <Text style={[tw`text-2xl font-HKGrotesk-Bold mb-5 w-5/6`, { color: theme.colors.text.primary }]} numberOfLines={1}>About</Text>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <AboutScreen />
                  </ScrollView>
                </SafeAreaView>
              </Modal>
            </SettingRow>
            <SettingRow
              icon={<Scale size={20} color={theme.colors.text.primary} />}
              label="Licenses"
              onPress={() => { setModalLicenseVisible(!modalLicenseVisible) }}
              color={theme.colors.text.primary}>
              <ArrowRight size={20} color={theme.colors.text.primary} />
              <Modal
                animationType="slide"
                visible={modalLicenseVisible}
                hardwareAccelerated={true}
                onRequestClose={() => {
                  setModalLicenseVisible(!modalLicenseVisible)
                }}>
                <SafeAreaView style={[tw`flex flex-col p-5 pb-0 h-full`, { backgroundColor: theme.colors.background.default }]}>
                  <View style={tw`flex flex-row flex-wrap justify-between items-start`}>
                    <ArrowLeft color={theme.colors.text.primary} style={tw`w-full p-4 pl-0`}
                      onPress={() => { setModalLicenseVisible(!modalLicenseVisible) }} />
                    <Text style={[tw`text-2xl font-HKGrotesk-Bold mb-5 w-5/6`, { color: theme.colors.text.primary }]} numberOfLines={1}>Licenses</Text>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <LicensesScreen />
                  </ScrollView>
                </SafeAreaView>
              </Modal>
            </SettingRow>

            <SettingRow
              icon={<GitBranch size={20} color={theme.colors.text.primary} />}
              label="Github"
              onPress={() => { Linking.openURL("https://github.com/hargata/lubelog") }}
              // #TODO : Add your repo link
              color={theme.colors.text.primary}>
              <ArrowRight size={20} color={theme.colors.text.primary} />
            </SettingRow>
          </View>
        </AnimatedSection>

        {__DEV__ && (
          <AnimatedPressable style={[tw`mt-6 p-2 rounded-full border`, { backgroundColor: theme.colors.background.default, color: theme.colors.text.primary, borderColor: theme.colors.brand.primary + "60" }]} onPress={resetAppSetup}>
            <Text style={[tw`text-lg font-HKGrotesk-Medium text-center`, { color: theme.colors.text.primary }]}>Reset app setup</Text>
          </AnimatedPressable>
        )}

        <AnimatedSection delay={240}>
          <AnimatedPressable style={[tw`mt-6 p-2 rounded-full border`, { backgroundColor: theme.colors.background.default, color: theme.colors.text.primary, borderColor: theme.colors.brand.primary + "60" }]} onPress={() => {
            if (Platform.OS === 'ios') {
              Linking.openURL('itms-apps://apps.apple.com/app/idYOUR_APP_ID?action=write-review');
            } else if (Platform.OS === 'android') {
              Linking.openURL('market://details?id=YOUR_PACKAGE_NAME');
            } {/* // #TODO : Add link to app store / play store */ }
          }}>
            <View style={tw`flex flex-row items-center justify-center`}>
              <Text style={[tw`text-lg font-HKGrotesk-Medium text-center`, { color: theme.colors.text.primary }]}>Rate App on {Platform.OS == 'android' ? 'PlayStore' : 'App Store'}</Text>
              <ArrowRight size={20} color={theme.colors.text.primary} />
            </View>
          </AnimatedPressable>
        </AnimatedSection>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings