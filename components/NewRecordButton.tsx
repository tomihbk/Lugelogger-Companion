import { TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { PlusIcon } from 'lucide-react-native'
import tw from '~/tw.config'

type NewRecordButtonPropType = {
    selectedButtonHexColor: string,
    selectedTabName: string,
    carId: string
}

const NewRecordButton = (props: NewRecordButtonPropType) => {
    return (
        <TouchableOpacity style={tw`rounded-full right-5 bottom-4 p-3 bg-[${props.selectedButtonHexColor}] ${props.selectedTabName == "home" ? 'hidden' : 'absolute'}`} onPress={() => {
            router.push({
                pathname: "/new-record/[id]",
                params: { id: props.carId, actionType: props.selectedTabName }
            })
        }}>
            <PlusIcon size={35} color="white" />
        </TouchableOpacity>
    )
}

export default NewRecordButton