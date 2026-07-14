import React from "react"
import { ScrollView, TouchableOpacity, Text, View } from "react-native"
import { Sun, Moon, Smartphone, LucideIcon } from "lucide-react-native"
import tw from "~/tw.config"
import { useTheme } from "~/hooks/useTheme"

type ThemeSettingProps = {
    colorSchemeStore: 'light' | 'dark' | 'system'
    setColorSchemeStore: (scheme: "light" | "dark") => void
    setModalThemeVisible: (visible: boolean) => void
    modalThemeVisible: boolean
}

type ThemeOptionProps = {
    icon: LucideIcon
    label: string
    description: string
    isSelected: boolean
    onPress: () => void
    iconColor: string
}

const ThemeOption = ({ icon: Icon, label, description, isSelected, onPress, iconColor }: ThemeOptionProps) => {
    const theme = useTheme()

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                tw`mb-3 rounded-3xl p-5 border-2`,
                {
                    backgroundColor: isSelected
                        ? theme.colors.background.subtle
                        : theme.colors.background.default,
                    borderColor: isSelected
                        ? theme.colors.border.selected
                        : theme.colors.border.unselected,
                },
            ]}
        >
            <View style={tw`flex-row items-center mb-2`}>
                <View style={[
                    tw`rounded-full p-3`,
                    isSelected ? tw`bg-blue-500` : tw`bg-gray-100`
                ]}>
                    <Icon
                        size={24}
                        color={isSelected ? "#ffffff" : iconColor}
                    />
                </View>
                <View style={tw`flex-1 ml-4`}>
                    <Text style={[tw`text-lg font-HKGrotesk-Bold`, { color: isSelected ? theme.colors.text.selected : theme.colors.text.primary }]}>
                        {label}
                    </Text>
                    <Text style={[tw`text-sm font-HKGrotesk-Regular`, { color: isSelected ? theme.colors.text.selected : theme.colors.text.primary }]} mt-1>
                        {description}
                    </Text>
                </View>
                {isSelected && (
                    <View style={tw`bg-blue-500 rounded-full w-6 h-6 items-center justify-center`}>
                        <Text style={tw`text-white font-HKGrotesk-Bold text-xs`}>✓</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

const ThemeSetting = ({ colorSchemeStore, setColorSchemeStore, setModalThemeVisible, modalThemeVisible }: ThemeSettingProps) => {
    const theme = useTheme()
    const themes = [
        {
            id: 'light',
            icon: Sun,
            label: 'Light',
            description: 'Clean and bright interface',
            iconColor: '#f59e0b'
        },
        {
            id: 'dark',
            icon: Moon,
            label: 'Dark',
            description: 'Easy on the eyes at night',
            iconColor: '#6366f1'
        },
        // {
        //     id: 'system',
        //     icon: Smartphone,
        //     label: 'System',
        //     description: 'Follow device settings',
        //     iconColor: '#8b5cf6'
        // }
    ]

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[tw`text-sm font-HKGrotesk-Regular mb-6`, { color: theme.colors.text.secondary }]}>
                Select your preferred color scheme for the app
            </Text>
            {themes.map((theme) => (
                <ThemeOption
                    key={theme.id}
                    icon={theme.icon}
                    label={theme.label}
                    description={theme.description}
                    iconColor={theme.iconColor}
                    isSelected={colorSchemeStore === theme.id}
                    onPress={() => {
                        setColorSchemeStore(theme.id)
                        setModalThemeVisible(!modalThemeVisible)
                    }}
                />
            ))}
        </ScrollView>
    )
}

export default ThemeSetting