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
        <View style={tw`flex flex-row flex-wrap mt-2 gap-2`}>
            {tagArray.map((tag, index) => (
                <Text key={index} style={tw`font-HKGrotesk-Medium text-sm px-2 bg-[${color}]/10 text-[${color}] rounded-full`}>
                    {tag}
                </Text>
            ))}
        </View>
    )
}

export default Tag 