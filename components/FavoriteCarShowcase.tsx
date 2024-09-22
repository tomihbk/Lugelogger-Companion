import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from '~/tw.config';

type FavoriteCarShowCaseProps = {
    Year: string;
    PlateNumber: string;
    Mileage: string;
    Name: string;
    CarPhotoUri: string;
}

const FavoriteCarShowcase = (props: FavoriteCarShowCaseProps) => {
    return (
        <View>
            <Image
                style={tw`w-full h-40 rounded-2xl z-50`}
                source={{
                    uri: props.CarPhotoUri,
                }}
            />
            <View style={tw`flex flex-row flex-wrap bg-blue-50 -mt-5 pt-8 pb-4 px-5 rounded-b-3xl`}>
                <Text style={tw`w-4/6 font-semibold`}>{props.Name}</Text>
                <Text style={tw`w-2/6 font-semibold text-right`}>{props.Mileage}</Text>
                <Text style={tw`w-1/2 font-semibold`}>{props.PlateNumber}</Text>
                <Text style={tw`w-1/2 font-semibold text-right`}>{props.Year}</Text>
            </View>
        </View>
    )
}

export default FavoriteCarShowcase