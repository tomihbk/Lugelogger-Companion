import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler, { GetWeekday } from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { useDeleteUpgradeRecord } from '~/hooks/api'
import { router } from 'expo-router'
import { UpgradeFunctionStore } from '~/stores/RecordButtons'
import DeleteButton from '../DeleteButton'
import { UpgradeRecord } from '~/api/index-records.types'
import Tag from '../TagComponent'
import NumberHandler from '~/utils/NumberHandler'

type UpgradeCardProps = RecordBase[0] & UpgradeRecord[0]

const UpgradeCard = ({ item, selectedButtonHexColor, vehicleId  }: { item: UpgradeCardProps, selectedButtonHexColor: string, vehicleId: number }) => {
    const { preferredCurrencySymbol, preferredDistanceMeasurement } = GlobalStateStore((state) => state)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteUpgradeRecord } = useDeleteUpgradeRecord()

    const handleDelete = async (id: number) => {
        await deleteUpgradeRecord({ recordID: id, vehicleId })
    }

    return (
        <View style={tw`mb-2`}>
        <Pressable
            style={tw`p-4 pt-3 pb-0 bg-white dark:bg-green-950 rounded-tr-3xl rounded-tl-3xl ${item.tags ? 'rounded-bl-none' : 'rounded-3xl p-4 pt-3'}`}
            onLongPress={() => setShowDeleteButton(prev => !prev)}
            onPress={() => {
                router.push({
                    pathname: "/update-record/[id]",
                    params: { id: item.id?.toString(), actionType: UpgradeFunctionStore.key, data: JSON.stringify(item), vehicleId }
                })
            }}>
            <View style={tw`flex flex-row flex-wrap justify-between`}>
                <Text style={tw`font-HKGrotesk-Bold text-lg w-1/2`}>{DateHandler(item.date).toString()}</Text>
                <Text style={tw`font-HKGrotesk-Bold text-lg text-right w-1/2`}>{preferredCurrencySymbol} {item?.cost}</Text>
                <Text style={tw`font-HKGrotesk-Regular text-xs text-left`}>{GetWeekday(item.date)}</Text>
                <Text style={tw`font-HKGrotesk-SemiBold text-xs text-right`}>{NumberHandler(parseInt(item.odometer || '0'))} {preferredDistanceMeasurement}</Text>
            </View>
            {item.description && <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`} numberOfLines={item.notes ? 1 : 2} ellipsizeMode="tail">{item.description}</Text>}

            {item.notes && <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`} numberOfLines={item.description ? 1 : 2} ellipsizeMode="tail">{item.notes}</Text>}
        </Pressable>
        {item.tags && <View style={tw`px-4 pb-3 bg-white dark:bg-green-950 rounded-br-3xl rounded-bl-3xl`}>
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

export default UpgradeCard