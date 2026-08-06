import React, { useMemo, useState } from "react"
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native"
import { Check, ChevronRight, RefreshCw, TriangleAlert } from "lucide-react-native"
import { Href, router } from "expo-router"

import Screen from "~/components/ui/Screen"
import { useGetAllVehicles } from "~/hooks/api"
import { useTheme } from "~/hooks/useTheme"
import GlobalStateStore from "~/stores/globalStateStore"
import useOnboardingStore from "~/stores/onboardingStore"
import tw from "~/tw.config"

type OnboardingVehicle = {
    id: number
    year: number
    make: string
    model: string
    licensePlate: string
}

export default function FavoriteVehicleScreen() {
    const theme = useTheme()
    const { setFavoriteCar, favoriteCarId } = GlobalStateStore()
    const { completeStep } = useOnboardingStore()
    const { data: vehicleList, isError, error, isLoading, refetch, isRefetching } = useGetAllVehicles()

    const vehicles = useMemo(
        () => Array.isArray(vehicleList) ? vehicleList as OnboardingVehicle[] : [],
        [vehicleList],
    )

    const initialFavoriteExists = vehicles.some((vehicle) => vehicle.id === favoriteCarId)
    const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
        initialFavoriteExists ? favoriteCarId : null,
    )

    const handleContinueButton = () => {
        if (selectedVehicleId === null) return

        setFavoriteCar(selectedVehicleId)
        completeStep("favorite-vehicle")
        router.push("/(onboarding)/preferences" as Href)
    }

    return (
        <Screen>
            <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                        Primary vehicle
                    </Text>

                    <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.text.secondary }]}>
                        3 of 5
                    </Text>
                </View>

                <View style={[tw`h-1.5 w-full rounded-full mt-3 overflow-hidden`, { backgroundColor: theme.colors.background.default }]}>
                    <View style={{ width: "60%", height: "100%", borderRadius: 999, backgroundColor: theme.colors.brand.primary }} />
                </View>

                <View style={tw`mt-7`}>
                    <Text style={[tw`text-3xl font-HKGrotesk-Bold`, { color: theme.colors.text.primary }]}>
                        Select primary vehicle
                    </Text>

                    <Text style={[tw`text-sm font-HKGrotesk-Regular mt-3`, { color: theme.colors.text.secondary }]}>
                        Vehicle will be shown on Home page. You can change it in Garage page
                    </Text>
                </View>

                {isLoading ? (
                    <View style={tw`flex-1 items-center justify-center`}>
                        <ActivityIndicator size="large" color={theme.colors.brand.primary} />

                        <Text style={[tw`text-base font-HKGrotesk-Medium mt-4`, { color: theme.colors.text.primary }]}>
                            Loading your garage...
                        </Text>
                    </View>
                ) : isError ? (
                    <View style={tw`flex-1 items-center justify-center px-4`}>
                        <View style={[tw`w-16 h-16 rounded-2xl items-center justify-center`, { backgroundColor: theme.colors.status.danger + "20" }]}>
                            <TriangleAlert size={30} color={theme.colors.status.danger} />
                        </View>

                        <Text style={[tw`text-xl font-HKGrotesk-Bold text-center mt-5`, { color: theme.colors.text.primary }]}>
                            Unable to load vehicles
                        </Text>

                        <Text style={[tw`text-sm font-HKGrotesk-Regular text-center mt-2 leading-5`, { color: theme.colors.text.secondary }]}>
                            {error instanceof Error ? error.message : "Check your server connection and try again."}
                        </Text>

                        <Pressable
                            disabled={isRefetching}
                            onPress={() => refetch()}
                            style={({ pressed }) => [
                                tw`flex-row items-center justify-center rounded-full px-6 py-3 mt-6`,
                                {
                                    backgroundColor: theme.colors.brand.primary,
                                    opacity: isRefetching ? 0.4 : pressed ? 0.8 : 1,
                                },
                            ]}>
                            {isRefetching
                                ? <ActivityIndicator color="white" />
                                : <RefreshCw size={18} color="white" />}

                            <Text style={tw`text-white text-base font-HKGrotesk-Medium ml-2`}>
                                {isRefetching ? "Retrying..." : "Retry"}
                            </Text>
                        </Pressable>
                    </View>
                ) : vehicles.length === 0 ? (
                    <View style={tw`flex-1 items-center justify-center px-4`}>
                        <View style={[tw`w-16 h-16 rounded-2xl items-center justify-center`, { backgroundColor: theme.colors.brand.primary + "15" }]}>
                            <TriangleAlert size={30} color={theme.colors.brand.primary} />
                        </View>

                        <Text style={[tw`text-xl font-HKGrotesk-Bold text-center mt-5`, { color: theme.colors.text.primary }]}>
                            No vehicles found
                        </Text>

                        <Text style={[tw`text-sm font-HKGrotesk-Regular text-center mt-3 leading-5`, { color: theme.colors.text.secondary }]}>
                            Vehicles cannot currently be created from the mobile app. Create a vehicle using the Lugelogger desktop version, then return here.
                        </Text>

                        <Pressable
                            disabled={isRefetching}
                            onPress={() => refetch()}
                            style={({ pressed }) => [
                                tw`flex-row items-center justify-center rounded-full px-6 py-3 mt-6`,
                                {
                                    backgroundColor: theme.colors.brand.primary,
                                    opacity: isRefetching ? 0.4 : pressed ? 0.8 : 1,
                                },
                            ]}>
                            {isRefetching
                                ? <ActivityIndicator color="white" />
                                : <RefreshCw size={18} color="white" />}

                            <Text style={tw`text-white text-base font-HKGrotesk-Medium ml-2`}>
                                {isRefetching ? "Checking..." : "Check Again"}
                            </Text>
                        </Pressable>
                    </View>
                ) : (
                    <>
                        <Text style={[tw`text-sm font-HKGrotesk-Medium mt-4 mb-3 text-center`, { color: theme.colors.status.successful }]}>
                            Great! We've found {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"} on your server.
                        </Text>

                        <ScrollView
                            style={tw`flex-1`}
                            contentContainerStyle={tw`pb-5`}
                            showsVerticalScrollIndicator={false}>
                            {vehicles.map((vehicle: OnboardingVehicle, index) => {
                                const vehicleId = vehicle.id
                                const isSelected = vehicleId !== undefined && selectedVehicleId === vehicleId

                                return (
                                    <Pressable
                                        key={vehicleId ?? index}
                                        disabled={vehicleId === undefined}
                                        onPress={() => vehicleId !== undefined && setSelectedVehicleId(vehicleId)}
                                        style={({ pressed }) => [
                                            tw`w-full rounded-2xl border p-4 mb-3`,
                                            {
                                                backgroundColor: isSelected
                                                    ? theme.colors.brand.primary + "12"
                                                    : theme.colors.background.field,
                                                borderColor: isSelected
                                                    ? theme.colors.brand.primary
                                                    : theme.colors.border.default,
                                                opacity: vehicleId === undefined ? 0.45 : pressed ? 0.8 : 1,
                                            },
                                        ]}>
                                        <View style={tw`flex-row items-center`}>
                                            <View style={tw`flex-1`}>
                                                <Text style={[tw`text-lg font-HKGrotesk-Bold`, { color: theme.colors.text.primary }]} numberOfLines={1}>
                                                    {vehicle.make} {vehicle.model}
                                                </Text>

                                                <Text style={[tw`text-sm font-HKGrotesk-Medium mt-1`, { color: theme.colors.text.secondary }]}>
                                                    {vehicle.licensePlate ? `${vehicle.licensePlate} - ${vehicle.year}` : vehicle.year}
                                                </Text>
                                            </View>

                                            <View
                                                style={[
                                                    tw`w-8 h-8 rounded-full border items-center justify-center`,
                                                    {
                                                        backgroundColor: isSelected ? theme.colors.brand.primary : "transparent",
                                                        borderColor: isSelected ? theme.colors.brand.primary : theme.colors.border.default,
                                                    },
                                                ]}>
                                                {isSelected && <Check size={18} color="white" />}
                                            </View>
                                        </View>
                                    </Pressable>
                                )
                            })}
                        </ScrollView>

                        <Pressable
                            disabled={selectedVehicleId === null}
                            onPress={handleContinueButton}
                            style={({ pressed }) => [
                                tw`w-full rounded-full py-4 px-5 flex-row items-center justify-center`,
                                {
                                    backgroundColor: theme.colors.brand.primary,
                                    opacity: selectedVehicleId === null ? 0.4 : pressed ? 0.8 : 1,
                                },
                            ]}>
                            <Text style={tw`text-white text-base font-HKGrotesk-SemiBold`}>
                                Continue
                            </Text>

                            <ChevronRight size={20} color="white" style={tw`ml-2`} />
                        </Pressable>
                    </>
                )}
            </View>
        </Screen>
    )
}