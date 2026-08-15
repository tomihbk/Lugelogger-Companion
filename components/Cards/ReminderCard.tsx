import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { ReminderRecord } from '~/api/index-records.types'
import { useDeleteReminderRecord } from '~/hooks/api/use-get-reminderrecords'
import { router } from 'expo-router'
import { ReminderFunctionStore } from '~/stores/RecordButtons'
import DeleteButton from '~/components/DeleteButton'
import Tag from '../TagComponent'
import NumberHandler from '~/utils/NumberHandler'
import { useTheme } from '~/hooks/useTheme'
import AnimatedPressable from '../Animations/AnimatedPressable'

type ReminderCardProps = RecordBase[0] & ReminderRecord[0]

const ReminderCard = ({ item, selectedButtonHexColor, vehicleId }: { item: ReminderCardProps, selectedButtonHexColor: string, vehicleId: number }) => {
    const { preferredDistanceMeasurement } = GlobalStateStore((state) => state)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteReminderRecord } = useDeleteReminderRecord()
    const theme = useTheme()

    const handleDelete = async (id: number) => {
        await deleteReminderRecord({ recordID: id, vehicleId })
    }
    const urgentColorHandler = () => {
        switch (item.urgency) {
            case 'PastDue':
                return 'text-gray-600 dark:text-gray-300 border border-gray-600 dark:border-gray-300'
            case 'VeryUrgent':
                return 'text-white bg-red-500 dark:bg-red-600'
            case 'Urgent':
                return 'text-white bg-yellow-500 dark:bg-yellow-600'
            case 'NotUrgent':
                return 'text-green-600 dark:text-green-400 border border-green-600 dark:border-green-400'
            default:
                return ''
        }
    }

    const metricHandler = () => {
        switch (item.userMetric) {
            case 'Odometer':
                return `${NumberHandler(parseInt(item.dueOdometer))} ${preferredDistanceMeasurement}`
            case 'Date':
            case 'Both':
                return `${(DateHandler(item.dueDate))}`
        }
    }

    return (
        <View style={tw`mb-2`}>
            <AnimatedPressable
                style={[tw`p-4 pt-3 pb-0 rounded-tr-3xl rounded-tl-3xl ${item.tags ? 'rounded-bl-none' : 'rounded-3xl p-4 pt-3'}`, { backgroundColor: theme.colors.surface.neutral }]}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: ReminderFunctionStore.key, data: JSON.stringify(item), vehicleId }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={[tw`font-HKGrotesk-Bold text-lg w-4/6`, { color: theme.colors.text.primary }]}>{metricHandler()}</Text>
                    <Text style={[tw`font-HKGrotesk-Bold align-middle rounded-lg text-sm text-center w-2/6 ${urgentColorHandler()}`]}>{item.urgency.replace(/([A-Z])/g, ' $1').trim()}</Text>
                    {item.userMetric === 'Both' &&
                        <Text style={[tw`font-HKGrotesk-Bold text-lg`, { color: theme.colors.text.primary }]}>or {NumberHandler(parseInt(item.dueOdometer))} {preferredDistanceMeasurement}
                        </Text>}
                </View>
                {item.description && <Text style={[tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`, { color: theme.colors.text.secondary, backgroundColor: selectedButtonHexColor + '20' }]} numberOfLines={item.notes ? 1 : 2} ellipsizeMode="tail">{item.description}</Text>}

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

export default ReminderCard