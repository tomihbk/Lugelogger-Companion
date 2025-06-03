import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler, { GetWeekday } from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { ReminderRecord } from '~/api/index-records.types'
import { useDeleteReminderRecord } from '~/hooks/api/use-get-reminderrecords'
import { router } from 'expo-router'
import { ReminderFunctionStore } from '~/stores/RecordButtons'
import DeleteButton from '~/components/DeleteButton'
import Tag from '../TagComponent'
import NumberHandler from '~/utils/NumberHandler'

type ReminderCardProps = RecordBase[0] & ReminderRecord[0]

const ReminderCard = ({ item, selectedButtonHexColor }: { item: ReminderCardProps, selectedButtonHexColor: string }) => {
    const { preferredDistanceMeasurement } = GlobalStateStore((state) => state)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteReminderRecord } = useDeleteReminderRecord()

    const handleDelete = async (id: number) => {
        await deleteReminderRecord({ recordID: id })
    }
    console.log("reminderCard : " + JSON.stringify(item))
    console.log("item.metric : " + item.metric)
    const urgentColorHandler = () => {
        switch (item.urgency) {
            case 'PastDue':
                return 'text-gray-600 border border-gray-600 border-2'
            case 'VeryUrgent':
                return 'text-white bg-red-500'
            case 'Urgent':
                return 'text-white bg-yellow-500'
            case 'NotUrgent':
                return 'text-green-600 border border-green-600 border-2'
            default:
                return ''
        }
    }

    const metricHandler = () => {
        switch (item.metric) {
            case 'Odometer':
                return `${NumberHandler(parseInt(item.dueOdometer))} ${preferredDistanceMeasurement}`
            case 'Date':
            case 'Both':
                return `${(DateHandler(item.dueDate))}`
        }
    }

    return (
        <View style={tw`mb-2`}>
            <Pressable
                style={tw`p-4 pt-3 pb-0  bg-white dark:bg-green-950 rounded-tr-3xl rounded-tl-3xl ${item.tags ? 'rounded-bl-none' : 'rounded-3xl p-4 pt-3'}`}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: ReminderFunctionStore.key, data: JSON.stringify(item) }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={tw`font-HKGrotesk-Bold text-lg w-4/6`}>{metricHandler()}</Text>
                    <Text style={tw`font-HKGrotesk-Bold align-middle rounded-lg text-sm text-center w-2/6 ${urgentColorHandler()}`}>{item.urgency.replace(/([A-Z])/g, ' $1').trim()}</Text>
                    {item.metric === 'Both' &&
                        <Text style={tw`font-HKGrotesk-Bold text-lg`}>or {NumberHandler(parseInt(item.dueOdometer))} {preferredDistanceMeasurement}
                        </Text>}
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

export default ReminderCard