import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import tw from '~/tw.config'
import { Save } from 'lucide-react-native'
import { useForm, Controller } from "react-hook-form"
import { useAddServiceRecord } from '~/hooks/api/use-get-servicerecords'

const NewRecord = () => {
    const { mutateAsync: addServiceRecord } = useAddServiceRecord(1, [{ cost: "69", date: "9/28/2024", description: "Worakls Orechstre", odometer: "111111" }])

    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: '2-digit' })

    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            date: date,
            Odometer: "",
        },
    })

    const handleForm = (formData) => {
        console.log(formData)
    }
    const { id: CarTitle, actionType } = useLocalSearchParams()

    return (
        <View style={tw`flex flex-col p-5 w-full h-full dark:bg-slate-900`}>
            <Stack.Screen options={{ title: CarTitle as string, headerShown: false }} />
            <Text style={tw`text-2xl mt-4 font-HKGrotesk-Bold`}>{CarTitle}</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                style={tw`flex flex-col flex-wrap p-2 mb-2 `}>
                <Text>New {actionType} record :</Text>
                <View>
                    <Controller control={control} rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Date"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} />
                        )}
                        name="date"
                    />
                    {errors.date && <Text>This is required.</Text>}

                    <Controller control={control} rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Odometer"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} />
                        )}
                        name="Odometer"
                    />


                    {/* <TextInput keyboardType='' type='date' required>Date</TextInput>
                <TextInput type='number' required>Odometer</TextInput>
                <TextInput type='text' required>Description</TextInput>
                <TextInput type='number' required>Cost</TextInput>
                <TextInput type='text'>Tags</TextInput>
                <TextInput type='text'>Notes</TextInput> */}
                    <Pressable onPress={handleSubmit(handleForm)}>
                        <Text style={tw`p-4 bg-red-200 font-HKGrotesk-Medium rounded-full text-center`}>
                            Add New Service Record
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

export default NewRecord