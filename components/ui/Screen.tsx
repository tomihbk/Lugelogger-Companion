import React, { ReactNode } from "react"
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
    ViewStyle,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "~/hooks/useTheme"
import tw from "~/tw.config"

type ScreenProps = {
    children: ReactNode
    scrollable?: boolean
    keyboardAware?: boolean
    contentStyle?: ViewStyle
}

const Screen = ({
    children,
    scrollable = false,
    keyboardAware = false,
    contentStyle,
}: ScreenProps) => {
    const theme = useTheme()

    const content = scrollable ? (
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[tw`flex-grow px-5 py-0`, contentStyle]}>
            {children}
        </ScrollView>
    ) : (
        <View style={[tw`flex-1 px-5 py-0`, contentStyle]}>
            {children}
        </View>
    )

    return (
        <SafeAreaView
            style={[tw`flex-1`, { backgroundColor: theme.colors.background.default }]}>
            {keyboardAware ? (
                <KeyboardAvoidingView
                    style={tw`flex-1`}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}>
                    {content}
                </KeyboardAvoidingView>
            ) : (
                content
            )}
        </SafeAreaView>
    )
}

export default Screen