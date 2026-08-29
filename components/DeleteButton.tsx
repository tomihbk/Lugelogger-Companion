import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import { Trash2 } from 'lucide-react-native'
import { useTheme } from '~/hooks/useTheme';
import AnimatedPressable from './Animations/AnimatedPressable';

interface DeleteButtonProps {
    onPress: () => void;
}

const DeleteButton = ({ onPress }: DeleteButtonProps) => {
    const theme = useTheme()

    return (
        <AnimatedPressable
            style={[tw`mt-2 p-3 rounded-2xl flex-row justify-center items-center`, { backgroundColor: theme.colors.status.danger + "90"}]}
            onPress={onPress}>
            <Trash2 size={20} color="white" />
            <Text style={tw`text-white font-HKGrotesk-Medium text-base ml-2`}>Delete Record</Text>
        </AnimatedPressable>
    )
}

export default DeleteButton 