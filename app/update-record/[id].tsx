import { View, Text, ScrollView, TextInput, Pressable, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { useForm, Controller } from "react-hook-form"
import { useUpdateOdometerRecord, useUpdateServiceRecord, useUpdateRepairRecord, useUpdateUpgradeRecord, useUpdateFuelRecord, useUpdateTaxRecord, useUpdateReminderRecord } from '~/hooks/api/index'
import { OdometerFunctionStore, ServiceFunctionStore, RepairFunctionStore, UpgradeFunctionStore, FuelFunctionStore, TaxFunctionStore, ReminderFunctionStore } from '~/stores/RecordButtons'
import { OdometerFunctionStoreProp } from '~/stores/RecordButtons/odometerFunctionStore'
import { useTranslation } from 'react-i18next'
import TagInput from '~/components/TagInput'
import DateHandler, { ConvertUTCToUSFormat } from '~/utils/DateHandler'
import { CalendarDays, GaugeCircle, Info, PenSquare, CircleDollarSign, FuelIcon, X } from 'lucide-react-native'
import { tint } from 'polished'
import DatePicker from 'react-native-date-picker'
import ModernSwitch from '~/components/ModernSwitch'
import useThemeStore from '~/stores/themeStore'
import { useTheme } from '~/hooks/useTheme'

const UpdateRecord = () => {
    const { t } = useTranslation()
    const { id, actionType, data, vehicleId }: { id: string, actionType: string, data: any, vehicleId: string } = useLocalSearchParams()
    const _recordID = parseInt(id)
    const _vehicleID = parseInt(vehicleId)
    const _data = JSON.parse(data)
    const [currentActionType, setCurrentActionType] = useState<OdometerFunctionStoreProp>(OdometerFunctionStore)
    const { mutateAsync: updateServiceRecord } = useUpdateServiceRecord()
    const { mutateAsync: updateOdometerRecord } = useUpdateOdometerRecord()
    const { mutateAsync: updateRepairRecord } = useUpdateRepairRecord()
    const { mutateAsync: updateUpgradeRecord } = useUpdateUpgradeRecord()
    const { mutateAsync: updateFuelRecord } = useUpdateFuelRecord()
    const { mutateAsync: updateTaxRecord } = useUpdateTaxRecord()
    const { mutateAsync: updateReminderRecord } = useUpdateReminderRecord()
    const [openDatePickerModal, setOpenDatePickerModal] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const [initialOdometerEditable, setInitialOdometerEditable] = useState(false)
    const [showMetricFieldDueDate, setShowMetricFieldDueDate] = useState(_data.userMetric === "Date" || _data.userMetric === "Both")
    const [showMetricFieldDueOdometer, setShowMetricFieldDueOdometer] = useState(_data.userMetric === "Odometer" || _data.userMetric === "Both")
    let convertedDate: string
    const theme = useTheme()
    const { colorScheme } = useThemeStore()
    const colorTintValue = colorScheme === 'light' ? 0.6 : 0

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Date: _data.date ? DateHandler(_data.date, true) as Date : new Date(),
            Odometer: _data.odometer || "",
            InitialOdometer: _data.initialOdometer || "",
            Cost: _data.cost || "",
            Notes: _data.notes || "",
            Description: _data.description || "",
            ConsumedFuel: _data.fuelConsumed || "",
            IsFillToFull: _data.isFillToFull || false,
            MissedFuelUp: _data.missedFuelUp || false,
            Tags: _data.tags || "",
            Metric: _data.userMetric || "Date",
            DueOdometer: _data.dueOdometer || "",
            DueDate: _data.dueDate ? DateHandler(_data.dueDate, true) as Date : new Date()
        },
        mode: "onChange"
    })
    type formDataType = {
        Date: Date;
        Odometer: string;
        InitialOdometer: string;
        Cost: string;
        Notes: string;
        Description: string;
        ConsumedFuel: string;
        IsFillToFull: boolean;
        MissedFuelUp: boolean;
        Tags: string;
        Metric: "Date" | "Odometer" | "Both";
        DueDate: Date;
        DueOdometer: string;
    }
    const handleForm = async (formData: formDataType) => {
        if (currentActionType?.key === ReminderFunctionStore.key) {
            convertedDate = ConvertUTCToUSFormat(formData.DueDate.toISOString())
        } else {
            convertedDate = ConvertUTCToUSFormat(formData.Date.toISOString())
        }

        console.log("formData : " + JSON.stringify(formData))
        // Convert comma-separated tags to space-separated string
        const tags = formData.Tags ? formData.Tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '').join(' ') : ''

        try {
            switch (actionType) {
                case ServiceFunctionStore.key:
                    await updateServiceRecord({
                        recordID: _recordID,
                        vehicleId: _vehicleID,
                        serviceRecord: [{ cost: formData.Cost, date: convertedDate, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes, tags }]
                    })
                    break
                case OdometerFunctionStore.key:
                    await updateOdometerRecord({
                        recordID: _recordID,
                        vehicleId: _vehicleID,
                        odometerRecord: [{ date: convertedDate, initialOdometer: formData.InitialOdometer, odometer: formData.Odometer, notes: formData.Notes, tags }]
                    })
                    break
                case RepairFunctionStore.key:
                    await updateRepairRecord({
                        recordID: _recordID,
                        vehicleId: _vehicleID,
                        repairRecord: [{ cost: formData.Cost, date: convertedDate, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes, tags }]
                    })
                    break
                case UpgradeFunctionStore.key:
                    await updateUpgradeRecord({
                        recordID: _recordID,
                        vehicleId: _vehicleID,
                        upgradeRecord: [{ cost: formData.Cost, date: convertedDate, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes, tags }]
                    })
                    break
                case FuelFunctionStore.key:
                    await updateFuelRecord({
                        recordID: _recordID,
                        vehicleId: _vehicleID,
                        fuelRecord: [{ cost: formData.Cost, date: convertedDate, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes, fuelConsumed: formData.ConsumedFuel, isFillToFull: formData.IsFillToFull, missedFuelUp: formData.MissedFuelUp, tags }]
                    })
                    break
                case TaxFunctionStore.key:
                    await updateTaxRecord({
                        recordID: _recordID,
                        vehicleId: _vehicleID,
                        taxRecord: [{ cost: formData.Cost, date: convertedDate, description: formData.Description, notes: formData.Notes, tags }]
                    })
                    break
                case ReminderFunctionStore.key:
                    await updateReminderRecord({
                        recordID: _recordID,
                        vehicleId: _vehicleID,
                        reminderRecord: [{ description: formData.Description, dueDate: convertedDate, dueOdometer: formData.DueOdometer, metric: formData.Metric, notes: formData.Notes, tags }]
                    })
                    break
                default:
                    break
            }
        } catch (error) {
            console.error("Error handling form submission: ", error);
        }
        router.dismiss()
        //console.log("Error odo Type : " + JSON.stringify(errors))
    }

    const showMetricField = (option: formDataType["Metric"]) => {
        switch (option) {
            case "Date":
                setShowMetricFieldDueDate(true)
                setShowMetricFieldDueOdometer(false)
                break
            case "Odometer":
                setShowMetricFieldDueDate(false)
                setShowMetricFieldDueOdometer(true)
                break
            case "Both":
                setShowMetricFieldDueDate(true)
                setShowMetricFieldDueOdometer(true)
                break
        }
    }

    useEffect(() => {
        const actionTypeMap = {
            [OdometerFunctionStore.key]: OdometerFunctionStore,
            [ServiceFunctionStore.key]: ServiceFunctionStore,
            [RepairFunctionStore.key]: RepairFunctionStore,
            [UpgradeFunctionStore.key]: UpgradeFunctionStore,
            [FuelFunctionStore.key]: FuelFunctionStore,
            [TaxFunctionStore.key]: TaxFunctionStore,
            [ReminderFunctionStore.key]: ReminderFunctionStore
        }
        setCurrentActionType(actionTypeMap[actionType] || OdometerFunctionStore)
    }, [actionType])

    return (
        <SafeAreaView style={[tw`flex flex-col p-4 pb-0 w-full h-full`, { backgroundColor: theme.colors.background.default }]}>
            <Stack.Screen options={{
                headerShadowVisible: false,
                headerShown: true,
                headerTintColor: theme.colors.text.primary, // this handles the back arrow color on the header
                headerStyle: { backgroundColor: theme.colors.background.default },
                headerTitle: () => <Text style={tw`font-HKGrotesk-Bold text-lg text-center text-[${currentActionType?.buttonColor[colorScheme]}]`}>Update {actionType.toString()} Record</Text>,
                statusBarStyle: colorScheme == 'light' ? 'dark' : 'light',
                statusBarColor: theme.colors.background.default,
                headerTransparent: true,
            }} />
            <View style={tw`mt-9`}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}
                    style={tw`p-4 pt-0`}>
                    <View>
                        {currentActionType?.visibleFields.description && currentActionType?.key === ReminderFunctionStore.key &&
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base`, { color: theme.colors.text.primary }]}>{t("Description")}
                                    {!currentActionType.mandatoryFields.description && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.description }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg h-21 border p-2 mb-2`, { color: theme.colors.text.primary, backgroundColor: theme.colors.background.field, borderColor: errors.Description ? theme.colors.status.danger : currentActionType?.buttonColor[colorScheme] + '40' }]}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            returnKeyType='next'
                                            multiline={true}
                                            textAlignVertical="top"
                                            value={value} />)} name="Description" />
                            </>}
                        {errors.Description && <Text style={[tw`font-HKGrotesk-Regular text-right`, { color: theme.colors.status.danger }]}>Required Field</Text>}

                        {currentActionType?.key === ReminderFunctionStore.key && (
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base mb-1`, { color: theme.colors.text.primary }]}>Remind me by:</Text>
                                <Controller
                                    control={control}
                                    name="Metric"
                                    rules={{ required: currentActionType.mandatoryFields.metric }}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
                                            {(['Date', 'Odometer', 'Both'] as const).map((option) => (
                                                <Pressable
                                                    key={option}
                                                    onPress={() => {
                                                        console.log("option : " + option)
                                                        onChange(option)
                                                        showMetricField(option)
                                                    }}
                                                    style={[tw`flex-row p-2 rounded-lg border flex-grow justify-center`, { backgroundColor: value === option ? currentActionType?.buttonColor[colorScheme] + '20' : theme.colors.background.field, borderColor: value === option ? currentActionType?.buttonColor[colorScheme] : theme.colors.border.default }]}
                                                >
                                                    <Text style={[tw`font-HKGrotesk-Medium text-center`, { color: value === option ? currentActionType?.buttonColor[colorScheme] : theme.colors.text.primary, borderColor: value === option ? currentActionType?.buttonColor[colorScheme] : theme.colors.border.default }]}>
                                                        {option}
                                                    </Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    )}
                                />
                            </>
                        )}

                        {currentActionType?.visibleFields.dueDate && showMetricFieldDueDate &&
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base mb-1`, { color: theme.colors.text.primary }]}>
                                    Due {t("Date")}
                                </Text>
                                <Controller control={control} name="DueDate" rules={{ required: currentActionType.mandatoryFields.dueDate || showMetricFieldDueDate }}
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                            <Pressable onPress={() => setOpenDatePickerModal(true)}>
                                                <View>
                                                    <TextInput
                                                        style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2 pr-10`, { backgroundColor: theme.colors.background.field, color: theme.colors.text.primary, borderColor: errors.DueDate ? theme.colors.status.danger : currentActionType?.buttonColor[colorScheme] + '40' }]}
                                                        readOnly={true}
                                                        value={value.toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale, {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })} />
                                                    <View style={tw`absolute right-4 top-3`}>
                                                        <CalendarDays size={22} color={tint(colorTintValue, currentActionType?.buttonColor[colorScheme])} />
                                                    </View>
                                                </View>
                                            </Pressable>
                                            <DatePicker modal locale={Intl.DateTimeFormat().resolvedOptions().locale} mode='date' open={openDatePickerModal} date={value} theme={colorScheme}
                                                onConfirm={(date) => {
                                                    setOpenDatePickerModal(false)
                                                    onChange(date)
                                                }}
                                                onCancel={() => {
                                                    setOpenDatePickerModal(false)
                                                }}
                                            />
                                        </>
                                    )}
                                />
                            </>
                        }

                        {currentActionType?.visibleFields.dueOdometer && showMetricFieldDueOdometer &&
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base mb-1`, { color: theme.colors.text.primary }]}>Due {t("Odometer")}</Text>
                                <Controller control={control} rules={{
                                    required: { value: currentActionType.mandatoryFields.dueOdometer || showMetricFieldDueOdometer, message: "Required Field and must be a number" }
                                }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={tw`relative flex-row items-center`}>
                                            <TextInput
                                                style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2`, { backgroundColor: theme.colors.background.field, color: theme.colors.text.primary, borderColor: errors.DueOdometer && showMetricFieldDueOdometer ? theme.colors.status.danger : currentActionType?.buttonColor[colorScheme] + '40' }]}
                                                onBlur={onBlur}
                                                onChangeText={(text) => {
                                                    // Only allow numbers
                                                    const numericValue = text.replace(/[^0-9]/g, '')
                                                    onChange(numericValue);
                                                }}
                                                value={value}
                                                returnKeyType='next'
                                                keyboardType="numeric"
                                                inputMode="numeric" />
                                            <View style={tw`absolute right-4 top-3`}>
                                                <GaugeCircle size={22} color={tint(colorTintValue, currentActionType?.buttonColor[colorScheme])} />
                                            </View>
                                        </View>
                                    )}
                                    name="DueOdometer" />
                                {errors.DueOdometer &&
                                    <Text style={[tw`font-HKGrotesk-Regular text-right -mt-1 mb-1`, { color: theme.colors.status.danger }]}>
                                        Required Field
                                    </Text>
                                }
                            </>
                        }

                        {currentActionType?.visibleFields.date &&
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base mb-1`, { color: theme.colors.text.primary }]}>{t("Date")}
                                    {!currentActionType.mandatoryFields.date && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}
                                </Text>

                                <Controller control={control} name="Date" rules={{ required: currentActionType.mandatoryFields.date }}
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                            <Pressable onPress={() => setOpenDatePickerModal(true)}>
                                                <View>
                                                    <TextInput
                                                        style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2 pr-10`, { backgroundColor: theme.colors.background.field, color: theme.colors.text.primary, borderColor: errors.Date ? theme.colors.status.danger : currentActionType?.buttonColor[colorScheme] + '40' }]}
                                                        readOnly={true}
                                                        value={value.toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale, {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })} />
                                                    <View style={tw`absolute right-4 top-3`}>
                                                        <CalendarDays size={22} color={tint(colorTintValue, currentActionType?.buttonColor[colorScheme])} />
                                                    </View>
                                                </View>
                                            </Pressable>
                                            <DatePicker modal locale={Intl.DateTimeFormat().resolvedOptions().locale} mode='date' open={openDatePickerModal} date={value} theme={colorScheme}
                                                onConfirm={(date) => {
                                                    setOpenDatePickerModal(false)
                                                    onChange(date)
                                                }}
                                                onCancel={() => {
                                                    setOpenDatePickerModal(false)
                                                }}
                                            />
                                        </>
                                    )}
                                />
                            </>
                        }
                        {errors.Date && <Text style={[tw`font-HKGrotesk-Regular text-right`, { color: theme.colors.status.danger }]}>Required Field</Text>}

                        {currentActionType?.visibleFields.initialOdometer &&
                            <>
                                <View style={tw`flex-row items-center gap-2 mb-1 relative`}>
                                    <Text style={[tw`font-HKGrotesk-SemiBold text-base`, { color: theme.colors.text.primary }]}>{t("Initial_Odometer")}
                                        {!currentActionType.mandatoryFields.initialOdometer && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}
                                    </Text>
                                    <Pressable onPress={() => setShowTooltip(!showTooltip)}>
                                        <Info size={16} color={tint(0.1, currentActionType?.buttonColor[colorScheme])} />
                                    </Pressable>
                                    {showTooltip && (
                                        <View style={[tw`absolute right-5 top-6 p-3 rounded-lg shadow-sm z-50 w-64 border`, { backgroundColor: theme.colors.background.field, borderColor: theme.colors.border.default }]}>
                                            <View style={tw`flex-row justify-between items-start mb-1`}>
                                                <Text style={[tw`font-HKGrotesk-Bold text-sm`, { color: theme.colors.text.primary }]}>Initial Odometer</Text>
                                                <Pressable onPress={() => setShowTooltip(false)} hitSlop={8}>
                                                    <X size={16} color={tint(colorTintValue, currentActionType?.buttonColor[colorScheme])} />
                                                </Pressable>
                                            </View>
                                            <Text style={[tw`text-sm`, { color: theme.colors.text.secondary }]}>
                                                This optional field is the reading from your last record. This helps track the distance traveled between records.
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.initialOdometer }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={tw`relative flex-row items-center`}>
                                            <TextInput
                                                style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2`, { color: theme.colors.text.primary, backgroundColor: initialOdometerEditable ? theme.colors.background.field : theme.colors.background.default, borderColor: errors.InitialOdometer ? theme.colors.status.danger : currentActionType?.buttonColor[colorScheme] + '40' }]}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                returnKeyType='next'
                                                value={value}
                                                editable={initialOdometerEditable}
                                            />
                                            <Pressable style={tw`absolute right-1 top-1`}
                                                onPress={() => setInitialOdometerEditable(!initialOdometerEditable)}>
                                                <View style={tw`flex flex-row items-center bg-[${currentActionType?.buttonColor[colorScheme]}]/10 p-2 rounded-lg gap-2`}>
                                                    <PenSquare size={22} color={currentActionType?.buttonColor[colorScheme]} />
                                                    <Text style={[tw`font-HKGrotesk-Regular text-sm`, { color: currentActionType?.buttonColor[colorScheme] }]}>{t("Edit")}</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    )}
                                    name="InitialOdometer" />
                            </>
                        }

                        {errors.InitialOdometer && <Text style={[tw`font-HKGrotesk-Regular text-right`, { color: theme.colors.status.danger }]}>Required Field</Text>}

                        {currentActionType?.visibleFields.odometer &&
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base`, { color: theme.colors.text.primary }]}>{t("Odometer")}
                                    {!currentActionType.mandatoryFields.odometer && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{
                                    required: { value: currentActionType.mandatoryFields.odometer, message: "Required Field and must be a number" }
                                }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={tw`relative flex-row items-center`}>
                                            <TextInput
                                                style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2`, { color: theme.colors.text.primary, backgroundColor: theme.colors.background.field, borderColor: errors.Odometer ? theme.colors.status.danger : currentActionType?.buttonColor[colorScheme] + '40' }]}
                                                onBlur={onBlur}
                                                onChangeText={(text) => {
                                                    // Only allow numbers
                                                    const numericValue = text.replace(/[^0-9]/g, '')
                                                    onChange(numericValue);
                                                }}
                                                value={value}
                                                returnKeyType='next'
                                                keyboardType="numeric"
                                                inputMode="numeric" />
                                            <View style={tw`absolute right-4 top-3`}>
                                                <GaugeCircle size={22} color={tint(colorTintValue, currentActionType?.buttonColor[colorScheme])} />
                                            </View>
                                        </View>
                                    )}
                                    name="Odometer" />
                                {errors.Odometer &&
                                    <Text style={[tw`font-HKGrotesk-Regular text-right -mt-1 mb-1`, { color: theme.colors.status.danger }]}>
                                        {errors.Odometer.type === 'pattern' ? 'Only numbers are allowed' : 'Required Field'}
                                    </Text>
                                }
                            </>
                        }

                        {currentActionType?.visibleFields.cost &&
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base`, { color: theme.colors.text.primary }]}>{t("Cost")}
                                    {!currentActionType.mandatoryFields.cost && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: { value: currentActionType.mandatoryFields.cost, message: "Required Field and must be a number" } }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={tw`relative flex-row items-center`}>
                                            <TextInput
                                                style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2`, { color: theme.colors.text.primary, backgroundColor: theme.colors.background.field, borderColor: errors.Cost ? theme.colors.status.danger : currentActionType?.buttonColor[colorScheme] + '40' }]}
                                                onBlur={onBlur}
                                                onChangeText={(text) => {
                                                    // Only allow numbers
                                                    const numericValue = text.replace(/[^0-9.]/g, '')
                                                    onChange(numericValue);
                                                }}
                                                returnKeyType='next'
                                                value={value} keyboardType="numeric" inputMode="numeric" />
                                            <View style={tw`absolute right-4 top-3`}>
                                                <CircleDollarSign size={22} color={tint(colorTintValue, currentActionType?.buttonColor[colorScheme])} />
                                            </View>
                                        </View>
                                    )}
                                    name="Cost" />
                            </>
                        }
                        {errors.Cost && <Text style={[tw`font-HKGrotesk-Regular text-right`, { color: theme.colors.status.danger }]}>Required Field</Text>}

                        {currentActionType?.visibleFields.description && currentActionType?.key != ReminderFunctionStore.key &&
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base`, { color: theme.colors.text.primary }]}>{t("Description")}
                                    {!currentActionType.mandatoryFields.description && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.description }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg h-30 border p-2 mb-2`, { color: theme.colors.text.primary, backgroundColor: theme.colors.background.field, borderColor: errors.Description ? theme.colors.status.danger : currentActionType?.buttonColor[colorScheme] + '40' }]}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            returnKeyType='next'
                                            multiline={true}
                                            textAlignVertical="top"
                                            value={value} />)} name="Description" />
                            </>}
                        {errors.Description && currentActionType?.key != ReminderFunctionStore.key && <Text style={[tw`font-HKGrotesk-Regular text-right`, { color: theme.colors.status.danger }]}>Required Field</Text>}

                        {currentActionType?.visibleFields.fuelConsumed &&
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base`, { color: theme.colors.text.primary }]}>Amount of Fuel
                                    {!currentActionType.mandatoryFields.fuelConsumed && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.fuelConsumed }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={tw`relative flex-row items-center`}>
                                            <TextInput
                                                style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2`, { color: theme.colors.text.primary, backgroundColor: theme.colors.background.field, borderColor: errors.ConsumedFuel ? theme.colors.status.danger : currentActionType?.buttonColor[colorScheme] + '40' }]}
                                                onBlur={onBlur}
                                                onChangeText={(text) => {
                                                    // Only allow numbers
                                                    const numericValue = text.replace(/[^0-9]/g, '')
                                                    onChange(numericValue);
                                                }}
                                                returnKeyType='next'
                                                inputMode="numeric"
                                                value={value} />
                                            <View style={tw`absolute right-4 top-3`}>
                                                <FuelIcon size={22} color={tint(colorTintValue, currentActionType?.buttonColor[colorScheme])} />
                                            </View>
                                        </View>
                                    )} name="ConsumedFuel" />
                            </>}
                        {errors.ConsumedFuel && <Text style={[tw`font-HKGrotesk-Regular text-right`, { color: theme.colors.status.danger }]}>Required Field</Text>}

                        {currentActionType?.visibleFields.isFulltoFill &&
                            <View style={tw`flex flex-row items-center justify-between pt-2`}>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base`, { color: theme.colors.text.primary }]}>Full Tank ?
                                    {!currentActionType.mandatoryFields.isFulltoFill && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <ModernSwitch
                                            onValueChange={() => onChange(!value)}
                                            value={value}
                                            activeColor={currentActionType?.buttonColor[colorScheme]}
                                        />
                                    )} name="IsFillToFull" />
                            </View>}

                        {currentActionType?.visibleFields.missedFuelUp &&
                            <View style={tw`flex flex-row items-center justify-between py-2`}>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base`, { color: theme.colors.text.primary }]}>Missed Previous Record ?
                                    {!currentActionType.mandatoryFields.missedFuelUp && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <ModernSwitch
                                            onValueChange={() => onChange(!value)}
                                            value={value}
                                            activeColor={currentActionType?.buttonColor[colorScheme]}
                                        />
                                    )} name="MissedFuelUp" />
                            </View>}

                        {currentActionType?.visibleFields.notes &&
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base`, { color: theme.colors.text.primary }]}>{t("Notes")}
                                    {!currentActionType.mandatoryFields.notes && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.notes }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2 mb-2`, { color: theme.colors.text.primary, backgroundColor: theme.colors.background.field, borderColor: errors.Notes ? theme.colors.status.danger : currentActionType?.buttonColor[colorScheme] + '40' }]}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            returnKeyType='next'
                                            value={value} />)} name="Notes" />
                            </>
                        }
                        {errors.Notes && <Text style={[tw`font-HKGrotesk-Regular text-right`, { color: theme.colors.status.danger }]}>Required Field</Text>}

                        {currentActionType?.visibleFields.tags &&
                            <>
                                <Text style={[tw`font-HKGrotesk-SemiBold text-base pt-1`, { color: theme.colors.text.primary }]}>Tags
                                    {!currentActionType.mandatoryFields.tags && <Text style={[tw`font-HKGrotesk-Italic italic text-sm`, { color: theme.colors.text.secondary }]}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.tags }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TagInput
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            color={currentActionType?.buttonColor[colorScheme]}
                                            hasError={!!errors.Tags}
                                        />
                                    )} name="Tags" />
                            </>
                        }
                        {errors.Tags && <Text style={[tw`font-HKGrotesk-Regular text-right`, { color: theme.colors.status.danger }]}>Required Field</Text>}

                        <Pressable onPress={handleSubmit(handleForm)} style={tw`mb-4`}>
                            <Text style={[tw`mt-4 p-2 font-HKGrotesk-Medium rounded-full text-base text-center`, { backgroundColor: currentActionType?.buttonColor[colorScheme] + '90', color: theme.colors.text.primary }]}>
                                Update Record
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default UpdateRecord