import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { useForm, Controller } from "react-hook-form"
import { useAddServiceRecord } from '~/hooks/api/use-get-servicerecords'

const NewRecord = () => {
    const { mutateAsync: addServiceRecord } = useAddServiceRecord(1, [{ cost: "69", date: "9/28/2024", description: "Worakls Orechstre", odometer: "111111" }])

    const date = new Date().toLocaleDateString('de-DE', { year: '2-digit', month: '2-digit', day: '2-digit' })

    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            date: date,
            Odometer: "",
        },
    })

    const handleForm = (formData) => {
        console.log(formData)
    }
    const { id: CarTitle, actionType, themeColor } = useLocalSearchParams()

    return (
        <View style={tw`p-5 dark:bg-slate-900`}>
            <Stack.Screen options={{ title: CarTitle as string, headerShown: false }} />
            <Text style={tw`text-2xl mt-4 font-HKGrotesk-Bold`}>{CarTitle}</Text>
            <ScrollView showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}
                style={tw`flex flex-col bg-[${themeColor.toString()}]/5 rounded-lg p-4`}>
                <Text style={tw`font-HKGrotesk-Bold text-lg`}>New {actionType.toString().toLowerCase()} record</Text>
                <View style={tw``}>
                    <Text style={tw`font-HKGrotesk-SemiBold text-base mb-1`}>Date *</Text>
                    <Controller control={control} rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${themeColor.toString()}]/10 selection:border-[${themeColor.toString()}]/30 bg-gray-100 border p-2 mb-2`}
                                placeholder="Date"
                                onBlur={onBlur}
                                keyboardType='number-pad'
                                onChangeText={onChange}
                                value={value} />)} name="date" />

                    {errors.date && <Text>This is required.</Text>}

                    <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Odometer *</Text>
                    <Controller control={control} rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${themeColor.toString()}]/10 selection:border-[${themeColor.toString()}]/30 bg-gray-100 border p-2 mb-2`}
                                placeholder="Odometer"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} />)} name="Odometer" />
                    <Text style={tw`font-HKGrotesk-SemiBold text-base`}>Odometer *</Text>
                    <Controller control={control} rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${themeColor.toString()}]/10 selection:border-[${themeColor.toString()}]/30 bg-gray-100 border p-2 mb-2`}
                                placeholder="Odometer"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} />)} name="Odometer" /><Text style={tw`font-HKGrotesk-SemiBold text-base`}>Odometer *</Text>
                    <Controller control={control} rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${themeColor.toString()}]/10 selection:border-[${themeColor.toString()}]/30 bg-gray-100 border p-2 mb-2`}
                                placeholder="Odometer"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} />)} name="Odometer" /><Text style={tw`font-HKGrotesk-SemiBold text-base`}>Odometer *</Text>
                    <Controller control={control} rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={tw`font-HKGrotesk-Regular text-base w-full rounded-lg border-[${themeColor.toString()}]/10 selection:border-[${themeColor.toString()}]/30 bg-gray-100 border p-2 mb-2`}
                                placeholder="Odometer"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} />)} name="Odometer" />

                    {/* <TextInput keyboardType='' type='date' required>Date</TextInput>
                <TextInput type='number' required>Odometer</TextInput>
                <TextInput type='text' required>Description</TextInput>y
                <TextInput type='number' required>Cost</TextInput>
                <TextInput type='text'>Tags</TextInput>
                <TextInput type='text'>Notes</TextInput> */}
                    <Pressable onPress={handleSubmit(handleForm)}>
                        <Text style={tw`p-4 bg-[${themeColor.toString()}]/60 text-white font-HKGrotesk-Medium rounded-full text-center`}>
                            Add New Service Record
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

export default NewRecord