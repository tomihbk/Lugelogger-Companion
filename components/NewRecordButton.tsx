import { TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { PlusIcon } from 'lucide-react-native'
import tw from '~/tw.config'

type NewRecordButtonPropType = {
    selectedButtonHexColor: string,
    selectedTabName: string,
    carId: string,
    lastOdometer?: string
}

const NewRecordButton = (props: NewRecordButtonPropType) => {
    return (
        <TouchableOpacity style={tw`rounded-full right-5 bottom-10 p-3 z-50 shadow-lg shadow-[${props.selectedButtonHexColor}] bg-[${props.selectedButtonHexColor}] ${props.selectedTabName == "home" ? 'hidden' : 'absolute'}`} onPress={() => {
            router.push({
                pathname: "/new-record/[id]",
                params: {
                    id: props.carId,
                    actionType: props.selectedTabName,
                    lastOdometer: props.lastOdometer
                }
            })
        }}>
            <PlusIcon size={35} color="white" />
        </TouchableOpacity>
    )
}

export default NewRecordButton