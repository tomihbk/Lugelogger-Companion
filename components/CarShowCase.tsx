import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import { LinearGradient } from 'expo-linear-gradient'
import { Heart } from 'lucide-react-native'
import { router } from 'expo-router'
import GlobalStateStore from '~/stores/globalStateStore'

type CarShowCaseProps = {
    Year: string
    PlateNumber: string
    Mileage: string
    Name: string
    CarPhotoUri: string
    carId: number
}

const CarShowCase = (props: CarShowCaseProps) => {
    const setFavoriteCar = GlobalStateStore((state) => state.setFavoriteCar)
    const getFavoriteCar = GlobalStateStore((state) => state.favoriteCarId)

    return (
        <TouchableOpacity style={tw`mb-5`} onPress={() => router.push({
            pathname: "/car-detail/[id]",
            params: { id: props.carId as number, actionType: "service" } // TODO: change to "home" for production
        })}>
            <ImageBackground source={{ uri: props.CarPhotoUri }} resizeMode="cover" style={tw`w-full h-52 rounded-2xl overflow-hidden`}>
                <LinearGradient
                    colors={['rgba(0,5,55,1)', 'transparent']}
                    style={tw`flex flex-col w-full h-full`}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: .3 }}>
                    <View style={tw`flex flex-col h-full justify-between`}>
                        <TouchableOpacity style={tw`self-end p-5`} onPress={() => setFavoriteCar(props.carId)}>
                            <Heart color={getFavoriteCar != props.carId ? "white" : "red"} size={24} />
                        </TouchableOpacity>
                        <View style={tw`flex-row flex-wrap w-full pb-5 px-5`}>
                            <Text style={tw`w-4/6 text-white text-base font-HKGrotesk-Bold`}>{props.Name}</Text>
                            <Text style={tw`w-2/6 text-white text-right pb-1 text-base font-HKGrotesk-Bold`}>{props.Mileage}</Text>
                            <Text style={tw`w-1/2 text-white text-base font-HKGrotesk-Bold`}>{props.PlateNumber}</Text>
                            <Text style={tw`w-1/2 text-white text-right text-base font-HKGrotesk-Bold`}>{props.Year}</Text>
                        </View>
                    </View>

                </LinearGradient>
            </ImageBackground>

        </TouchableOpacity>
    )
}

export default CarShowCase