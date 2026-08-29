import React from 'react'
import { router } from 'expo-router'
import { PlusIcon } from 'lucide-react-native'
import tw from '~/tw.config'
import { shade } from 'polished'
import useThemeStore from '~/stores/themeStore'
import AnimatedPressable from './Animations/AnimatedPressable'


type NewRecordButtonPropType = {
    selectedButtonHexColor: string,
    selectedTabName: string,
    carId: string
}

const NewRecordButton = (props: NewRecordButtonPropType) => {
    const { colorScheme } = useThemeStore()

    return (
        <AnimatedPressable style={[tw`rounded-full right-5 bottom-10 p-3 z-50 shadow-lg shadow-[${props.selectedButtonHexColor}] bg-[${props.selectedButtonHexColor}] ${props.selectedTabName == "home" ? 'hidden' : 'absolute'}`, { backgroundColor: colorScheme === 'dark' ? shade(0.5, props.selectedButtonHexColor) : props.selectedButtonHexColor }]} onPress={() => {
            router.push({
                pathname: "/new-record/[id]",
                params: {
                    id: props.carId,
                    actionType: props.selectedTabName
                }
            })
        }}>
            <PlusIcon size={35} color="white" />
        </AnimatedPressable>
    )
}

export default NewRecordButton