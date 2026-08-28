import React, { useMemo } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { Check, ChevronRight, CircleCheckBig, Server, Settings2, Star } from "lucide-react-native"

import Screen from "~/components/ui/Screen"
import { useGetAllVehicles } from "~/hooks/api"
import { useTheme } from "~/hooks/useTheme"
import { APP } from "~/constants/app"
import GlobalStateStore from "~/stores/globalStateStore"
import useOnboardingStore from "~/stores/onboardingStore"
import useThemeStore from "~/stores/themeStore"
import ServerSettingsStore from "~/stores/serverSettingsStore"
import tw from "~/tw.config"
import AnimatedPressable from "~/components/Animations/AnimatedPressable"

type Vehicle = {
    id: number
    year: number
    make: string
    model: string
    licensePlate: string
}

export default function FinishScreen() {
    const theme = useTheme()
    const { finish } = useOnboardingStore()
    const { colorScheme } = useThemeStore()
    const { getSettings } = ServerSettingsStore()

    const {
        favoriteCarId,
        preferredCurrencySymbol,
        preferredDistanceMeasurement,
        preferredLiquidMeasurement,
        isUseUSMPG,
        isUseUKMPG,
    } = GlobalStateStore()

    const { data: vehicleList, isLoading } = useGetAllVehicles()
    const savedSettings = getSettings()

    const primaryVehicle = useMemo(() => {
        if (!Array.isArray(vehicleList)) return null
        return (vehicleList as Vehicle[]).find((vehicle) => vehicle.id === favoriteCarId) ?? null
    }, [vehicleList, favoriteCarId])

    const fuelUnit =
        preferredLiquidMeasurement === "L"
            ? "Liters"
            : isUseUKMPG
                ? "UK Gallons"
                : isUseUSMPG
                    ? "US Gallons"
                    : "Gallons"

    const primaryVehicleName = primaryVehicle
        ? `${primaryVehicle.make} ${primaryVehicle.model}`.trim()
        : "Primary vehicle selected"

    const SummaryRow = ({
        icon,
        title,
        value,
    }: {
        icon: React.ReactNode
        title: string
        value: string
    }) => (
        <View style={[tw`flex-row items-center rounded-xl border p-4 mb-3`, { backgroundColor: theme.colors.background.field, borderColor: theme.colors.border.default }]}>
            <View style={[tw`w-10 h-10 rounded-full items-center justify-center mr-3`, { backgroundColor: theme.colors.brand.primary + "15" }]}>
                {icon}
            </View>

            <View style={tw`flex-1`}>
                <Text style={[tw`text-sm font-HKGrotesk-Regular`, { color: theme.colors.text.secondary }]}>
                    {title}
                </Text>

                <Text style={[tw`text-base font-HKGrotesk-SemiBold mt-0.5`, { color: theme.colors.text.primary }]}>
                    {value}
                </Text>
            </View>

            <Check size={20} color={theme.colors.status.successful} />
        </View>
    )

    return (
        <Screen>
            <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                        Finish
                    </Text>

                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                        Step 5 of 5
                    </Text>
                </View>

                <View style={[tw`h-1.5 w-full rounded-full mt-3 overflow-hidden`, { backgroundColor: theme.colors.background.default }]}>
                    <View style={{ width: "100%", height: "100%", borderRadius: 999, backgroundColor: theme.colors.brand.primary }} />
                </View>

                <View style={tw`flex-1 justify-center py-8`}>
                    <View style={tw`items-center mb-8`}>
                        <View style={[tw`rounded-3xl items-center justify-center p-5`, { backgroundColor: theme.colors.status.successful + "20" }]}>
                            <CircleCheckBig size={34} color={theme.colors.status.successful} />
                        </View>

                        <Text style={[tw`text-4xl font-HKGrotesk-Bold text-center mt-4`, { color: theme.colors.text.primary }]}>
                            You're all set!
                        </Text>

                        <Text style={[tw`text-base font-HKGrotesk-Regular text-center mt-3 leading-6 px-3`, { color: theme.colors.text.secondary }]}>
                            {APP.NAME} is connected and ready to manage your vehicle history.
                        </Text>
                    </View>

                    <SummaryRow
                        icon={<Server size={20} color={theme.colors.brand.primary} />}
                        title="Server"
                        value={savedSettings?.serverURL ?? "Server connected"}
                    />

                    <SummaryRow
                        icon={<Star size={20} color={theme.colors.brand.primary} />}
                        title="Primary vehicle"
                        value={isLoading ? "Loading vehicle..." : primaryVehicleName}
                    />

                    <SummaryRow
                        icon={<Settings2 size={20} color={theme.colors.brand.primary} />}
                        title="Preferences"
                        value={`${colorScheme === "dark" ? "Dark" : "Light"} · ${preferredDistanceMeasurement} · ${fuelUnit} · ${preferredCurrencySymbol}`}
                    />

                    {isLoading && (
                        <View style={tw`items-center mt-5`}>
                            <ActivityIndicator color={theme.colors.brand.primary} />
                        </View>
                    )}
                </View>

                <AnimatedPressable
                    disabled={isLoading}
                    onPress={finish}
                    style={[
                        tw`w-full rounded-full py-4 px-5 flex-row items-center justify-center`,
                        {
                            backgroundColor: theme.colors.brand.primary,
                            opacity: isLoading ? 0.4 : 1,
                        },
                    ]}>
                    <Text style={tw`text-white text-base font-HKGrotesk-SemiBold`}>
                        Start Logging
                    </Text>

                    <ChevronRight size={20} color="white" style={tw`ml-2`} />
                </AnimatedPressable>
            </View>
        </Screen>
    )
}