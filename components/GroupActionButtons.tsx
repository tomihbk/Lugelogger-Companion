import { View } from 'react-native'
import React from 'react'
import ActionButton from './ActionButton'
import tw from '~/tw.config';


export default function GroupActionButtons() {
    return (
        <View style={tw`flex flex-wrap flex-row justify-between gap-3 my-5`}>
            <ActionButton ButtonTitle="Odo" LucideIconName="gauge" ThemeHexColor="#C09F1A" OnPress={() => { 
                //  router.push({
                //             pathname: "/car-detail/[id]",
                //             params: { id: reactqueryfavoriteCar.ID, actionType : (ev:React.JSX.Element)=>ev.props }
                //         })
            }} />
            <ActionButton ButtonTitle="Service" LucideIconName="clipboard-check" ThemeHexColor="#1C06DC" OnPress={() => { }} />
            <ActionButton ButtonTitle="Repairs" LucideIconName="construction" ThemeHexColor="#00892B" OnPress={() => { }} />
            <ActionButton ButtonTitle="Upgrades" LucideIconName="package-plus" ThemeHexColor="#E00004" OnPress={() => { }} />
            <ActionButton ButtonTitle="Fuel" LucideIconName="fuel" ThemeHexColor="#BF0296" OnPress={() => { }} />
            <ActionButton ButtonTitle="Taxes" LucideIconName="landmark" ThemeHexColor="#5e636e" OnPress={() => { }} />
            <ActionButton ButtonTitle="Notes" LucideIconName="notepad-text" ThemeHexColor="#009476" OnPress={() => { }} />
        </View>
    )
}