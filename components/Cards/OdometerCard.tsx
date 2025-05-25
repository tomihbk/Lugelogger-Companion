import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { OdometerRecord } from '~/api/index-records.types'
import { router } from 'expo-router'
import { OdometerFunctionStore } from '~/stores/RecordButtons'
import { Trash2 } from 'lucide-react-native'
import { useDeleteOdometerRecord } from '~/hooks/api/index'

type OdometerCardProps = RecordBase[0] & OdometerRecord[0]

const OdometerCard = ({ item, selectedButtonHexColor }: { item: OdometerCardProps, selectedButtonHexColor: string }) => {
    const { preferredDistanceMeasurement } = GlobalStateStore((state) => state)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteOdometerRecord } = useDeleteOdometerRecord()

    const calculateDeltaDistance = (initialOdometer: string, finalOdometer: string) => {
        return parseInt(finalOdometer.toString()) - parseInt(initialOdometer.toString())
    }

    const handleDelete = async (id: number) => {
        await deleteOdometerRecord({ recordID: id })
    }

    return (
        <View style={tw`mb-2`}>
            <Pressable
                style={tw`p-4 bg-white dark:bg-green-950 rounded-3xl`}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: OdometerFunctionStore.key, data: JSON.stringify(item) }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{DateHandler(item.date).toString()}</Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>Δ{calculateDeltaDistance(item.initialOdometer, item.odometer)}{preferredDistanceMeasurement}</Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{item.odometer}{preferredDistanceMeasurement}</Text>
                </View>
                {item.notes && <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`} numberOfLines={2} ellipsizeMode="tail">{item.notes}</Text>}
            </Pressable>

            {showDeleteButton && (
                <TouchableOpacity
                    style={tw`mt-2 p-3 bg-red-500 rounded-2xl flex-row justify-center items-center`}
                    onPress={() => {
                        setShowDeleteButton(false)
                        if (item.id) handleDelete(parseInt(item.id))
                    }}>
                    <Trash2 size={20} color="white" />
                    <Text style={tw`text-white font-HKGrotesk-Medium text-base ml-2`}>Delete Record</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default OdometerCard