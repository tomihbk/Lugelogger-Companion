import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { ServiceRecord } from '~/api/index-records.types'
import { useDeleteServiceRecord } from '~/hooks/api/use-get-servicerecords'
import { router } from 'expo-router'
import { ServiceFunctionStore } from '~/stores/RecordButtons'
import DeleteButton from '~/components/DeleteButton'

type ServiceCardProps = RecordBase[0] & ServiceRecord[0]

const ServiceCard = ({ item, selectedButtonHexColor }: { item: ServiceCardProps, selectedButtonHexColor: string }) => {
    const { preferredDistanceMeasurement, preferredCurrencySymbol } = GlobalStateStore((state) => state)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteServiceRecord } = useDeleteServiceRecord()

    const handleDelete = async (id: number) => {
        await deleteServiceRecord({ recordID: id })
    }

    return (
        <View style={tw`mb-2`}>
            <Pressable
                style={tw`p-4 bg-white dark:bg-green-950 rounded-3xl`}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: ServiceFunctionStore.key, data: JSON.stringify(item) }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{DateHandler(item.date).toString()}</Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{preferredCurrencySymbol} {item?.cost}</Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base`}>{item.odometer}{preferredDistanceMeasurement}</Text>
                </View>
                {item.description && <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>}
                {/* <View style={tw`flex flex-row flex-wrap justify-between`}>
                {arrayDumpData.map((data, id) => {
                    return <Text key={id} style={tw`font-HKGrotesk-Medium text-sm px-2 bg-[${selectedButtonHexColor}]/60 text-white rounded-full`}>{data}</Text>
                })} // TODO use me to show tags when clicking for more info of the record
            </View> */}
            </Pressable>

            {showDeleteButton && (
                <DeleteButton
                    onPress={() => {
                        setShowDeleteButton(false)
                        if (item.id) handleDelete(parseInt(item.id))
                    }}/>
            )}
        </View>
    )
}

export default ServiceCard