import { View, Text } from 'react-native'
import React from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { OdometerRecord } from '~/api/index-records.types'

type OdometerCardProps = RecordBase[0] & OdometerRecord[0]

const OdometerCard = ({ item, selectedButtonHexColor }: { item: OdometerCardProps, selectedButtonHexColor: string }) => {
    const { preferredDistanceMeasurement } = GlobalStateStore((state) => state)

    const arrayDumpData = ["high", "low", "test", "high", "low", "test", "high", "low", "test"]

    const calculateDeltaDistance = (initialOdometer: string, finalOdometer: string) => {
        return parseInt(finalOdometer.toString()) - parseInt(initialOdometer.toString())
    }

    return (
        <View style={tw`p-4 mb-2 bg-white dark:bg-green-950 rounded-3xl`}>
            <View style={tw`flex flex-row flex-wrap justify-between`}>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>{DateHandler(item.date).toString()}</Text>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>Δ{calculateDeltaDistance(item.initialOdometer, item.odometer)}{preferredDistanceMeasurement}</Text>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>{item.odometer}{preferredDistanceMeasurement}</Text>
            </View>
            {item.notes && <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`} numberOfLines={2} ellipsizeMode="tail">{item.notes}</Text>}
            {/* <View style={tw`flex flex-row flex-wrap justify-between`}>
                {arrayDumpData.map((data, id) => {
                    return <Text key={id} style={tw`font-HKGrotesk-Medium text-sm px-2 bg-[${selectedButtonHexColor}]/60 text-white rounded-full`}>{data}</Text>
                })} // TODO use me to show tags when clicking for more info of the record
            </View> */}
        </View>
    )
}

export default OdometerCard


// {
//     "date": "10/29/2024", OK
//     "initialOdometer": "123", AKA last odometer reading OK
//     "odometer": "456", OK
//     "notes": "Watashiwa", OK
//     "tags": null, NA
//     "extraFields": [] NA
// },