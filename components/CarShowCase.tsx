import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import { LinearGradient } from 'expo-linear-gradient'
import { Heart } from 'lucide-react-native'
import { router } from 'expo-router'
import GlobalStateStore from '~/stores/globalStateStore'
import { useLastOdometerRecord } from '~/hooks/api/use-get-odometerrecords'
import AuthenticatedImage from './AuthenticatedImage'

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

    return (
        <TouchableOpacity style={tw`mb-5 z-50`} onPress={() => router.push({
            pathname: "/car-detail/[id]",
            params: { id: props.carId, actionType: "home" }
        })}>
            <View style={tw`w-full h-52 rounded-2xl overflow-hidden shadow-sm shadow-gray-800`}>
                <AuthenticatedImage uri={props.CarPhotoUri} resizeMode="cover" style={tw`absolute w-full h-full`} />
                <LinearGradient
                    colors={['rgba(0,5,55,1)', 'transparent']}
                    style={tw`flex flex-col w-full h-full`}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: .3 }}>
                    <View style={tw`flex flex-col h-full justify-between`}>
                        <TouchableOpacity style={tw`self-end m-5`} onPress={() => setFavoriteCar(props.carId)}>
                            <Heart color={favoriteCarId != props.carId ? "white" : "red"} fill={favoriteCarId != props.carId ? "rgba(0,0,0,0)" : "red"} size={24} />
                        </TouchableOpacity>
                        <View style={tw`flex-row flex-wrap w-full pb-5 px-5`}>
                            <Text style={tw`w-4/6 text-white text-base font-HKGrotesk-Bold`}>{props.Name}</Text>
                            <Text style={tw`w-2/6 text-white text-right pb-1 text-base font-HKGrotesk-Bold`}>{lastOdometerRecord?.toString()} {preferredDistanceMeasurement}</Text>
                            <Text style={tw`w-1/2 text-white text-base font-HKGrotesk-Bold`}>{props.PlateNumber}</Text>
                            <Text style={tw`w-1/2 text-white text-right text-base font-HKGrotesk-Bold`}>{props.Year}</Text>
                        </View>
                    </View>

                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}

export default CarShowCase