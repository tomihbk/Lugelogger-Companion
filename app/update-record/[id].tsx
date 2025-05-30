import { View, Text, ScrollView, TextInput, Pressable, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { useForm, Controller } from "react-hook-form"
import { useUpdateOdometerRecord, useUpdateServiceRecord, useUpdateRepairRecord, useUpdateUpgradeRecord, useUpdateFuelRecord, useUpdateTaxRecord } from '~/hooks/api/index'
import { OdometerFunctionStore, ServiceFunctionStore, RepairFunctionStore, UpgradeFunctionStore, FuelFunctionStore, TaxFunctionStore } from '~/stores/RecordButtons'
import { OdometerFunctionStoreProp } from '~/stores/RecordButtons/odometerFunctionStore'
import { useTranslation } from 'react-i18next'
import TagInput from '~/components/TagInput'
import DateHandler, { ConvertUTCToUSFormat } from '~/utils/DateHandler'
import { CalendarDays, GaugeCircle, Info, PenSquare, CircleDollarSign, FuelIcon, X } from 'lucide-react-native'
import { tint } from 'polished'
import DatePicker from 'react-native-date-picker'
import ModernSwitch from '~/components/ModernSwitch'

const UpdateRecord = () => {
    const { t } = useTranslation()
    const { id, actionType, data }: { id: string, actionType: string, data: any } = useLocalSearchParams()
    const _recordID = parseInt(id)
    const _data = JSON.parse(data)
    const [currentActionType, setCurrentActionType] = useState<OdometerFunctionStoreProp>(OdometerFunctionStore)
    const { mutateAsync: updateServiceRecord } = useUpdateServiceRecord()
    const { mutateAsync: updateOdometerRecord } = useUpdateOdometerRecord()
    const { mutateAsync: updateRepairRecord } = useUpdateRepairRecord()
    const { mutateAsync: updateUpgradeRecord } = useUpdateUpgradeRecord()
    const { mutateAsync: updateFuelRecord } = useUpdateFuelRecord()
    const { mutateAsync: updateTaxRecord } = useUpdateTaxRecord()
    const [openDatePickerModal, setOpenDatePickerModal] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const [initialOdometerEditable, setInitialOdometerEditable] = useState(false)

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Date: DateHandler(_data.date, true) as Date,
            Odometer: _data.odometer || "",
            InitialOdometer: _data.initialOdometer || "",
            Cost: _data.cost || "",
            Notes: _data.notes || "",
            Description: _data.description || "",
            ConsumedFuel: _data.fuelConsumed || "",
            IsFillToFull: _data.isFillToFull || false,
            MissedFuelUp: _data.missedFuelUp || false,
            Tags: _data.tags || ""
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
    }
    const handleForm = async (formData: formDataType) => {
        //console.log("formData : " + JSON.stringify(formData))

        const convertedDate = ConvertUTCToUSFormat(formData.Date.toISOString())

        // Convert comma-separated tags to space-separated string
        const tags = formData.Tags ? formData.Tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '').join(' ') : ''

        try {
            switch (actionType) {
                case ServiceFunctionStore.key:
                    await updateServiceRecord({
                        recordID: _recordID,
                        serviceRecord: [{ cost: formData.Cost, date: convertedDate, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes, tags }]
                    })
                    break
                case OdometerFunctionStore.key:
                    await updateOdometerRecord({
                        recordID: _recordID,
                        odometerRecord: [{ date: convertedDate, initialOdometer: formData.InitialOdometer, odometer: formData.Odometer, notes: formData.Notes, tags }]
                    })
                    break
                case RepairFunctionStore.key:
                    await updateRepairRecord({
                        recordID: _recordID,
                        repairRecord: [{ cost: formData.Cost, date: convertedDate, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes, tags }]
                    })
                    break
                case UpgradeFunctionStore.key:
                    await updateUpgradeRecord({
                        recordID: _recordID,
                        upgradeRecord: [{ cost: formData.Cost, date: convertedDate, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes, tags }]
                    })
                    break
                case FuelFunctionStore.key:
                    await updateFuelRecord({
                        recordID: _recordID,
                        fuelRecord: [{ cost: formData.Cost, date: convertedDate, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes, fuelConsumed: formData.ConsumedFuel, isFillToFull: formData.IsFillToFull, missedFuelUp: formData.MissedFuelUp, tags }]
                    })
                    break
                case TaxFunctionStore.key:
                    await updateTaxRecord({
                        recordID: _recordID,
                        taxRecord: [{ cost: formData.Cost, date: convertedDate, description: formData.Description, notes: formData.Notes, tags }]
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

    useEffect(() => {
        const actionTypeMap = {
            [OdometerFunctionStore.key]: OdometerFunctionStore,
            [ServiceFunctionStore.key]: ServiceFunctionStore,
            [RepairFunctionStore.key]: RepairFunctionStore,
            [UpgradeFunctionStore.key]: UpgradeFunctionStore,
            [FuelFunctionStore.key]: FuelFunctionStore,
            [TaxFunctionStore.key]: TaxFunctionStore,
        }
        setCurrentActionType(actionTypeMap[actionType] || OdometerFunctionStore)
    }, [actionType])

    return (
        <SafeAreaView style={tw`flex flex-col p-4 pb-0 w-full h-full dark:bg-slate-900`}>
            <Stack.Screen options={{
                headerShadowVisible: false,
                headerShown: true,
                headerStyle: { backgroundColor: `transparent` },
                headerTitle: () => <Text style={tw`text-xl dark:text-white font-HKGrotesk-Medium`} numberOfLines={1}>Porsche 911 Carrera 3.2 2077 dfghsdffas fasfa sfa sfas f</Text>,
                statusBarStyle: 'dark',
                statusBarColor: '#f2f2f2',
                headerTransparent: true,
            }} />
            <View style={tw`mt-9`}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}
                    style={tw`p-4 pt-0`}>
                    <Text style={tw`font-HKGrotesk-Bold text-lg text-center mb-2 text-[${currentActionType?.buttonColor}]`}>Update {actionType.toString()} Record</Text>

                    <View>
                        {currentActionType?.visibleFields.date &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base mb-1`}>{t("Date")}
                                    {!currentActionType.mandatoryFields.date && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}
                                </Text>

                                <Controller control={control} name="Date" rules={{ required: currentActionType.mandatoryFields.date }}
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                            <Pressable onPress={() => setOpenDatePickerModal(true)}>
                                                <View style={tw`relative flex-row items-center`}>
                                                    <TextInput
                                                        style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg text-black dark:text-white
                                                border-[${currentActionType?.buttonColor}]/20 selection:border-[${currentActionType?.buttonColor}]/30 
                                                bg-gray-100 dark:bg-[${currentActionType?.buttonColor}]/40 border p-2 mb-2 pr-10 ${errors.Date && 'border-red-700' || ''}`}
                                                        readOnly={true}
                                                        value={value.toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale, {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })} />
                                                    <View style={tw`absolute right-4 top-3`}>
                                                        <CalendarDays size={22} color={tint(0.6, currentActionType?.buttonColor)} />
                                                    </View>
                                                </View>
                                            </Pressable>
                                            <DatePicker modal locale={Intl.DateTimeFormat().resolvedOptions().locale} mode='date' open={openDatePickerModal} date={value} theme='light' // TODO handle dark mode
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
                        {errors.Date && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.initialOdometer &&
                            <>
                                <View style={tw`flex-row items-center gap-2 mb-1 relative`}>
                                    <Text style={tw`font-HKGrotesk-SemiBold text-base dark:text-gray-100`}>{t("Initial_Odometer")}
                                        {!currentActionType.mandatoryFields.initialOdometer && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}
                                    </Text>
                                    <Pressable onPress={() => setShowTooltip(!showTooltip)}>
                                        <Info size={16} color={tint(0.1, currentActionType?.buttonColor)} />
                                    </Pressable>
                                    {showTooltip && (
                                        <View style={tw`absolute right-5 top-6 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm z-50 w-64 border border-gray-200 dark:border-slate-700`}>
                                            <View style={tw`flex-row justify-between items-start mb-1`}>
                                                <Text style={tw`font-HKGrotesk-Bold text-sm dark:text-white`}>Initial Odometer</Text>
                                                <Pressable onPress={() => setShowTooltip(false)} hitSlop={8}>
                                                    <X size={16} color={tint(0.6, currentActionType?.buttonColor)} />
                                                </Pressable>
                                            </View>
                                            <Text style={tw`text-sm text-gray-600 dark:text-gray-300`}>
                                                This optional field is the reading from your last record. This helps track the distance traveled between records.
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.initialOdometer }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={tw`relative flex-row items-center`}>
                                            <TextInput
                                                style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg 
                                        border-[${currentActionType?.buttonColor}]/20 selection:border-[${currentActionType?.buttonColor}]/30 
                                            bg-gray-100 dark:bg-[${currentActionType?.buttonColor}]/40 border p-2 mb-2
                                            dark:text-gray-100 ${errors.InitialOdometer && 'border-red-700' || ''}`}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                returnKeyType='next'
                                                value={value}
                                                editable={initialOdometerEditable}
                                            />
                                            <Pressable style={tw`absolute right-1 top-1`}
                                                onPress={() => setInitialOdometerEditable(!initialOdometerEditable)}>
                                                <View style={tw`flex flex-row items-center bg-[${currentActionType?.buttonColor}]/10 p-2 rounded-lg gap-2`}>
                                                    <PenSquare size={22} color={currentActionType?.buttonColor} />
                                                    <Text style={tw`font-HKGrotesk-Regular text-sm text-gray-500 text-[${currentActionType?.buttonColor}]`}>{t("Edit")}</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    )}
                                    name="InitialOdometer" />
                            </>
                        }

                        {errors.InitialOdometer && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.odometer &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>{t("Odometer")}
                                    {!currentActionType.mandatoryFields.odometer && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{
                                    required: { value: currentActionType.mandatoryFields.odometer, message: "Required Field and must be a number" }
                                }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={tw`relative flex-row items-center`}>
                                            <TextInput
                                                style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/20 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.Odometer && 'border-red-700' || ''}`}
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
                                                <GaugeCircle size={22} color={tint(0.6, currentActionType?.buttonColor)} />
                                            </View>
                                        </View>
                                    )}
                                    name="Odometer" />
                                {errors.Odometer &&
                                    <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400 -mt-1 mb-1`}>
                                        {errors.Odometer.type === 'pattern' ? 'Only numbers are allowed' : 'Required Field'}
                                    </Text>
                                }
                            </>
                        }

                        {currentActionType?.visibleFields.cost &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>{t("Cost")}
                                    {!currentActionType.mandatoryFields.cost && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: { value: currentActionType.mandatoryFields.cost, message: "Required Field and must be a number" } }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={tw`relative flex-row items-center`}>
                                            <TextInput
                                                style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/20 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.Cost && 'border-red-700' || ''}`}
                                                onBlur={onBlur}
                                                onChangeText={(text) => {
                                                    // Only allow numbers and decimal point
                                                    const numericValue = text.replace(/[^0-9.]/g, '')
                                                    onChange(numericValue);
                                                }}
                                                returnKeyType='next'
                                                value={value} keyboardType="numeric" inputMode="numeric" />
                                            <View style={tw`absolute right-4 top-3`}>
                                                <CircleDollarSign size={22} color={tint(0.6, currentActionType?.buttonColor)} />
                                            </View>
                                        </View>
                                    )}
                                    name="Cost" />
                            </>
                        }
                        {errors.Cost && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.description &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>{t("Description")}
                                    {!currentActionType.mandatoryFields.description && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.description }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/20 h-30 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.Description && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            returnKeyType='next'
                                            multiline={true}
                                            textAlignVertical="top"
                                            value={value} />)} name="Description" />
                            </>}
                        {errors.Description && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.fuelConsumed &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Amount of Fuel
                                    {!currentActionType.mandatoryFields.fuelConsumed && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.fuelConsumed }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={tw`relative flex-row items-center`}>
                                            <TextInput
                                                style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/20 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.ConsumedFuel && 'border-red-700' || ''}`}
                                                onBlur={onBlur}
                                                onChangeText={(text) => {
                                                    // Only allow numbers
                                                    const numericValue = text.replace(/[^0-9.]/g, '')
                                                    onChange(numericValue);
                                                }}
                                                returnKeyType='next'
                                                inputMode="numeric"
                                                value={value} />
                                            <View style={tw`absolute right-4 top-3`}>
                                                <FuelIcon size={22} color={tint(0.6, currentActionType?.buttonColor)} />
                                            </View>
                                        </View>
                                    )} name="ConsumedFuel" />
                            </>}
                        {errors.ConsumedFuel && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.isFulltoFill &&
                            <View style={tw`flex flex-row items-center justify-between pt-2`}>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Full Tank ?
                                    {!currentActionType.mandatoryFields.isFulltoFill && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <ModernSwitch
                                            onValueChange={() => onChange(!value)}
                                            value={value}
                                            activeColor={currentActionType?.buttonColor}
                                        />
                                    )} name="IsFillToFull" />
                            </View>}

                        {currentActionType?.visibleFields.missedFuelUp &&
                            <View style={tw`flex flex-row items-center justify-between py-2`}>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Missed Previous Record ?
                                    {!currentActionType.mandatoryFields.missedFuelUp && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <ModernSwitch
                                            onValueChange={() => onChange(!value)}
                                            value={value}
                                            activeColor={currentActionType?.buttonColor}
                                        />
                                    )} name="MissedFuelUp" />
                            </View>}

                        {currentActionType?.visibleFields.notes &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>{t("Notes")}
                                    {!currentActionType.mandatoryFields.notes && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.notes }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/20 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.Notes && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            returnKeyType='next'
                                            value={value} />)} name="Notes" />
                            </>
                        }
                        {errors.Notes && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.tags &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base pt-1`}>Tags
                                    {!currentActionType.mandatoryFields.tags && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.tags }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TagInput
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            color={currentActionType?.buttonColor}
                                            hasError={!!errors.Tags}
                                        />
                                    )} name="Tags" />
                            </>
                        }
                        {errors.Tags && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        <Pressable onPress={handleSubmit(handleForm)} style={tw`mb-4`}>
                            <Text style={tw`mt-4 p-2 bg-[${currentActionType?.buttonColor}]/60 text-white font-HKGrotesk-Medium rounded-full text-base text-center`}>
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