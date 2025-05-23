import { View, Text } from 'react-native'
import React from 'react'
import GlobalStateStore from '~/stores/globalStateStore'
import tw from '~/tw.config'
import DateHandler from '~/utils/DateHandler'
import { RecordBase } from '~/api/records-base.types'
import { TaxRecord } from '~/api/index-records.types'

type TaxCardProps = RecordBase[0] & TaxRecord[0]

const TaxCard = ({ item, selectedButtonHexColor }: { item: TaxCardProps, selectedButtonHexColor: string }) => {
    const { preferredCurrencySymbol } = GlobalStateStore((state) => state)

    return (
        <View style={tw`p-4 mb-2 bg-white dark:bg-green-950 rounded-3xl`}>
            <View style={tw`flex flex-row flex-wrap justify-between`}>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>{DateHandler(item.date).toString()}</Text>
                <Text style={tw`font-HKGrotesk-Medium text-base`}>{preferredCurrencySymbol} {item?.cost}</Text>
            </View>
            {item.description && <Text style={tw`bg-[${selectedButtonHexColor}]/5 mt-2 rounded-xl p-2 font-HKGrotesk-Medium text-base`} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>}
            {item.notes && <Text>{item.notes}</Text>}
        </View>
    )
}

export default TaxCard