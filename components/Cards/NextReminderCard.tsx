import React, { useMemo } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import tw from "~/tw.config"
import { Bell } from "lucide-react-native"
import { useReminderRecords } from "~/hooks/api"
import DateHandler from "~/utils/DateHandler"
import { useLastOdometerRecord } from '~/hooks/api/use-get-odometerrecords'

import GlobalStateStore from "~/stores/globalStateStore"

type ReminderCardProps = {
    carId: number
}

const NextReminderCard = ({ carId }: ReminderCardProps) => {
    const { preferredDistanceMeasurement } = GlobalStateStore((state) => state)
    const { data: lastOdometerRecord } = useLastOdometerRecord(carId)

    const {
        data: ReminderRecords,
        isPending: isReminderRecordsFetching,
    } = useReminderRecords(carId)

    const nextReminder = useMemo(() => {
        if (!ReminderRecords || !lastOdometerRecord) return null

        const now = new Date()
        const currentOdometer = parseInt(lastOdometerRecord)

        const upcoming = ReminderRecords
            .map(reminder => {
                const dueDate = DateHandler(reminder.dueDate, true) as Date

                const daysUntilDue =
                    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)

                const distanceUntilDue =
                    parseInt(reminder.dueOdometer) - currentOdometer

                // 🚨 Only keep VALID future values
                const validDays = daysUntilDue >= 0 ? daysUntilDue : Infinity
                const validDistance = distanceUntilDue >= 0 ? distanceUntilDue : Infinity

                let nextDueMetric: "Date" | "Odometer"
                let compareValue: number

                if (reminder.metric === "Both") {
                    if (validDays <= validDistance) {
                        nextDueMetric = "Date"
                        compareValue = validDays
                    } else {
                        nextDueMetric = "Odometer"
                        compareValue = validDistance
                    }
                } else if (reminder.metric === "Date") {
                    nextDueMetric = "Date"
                    compareValue = validDays
                } else {
                    nextDueMetric = "Odometer"
                    compareValue = validDistance
                }

                return {
                    ...reminder,
                    dueDateObj: dueDate,
                    daysUntilDue,
                    distanceUntilDue,
                    nextDueMetric,
                    compareValue
                }
            })
            // ❗ Only keep reminders that still have something upcoming
            .filter(r => r.compareValue !== Infinity)
            .sort((a, b) => a.compareValue - b.compareValue)

        return upcoming[0] ?? null
    }, [ReminderRecords, lastOdometerRecord])


    if (isReminderRecordsFetching) {
        return (
            <View style={tw`bg-neutral-900 p-4 rounded-2xl items-center`}>
                <ActivityIndicator />
            </View>
        )
    }

    if (!nextReminder) {
        return (
            <View style={tw`rounded-2xl p-4 mt-4 bg-white shadow-2xl dark:shadow-none shadow-blue-900/20`}>
                <Text style={tw`font-HKGrotesk-Medium`}>All good, no upcoming reminders 🎉</Text>
            </View>)
    }

    return (
        <View style={tw`mt-6 bg-white rounded-xl p-4 shadow-lg shadow-red-900/20`}>
            <View style={tw`flex-row items-start gap-4`}>
                <View style={tw`flex items-center justify-center h-10 w-10 rounded-xl bg-red-100`}>
                    <Bell size={24} color="rgba(220,38,38,1)" />
                </View>
                <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center gap-3 mb-2`}>
                        <Text style={tw`text-lg font-HKGrotesk-Bold`}>Next Reminder</Text>
                        {/* <View style={tw`bg-red-200 px-3 py-1 rounded`}>
                            <Text style={tw`text-xs font-HKGrotesk-Bold`}>
                                {nextReminder?.urgency && nextReminder?.urgency.replace(/([A-Z])/g, ' $1').trim()}
                            </Text>
                        </View> */}
                    </View>

                    <Text style={tw`text-sm mb-3 font-HKGrotesk-Medium text-gray-500`}>
                        {/* Primary (closest) */}
                        {nextReminder.nextDueMetric === "Date" && nextReminder.dueDate
                            ? DateHandler(nextReminder.dueDate).toString()
                            : nextReminder.nextDueMetric === "Odometer" && nextReminder.dueOdometer
                                ? `${nextReminder.dueOdometer}${preferredDistanceMeasurement}`
                                : null}

                        {/* Separator only if BOTH exist */}
                        {nextReminder.dueDate &&
                            nextReminder.dueOdometer &&
                            nextReminder.nextDueMetric &&
                            parseInt(nextReminder.dueOdometer) > 0 && " or "}

                        {/* Secondary (the other metric) */}
                        {nextReminder.nextDueMetric === "Date" &&
                            nextReminder.dueOdometer && parseInt(nextReminder.dueOdometer) > 0
                            ? `${nextReminder.dueOdometer}${preferredDistanceMeasurement}`
                            : nextReminder.nextDueMetric === "Odometer" &&
                                nextReminder.dueDate
                                ? DateHandler(nextReminder.dueDate).toString()
                                : null}
                    </Text>
                    <Text style={tw`font-HKGrotesk-Medium`}>
                        {nextReminder.description}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default NextReminderCard