import { View, Text, ScrollView, TextInput, Pressable, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { useForm, Controller } from "react-hook-form"
import { useAddFuelRecord, useAddTaxRecord, useUpdateOdometerRecord, useUpdateServiceRecord, useUpdateRepairRecord, useUpdateUpgradeRecord } from '~/hooks/api/index'
import { OdometerFunctionStore, ServiceFunctionStore, RepairFunctionStore, UpgradeFunctionStore, FuelFunctionStore, TaxFunctionStore } from '~/stores/RecordButtons'
import { OdometerFunctionStoreProp } from '~/stores/RecordButtons/odometerFunctionStore'
import { useTranslation } from 'react-i18next'

const NewRecord = () => {
    const { t } = useTranslation()
    const { id, actionType, data }: { id: string, actionType: string, data: any } = useLocalSearchParams()
    const _recordID = parseInt(id)
    const _data = JSON.parse(data)
    const [currentActionType, setCurrentActionType] = useState<OdometerFunctionStoreProp>(OdometerFunctionStore)
    const { mutateAsync: updateServiceRecord } = useUpdateServiceRecord()
    const { mutateAsync: updateOdometerRecord } = useUpdateOdometerRecord()
    const { mutateAsync: updateRepairRecord } = useUpdateRepairRecord()
    const { mutateAsync: updateUpgradeRecord } = useUpdateUpgradeRecord()
    const { mutateAsync: addFuelRecord } = useAddFuelRecord()
    const { mutateAsync: addTaxRecord } = useAddTaxRecord()

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Date: _data.date || "",
            Odometer: _data.odometer || "",
            InitialOdometer: _data.initialOdometer || "",
            Cost: _data.cost || "",
            Notes: _data.notes || "",
            Description: _data.description || "",
            ConsumedFuel: _data.fuelConsumed || "",
            IsFulltoFull: false,
            MissedFuelUp: false,
            Tags: ""
        },
        mode: "onChange"
    })
    type formDataType = {
        Date: string;
        Odometer: string;
        InitialOdometer: string;
        Cost: string;
        Notes: string;
        Description: string;
        ConsumedFuel: string;
        IsFulltoFull: boolean;
        MissedFuelUp: boolean;
        Tags: string;
    }
    const handleForm = async (formData: formDataType) => {
        //console.log("formData : " + JSON.stringify(formData))

        try {
            switch (actionType) {
                case ServiceFunctionStore.key:
                    await updateServiceRecord({
                        recordID: _recordID,
                        serviceRecord: [{ cost: formData.Cost, date: formData.Date, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes }]
                    })
                    break
                case OdometerFunctionStore.key:
                    await updateOdometerRecord({
                        recordID: _recordID,
                        odometerRecord: [{ date: formData.Date, initialOdometer: formData.InitialOdometer, odometer: formData.Odometer, notes: formData.Notes }]
                    })
                    break
                case RepairFunctionStore.key:
                    await updateRepairRecord({
                        recordID: _recordID,
                        repairRecord: [{ cost: formData.Cost, date: formData.Date, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes }]
                    })
                    break
                case UpgradeFunctionStore.key:
                    await updateUpgradeRecord({
                        recordID: _recordID,
                        upgradeRecord: [{ cost: formData.Cost, date: formData.Date, description: formData.Description, odometer: formData.Odometer, notes: formData.Notes }]
                    })
                    break
                case FuelFunctionStore.key:
                    await addFuelRecord({
                        vehicleId: _recordID,
                        fuelRecord: [{ cost: formData.Cost, date: "12/12/2024", description: formData.Description, odometer: formData.Odometer, notes: formData.Notes, fuelConsumed: formData.ConsumedFuel, isFillToFull: formData.IsFulltoFull, missedFuelUp: formData.MissedFuelUp }]
                    })
                    break
                case TaxFunctionStore.key:
                    await addTaxRecord({
                        vehicleId: _recordID,
                        taxRecord: [{ cost: formData.Cost, date: "12/12/2024", description: formData.Description, notes: formData.Notes }]
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

    //console.log("Error odo Type : " + JSON.stringify(errors))

    useEffect(() => {
        switch (actionType) {
            case "odometer":
                setCurrentActionType(OdometerFunctionStore)
                break
            case "service":
                setCurrentActionType(ServiceFunctionStore)
                break
            case "repair":
                setCurrentActionType(RepairFunctionStore)
                break
            case "upgrade":
                setCurrentActionType(UpgradeFunctionStore)
                break
            case "fuel":
                setCurrentActionType(FuelFunctionStore)
                break
            case "tax":
                setCurrentActionType(TaxFunctionStore)
                break
            case "notes":
                setCurrentActionType(OdometerFunctionStore)
                break
            default:
                break
        }

        // TODO needs optimization with "actionTypeMap: Record<string, any> ="" type
    }, [actionType])

    return (
        <View style={tw`flex flex-col p-5 pb-0 w-full h-full dark:bg-slate-900`}>
            <Stack.Screen options={{ title: id, headerShown: false }} />
            <Text style={tw`text-2xl my-4 font-HKGrotesk-Bold`}>{_recordID}</Text>
            <View>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}
                    style={tw`bg-[${currentActionType?.buttonColor}]/5 dark:bg-[${currentActionType?.buttonColor}]/30 rounded-lg p-4`}>
                    <Text style={tw`font-HKGrotesk-Bold text-lg`}>Update {actionType.toString().toLowerCase()} record</Text>

                    <View style={tw``}>
                        {currentActionType?.visibleFields.odometer &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base mb-1`}>{t("Date")}
                                    {!currentActionType.mandatoryFields.date && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}
                                </Text>

                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.date }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/10 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2`}
                                            onBlur={onBlur}
                                            keyboardType='number-pad'
                                            onChangeText={onChange}
                                            value={value} />)} name="Date" />
                            </>
                        }
                        {errors.Date && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.initialOdometer &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base dark:text-gray-100`}>{t("Initial_Odometer")}
                                    {!currentActionType.mandatoryFields.initialOdometer && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.initialOdometer }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg 
                                            border-[${currentActionType?.buttonColor}]/10 selection:border-[${currentActionType?.buttonColor}]/30 
                                            bg-gray-100 dark:bg-[${currentActionType?.buttonColor}]/40 border p-2 mb-2
                                            dark:text-gray-100 ${errors.InitialOdometer && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} />
                                    )}
                                    name="InitialOdometer" />
                            </>
                        }

                        {errors.InitialOdometer && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.odometer &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>{t("Odometer")}
                                    {!currentActionType.mandatoryFields.odometer && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.odometer }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/10 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.Odometer && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} />)}
                                    name="Odometer" />
                            </>
                        }
                        {errors.Odometer && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.cost &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>{t("Cost")}
                                    {!currentActionType.mandatoryFields.cost && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.cost }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/10 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.Cost && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} />)} name="Cost" />
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
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/10 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.Description && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} />)} name="Description" />
                            </>}
                        {errors.Description && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.fuelConsumed &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Amount of fuel filled
                                    {!currentActionType.mandatoryFields.fuelConsumed && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.fuelConsumed }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/10 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.ConsumedFuel && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} />)} name="ConsumedFuel" />
                            </>}
                        {errors.ConsumedFuel && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.isFulltoFill &&
                            <View style={tw`flex flex-row items-center justify-between pt-2`}>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Tank filled to full ?
                                    {!currentActionType.mandatoryFields.isFulltoFill && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Switch
                                            onValueChange={() => onChange(!value)}
                                            value={value} />)} name="IsFulltoFull" />
                            </View>}

                        {currentActionType?.visibleFields.missedFuelUp &&
                            <View style={tw`flex flex-row items-center justify-between py-2`}>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Missed fuel up ?
                                    {!currentActionType.mandatoryFields.missedFuelUp && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <><Text>{value} </Text><Switch
                                            onValueChange={() => onChange(!value)}
                                            value={value} /></>

                                    )} name="MissedFuelUp" />
                            </View>}

                        {currentActionType?.visibleFields.notes &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>{t("Notes")}
                                    {!currentActionType.mandatoryFields.notes && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.notes }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/10 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.Notes && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
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
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/10 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.Tags && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} />)} name="Tags" />
                            </>
                        }
                        {errors.Tags && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        <Pressable onPress={handleSubmit(handleForm)}>
                            <Text style={tw`mt-4 p-4 bg-[${currentActionType?.buttonColor}]/60 text-white font-HKGrotesk-Medium rounded-full text-center`}>
                                Update Record
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView >
            </View>
        </View >
    )
}

export default NewRecord