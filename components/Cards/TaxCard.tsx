import { View, Text, Pressable, ScrollView } from 'react-native'
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
import Tag from '../TagComponent'

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
                style={tw`p-4 pt-3 pb-0 bg-white dark:bg-green-950 rounded-tr-3xl rounded-tl-3xl ${item.tags ? 'rounded-bl-none' : 'rounded-3xl p-4 pt-3'}`}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: TaxFunctionStore.key, data: JSON.stringify(item) }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={tw`font-HKGrotesk-Bold text-lg`}>{DateHandler(item.date).toString()}</Text>
                    <Text style={tw`font-HKGrotesk-Bold text-lg`}>{preferredCurrencySymbol} {item?.cost}</Text>
                </View>
                {item.description && <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>}

                {item.notes && <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`} numberOfLines={2} ellipsizeMode="tail">{item.notes}</Text>}
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

export default TaxCard