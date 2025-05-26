import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { useDeleteFuelRecord } from '~/hooks/api/use-get-fuelrecords'
import DeleteButton from '../DeleteButton'
import { router } from 'expo-router'
import { FuelFunctionStore } from '~/stores/RecordButtons'

const FuelCard = ({ item, odometerDelta, selectedButtonHexColor }: { item: RecordBase[0], odometerDelta: number, selectedButtonHexColor: string }) => {
    const { preferredCurrencySymbol, preferredDistanceMeasurement, preferredLiquidMeasurement } = GlobalStateStore((state) => state)

    // Calculate derived values only once
    const cost = parseFloat(item.cost).toFixed(2)
    const costPerUnit = (parseFloat(item.cost) / parseFloat(item.fuelConsumed)).toFixed(2)
    const backgroundColorStyle = {
        backgroundColor: `${selectedButtonHexColor}1A` // Convert hex to RGBA transparency
    }
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteFuelRecord } = useDeleteFuelRecord()

    const handleDelete = async (id: number) => {
        await deleteFuelRecord({ recordID: id })
    }


    return (
        <View style={tw`mb-2`}>
            <Pressable style={tw`p-4 bg-white dark:bg-green-950 rounded-3xl`}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: FuelFunctionStore.key, data: JSON.stringify(item) }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={tw`font-HKGrotesk-Medium text-base w-1/2`}>
                        {DateHandler(item.date).toString()}
                    </Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base w-1/2 text-right`}>
                        {item.odometer}{preferredDistanceMeasurement}
                    </Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base w-1/2`}>
                        {item.fuelConsumed}{preferredLiquidMeasurement}
                    </Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base w-1/2 text-right`}>
                        {preferredCurrencySymbol} {cost}
                    </Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base w-1/2`}>
                        Δ{odometerDelta}{preferredDistanceMeasurement}
                    </Text>
                    <Text style={tw`font-HKGrotesk-Medium text-base w-1/2 text-right`}>
                        {preferredCurrencySymbol} {costPerUnit}/{preferredLiquidMeasurement}
                    </Text>
                </View>
                {item.notes && (
                    <Text
                        style={[tw`mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`, backgroundColorStyle]}
                        numberOfLines={2} ellipsizeMode="tail">{item.notes}
                    </Text>
                )}
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

export default FuelCard