import { View, Text } from 'react-native'
import React from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { ServiceRecord } from '~/api/index-records.types'

type ServiceCardProps = RecordBase[0] & ServiceRecord[0]

const ServiceCard = ({ item, selectedButtonHexColor }: { item: ServiceCardProps, selectedButtonHexColor: string }) => {
    const { preferredDistanceMeasurement, preferredCurrencySymbol } = GlobalStateStore((state) => state)

    return (
        <View style={tw`p-4 mb-2 bg-white dark:bg-green-950 rounded-3xl`}>
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
        </View>
    )
}

export default ServiceCard