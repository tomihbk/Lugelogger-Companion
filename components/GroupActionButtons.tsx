import { View } from 'react-native'
import React from 'react'
import ActionButton from './ActionButton'
import tw from '~/tw.config'
import GlobalStateStore from '~/stores/globalStateStore'
import { router } from 'expo-router'
import { OdometerFunctionStore, ServiceFunctionStore, RepairFunctionStore, UpgradeFunctionStore, FuelFunctionStore, TaxFunctionStore, ReminderFunctionStore } from '~/stores/RecordButtons'

export default function GroupActionButtons() {
    const favoriteCarID = GlobalStateStore((state) => state.favoriteCarId)
    const pathname = "/car-detail/[id]"
    
    return (
        <View style={tw`flex flex-wrap flex-row justify-between gap-3 my-5`}>
            <ActionButton ButtonTitle="Odo" LucideIconName="gauge" ThemeHexColor={OdometerFunctionStore.buttonColor} OnPress={() => {
                router.push({
                    pathname, params: { id: favoriteCarID, actionType: OdometerFunctionStore.key }
                })
            }} />
            <ActionButton ButtonTitle="Service" LucideIconName="clipboard-check" ThemeHexColor={ServiceFunctionStore.buttonColor} OnPress={() => {
                router.push({
                    pathname, params: { id: favoriteCarID, actionType: ServiceFunctionStore.key }
                })
            }} />
            <ActionButton ButtonTitle="Repairs" LucideIconName="construction" ThemeHexColor={RepairFunctionStore.buttonColor} OnPress={() => {
                router.push({
                    pathname, params: { id: favoriteCarID, actionType: RepairFunctionStore.key }
                })
            }} />
            <ActionButton ButtonTitle="Upgrades" LucideIconName="package-plus" ThemeHexColor={UpgradeFunctionStore.buttonColor} OnPress={() => {
                router.push({
                    pathname, params: { id: favoriteCarID, actionType: UpgradeFunctionStore.key }
                })
            }} />
            <ActionButton ButtonTitle="Fuel" LucideIconName="fuel" ThemeHexColor={FuelFunctionStore.buttonColor} OnPress={() => {
                router.push({
                    pathname, params: { id: favoriteCarID, actionType: FuelFunctionStore.key }
                })
            }} />
            <ActionButton ButtonTitle="Taxes" LucideIconName="landmark" ThemeHexColor={TaxFunctionStore.buttonColor} OnPress={() => {
                router.push({
                    pathname, params: { id: favoriteCarID, actionType: TaxFunctionStore.key }
                })
            }} />
            <ActionButton ButtonTitle="Reminder" LucideIconName="bell" ThemeHexColor={ReminderFunctionStore.buttonColor} OnPress={() => {
                router.push({
                    pathname, params: { id: favoriteCarID, actionType: ReminderFunctionStore.key }
                })
            }} />
        </View>
    )
}