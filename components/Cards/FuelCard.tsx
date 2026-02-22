import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { useDeleteFuelRecord } from '~/hooks/api/use-get-fuelrecords'
import DeleteButton from '../DeleteButton'
import { router } from 'expo-router'
import { FuelFunctionStore } from '~/stores/RecordButtons'
import NumberHandler from '~/utils/NumberHandler'
import Tag from '../TagComponent'
import { Droplet } from 'lucide-react-native'

const FuelCard = ({ item, odometerDelta, selectedButtonHexColor, vehicleId }: { item: RecordBase[0], odometerDelta: number, selectedButtonHexColor: string, vehicleId: number }) => {
    const { preferredCurrencySymbol, preferredDistanceMeasurement, preferredLiquidMeasurement } = GlobalStateStore((state) => state)

    const cost = parseFloat(item.cost).toFixed(2)
    const costPerUnit = (parseFloat(item.cost) / parseFloat(item.fuelConsumed)).toFixed(2)
    const backgroundColorStyle = {
        backgroundColor: `${selectedButtonHexColor}1A` // Convert hex to RGBA transparency
    }
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const { mutateAsync: deleteFuelRecord } = useDeleteFuelRecord()

    const handleDelete = async (id: number) => {
        await deleteFuelRecord({ recordID: id, vehicleId })
    }

    return (
        <View style={tw`mb-2`}>
            <Pressable style={tw`p-4 pt-3 pb-0 bg-white dark:bg-green-950 rounded-tr-3xl rounded-tl-3xl ${item.tags ? 'rounded-bl-none' : 'rounded-3xl p-4 pt-3'}`}
                onLongPress={() => setShowDeleteButton(prev => !prev)}
                onPress={() => {
                    router.push({
                        pathname: "/update-record/[id]",
                        params: { id: item.id?.toString(), actionType: FuelFunctionStore.key, data: JSON.stringify(item), vehicleId }
                    })
                }}>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                    <Text style={tw`font-HKGrotesk-Bold text-base w-1/2`}>
                        {DateHandler(item.date).toString()}
                    </Text>
                    <Text style={tw`font-HKGrotesk-Bold text-base w-1/2 text-right`}>
                        {NumberHandler(parseInt(item.odometer))} {preferredDistanceMeasurement}
                    </Text>
                    <Text style={tw`font-HKGrotesk-Medium text-sm text-gray-500 w-1/2 mt-2`}>
                        VOLUME
                    </Text>
                    <Text style={tw`font-HKGrotesk-Medium text-sm text-gray-500 w-1/2 text-right mt-2`}>
                        COST
                    </Text>
                    <View style={tw`w-2/5 flex flex-row`}>
                        <Droplet color={selectedButtonHexColor} size={20} />
                        <Text style={tw`font-HKGrotesk-Bold text-base w-1/2 text-[${selectedButtonHexColor}]`}> {item.fuelConsumed}{preferredLiquidMeasurement}</Text>
                    </View>
                    <Text style={tw`font-HKGrotesk-Bold text-base w-3/5 text-right`}>
                        {preferredCurrencySymbol} {cost}
                    </Text>
                    <Text style={tw`font-HKGrotesk-Medium text-sm text-gray-500 w-1/2 mt-2`}>
                        Δ{odometerDelta} {preferredDistanceMeasurement}
                    </Text>
                    <Text style={tw`font-HKGrotesk-Medium text-sm text-gray-500 w-1/2 text-right mt-2`}>
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

export default FuelCard