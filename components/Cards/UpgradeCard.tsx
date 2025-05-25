import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { useDeleteUpgradeRecord } from '~/hooks/api'
import { router } from 'expo-router'
import { UpgradeFunctionStore } from '~/stores/RecordButtons'
import DeleteButton from '../DeleteButton'
import { UpgradeRecord } from '~/api/index-records.types'

type UpgradeCardProps = RecordBase[0] & UpgradeRecord[0]

const UpgradeCard = ({ item, selectedButtonHexColor }: { item: UpgradeCardProps, selectedButtonHexColor: string }) => {
    const { preferredCurrencySymbol, preferredDistanceMeasurement } = GlobalStateStore((state) => state)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteUpgradeRecord } = useDeleteUpgradeRecord()

    const handleDelete = async (id: number) => {
        await deleteUpgradeRecord({ recordID: id })
    }

    return (
        <View style={tw`mb-2`}>
            <Pressable
                style={tw`p-4 bg-white dark:bg-green-950 rounded-3xl`}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: UpgradeFunctionStore.key, data: JSON.stringify(item) }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{DateHandler(item.date).toString()}</Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{preferredCurrencySymbol} {item?.cost}</Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{item.odometer}{preferredDistanceMeasurement}</Text>
                </View>
                {item.description && <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>}
                {item.notes && <Text>{item.notes}</Text>}
            </Pressable>

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