import React from "react"
import { Href, router } from "expo-router"
import { Check, ChevronRight, Moon, Sun } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"

import CurrencySelector from "~/components/CurrencySelector"
import Screen from "~/components/ui/Screen"
import { useTheme } from "~/hooks/useTheme"
import GlobalStateStore from "~/stores/globalStateStore"
import useOnboardingStore from "~/stores/onboardingStore"
import useThemeStore from "~/stores/themeStore"
import tw from "~/tw.config"
import ModernSwitch from "~/components/ModernSwitch"
import { APP } from "~/constants/app"
import AnimatedPressable from "~/components/Animations/AnimatedPressable"

export default function PreferencesScreen() {
    const theme = useTheme()
    const { colorScheme, setColorScheme } = useThemeStore()
    const { completeStep } = useOnboardingStore()

    const {
        preferredCurrencySymbol,
        preferredDistanceMeasurement,
        preferredLiquidMeasurement,
        isUseUSMPG,
        isUseUKMPG,
        optInCrashReports,
        setPreferredDistanceMeasurement,
        setPreferredDLiquidMeasurement,
        setUseUSMPG,
        setUseUKMPG,
        setOptInCrashReports,
    } = GlobalStateStore()

    const selectedFuelUnit =
        preferredLiquidMeasurement === "L"
            ? "liters"
            : isUseUKMPG
                ? "uk-gallons"
                : "us-gallons"

    const handleFuelUnitChange = (unit: "liters" | "us-gallons" | "uk-gallons") => {
        switch (unit) {
            case "liters":
                setPreferredDLiquidMeasurement("L")
                setUseUSMPG(false)
                setUseUKMPG(false)
                break
            case "us-gallons":
                setPreferredDLiquidMeasurement("gal")
                setUseUSMPG(true)
                setUseUKMPG(false)
                break
            case "uk-gallons":
                setPreferredDLiquidMeasurement("gal")
                setUseUSMPG(false)
                setUseUKMPG(true)
                break
        }
    }

    const handleContinue = () => {
        completeStep("preferences")
        router.push("/(onboarding)/finish" as Href)
    }

    const Option = ({
        label,
        description,
        selected,
        onPress,
    }: {
        label: string
        description?: string
        selected: boolean
        onPress: () => void
    }) => (
        <AnimatedPressable
            onPress={onPress}
            style={({ pressed }) => [
                tw`w-full flex-row items-center rounded-xl border p-4 mb-3`,
                {
                    backgroundColor: selected ? theme.colors.brand.primary + "12" : theme.colors.background.field,
                    borderColor: selected ? theme.colors.brand.primary : theme.colors.border.default,
                    opacity: pressed ? 0.8 : 1,
                },
            ]}>
            <View style={tw`flex-1`}>
                <Text style={[tw`text-base font-HKGrotesk-SemiBold`, { color: theme.colors.text.primary }]}>
                    {label}
                </Text>

                {description && (
                    <Text style={[tw`text-sm font-HKGrotesk-Regular mt-1`, { color: theme.colors.text.secondary }]}>
                        {description}
                    </Text>
                )}
            </View>

            <View
                style={[
                    tw`w-7 h-7 rounded-full border items-center justify-center ml-3`,
                    {
                        backgroundColor: selected ? theme.colors.brand.primary : "transparent",
                        borderColor: selected ? theme.colors.brand.primary : theme.colors.border.default,
                    },
                ]}>
                {selected && <Check size={16} color="white" />}
            </View>
         </AnimatedPressable>
    )

    const CompactOption = ({
        label,
        selected,
        icon,
        onPress,
        showCheckmark = true,
    }: {
        label: string
        selected: boolean
        icon?: React.ReactNode
        onPress: () => void
        showCheckmark?: boolean
    }) => (
        <AnimatedPressable
            onPress={onPress}
            style={({ pressed }) => [
                tw`flex-1 rounded-xl border p-4 items-center justify-center`,
                {
                    backgroundColor: selected ? theme.colors.brand.primary + "12" : theme.colors.background.field,
                    borderColor: selected ? theme.colors.brand.primary : theme.colors.border.default,
                    opacity: pressed ? 0.8 : 1,
                },
            ]}>
            {icon}

            <Text
                style={[
                    tw`text-base font-HKGrotesk-SemiBold ${icon ? "mt-2" : ""}`,
                    { color: selected ? theme.colors.brand.primary : theme.colors.text.primary },
                ]}>
                {label}
            </Text>

            {showCheckmark && (
                <View
                    style={[
                        tw`w-6 h-6 rounded-full border items-center justify-center mt-3`,
                        {
                            backgroundColor: selected ? theme.colors.brand.primary : "transparent",
                            borderColor: selected ? theme.colors.brand.primary : theme.colors.border.default,
                        },
                    ]}>
                    {selected && <Check size={14} color="white" />}
                </View>)
            }
         </AnimatedPressable>
    )

    return (
        <Screen>
            <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                        Preferences
                    </Text>

                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                       Step 4 of 5
                    </Text>
                </View>

                <View style={[tw`h-1.5 w-full rounded-full mt-3 overflow-hidden`, { backgroundColor: theme.colors.background.default }]}>
                    <View style={{ width: "80%", height: "100%", borderRadius: 999, backgroundColor: theme.colors.brand.primary }} />
                </View>

                <ScrollView style={tw`flex-1`} contentContainerStyle={tw`pb-6`} showsVerticalScrollIndicator={false}>

                    <View style={tw`mt-7 mb-5`}>
                        <Text style={[tw`text-3xl font-HKGrotesk-Bold`, { color: theme.colors.text.primary }]}>
                            Personalize your experience
                        </Text>
                    </View>

                    <Text style={[tw`text-lg font-HKGrotesk-Bold mb-3`, { color: theme.colors.text.primary }]}>
                        Appearance
                    </Text>

                    <View style={tw`flex-row gap-3`}>
                        <CompactOption
                            label="Light"
                            showCheckmark={false}
                            selected={colorScheme === "light"}
                            icon={<Sun size={26} color={colorScheme === "light" ? theme.colors.brand.primary : theme.colors.text.secondary} />}
                            onPress={() => setColorScheme("light")}
                        />

                        <CompactOption
                            label="Dark"
                            showCheckmark={false}
                            selected={colorScheme === "dark"}
                            icon={<Moon size={26} color={colorScheme === "dark" ? theme.colors.brand.primary : theme.colors.text.secondary} />}
                            onPress={() => setColorScheme("dark")}
                        />
                    </View>

                    <Text style={[tw`text-lg font-HKGrotesk-Bold mt-6 mb-3`, { color: theme.colors.text.primary }]}>
                        Distance
                    </Text>

                    <View style={tw`flex-row gap-3`}>
                        <CompactOption
                            label="Kilometers"
                            showCheckmark={false}
                            selected={preferredDistanceMeasurement === "km"}
                            onPress={() => setPreferredDistanceMeasurement("km")}
                        />

                        <CompactOption
                            label="Miles"
                            showCheckmark={false}
                            selected={preferredDistanceMeasurement === "mi"}
                            onPress={() => setPreferredDistanceMeasurement("mi")}
                        />
                    </View>

                    <Text style={[tw`text-lg font-HKGrotesk-Bold mt-6 mb-3`, { color: theme.colors.text.primary }]}>
                        Fuel volume
                    </Text>

                    <Option
                        label="Liters"
                        description="Use liters and metric fuel economy."
                        selected={selectedFuelUnit === "liters"}
                        onPress={() => handleFuelUnitChange("liters")}
                    />

                    <Option
                        label="US Gallons"
                        description="Use US gallons and US MPG."
                        selected={selectedFuelUnit === "us-gallons"}
                        onPress={() => handleFuelUnitChange("us-gallons")}
                    />

                    <Option
                        label="UK Gallons"
                        description="Use UK gallons and UK MPG."
                        selected={selectedFuelUnit === "uk-gallons"}
                        onPress={() => handleFuelUnitChange("uk-gallons")}
                    />

                    <Text style={[tw`text-lg font-HKGrotesk-Bold mt-5 mb-3`, { color: theme.colors.text.primary }]}>
                        Currency
                    </Text>

                    <CurrencySelector savedCurrencyCode={preferredCurrencySymbol} />

                    <Text style={[tw`text-lg font-HKGrotesk-Bold mt-6 mb-3`, { color: theme.colors.text.primary }]}>
                        Help Us improve
                    </Text>

                    <View style={[tw`w-full flex-row items-center rounded-xl border p-4`, { backgroundColor: theme.colors.background.field, borderColor: theme.colors.border.default }]}>
                        <View style={tw`flex-1 pr-4`}>
                            <Text style={[tw`text-base font-HKGrotesk-SemiBold`, { color: theme.colors.text.primary }]}>
                                Share anonymous crash reports
                            </Text>

                            <Text style={[tw`text-sm font-HKGrotesk-Regular mt-1 leading-5`, { color: theme.colors.text.secondary }]}>
                                Help improve {APP.NAME} by reporting crashes. Personal vehicle data is not included.
                            </Text>
                        </View>

                        <ModernSwitch value={optInCrashReports ?? true} onValueChange={setOptInCrashReports} activeColor={theme.colors.brand.primary} />

                    </View>
                </ScrollView>

                <AnimatedPressable
                    onPress={handleContinue}
                    style={({ pressed }) => [
                        tw`w-full rounded-full py-4 px-5 flex-row items-center justify-center`,
                        { backgroundColor: theme.colors.brand.primary, opacity: pressed ? 0.8 : 1 },
                    ]}>
                    <Text style={tw`text-white text-base font-HKGrotesk-SemiBold`}>
                        Continue
                    </Text>

                    <ChevronRight size={20} color="white" style={tw`ml-2`} />
                 </AnimatedPressable>
            </View>
        </Screen>
    )
}