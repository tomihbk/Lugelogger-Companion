import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler, { GetWeekday } from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { OdometerRecord } from '~/api/index-records.types'
import { router } from 'expo-router'
import { OdometerFunctionStore } from '~/stores/RecordButtons'
import { useDeleteOdometerRecord } from '~/hooks/api/index'
import DeleteButton from '~/components/DeleteButton'
import Tag from '~/components/TagComponent'
import NumberHandler from '~/utils/NumberHandler'
import { useTheme } from '~/hooks/useTheme'
type OdometerCardProps = RecordBase[0] & OdometerRecord[0]

const OdometerCard = ({ item, selectedButtonHexColor, vehicleId }: { item: OdometerCardProps, selectedButtonHexColor: string, vehicleId: number }) => {
    const { preferredDistanceMeasurement } = GlobalStateStore((state) => state)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteOdometerRecord } = useDeleteOdometerRecord()
    const weekday = GetWeekday(item.date)
    const theme = useTheme()

    const calculateDeltaDistance = (initialOdometer: string, finalOdometer: string) => {
        return parseInt(finalOdometer.toString()) - parseInt(initialOdometer.toString())
    }

    const handleDelete = async (id: number) => {
        await deleteOdometerRecord({ recordID: id, vehicleId })
    }

    return (
        <View style={tw`mb-2`}>
            <Pressable
                style={[tw`p-4 pt-3 pb-0 rounded-tr-3xl rounded-tl-3xl ${item.tags ? 'rounded-bl-none' : 'rounded-3xl p-4 pt-3'}`, { backgroundColor: theme.colors.surface.neutral }]}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: OdometerFunctionStore.key, data: JSON.stringify(item), vehicleId }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={[tw`font-HKGrotesk-Bold text-lg w-1/2`, { color: theme.colors.text.primary }]}>{DateHandler(item.date).toString()}</Text>
                    <Text style={[tw`font-HKGrotesk-Bold text-lg text-right w-1/2`, { color: theme.colors.text.primary }]}>{NumberHandler(parseInt(item.odometer))} {preferredDistanceMeasurement}</Text>
                    <Text style={[tw`font-HKGrotesk-Regular text-xs text-left`, { color: theme.colors.text.primary }]}>{weekday}</Text>
                    <Text style={[tw`font-HKGrotesk-SemiBold text-xs text-right`, { color: theme.colors.text.primary }]}>Δ{NumberHandler(calculateDeltaDistance(item.initialOdometer, item.odometer))} {preferredDistanceMeasurement}</Text>
                </View>

                {item.notes && <Text style={[tw`mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`, { color: theme.colors.text.secondary, backgroundColor: selectedButtonHexColor + '20' }]} numberOfLines={2} ellipsizeMode="tail">{item.notes}</Text>}
            </Pressable>
            {item.tags && <View style={[tw`px-4 pb-3 rounded-br-3xl rounded-bl-3xl`, { backgroundColor: theme.colors.surface.neutral }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {item.tags && <Tag tags={item.tags} color={selectedButtonHexColor} />}
                </ScrollView>
            </View>}
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