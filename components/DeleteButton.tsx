import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import { Trash2 } from 'lucide-react-native'

interface DeleteButtonProps {
    onPress: () => void;
}

const DeleteButton = ({ onPress }: DeleteButtonProps) => {
    return (
        <TouchableOpacity
            style={tw`mt-2 p-3 bg-red-500 rounded-2xl flex-row justify-center items-center`}
            onPress={onPress}>
            <Trash2 size={20} color="white" />
            <Text style={tw`text-white font-HKGrotesk-Medium text-base ml-2`}>Delete Record</Text>
        </TouchableOpacity>
    )
}

export default DeleteButton 