import React from "react"
import { ScrollView, View, Text, Linking, TouchableOpacity } from "react-native"
import tw from "~/tw.config"

export default function AboutScreen() {
    return (
        <ScrollView style={tw`flex flex-col`}>
            {/* Hero Section */}
            <View style={tw`mb-3`}>
                <Text style={tw`text-2xl font-HKGrotesk-Bold mb-2`}>
                    LubeLogger Mobile
                    {/* TODO Rename app */}
                </Text>
                <Text style={tw`text-gray-600 text-base font-HKGrotesk-Regular leading-6 mb-1`}>
                    A beautifully crafted mobile experience for your vehicle maintenance.
                    This React Native app transforms LubeLogger's powerful features into a modern, intuitive, and mobile first experience.
                </Text>
            </View>
            {/* // TODO Make sure to add website or github or other related info */}
            {/* What Makes This App Special */}
            <Text style={tw`text-xl font-HKGrotesk-Bold mb-3`}>
                Using this app
            </Text>
            <Text style={tw`text-gray-600 text-base font-HKGrotesk-Regular leading-6 mb-3`}>
                While LubeLogger provides excellent web-based tools, this app
                reimagines the entire experience from the ground up:
            </Text>

            <View style={tw`bg-blue-50 rounded-xl p-4 mb-4`}>
                <View style={tw`mb-2`}>
                    <Text style={tw`text-base font-HKGrotesk-Bold mb-1`}>
                        🎨 Beautiful, Modern Design
                    </Text>
                    <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-700`}>
                        Clean cards, smooth animations, and a carefully crafted color
                        palette that makes tracking maintenance actually enjoyable.
                    </Text>
                </View>

                <View style={tw`mb-2`}>
                    <Text style={tw`text-base font-HKGrotesk-Bold mb-1`}>
                        📱 Native Mobile Experience
                    </Text>
                    <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-700`}>
                        Built with React Native for true native performance. Smooth
                        scrolling, instant responses, and gestures that feel natural.
                    </Text>
                </View>

                <View style={tw`mb-2`}>
                    <Text style={tw`text-base font-HKGrotesk-Bold mb-1`}>
                        🚀 Optimized for Speed
                    </Text>
                    <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-700`}>
                        Fast loading, efficient data handling, and smart caching mean
                        your vehicle data is always at your fingertips.
                    </Text>
                </View>

                <View>
                    <Text style={tw`text-base font-HKGrotesk-Bold mb-1`}>
                        ✨ Rich Visual Experience
                    </Text>
                    <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-700`}>
                        Charts, graphs, and visual indicators that help you understand
                        your vehicle's health and maintenance patterns at a glance.
                    </Text>
                </View>
            </View>

            {/* Key Features of This App */}
            {/* <Text style={tw`text-xl font-HKGrotesk-Bold mt-4 mb-3`}>
                Key Features
            </Text>
            
            <View style={tw`mb-4`}>
                <Text style={tw`text-base font-HKGrotesk-Bold mb-2`}>
                    Smart Dashboard
                </Text>
                <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-700 mb-3`}>
                    See all your vehicles at once with visual status indicators, upcoming 
                    maintenance alerts, and quick stats. Tap any vehicle for detailed insights.
                </Text>

                <Text style={tw`text-base font-HKGrotesk-Bold mb-2`}>
                    Intuitive Navigation
                </Text>
                <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-700 mb-3`}>
                    Swipe between sections, pull to refresh, and use bottom sheet modals 
                    for quick actions. Everything is designed to be thumb-friendly.
                </Text>

                <Text style={tw`text-base font-HKGrotesk-Bold mb-2`}>
                    Visual Records Timeline
                </Text>
                <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-700 mb-3`}>
                    Browse your service history with a beautiful timeline view. Filter by 
                    type, search instantly, and see detailed information with a single tap.
                </Text>

                <Text style={tw`text-base font-HKGrotesk-Bold mb-2`}>
                    Interactive Charts
                </Text>
                <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-700 mb-3`}>
                    Fuel economy trends, cost breakdowns, and maintenance patterns 
                    visualized with engaging, touch-friendly charts.
                </Text>

                <Text style={tw`text-base font-HKGrotesk-Bold mb-2`}>
                    Quick Actions
                </Text>
                <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-700`}>
                    Add new records, mark reminders as complete, or log fuel fill-ups 
                    with streamlined forms optimized for mobile input.
                </Text>
            </View> */}

            {/* How It Works */}
            <Text style={tw`text-xl font-HKGrotesk-Bold mt-4 mb-3`}>
                How It Works
            </Text>
            <Text style={tw`text-gray-600 text-base font-HKGrotesk-Regular leading-6 mb-2`}>
                This app connects directly to your self-hosted LubeLogger server:
            </Text>
            <View style={tw`pl-3 mb-4`}>
                <Text style={tw`text-gray-600 text-base font-HKGrotesk-Regular leading-6`}>
                    1. Set up LubeLogger on your server (Windows, Linux, or Docker)
                </Text>
                <Text style={tw`text-gray-600 text-base font-HKGrotesk-Regular leading-6`}>
                    2. Enter your server URL and credentials in this app
                </Text>
                <Text style={tw`text-gray-600 text-base font-HKGrotesk-Regular leading-6`}>
                    3. ????
                </Text>
                <Text style={tw`text-gray-600 text-base font-HKGrotesk-Regular leading-6`}>
                    4. Profit
                </Text>
            </View>
            <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-600 mb-4`}>
                Your data stays on your server—this app simply provides a better way
                to access and interact with it on your phone.
            </Text>

            {/* About LubeLogger */}
            <TouchableOpacity onPress={() => Linking.openURL("https://github.com/hargata/lubelog")}>
                <Text style={tw`text-xl font-HKGrotesk-Bold mt-4 mb-3 text-blue-600`}>
                    About LubeLogger ↗
                </Text>
            </TouchableOpacity>
            <Text style={tw`text-gray-600 text-base font-HKGrotesk-Regular leading-6 mb-3`}>
                LubeLogger is the powerful, open-source backend that makes all of this
                possible. Created by Hargata Softworks, it's a self-hosted platform
                that replaces messy spreadsheets and scattered receipts with organized,
                collaborative vehicle maintenance tracking.
            </Text>

            {/* Open Source */}
            <Text style={tw`text-xl font-HKGrotesk-Bold mt-4 mb-3`}>
                Open Source & Free
            </Text>
            <Text style={tw`text-gray-600 text-base font-HKGrotesk-Regular leading-6 mb-3`}>
                LubeLogger is completely free and open-source, licensed under MIT for
                both personal and commercial use. No subscriptions, no tracking, no
                cloud dependencies—just pure, self-hosted vehicle maintenance.
            </Text>
            <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-600 mb-4`}>
                If you love the ecosystem, consider supporting the LubeLogger project
                on Patreon or making a donation to help keep development going.
            </Text>

            {/* Resources */}
            <Text style={tw`text-xl font-HKGrotesk-Bold mt-4 mb-3`}>Resources</Text>
            <View style={tw`mb-4`}>
                <Text onPress={() => Linking.openURL("https://github.com/hargata/lubelog")} style={tw`text-gray-600 text-base font-HKGrotesk-Regular text-blue-600 underline`}>
                    GitHub Repository ↗
                </Text>
                <Text onPress={() => Linking.openURL("https://docs.lubelogger.com")} style={tw`text-gray-600 text-base font-HKGrotesk-Regular text-blue-600 underline`}>
                    Documentation ↗
                </Text>
                <Text onPress={() => Linking.openURL("mailto:hargatasoftworks@gmail.com")} style={tw`text-gray-600 text-base font-HKGrotesk-Regular text-blue-600 underline`}>
                    Contact Hargata Softworks ↗
                </Text>
            </View>

            {/* Important Note */}
            <View style={tw`bg-yellow-50 rounded-xl p-4 mb-4 mt-2`}>
                <Text style={tw`text-base font-HKGrotesk-Bold mb-2`}>
                    ⚠️ Important Note
                </Text>
                <Text style={tw`text-sm font-HKGrotesk-Regular leading-5 text-gray-700`}>
                    This mobile app is an independent project and not officially affiliated
                    with LubeLogger or Hargata Softworks. It's built by enthusiasts who
                    wanted a better mobile experience for LubeLogger's excellent platform.
                </Text>
            </View>

            {/* Footer */}
            <View style={tw`items-center py-6 mb-4`}>
                <Text style={tw`text-sm font-HKGrotesk-Regular text-gray-500 mb-1`}>
                    Made with ❤️ for vehicle enthusiasts
                </Text>
                <Text style={tw`text-xs font-HKGrotesk-Regular text-gray-400`}>
                    LubeLogger by // TODO Insert App dev or company name
                </Text>
            </View>
        </ScrollView>
    );
}