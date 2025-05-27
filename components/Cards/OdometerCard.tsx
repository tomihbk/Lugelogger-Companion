import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { OdometerRecord } from '~/api/index-records.types'
import { router } from 'expo-router'
import { OdometerFunctionStore } from '~/stores/RecordButtons'
import { useDeleteOdometerRecord } from '~/hooks/api/index'
import DeleteButton from '~/components/DeleteButton'
import Tag from '~/components/TagComponent'

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
                {item.tags && <Tag tags={item.tags} color={selectedButtonHexColor} />}
            </Pressable>

            {showDeleteButton && (
                <DeleteButton
                    onPress={() => {
                        setShowDeleteButton(false)
                        if (item.id) handleDelete(parseInt(item.id))
                    }}
                />
            )}
        </View>
    )
}

export default OdometerCard