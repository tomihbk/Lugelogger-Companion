import { View } from 'react-native'
import React from 'react'
import ActionButton from './ActionButton'
import tw from 'twrnc';


export default function GroupActionButtons() {
    return (
        <View style={tw`flex flex-wrap flex-row justify-between gap-3 my-5`}>
            <ActionButton ButtonTitle="Repairs" LucideIconName="construction" ThemeHexColor="#00892B" OnPress={() => { }} />
            <ActionButton ButtonTitle="Service" LucideIconName="clipboard-check" ThemeHexColor="#1C06DC" OnPress={() => { }} />
            <ActionButton ButtonTitle="Fuel" LucideIconName="fuel" ThemeHexColor="#BF0296" OnPress={() => { }} />
            <ActionButton ButtonTitle="Upgrades" LucideIconName="package-plus" ThemeHexColor="#E00004" OnPress={() => { }} />
            <ActionButton ButtonTitle="Notes" LucideIconName="notepad-text" ThemeHexColor="#009476" OnPress={() => { }} />
            <ActionButton ButtonTitle="Taxes" LucideIconName="landmark" ThemeHexColor="#C09F1A" OnPress={() => { }} />
        </View>
    )
}