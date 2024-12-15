import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { useForm, Controller } from "react-hook-form"
import { useAddServiceRecord } from '~/hooks/api/use-get-servicerecords'
import { useAddOdometerRecord } from '~/hooks/api/use-get-odometerrecords'
import { OdometerFunctionStore, ServiceFunctionStore } from '~/stores/RecordButtons'
import { OdometerFunctionStoreProp } from '~/stores/RecordButtons/odometerFunctionStore'
import { useTranslation } from 'react-i18next'
import GlobalStateStore from '~/stores/globalStateStore'

const NewRecord = () => {
    const { t } = useTranslation()
    const { id: CarId, actionType }: { id: string, actionType: string } = useLocalSearchParams()
    const [currentActionType, setCurrentActionType] = useState<OdometerFunctionStoreProp>()
    const { mutateAsync: addServiceRecord } = useAddServiceRecord()
    const { mutateAsync: addOdometerRecord } = useAddOdometerRecord()

    const date = new Date().toLocaleDateString('de-DE', { year: '2-digit', month: '2-digit', day: '2-digit' })

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Date: date,
            Odometer: "456",
            InitialOdometer: "123",
            Cost: "",
            Notes: "",
            Description: "",
            ConsumedFuel: "",
            IsFulltoFull: "",
            MissedFuelUp: "",
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
        IsFulltoFull: string;
        MissedFuelUp: string;
        Tags: string;
    }
    const handleForm = async (formData: formDataType) => {
        //console.log("formData : " + JSON.stringify(formData))
        // TODO this will not work because we're making a service request on an odometer form and there are missing mandatory fields

        try {
            switch (actionType) {
                case "service":
                    await addServiceRecord({
                        vehicleId: parseInt(CarId.toString()),
                        serviceRecord: [{ cost: formData.Cost, date: "10/29/2024", description: `Car ID ${CarId} - ${new Date().toISOString()}`, odometer: formData.Odometer, notes: formData.Notes }]
                    });
                    break;

                case "odometer":
                    await addOdometerRecord({
                        vehicleId: parseInt(CarId.toString()),
                        odometerRecord: [{ date: "10/29/2024", initialOdometer: formData.InitialOdometer, odometer: formData.Odometer, notes: formData.Notes }]
                    });
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error("Error handling form submission: ", error);
        }
        router.dismiss()
        //console.log(!!errors)
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
            case "repairs":
                setCurrentActionType(OdometerFunctionStore)
                break
            case "upgrades":
                setCurrentActionType(OdometerFunctionStore)
                break
            case "fuel":
                setCurrentActionType(OdometerFunctionStore)
                break
            case "taxes":
                setCurrentActionType(OdometerFunctionStore)
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
            <Stack.Screen options={{ title: CarId as string, headerShown: false }} />
            <Text style={tw`text-2xl my-4 font-HKGrotesk-Bold`}>{CarId}</Text>
            <View>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}
                    style={tw`bg-[${currentActionType?.buttonColor}]/5 dark:bg-[${currentActionType?.buttonColor}]/30 rounded-lg p-4`}>
                    <Text style={tw`font-HKGrotesk-Bold text-lg`}>New {actionType.toString().toLowerCase()} record</Text>

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

                        {currentActionType?.visibleFields.fuelConsumed &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Consumed Fuel
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
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Is Full to Full
                                    {!currentActionType.mandatoryFields.isFulltoFill && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.isFulltoFill }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/10 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.IsFulltoFull && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} />)} name="IsFulltoFull" />
                            </>}
                        {errors.IsFulltoFull && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.missedFuelUp &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Missed fuel up
                                    {!currentActionType.mandatoryFields.missedFuelUp && <Text style={tw`font-HKGrotesk-Italic italic text-sm`}>{" - " + t("Optional")}</Text>}</Text>
                                <Controller control={control} rules={{ required: currentActionType.mandatoryFields.missedFuelUp }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${currentActionType?.buttonColor}]/10 selection:border-[${currentActionType?.buttonColor}]/30 bg-gray-100 border p-2 mb-2 ${errors.MissedFuelUp && 'border-red-700' || ''}`}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} />)} name="MissedFuelUp" />
                            </>}
                        {errors.MissedFuelUp && <Text style={tw`font-HKGrotesk-Regular text-right text-red-700 dark:text-red-400`}>Required Field</Text>}

                        {currentActionType?.visibleFields.tags &&
                            <>
                                <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Tags
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
                                Add New Record
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView >
            </View>
        </View >
    )
}

export default NewRecord