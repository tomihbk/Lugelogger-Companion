import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { encode as base64Encode } from 'base-64'
import tw from '~/tw.config'
import ServerSettingsStore from '~/stores/serverSettingsStore'
import { ENDPOINT } from '~/api/user-info'
import { refreshAllQueries } from '~/hooks/api/reset-queries'
import { useTheme } from '~/hooks/useTheme'
import { EyeIcon, EyeOffIcon } from 'lucide-react-native'

type ServerSettingsForm = {
    serverURL: string
    username: string
    password: string
}

type ServerSettingsProps = {
    initial?: Partial<ServerSettingsForm>
    buttonColor?: string
    submitLabel?: string
    requireSuccessfulTest?: boolean
    refreshQueriesOnSave?: boolean
    onSave?: () => void
}

const normalizeSettings = (settings: ServerSettingsForm): ServerSettingsForm => ({
    ...settings,
    serverURL: settings.serverURL.trim().replace(/\/+$/, ''),
})

const ServerSettings: React.FC<ServerSettingsProps> = ({
    initial = {},
    buttonColor = '#0743f7',
    submitLabel = 'Save',
    requireSuccessfulTest = false,
    refreshQueriesOnSave = true,
    onSave,
}) => {
    const { getSettings, setSettings } = ServerSettingsStore()
    const theme = useTheme()
    const savedSettings = getSettings()

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        watch,
    } = useForm<ServerSettingsForm>({
        defaultValues: {
            serverURL: savedSettings?.serverURL || initial.serverURL || process.env.EXPO_PUBLIC_API_URL || '',
            username: savedSettings?.username || initial.username || process.env.EXPO_PUBLIC_API_USERNAME || '',
            password: savedSettings?.password || initial.password || process.env.EXPO_PUBLIC_API_PASSWORD || '',
        },
        mode: 'onChange',
    })

    const [hasTested, setHasTested] = useState(false)
    const [isTesting, setIsTesting] = useState(false)
    const [testError, setTestError] = useState<string | null>(null)
    const [testUser, setTestUser] = useState<any | null>(null)
    const [testedSettings, setTestedSettings] = useState<ServerSettingsForm | null>(null)
    const [hidePass, setHidePass] = useState(true)

    const currentValues = watch()
    const normalizedCurrentValues = normalizeSettings({
        serverURL: currentValues.serverURL || '',
        username: currentValues.username || '',
        password: currentValues.password || '',
    })

    const hasPassedCurrentSettings =
        testedSettings !== null &&
        testedSettings.serverURL === normalizedCurrentValues.serverURL &&
        testedSettings.username === normalizedCurrentValues.username &&
        testedSettings.password === normalizedCurrentValues.password

    useEffect(() => {
        if (!testedSettings || hasPassedCurrentSettings) return

        setHasTested(false)
        setTestUser(null)
        setTestError(null)
    }, [
        normalizedCurrentValues.serverURL,
        normalizedCurrentValues.username,
        normalizedCurrentValues.password,
        testedSettings,
        hasPassedCurrentSettings,
    ])

    const handleTestConnection = async () => {
        const values = normalizeSettings(getValues())

        setHasTested(true)
        setIsTesting(true)
        setTestError(null)
        setTestUser(null)
        setTestedSettings(null)

        if (!values.serverURL || !values.username || !values.password) {
            setTestError('Server URL, username and password are required')
            setIsTesting(false)
            return
        }

        const url = values.serverURL + ENDPOINT

        try {
            const token = base64Encode(`${values.username}:${values.password}`)

            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Basic ${token}`,
                },
            })

            const text = await res.text()

            if (!res.ok) {
                setTestError(`${res.status} - ${text}`)
                return
            }

            try {
                const data = JSON.parse(text)
                setTestUser(data)
            } catch {
                setTestUser({ raw: text })
            }

            setTestedSettings(values)
        } catch (err: any) {
            setTestError(err?.message ?? String(err))
            setTestedSettings(null)
        } finally {
            setIsTesting(false)
        }
    }

    const handleSave = (values: ServerSettingsForm) => {
        const normalizedValues = normalizeSettings(values)

        if (requireSuccessfulTest && !hasPassedCurrentSettings) {
            setHasTested(true)
            setTestError('Test the current server settings successfully before continuing')
            return
        }

        setSettings(normalizedValues)

        if (refreshQueriesOnSave) {
            refreshAllQueries()
        }

        onSave?.()
    }

    const saveDisabled =
        !isValid ||
        isTesting ||
        (requireSuccessfulTest && !hasPassedCurrentSettings)

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`p-4`} keyboardShouldPersistTaps="handled">
            <View>
                <Text style={[tw`font-HKGrotesk-SemiBold text-base mb-1`, { color: theme.colors.text.primary }]}>
                    Server Link
                </Text>

                <Controller
                    control={control}
                    name="serverURL"
                    rules={{
                        required: 'Server URL is required',
                        validate: (value) => {
                            try {
                                const url = new URL(value.trim())

                                return (
                                    url.protocol === 'http:' ||
                                    url.protocol === 'https:' ||
                                    'Enter a valid HTTP or HTTPS URL'
                                )
                            } catch {
                                return 'Enter a valid server URL'
                            }
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[
                                tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2`,
                                {
                                    backgroundColor: theme.colors.background.field,
                                    color: theme.colors.text.primary,
                                    borderColor: errors.serverURL
                                        ? theme.colors.status.danger
                                        : theme.colors.border.default,
                                },
                            ]}
                            onChangeText={onChange}
                            value={value}
                            placeholder="http://192.168.1.10:5000"
                            placeholderTextColor={theme.colors.text.secondary}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="url"
                        />
                    )}
                />

                {errors.serverURL && (
                    <Text style={[tw`text-right text-sm`, { color: theme.colors.status.danger }]}>
                        {errors.serverURL.message}
                    </Text>
                )}

                <Text style={[tw`font-HKGrotesk-SemiBold text-base mb-1 mt-3`, { color: theme.colors.text.primary }]}>
                    Username
                </Text>

                <Controller
                    control={control}
                    name="username"
                    rules={{ required: 'Username is required' }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[
                                tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2`,
                                {
                                    backgroundColor: theme.colors.background.field,
                                    color: theme.colors.text.primary,
                                    borderColor: errors.username
                                        ? theme.colors.status.danger
                                        : theme.colors.border.default,
                                },
                            ]}
                            onChangeText={onChange}
                            value={value}
                            placeholder="username"
                            placeholderTextColor={theme.colors.text.secondary}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    )}
                />

                {errors.username && (
                    <Text style={[tw`text-right text-sm`, { color: theme.colors.status.danger }]}>
                        {errors.username.message}
                    </Text>
                )}

                <Text style={[tw`font-HKGrotesk-SemiBold text-base mb-1 mt-3`, { color: theme.colors.text.primary }]}>
                    Password
                </Text>

                <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'Password is required' }}
                    render={({ field: { onChange, value } }) => (
                        <View style={tw`relative flex-row items-center`}>
                            <TextInput
                                style={[
                                    tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 pr-12 mb-2`,
                                    {
                                        backgroundColor: theme.colors.background.field,
                                        color: theme.colors.text.primary,
                                        borderColor: errors.password
                                            ? theme.colors.status.danger
                                            : theme.colors.border.default,
                                    },
                                ]}
                                onChangeText={onChange}
                                value={value}
                                placeholder="password"
                                placeholderTextColor={theme.colors.text.secondary}
                                secureTextEntry={hidePass}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />

                            <TouchableOpacity onPress={() => setHidePass(!hidePass)} style={tw`absolute right-2 top-1 p-2`}>
                                {hidePass
                                    ? <EyeOffIcon size={22} color={theme.colors.text.secondary} />
                                    : <EyeIcon size={22} color={theme.colors.text.secondary} />}
                            </TouchableOpacity>
                        </View>
                    )}
                />

                {errors.password && (
                    <Text style={[tw`text-right text-sm`, { color: theme.colors.status.danger }]}>
                        {errors.password.message}
                    </Text>
                )}

                <View style={tw`flex-col justify-between mt-4 gap-5`}>
                    <Pressable
                        disabled={!isValid || isTesting}
                        onPress={handleTestConnection}
                        style={({ pressed }) => [
                            tw`flex-1`,
                            { opacity: !isValid || isTesting ? 0.4 : pressed ? 0.75 : 1 },
                        ]}>
                        <View style={[tw`p-3 rounded-full flex-row items-center justify-center`, { borderColor: theme.colors.brand.primary, borderWidth: 2 }]}>
                            {isTesting && <ActivityIndicator color="white" style={tw`mr-3`} />}
                            <Text style={[tw`text-center font-HKGrotesk-Medium text-white`, { color: theme.colors.brand.primary }]}>
                                {isTesting ? 'Testing connection...' : 'Test Connection'}
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable
                        disabled={saveDisabled}
                        onPress={handleSubmit(handleSave)}
                        style={({ pressed }) => [
                            tw`flex-1`,
                            { opacity: saveDisabled ? 0.4 : pressed ? 0.8 : 1 },
                        ]}>
                        <Text style={[tw`py-4 px-5 text-white font-HKGrotesk-Medium rounded-full text-base text-center`, { backgroundColor: theme.colors.brand.primary }]}>
                            {submitLabel}
                        </Text>
                    </Pressable>
                </View>
            </View>

            <View style={tw`mt-2`}>
                {hasTested && !isTesting && testUser && hasPassedCurrentSettings && (
                    <View style={[tw`mt-3 p-3 flex-row items-start rounded-md border`, { backgroundColor: theme.colors.status.successful + '40', borderColor: theme.colors.status.successful + '40' }]}>
                        <View style={[tw`w-3 h-3 rounded-full mr-3 mt-1`, { backgroundColor: theme.colors.status.successful }]} />

                        <View style={tw`flex-1`}>
                            <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.status.successful }]}>
                                Connection successful
                            </Text>

                            <Text style={[tw`text-sm`, { color: theme.colors.status.successful }]}>
                                Welcome {testUser.name ?? testUser.username ?? testUser.raw ?? 'user'}
                            </Text>
                        </View>
                    </View>
                )}

                {hasTested && !isTesting && testError && (
                    <View style={[tw`mt-3 p-3 flex-row items-start rounded-md border`, { backgroundColor: theme.colors.status.danger + '20', borderColor: theme.colors.status.danger + '40' }]}>
                        <View style={[tw`w-3 h-3 rounded-full mr-3 mt-1`, { backgroundColor: theme.colors.status.danger }]} />

                        <View style={tw`flex-1`}>
                            <Text style={[tw`text-sm font-HKGrotesk-Medium`, { color: theme.colors.status.danger }]}>
                                Connection failed
                            </Text>

                            <Text style={[tw`text-sm`, { color: theme.colors.status.danger }]}>
                                {testError}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default ServerSettings