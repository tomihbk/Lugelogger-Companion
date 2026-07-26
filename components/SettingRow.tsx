import React from "react"
import { TouchableOpacity, Text, View } from "react-native"
import tw from "~/tw.config"

interface SettingRowProps {
    icon: React.ReactNode
    label: string
    onPress: () => void
    color: string
    style?: any
    children?: React.ReactNode
}

const SettingRow = ({ icon, label, onPress, color, style, children }: SettingRowProps) => (
    <TouchableOpacity
        style={[
            tw`flex flex-row flex-wrap p-4 pr-2 rounded-3xl dark:bg-slate-800 dark:text-gray-200 border-blue-100 items-center`,
            style,
        ]}
        onPress={onPress}>
        {icon}
        <Text style={tw`flex-grow ml-6 text-base font-HKGrotesk-Medium dark:text-gray-200`}>{label}</Text>
        <View style={tw`mr-3 flex-row items-center`}>
            {children}
        </View>
    </TouchableOpacity>
)

export default SettingRow