import React, { useState } from "react"
import { ScrollView, View, Text, TouchableOpacity, Modal } from "react-native"
import { X } from "lucide-react-native"
import tw from "~/tw.config"
import { useTheme } from "~/hooks/useTheme"

type licenseType = {
    name: string
    version: string
    license: string
    author: string
    url: string
}

const licenses = [
    {
        name: "Expo SDK",
        version: "^51.0.32",
        license: "MIT",
        author: "Expo",
        url: "https://expo.dev"
    },
    {
        name: "React",
        version: "18.2.0",
        license: "MIT",
        author: "Meta Platforms, Inc.",
        url: "https://reactjs.org"
    },
    {
        name: "React Native",
        version: "0.74.5",
        license: "MIT",
        author: "Meta Platforms, Inc.",
        url: "https://reactnative.dev"
    },
    {
        name: "React Navigation",
        version: "^6.0.8",
        license: "MIT",
        author: "React Navigation Contributors",
        url: "https://reactnavigation.org"
    },
    {
        name: "Expo Router",
        version: "~3.5.14",
        license: "MIT",
        author: "Expo",
        url: "https://expo.github.io/router"
    },
    {
        name: "TanStack React Query",
        version: "^5.55.2",
        license: "MIT",
        author: "Tanner Linsley",
        url: "https://tanstack.com/query"
    },
    {
        name: "Axios",
        version: "^1.7.7",
        license: "MIT",
        author: "Matt Zabriskie",
        url: "https://axios-http.com"
    },
    {
        name: "Zustand",
        version: "^5.0.0-rc.2",
        license: "MIT",
        author: "Poimandres",
        url: "https://github.com/pmndrs/zustand"
    },
    {
        name: "React Hook Form",
        version: "^7.53.0",
        license: "MIT",
        author: "Beier Luo",
        url: "https://react-hook-form.com"
    },
    {
        name: "React Native Reanimated",
        version: "~3.10.1",
        license: "MIT",
        author: "Software Mansion",
        url: "https://docs.swmansion.com/react-native-reanimated"
    },
    {
        name: "React Native Gesture Handler",
        version: "~2.16.1",
        license: "MIT",
        author: "Software Mansion",
        url: "https://docs.swmansion.com/react-native-gesture-handler"
    },
    {
        name: "React Native SVG",
        version: "15.2.0",
        license: "MIT",
        author: "React Native Community",
        url: "https://github.com/software-mansion/react-native-svg"
    },
    {
        name: "Lucide React Native",
        version: "^0.441.0",
        license: "ISC",
        author: "Lucide Contributors",
        url: "https://lucide.dev"
    },
    {
        name: "React Native MMKV",
        version: "^2.12.2",
        license: "MIT",
        author: "Marc Rousavy",
        url: "https://github.com/mrousavy/react-native-mmkv"
    },
    {
        name: "Victory Native",
        version: "^41.17.4",
        license: "MIT",
        author: "Formidable Labs",
        url: "https://commerce.nearform.com/open-source/victory"
    },
    {
        name: "Shopify Flash List",
        version: "1.6.4",
        license: "MIT",
        author: "Shopify",
        url: "https://shopify.github.io/flash-list"
    },
    {
        name: "Shopify React Native Skia",
        version: "^1.2.3",
        license: "MIT",
        author: "Shopify",
        url: "https://shopify.github.io/react-native-skia"
    },
    {
        name: "React Native Date Picker",
        version: "^5.0.12",
        license: "MIT",
        author: "Henrik Raitasola",
        url: "https://github.com/henninghall/react-native-date-picker"
    },
    {
        name: "twrnc",
        version: "^4.5.1",
        license: "MIT",
        author: "Jared Henderson",
        url: "https://github.com/jaredh159/tailwind-react-native-classnames"
    },
    {
        name: "i18next",
        version: "^23.15.1",
        license: "MIT",
        author: "i18next",
        url: "https://www.i18next.com"
    },
    {
        name: "react-i18next",
        version: "^15.0.1",
        license: "MIT",
        author: "i18next",
        url: "https://react.i18next.com"
    },
    {
        name: "Polished",
        version: "^4.3.1",
        license: "MIT",
        author: "Styled Components",
        url: "https://polished.js.org"
    },
    {
        name: "base-64",
        version: "^1.0.0",
        license: "MIT",
        author: "Mathias Bynens",
        url: "https://github.com/mathiasbynens/base64"
    },
    {
        name: "utf8",
        version: "^3.0.0",
        license: "MIT",
        author: "Mathias Bynens",
        url: "https://github.com/mathiasbynens/utf8.js"
    }
]

const MIT_LICENSE = `MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

const ISC_LICENSE = `ISC License

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`

export default function LicensesScreen() {
    const [selectedLicense, setSelectedLicense] = useState<licenseType>()
    const [modalVisible, setModalVisible] = useState(false)
    const theme = useTheme()

    const showLicense = (library: licenseType) => {
        setSelectedLicense(library)
        setModalVisible(true)
    }

    const getLicenseText = (licenseType: string) => {
        switch (licenseType) {
            case "MIT":
                return MIT_LICENSE
            case "ISC":
                return ISC_LICENSE
            default:
                return "License text not available."
        }
    }

    return (
        <View style={tw`flex mb-3`}>
            <ScrollView>
                <Text style={[tw`text-sm font-HKGrotesk-Regular mb-6`, { color: theme.colors.text.secondary }]}>
                    This app uses the following open source libraries. Tap any library to view its full license.
                </Text>

                {licenses.map((lib, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => showLicense(lib)}
                        style={[tw`rounded-xl p-4 mb-3`, { backgroundColor: theme.colors.surface.card, borderColor: theme.colors.border.default, borderWidth: 1 }]}>
                        <View style={tw`flex-row justify-between items-start mb-1`}>
                            <Text style={[tw`text-base font-HKGrotesk-Bold flex-1`, { color: theme.colors.text.primary }]}>
                                {lib.name}
                            </Text>
                            <View style={tw`bg-blue-100 px-2 py-1 rounded-sm`}>
                                <Text style={[tw`text-xs font-HKGrotesk-Bold`, { color: theme.colors.text.link }]}>
                                    {lib.license}
                                </Text>
                            </View>
                        </View>
                        {/* <Text style={[tw`text-sm font-HKGrotesk-Regular mb-1`, { color: theme.colors.text.secondary }]}>
                            Version: {lib.version}
                        </Text> */}
                        <Text style={[tw`text-xs font-HKGrotesk-Regular`, { color: theme.colors.text.secondary }]}>
                            by {lib.author}
                        </Text>
                    </TouchableOpacity>
                ))}

                <View style={[tw`mt-4 mb-8 p-4 rounded-xl`, { backgroundColor: theme.colors.background.subtle }]}>
                    <Text style={[tw`text-base font-HKGrotesk-Bold mb-2`, { color: theme.colors.text.primary }]}>
                        About These Licenses
                    </Text>
                    <Text style={[tw`font-HKGrotesk-Regular leading-5`, { color: theme.colors.text.secondary }]}>
                        All libraries listed here are open source and used in accordance with their respective licenses.
                        We're grateful to all the developers and organizations who make their work freely available.
                    </Text>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={[tw`flex-1 justify-end`, { backgroundColor: theme.colors.background.default + 'CC' }]}>
                    <View style={[tw`rounded-t-3xl h-4/5 shadow-lg`, { backgroundColor: theme.colors.background.default, shadowColor: theme.colors.brand.primary }]}>
                        {/* Header */}
                        <View style={[tw`flex-row justify-between items-center p-5 border-b`, { borderColor: theme.colors.border.default }]}>
                            <View style={tw`flex-1 pr-4`}>
                                <Text style={[tw`text-xl font-HKGrotesk-Bold`, { color: theme.colors.text.primary }]}>
                                    {selectedLicense?.name}
                                </Text>
                                <Text style={[tw`text-sm font-HKGrotesk-Regular`, { color: theme.colors.text.secondary }]}>
                                    {selectedLicense?.license} License
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={[tw`rounded-full p-2`, { backgroundColor: theme.colors.background.subtle }]}>
                                <X size={24} color={theme.colors.text.secondary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={tw`flex-1 px-5 py-4`}>
                            <View style={tw`mb-4`}>
                                <Text style={[tw`text-sm font-HKGrotesk-Bold mb-1`, { color: theme.colors.text.primary }]}>
                                    Author
                                </Text>
                                <Text style={[tw`text-sm font-HKGrotesk-Regular`, { color: theme.colors.text.secondary }]}>
                                    {selectedLicense?.author}
                                </Text>
                            </View>

                            {/* <View style={tw`mb-4`}>
                                <Text style={[tw`text-sm font-HKGrotesk-Bold mb-1`, { color: theme.colors.text.primary }]}>
                                    Version
                                </Text>
                                <Text style={[tw`text-sm font-HKGrotesk-Regular`, { color: theme.colors.text.secondary }]}>
                                    {selectedLicense?.version}
                                </Text>
                            </View> */}

                            <View style={tw`mb-6`}>
                                <Text style={[tw`text-sm font-HKGrotesk-Bold mb-2`, { color: theme.colors.text.primary }]}>
                                    Full License Text
                                </Text>
                                <View style={[tw`rounded-xl p-4`, { backgroundColor: theme.colors.background.subtle }]}>
                                    <Text style={[tw`text-xs font-HKGrotesk-Regular leading-5`, { color: theme.colors.text.secondary }]}>
                                        {getLicenseText(selectedLicense?.license)}
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    )
}