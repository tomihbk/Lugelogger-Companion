import { View, Text } from 'react-native'
import React from 'react'
import tw from '~/tw.config'

type TagsProps = {
    tags: string
    color: string
}

const Tag = ({ tags, color }: TagsProps) => {
    const tagArray = tags ? tags.split(' ').filter(tag => tag !== '') : []

    return (
        <View style={tw`flex-row flex-wrap mt-2 gap-2`}>
            {tagArray.map((tag, index) => (
                <View
                    key={index}
                    style={tw`px-2 py-0.5 bg-[${color}]/10 rounded-full`}>
                    <Text style={tw`font-HKGrotesk-Medium text-sm text-[${color}]`}>
                        {tag}
                    </Text>
                </View>
            ))}
        </View>
    )
}

export default Tag 