import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import tw from '~/tw.config'
import { LinearGradient } from 'expo-linear-gradient'
import GlobalStateStore from '~/stores/globalStateStore'
import { Calendar, Gauge } from 'lucide-react-native'
import AuthenticatedImage from './AuthenticatedImage'
import { useFetchImageAccent } from '~/hooks/useFetchImageAccent'

type FavoriteCarShowCaseProps = {
    Year: string
    PlateNumber: string
    Mileage: string
    Name: string
    CarPhotoUri: string
}

const FavoriteCarShowcase = (props: FavoriteCarShowCaseProps) => {
    const { width } = Dimensions.get('window')
    const CARD_HEIGHT = width * 0.15

    const { preferredDistanceMeasurement } = GlobalStateStore((state) => state)
    const avgColor = useFetchImageAccent(props.CarPhotoUri)

    return (
        <View style={{ marginBottom: 16 }}>
            <View style={[tw`relative overflow-hidden rounded-3xl h-[${CARD_HEIGHT}]`]}>
                <AuthenticatedImage
                    uri={props.CarPhotoUri}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover" />

                <LinearGradient
                    colors={[avgColor, 'transparent']}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0.4 }}>
                    <View style={[tw`h-full justify-between`]}>
                        <Text
                            style={tw`text-white m-3 text-xs font-HKGrotesk-Medium self-end rounded-full bg-black/40 px-3 py-1.5 mb-3`}>
                            {props.PlateNumber}
                        </Text>

                        <View style={tw`p-3`}>
                            <Text style={tw`text-white text-2xl font-HKGrotesk-Bold leading-7`}>
                                {props.Name}
                            </Text>

                            <View style={tw`flex-row gap-3 mt-2`}>
                                <View style={tw`flex-row items-center gap-2 bg-black/40 rounded-xl px-3 py-2`}>
                                    <Gauge size={16} color="rgba(255,255,255,0.7)" />
                                    <Text style={tw`text-white text-xs font-HKGrotesk-Medium`}>
                                        {props.Mileage} {preferredDistanceMeasurement}
                                    </Text>
                                </View>

                                <View style={tw`flex-row items-center gap-2 bg-black/40 rounded-xl px-3 py-2`}>
                                    <Calendar size={16} color="rgba(255,255,255,0.7)" />
                                    <Text style={tw`text-white text-xs font-HKGrotesk-Medium`}>{props.Year}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default FavoriteCarShowcase
