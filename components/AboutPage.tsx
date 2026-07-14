import React from "react"
import { ScrollView, View, Text, Linking, TouchableOpacity } from "react-native"
import { useTheme } from "~/hooks/useTheme";
import tw from "~/tw.config"

export default function AboutScreen() {
        const theme = useTheme()
    return (
        <ScrollView style={tw`flex flex-col`}>
            <View style={tw`mb-3`}>
                <Text style={[tw`text-2xl font-HKGrotesk-Bold mb-2`, { color: theme.colors.text.primary }  ]}>
                    LubeLogger Mobile
                    {/* TODO Rename app */}
                </Text>
                <Text style={[tw`text-base font-HKGrotesk-Regular leading-6 mb-1`, { color: theme.colors.text.secondary }]}>
                    A beautifully crafted mobile experience for your vehicle maintenance.
                    This React Native app transforms LubeLogger's powerful features into a modern, intuitive, and mobile first experience.
                </Text>
            </View>
            {/* // TODO Make sure to add website or github or other related info */}
            <Text style={[tw`text-xl font-HKGrotesk-Bold mb-3`, { color: theme.colors.text.primary }]}>
                Using this app
            </Text>
            <Text style={[tw`text-base font-HKGrotesk-Regular leading-6 mb-3`, { color: theme.colors.text.secondary }]}>
                While LubeLogger provides excellent web-based tools, this app
                reimagines the entire experience from the ground up:
            </Text>

            <View style={[tw`rounded-xl p-4 mb-4`, { backgroundColor: theme.colors.background.subtle }]}>
                <View style={tw`mb-2`}>
                    <Text style={[tw`text-base font-HKGrotesk-Bold mb-1`, { color: theme.colors.text.primary }]}>
                        {"\u27E1"} Beautiful, Modern Design
                    </Text>
                    <Text style={[tw`text-sm font-HKGrotesk-Regular leading-5`, { color: theme.colors.text.secondary }]}>
                        Clean cards, smooth animations, and a carefully crafted color
                        palette that makes tracking maintenance actually enjoyable.
                    </Text>
                </View>

                <View style={tw`mb-2`}>
                    <Text style={[tw`text-base font-HKGrotesk-Bold mb-1`, { color: theme.colors.text.primary }]}>
                        {"\u27E1"} Native Mobile Experience
                    </Text>
                    <Text style={[tw`text-sm font-HKGrotesk-Regular leading-5`, { color: theme.colors.text.secondary }]}>
                        Built with React Native for true native performance. Smooth
                        scrolling, instant responses, and gestures that feel natural.
                    </Text>
                </View>

                <View style={tw`mb-2`}>
                    <Text style={[tw`text-base font-HKGrotesk-Bold mb-1`, { color: theme.colors.text.primary }]}>
                        {"\u27E1"} Optimized for Speed
                    </Text>
                    <Text style={[tw`text-sm font-HKGrotesk-Regular leading-5`, { color: theme.colors.text.secondary }]}>
                        Fast loading, efficient data handling, and smart caching mean
                        your vehicle data is always at your fingertips.
                    </Text>
                </View>

                <View>
                    <Text style={[tw`text-base font-HKGrotesk-Bold mb-1`, { color: theme.colors.text.primary }]}>
                        {"\u27E1"} Rich Visual Experience
                    </Text>
                    <Text style={[tw`text-sm font-HKGrotesk-Regular leading-5`, { color: theme.colors.text.secondary }]}>
                        Charts, graphs, and visual indicators that help you understand
                        your vehicle's health and maintenance patterns at a glance.
                    </Text>
                </View>
            </View>
            {/* How It Works */}
            <Text style={[tw`text-xl font-HKGrotesk-Bold mt-4 mb-3`, { color: theme.colors.text.primary }]}>
                How It Works
            </Text>
            <Text style={[tw`text-base font-HKGrotesk-Regular leading-6 mb-2`, { color: theme.colors.text.secondary }]}>
                This app connects directly to your self-hosted LubeLogger server:
            </Text>
            <View style={tw`pl-3 mb-4`}>
                <Text style={[tw`text-base font-HKGrotesk-Regular leading-6`, { color: theme.colors.text.secondary }]}>
                    1. Set up LubeLogger on your server (Windows, Linux, or Docker)
                </Text>
                <Text style={[tw`text-base font-HKGrotesk-Regular leading-6`, { color: theme.colors.text.secondary }]}>
                    2. Enter your server URL and credentials in this app
                </Text>
                <Text style={[tw`text-base font-HKGrotesk-Regular leading-6`, { color: theme.colors.text.secondary }]}>
                    3. ????
                </Text>
                <Text style={[tw`text-base font-HKGrotesk-Regular leading-6`, { color: theme.colors.text.secondary }]}>
                    4. Profit
                </Text>
            </View>
            <Text style={[tw`text-sm font-HKGrotesk-Regular leading-5 mb-4`, { color: theme.colors.text.secondary }]}>
                Your data stays on your server—this app simply provides a better way
                to access and interact with it on your phone.
            </Text>

            {/* About LubeLogger */}
            <TouchableOpacity onPress={() => Linking.openURL("https://github.com/hargata/lubelog")}>
                <Text style={[tw`text-xl font-HKGrotesk-Bold mt-4 mb-3`, { color: theme.colors.text.link }]}>
                    About LubeLogger ↗
                </Text>
            </TouchableOpacity>
            <Text style={[tw`text-base font-HKGrotesk-Regular leading-6 mb-3`, { color: theme.colors.text.secondary }]}>
                LubeLogger is the powerful, open-source backend that makes all of this
                possible. Created by Hargata Softworks, it's a self-hosted platform
                that replaces messy spreadsheets and scattered receipts with organized,
                collaborative vehicle maintenance tracking.
            </Text>

            {/* Open Source */}
            <Text style={[tw`text-xl font-HKGrotesk-Bold mt-4 mb-3`, { color: theme.colors.text.primary }]}>
                Open Source & Free
            </Text>
            <Text style={[tw`text-base font-HKGrotesk-Regular leading-6 mb-3`, { color: theme.colors.text.secondary }]}>
                LubeLogger is completely free and open-source, licensed under MIT for
                both personal and commercial use. No subscriptions, no tracking, no
                cloud dependencies—just pure, self-hosted vehicle maintenance.
            </Text>
            <Text style={[tw`text-sm font-HKGrotesk-Regular leading-5 mb-4`, { color: theme.colors.text.primary }]}>
                If you love the ecosystem, consider supporting the LubeLogger project
                on Patreon or making a donation to help keep development going.
            </Text>

            {/* Resources */}
            <Text style={[tw`text-xl font-HKGrotesk-Bold mt-4 mb-3`, { color: theme.colors.text.primary }]}>Resources</Text>
            <View style={tw`mb-4`}>
                <Text onPress={() => Linking.openURL("https://github.com/hargata/lubelog")} style={[tw`text-base font-HKGrotesk-Regular underline`, { color: theme.colors.text.link }]}>
                    GitHub Repository ↗
                </Text>
                <Text onPress={() => Linking.openURL("https://docs.lubelogger.com")} style={[tw`text-base font-HKGrotesk-Regular underline`, { color: theme.colors.text.link }]}>
                    Documentation ↗
                </Text>
                <Text onPress={() => Linking.openURL("mailto:hargatasoftworks@gmail.com")} style={[tw`text-base font-HKGrotesk-Regular underline`, { color: theme.colors.text.link }]}>
                    Contact Hargata Softworks ↗
                </Text>
            </View>

            {/* Important Note */}
            <View style={[tw`rounded-xl p-4 mb-4 mt-2`, { backgroundColor: theme.colors.status.remark }]}>
                <Text style={[tw`text-base font-HKGrotesk-Bold mb-2`, { color: theme.colors.text.primary }]}>
                    {"\u27C1"} Important Note
                </Text>
                <Text style={[tw`text-sm font-HKGrotesk-Regular leading-5`, { color: theme.colors.text.secondary }]}>
                    This mobile app is an independent project and not officially affiliated
                    with LubeLogger or Hargata Softworks. It's built by enthusiasts who
                    wanted a better mobile experience for LubeLogger's excellent platform.
                </Text>
            </View>

            {/* Footer */}
            <View style={tw`items-center py-6 mb-4`}>
                <Text style={[tw`text-sm font-HKGrotesk-Regular mb-1`, { color: theme.colors.text.secondary }]}>
                    Made with ❤️ for vehicle enthusiasts
                </Text>
                <Text style={[tw`text-xs font-HKGrotesk-Regular`, { color: theme.colors.text.secondary }]}>
                    LubeLogger by // TODO Insert App dev or company name
                </Text>
            </View>
        </ScrollView>
    );
}