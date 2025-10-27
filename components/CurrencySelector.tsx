import { FlashList } from "@shopify/flash-list"
import React, { useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    StatusBar,
} from "react-native"
import GlobalStateStore from "~/stores/globalStateStore"
import tw from "~/tw.config"

interface Currency {
    code: string
    name: string
    symbol: string
    flag: string
}

const currencies: Currency[] = [
    { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
    { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
    { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
    { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
    { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
    { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰" },
    { code: "PLN", name: "Polish Złoty", symbol: "zł", flag: "🇵🇱" },
    { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
]

interface CurrencySelectorProps {
    savedCurrencyCode?: string
    onCurrencyChange?: (currency: Currency) => void
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
    savedCurrencyCode,
    onCurrencyChange,
}) => {
    const { preferredCurrencySymbol, setPreferredCurrencySymbol } = GlobalStateStore((state) => state)

    // Find currency from saved code or preferredCurrencySymbol or default to USD
    const getInitialCurrency = (): Currency => {
        const codeToFind = savedCurrencyCode || preferredCurrencySymbol
        if (codeToFind) {
            const found = currencies.find((c) => c.code === codeToFind)
            if (found) return found
        }
        return currencies[0]
    }

    const [selectedCurrency, setSelectedCurrency] = useState<Currency>(getInitialCurrency())
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const handleSelect = (currency: Currency): void => {
        setSelectedCurrency(currency)
        setModalVisible(false)

        // Update global state
        setPreferredCurrencySymbol(currency.code)

        // Call the callback if provided
        if (onCurrencyChange) {
            onCurrencyChange(currency)
        }
    }

    const renderCurrencyItem = ({ item }: { item: Currency }) => (
        <TouchableOpacity
            style={tw`flex-row items-center justify-between px-4 py-3`}
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
        >
            <View style={tw`flex-row items-center gap-3`}>
                <Text style={tw`text-[28px]`}>{item.flag}</Text>
                <View style={tw`gap-0.5`}>
                    <Text style={tw`text-sm font-HKGrotesk-SemiBold text-black`}>{item.code}</Text>
                    <Text style={tw`text-xs text-gray-600 font-HKGrotesk-Regular`}>{item.name}</Text>
                </View>
            </View>
            {selectedCurrency.code === item.code && (
                <Text style={tw`text-xl font-semibold text-[#007AFF]`}>✓</Text>
            )}
        </TouchableOpacity>
    )

    const renderSeparator = () => <View style={tw`h-px bg-gray-50 ml-[68px]`} />

    return (
        <View>
            <TouchableOpacity
                style={tw`h-14 flex-row items-center justify-between bg-white border border-gray-200 rounded-lg px-4`}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
            >
                <View style={tw`flex-row items-center gap-3`}>
                    <Text style={tw`text-[28px]`}>{selectedCurrency.flag}</Text>
                    <View style={tw`gap-0.5`}>
                        <Text style={tw`text-sm text-black font-HKGrotesk-SemiBold`}>{selectedCurrency.code}</Text>
                        <Text style={tw`text-xs text-gray-600 font-HKGrotesk-Regular`}>{selectedCurrency.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={tw`flex-1 bg-white`}>
                    <StatusBar barStyle="dark-content" />
                    <View style={tw`flex-row items-center justify-between px-4 py-4 border-b border-gray-200`}>
                        <Text style={tw`text-lg font-HKGrotesk-SemiBold text-black`}>Select Currency</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={tw`px-2 py-1`}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Text style={tw`text-base font-HKGrotesk-SemiBold text-[#007AFF]`}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <FlashList
                        data={currencies}
                        renderItem={renderCurrencyItem}
                        keyExtractor={(item) => item.code}
                        ItemSeparatorComponent={renderSeparator}
                        keyboardShouldPersistTaps="handled"
                        estimatedItemSize={20}
                    />
                </SafeAreaView>
            </Modal>
        </View>
    )
}

export default CurrencySelector