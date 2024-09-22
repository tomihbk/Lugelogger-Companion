import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from '~/tw.config';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';
import { router } from 'expo-router';

type CarShowCaseProps = {
    Year: string;
    PlateNumber: string;
    Mileage: string;
    Name: string;
    CarPhotoUri: string;
}

const CarShowCase = (props: CarShowCaseProps) => {
    const [isFavoriteCar, setIsFavoriteCar] = useState(true);

    return (
        <TouchableOpacity style={tw`mb-5`} onPress={() => router.push({
            pathname: "/car/[id]",
            params: { id: props.Name }
        })}>
            <ImageBackground source={{ uri: props.CarPhotoUri }} resizeMode="cover" style={tw`w-full h-52 rounded-2xl overflow-hidden`}>
                <LinearGradient
                    colors={['rgba(0,5,55,1)', 'transparent']}
                    style={tw`flex flex-col w-full h-full`}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: .5 }}>
                    <View style={tw`flex flex-col h-full justify-between`}>
                        <TouchableOpacity style={tw`self-end p-5`} onPress={() => setIsFavoriteCar(!isFavoriteCar)}>
                            <Heart color={isFavoriteCar ? "white" : "red"} size={24} />
                        </TouchableOpacity>
                        <View style={tw`flex-row flex-wrap w-full pb-5 px-5`}>
                            <Text style={tw`w-4/6 font-semibold text-white`}>{props.Name}</Text>
                            <Text style={tw`w-2/6 font-semibold text-white text-right pb-2`}>{props.Mileage}</Text>
                            <Text style={tw`w-1/2 font-semibold text-white`}>{props.PlateNumber}</Text>
                            <Text style={tw`w-1/2 font-semibold text-white text-right`}>{props.Year}</Text>
                        </View>
                    </View>

                </LinearGradient>
            </ImageBackground>

        </TouchableOpacity>
    )
}

export default CarShowCase