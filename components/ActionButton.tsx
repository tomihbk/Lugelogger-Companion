import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Construction, ClipboardCheck, Fuel, PackagePlus, NotepadText, Landmark, Gauge, BellRing } from 'lucide-react-native'
import tw from '~/tw.config'
import useThemeStore from '~/stores/themeStore'
import { shade } from 'polished'

type ServiceButtonProps = {
    ButtonTitle: string;
    ThemeHexColor: string;
    LucideIconName: "construction" | "clipboard-check" | "fuel" | "package-plus" | "notepad-text" | "landmark" | "gauge" | "bell" | undefined;
    OnPress: ((event: GestureResponderEvent) => void) | undefined;
}

const ServiceButton = (props: ServiceButtonProps) => {
    const { colorScheme: colorSchemeStore } = useThemeStore()

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
            case 'gauge':
                return <Gauge style={tw`self-start`} color={props.ThemeHexColor} size={25} />
            case 'bell':
                return <BellRing style={tw`self-start`} color={props.ThemeHexColor} size={25} />
        }
    }

    return (
        <TouchableOpacity onPress={props.OnPress} style={[tw`flex flex-col size-24 p-3 mb-2 rounded-2xl justify-between shadow-lg`, {
            backgroundColor: colorSchemeStore === 'dark' ? shade(0.7, props.ThemeHexColor) : 'white',
            elevation: colorSchemeStore === 'light' ? 18 : 0,
            shadowColor: props.ThemeHexColor + "40"
        }]} >
            {IconSet()}
            <Text style={[tw`text-base font-HKGrotesk-Bold`, { color: props.ThemeHexColor }]} >{props.ButtonTitle}</Text>
        </TouchableOpacity>
    )
}

export default ServiceButton