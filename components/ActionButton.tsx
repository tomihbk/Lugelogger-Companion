import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Construction, ClipboardCheck, Fuel, PackagePlus, NotepadText, Landmark } from 'lucide-react-native'
import tw from '~/tw.config';

type ServiceButtonProps = {
    ButtonTitle: string;
    ThemeHexColor: string;
    LucideIconName: "construction" | "clipboard-check" | "fuel" | "package-plus" | "notepad-text" | "landmark" | undefined;
    OnPress: ((event: GestureResponderEvent) => void) | undefined;
}

const ServiceButton = (props: ServiceButtonProps) => {
    const IconSet = () => {
        switch (props.LucideIconName) {
            case 'construction':
                return <Construction style={tw`self-start`} color={props.ThemeHexColor} size={25} />
            case 'clipboard-check':
                return <ClipboardCheck style={tw`self-start`} color={props.ThemeHexColor} size={25} />
            case 'fuel':
                return <Fuel style={tw`self-start`} color={props.ThemeHexColor} size={25} />
            case 'package-plus':
                return <PackagePlus style={tw`self-start`} color={props.ThemeHexColor} size={25} />
            case 'notepad-text':
                return <NotepadText style={tw`self-start`} color={props.ThemeHexColor} size={25} />
            case 'landmark':
                return <Landmark style={tw`self-start`} color={props.ThemeHexColor} size={25} />
        }
    }

    return (
        <TouchableOpacity onPress={props.OnPress} style={tw`flex flex-col size-24 p-3 rounded-2xl bg-white dark:bg-[${props.ThemeHexColor}]/40 justify-between shadow-md shadow-[${props.ThemeHexColor}]/40 `}>
            {IconSet()}
            <Text style={tw`text-base text-[${props.ThemeHexColor}] font-HKGrotesk-Bold`} >{props.ButtonTitle || 'Repairs'}</Text>
        </TouchableOpacity>
    )
}

export default ServiceButton