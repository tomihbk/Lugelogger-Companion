import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import { LinearGradient } from 'expo-linear-gradient'
import { Heart } from 'lucide-react-native'
import { router } from 'expo-router'
import GlobalStateStore from '~/stores/globalStateStore'
import { useLastOdometerRecord } from '~/hooks/api/use-get-odometerrecords'
import { encode as base64Encode } from "base-64"
import { encode as utf8Encode } from "utf8"

type CarShowCaseProps = {
    Year: number
    PlateNumber: string
    Name: string
    CarPhotoUri: string
    carId: number
}

const CarShowCase = (props: CarShowCaseProps) => {
    const { setFavoriteCar, favoriteCarId } = GlobalStateStore((state) => state)
    const { data: lastOdometerRecord } = useLastOdometerRecord(props.carId)
    const { preferredDistanceMeasurement } = GlobalStateStore((state) => state)

    // I wasted 5 hours on this trying to call the image via proper way by using axios, but it was not working.
    // So I just used the uri directly and it worked. it's not the best way to do it, but it 1am in the morning and I'm mentally exhausted.

    // TODO: Remove this once the image is fetched via axios
    // TODO: Remove hardcoded basic auth and use secure storage instead
    const username = process.env.EXPO_PUBLIC_API_USERNAME!
    const password = process.env.EXPO_PUBLIC_API_PASSWORD!
    const basicAuthToken = base64Encode(utf8Encode(`${username}:${password}`))

    return (
        <TouchableOpacity style={tw`mb-5 z-50`} onPress={() => router.push({
            pathname: "/car-detail/[id]",
            params: { id: props.carId as number, actionType: "odometer" } // TODO: change to "home" for production
        })}>
            <ImageBackground source={{ uri: `${props.CarPhotoUri}`, headers: { Authorization: `Basic ${basicAuthToken}` } }} onError={({ nativeEvent }) => {
                console.warn('ImageBackground failed:', nativeEvent);
            }} resizeMode="cover" style={tw`w-full h-52 rounded-2xl overflow-hidden`}>
                <LinearGradient
                    colors={['rgba(0,5,55,1)', 'transparent']}
                    style={tw`flex flex-col w-full h-full`}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: .3 }}>
                    <View style={tw`flex flex-col h-full justify-between`}>
                        <TouchableOpacity style={tw`self-end p-5`} onPress={() => setFavoriteCar(props.carId)}>
                            <Heart color={favoriteCarId != props.carId ? "white" : "red"} size={24} />
                        </TouchableOpacity>
                        <View style={tw`flex-row flex-wrap w-full pb-5 px-5`}>
                            <Text style={tw`w-4/6 text-white text-base font-HKGrotesk-Bold`}>{props.Name}</Text>
                            <Text style={tw`w-2/6 text-white text-right pb-1 text-base font-HKGrotesk-Bold`}>{lastOdometerRecord?.toString()} {preferredDistanceMeasurement}</Text>
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