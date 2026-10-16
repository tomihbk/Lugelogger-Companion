import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '~/tw.config'
import { LinearGradient } from 'expo-linear-gradient'
import { Heart } from 'lucide-react-native'
import { router } from 'expo-router'
import GlobalStateStore from '~/stores/globalStateStore'
import { useLastOdometerRecord } from '~/hooks/api/use-get-odometerrecords'
import AuthenticatedImage from './AuthenticatedImage'
import { useTheme } from '~/hooks/useTheme'
import { darken } from 'polished'
import useThemeStore from '~/stores/themeStore'
import AnimatedPressable from './Animations/AnimatedPressable'
import { useAnalytics } from '~/utils/Analytics'

type CarShowCaseProps = {
    Year: number
    PlateNumber: string
    Name: string
    CarPhotoUri: string
    carId: number
    vehicleName: string
}

const CarShowCase = (props: CarShowCaseProps) => {
    const { setFavoriteCar, favoriteCarId } = GlobalStateStore((state) => state)
    const { data: lastOdometerRecord } = useLastOdometerRecord(props.carId)
    const { preferredDistanceMeasurement } = GlobalStateStore((state) => state)
    const theme = useTheme()
    const { colorScheme } = useThemeStore()
    const colorTintValue = colorScheme === 'light' ? .4 : .4
    const analytics = useAnalytics()

    return (
        <AnimatedPressable style={tw`mb-5 z-50`} onPress={() => router.push({
            pathname: "/car-detail/[id]",
            params: { id: props.carId, actionType: "home", vehicleName: props.vehicleName }
        })}>
            <View style={[tw`h-52 rounded-2xl overflow-hidden`]}>
                <AuthenticatedImage uri={props.CarPhotoUri} resizeMode="cover" style={tw`absolute w-full h-full`} />
                <LinearGradient
                    colors={[darken(colorTintValue, theme.colors.brand.primary), 'transparent']}
                    style={tw`flex flex-col w-full h-full`}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: .3 }}>
                    <View style={tw`flex flex-col h-full justify-between`}>
                        <AnimatedPressable style={tw`self-end m-5`} onPress={() => {
                            setFavoriteCar(props.carId)
                            analytics.primaryVehicleChanged()
                        }}>
                            <Heart color={favoriteCarId != props.carId ? "white" : "red"} fill={favoriteCarId != props.carId ? "rgba(0,0,0,0)" : "red"} size={24} />
                        </AnimatedPressable>
                        <View style={tw`flex-row flex-wrap w-full pb-5 px-5`}>
                            <Text style={tw`w-4/6 text-white text-base font-HKGrotesk-Bold`}>{props.Name}</Text>
                            <Text style={tw`w-2/6 text-white text-right pb-1 text-base font-HKGrotesk-Bold`}>{lastOdometerRecord?.toString()} {preferredDistanceMeasurement}</Text>
                            <Text style={tw`w-1/2 text-white text-base font-HKGrotesk-Bold`}>{props.PlateNumber}</Text>
                            <Text style={tw`w-1/2 text-white text-right text-base font-HKGrotesk-Bold`}>{props.Year}</Text>
                        </View>
                    </View>

                </LinearGradient>
            </View>
        </AnimatedPressable>
    )
}

export default CarShowCase