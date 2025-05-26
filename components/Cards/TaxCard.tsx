import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { TaxRecord } from '~/api/index-records.types'
import { TaxFunctionStore } from '~/stores/RecordButtons'
import { router } from 'expo-router'
import { useDeleteTaxRecord } from '~/hooks/api/use-get-taxrecords'
import DeleteButton from '../DeleteButton'

type TaxCardProps = RecordBase[0] & TaxRecord[0]

const TaxCard = ({ item, selectedButtonHexColor }: { item: TaxCardProps, selectedButtonHexColor: string }) => {
    const { preferredCurrencySymbol } = GlobalStateStore((state) => state)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteTaxRecord } = useDeleteTaxRecord()

    const handleDelete = async (id: number) => {
        await deleteTaxRecord({ recordID: id })
    }

    return (
        <View style={tw`mb-2`}>
            <Pressable
                style={tw`p-4 bg-white dark:bg-green-950 rounded-3xl`}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: TaxFunctionStore.key, data: JSON.stringify(item) }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{DateHandler(item.date).toString()}</Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{preferredCurrencySymbol} {item?.cost}</Text>
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

export default TaxCard