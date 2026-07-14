import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { encode as base64Encode } from 'base-64'
import tw from '~/tw.config'
import ServerSettingsStore from '~/stores/serverSettingsStore'
import { ENDPOINT } from '~/api/user-info'
import { refreshAllQueries } from '~/hooks/api/reset-queries'
import { useTheme } from '~/hooks/useTheme'
import { EyeIcon, EyeOffIcon, Icon } from 'lucide-react-native'

type ServerSettingsProps = {
    initial?: { serverURL?: string; username?: string; password?: string }
    buttonColor?: string
    onSave?: () => void
}

const ServerSettings: React.FC<ServerSettingsProps> = ({
    initial = {},
    buttonColor = '#0743f7',
    onSave
}) => {
    const { getSettings, setSettings } = ServerSettingsStore()
    const theme = useTheme()
    const savedSettings = getSettings()
    const { control, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            serverURL: savedSettings?.serverURL || initial.serverURL || process.env.EXPO_PUBLIC_API_URL,
            username: savedSettings?.username || initial.username || process.env.EXPO_PUBLIC_API_USERNAME,
            password: savedSettings?.password || initial.password || process.env.EXPO_PUBLIC_API_PASSWORD,
        },
        mode: 'onChange',
    })

    const [hasTested, setHasTested] = useState(false)
    const [isTesting, setIsTesting] = useState(false)
    const [testError, setTestError] = useState<string | null>(null)
    const [testUser, setTestUser] = useState<any | null>(null)
    const [hidePass, setHidePass] = useState(true)

    const handleTestConnection = async () => {
        const { serverURL, username, password } = getValues()
        setHasTested(true)
        setIsTesting(true)
        setTestError(null)
        setTestUser(null)

        if (!serverURL) {
            setTestError('Server URL is required')
            setIsTesting(false)
            return
        }

        const url = serverURL.replace(/\/+$/, '') + ENDPOINT
        try {
            const headers: Record<string, string> = { Accept: 'application/json' }
            if (username || password) {
                const token = base64Encode(`${username}:${password}`)
                headers['Authorization'] = `Basic ${token}`
            }

            const res = await fetch(url, { method: 'GET', headers })
            const text = await res.text()
            if (!res.ok) {
                setTestError(`${res.status} - ${text}`)
                setIsTesting(false)
                return
            }

            try {
                const data = JSON.parse(text)
                setTestUser(data)
            } catch {
                setTestUser({ raw: text })
            }
        } catch (err: any) {
            setTestError(err?.message ?? String(err))
        } finally {
            setIsTesting(false)
        }
    }

    const handleSave = (values: { serverURL: string; username: string; password: string }) => {
        setSettings(values)
        // Refresh all queries when server changes
        refreshAllQueries()
        if (onSave) onSave()
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`p-4`} keyboardShouldPersistTaps={"handled"}>
            <View>
                <Text style={[tw`font-HKGrotesk-SemiBold text-base mb-1`, { color: theme.colors.text.primary }]}>Server Link</Text>
                <Controller
                    control={control}
                    name="serverURL"
                    rules={{
                        required: 'Server URL is required'
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${buttonColor}]/20 border p-2 mb-2 ${errors.serverURL && 'border-red-700' || ''}`, { backgroundColor: theme.colors.background.field, color: theme.colors.text.primary, borderColor: theme.colors.border.default }]}
                            onChangeText={onChange}
                            value={value}
                            placeholder="https://192.168.1.10:5000"
                            autoCapitalize="none"
                            keyboardType="url"
                        />
                    )}
                />
                {errors.serverURL && <Text style={tw`text-right text-red-700`}>{errors.serverURL.message}</Text>}

                <Text style={[tw`font-HKGrotesk-SemiBold text-base mb-1 mt-3`, { color: theme.colors.text.primary }]}>Username</Text>
                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${buttonColor}]/20 border p-2 mb-2`, { backgroundColor: theme.colors.background.field, color: theme.colors.text.primary, borderColor: theme.colors.border.default }]}
                            onChangeText={onChange}
                            value={value}
                            placeholder="username"
                            autoCapitalize="none"
                        />
                    )}
                />

                <Text style={[tw`font-HKGrotesk-SemiBold text-base mb-1 mt-3`, { color: theme.colors.text.primary }]}>Password</Text>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <>

                            <TextInput
                                style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2`, { backgroundColor: theme.colors.background.field, color: theme.colors.text.primary, borderColor: theme.colors.border.default }]}
                                onChangeText={onChange}
                                value={value}
                                placeholder="password"
                                secureTextEntry={hidePass}
                            />
                            <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                                {hidePass ? <EyeOffIcon size={24}/> : <EyeIcon size={24}/>}
                            </TouchableOpacity>
                        </>
                    )}
                />

                <View style={tw`flex-col justify-between mt-4 gap-5`}>
                    <Pressable onPress={handleTestConnection} style={tw`flex-1`}>
                        <Text style={[tw`p-3 text-center rounded-full font-HKGrotesk-Medium text-white`, { backgroundColor: theme.colors.brand.primary + "80" }]}>Test Connection</Text>
                    </Pressable>
                    <Pressable onPress={handleSubmit(handleSave)} style={tw`flex-1`}>
                        <Text style={[tw`p-3 text-white font-HKGrotesk-Medium rounded-full text-base text-center`, { backgroundColor: theme.colors.brand.primary }]}>Save</Text>
                    </Pressable>
                </View>
            </View>

            <View style={tw`mt-2`}>
                {hasTested && isTesting && (
                    <View style={tw`flex-row justify-center mt-2 `}>
                        <ActivityIndicator color={buttonColor} />
                        <Text style={[tw`ml-3 text-sm font-HKGrotesk-Italic`, { color: theme.colors.text.primary }]}>Testing connection...</Text>
                    </View>
                )}

                {hasTested && !isTesting && testUser && (
                    <View style={[tw`mt-3 p-3 flex-row items-start rounded-md border`, { backgroundColor: theme.colors.status.successful + "40", borderColor: theme.colors.status.successful + "40" }]} >
                        <View style={[tw`w-3 h-3 rounded-full mr-3 mt-1`, { backgroundColor: theme.colors.status.successful }]} />
                        <View style={tw`flex-1`}>
                            <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.status.successful }]}>Connection successful</Text>
                            <Text style={[tw`text-sm`, { color: theme.colors.status.successful }]}>Welcome {testUser.name ?? testUser.username ?? testUser.raw ?? 'user'}</Text>
                        </View>
                    </View>
                )}

                {hasTested && !isTesting && testError && (
                    <View style={[tw`mt-3 p-3 flex-row items-start rounded-md border`, { backgroundColor: theme.colors.status.danger + "20", borderColor: theme.colors.status.danger + "40" }]} >
                        <View style={[tw`w-3 h-3 rounded-full mr-3 mt-1`, { backgroundColor: theme.colors.status.danger }]} />
                        <View style={tw`flex-1`}>
                            <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.status.danger }]}>Connection failed</Text>
                            <Text style={[tw`text-sm`, { color: theme.colors.status.danger }]}>{testError}</Text>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default ServerSettings