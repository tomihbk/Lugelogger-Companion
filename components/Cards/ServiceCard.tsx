import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler, { GetWeekday } from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { ServiceRecord } from '~/api/index-records.types'
import { useDeleteServiceRecord } from '~/hooks/api/use-get-servicerecords'
import { router } from 'expo-router'
import { ServiceFunctionStore } from '~/stores/RecordButtons'
import DeleteButton from '~/components/DeleteButton'
import Tag from '../TagComponent'
import NumberHandler from '~/utils/NumberHandler'
import { useTheme } from '~/hooks/useTheme'
import AnimatedPressable from '../Animations/AnimatedPressable'

type ServiceCardProps = RecordBase[0] & ServiceRecord[0]

const ServiceCard = ({ item, selectedButtonHexColor, vehicleId }: { item: ServiceCardProps, selectedButtonHexColor: string, vehicleId: number }) => {
    const { preferredDistanceMeasurement, preferredCurrencySymbol } = GlobalStateStore((state) => state)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteServiceRecord } = useDeleteServiceRecord()
    const theme = useTheme()

    const handleDelete = async (id: number) => {
        await deleteServiceRecord({ recordID: id, vehicleId })
    }

    return (
        <View style={tw`mb-2`}>
            <AnimatedPressable
                style={[tw`p-4 pt-3 pb-0 rounded-tr-3xl rounded-tl-3xl ${item.tags ? 'rounded-bl-none' : 'rounded-3xl p-4 pt-3'}`, { backgroundColor: theme.colors.surface.neutral }]}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: ServiceFunctionStore.key, data: JSON.stringify(item), vehicleId }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={[tw`font-HKGrotesk-Bold text-lg w-1/2`, { color: theme.colors.text.primary }]}>{DateHandler(item.date).toString()}</Text>
                    <Text style={[tw`font-HKGrotesk-Bold text-lg text-right w-1/2`, { color: theme.colors.text.primary }]}>{preferredCurrencySymbol} {item?.cost}</Text>
                    <Text style={[tw`font-HKGrotesk-Regular text-xs text-left`, { color: theme.colors.text.primary }]}>{GetWeekday(item.date)}</Text>
                    <Text style={[tw`font-HKGrotesk-SemiBold text-xs text-right`, { color: theme.colors.text.primary }]}>{NumberHandler(parseInt(item.odometer || '0'))} {preferredDistanceMeasurement}</Text>
                </View>
                {item.description && <Text style={[tw`mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`, { color: theme.colors.text.secondary, backgroundColor: selectedButtonHexColor + '20' }]} numberOfLines={item.notes ? 1 : 2} ellipsizeMode="tail">{item.description}</Text>}

                {item.notes && <Text style={[tw`mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`, { color: theme.colors.text.secondary, backgroundColor: selectedButtonHexColor + '20' }]} numberOfLines={item.description ? 1 : 2} ellipsizeMode="tail">{item.notes}</Text>}
             </AnimatedPressable>
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
                    }} />
            )}
        </View>
    )
}

export default ServiceCard