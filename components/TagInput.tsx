import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import tw from '~/tw.config'
import { useTheme } from '~/hooks/useTheme'

type TagInputProps = {
    value: string
    onChangeText: (text: string) => void
    onBlur?: () => void
    color: string
    hasError?: boolean
}

const TagInput = ({ value, onChangeText, onBlur, color, hasError }: TagInputProps) => {
    const [currentInput, setCurrentInput] = useState('')
    const theme = useTheme()

    // Split existing value into tags
    const tags = value ? value.split(' ').filter(tag => tag !== '') : []

    const handleTextChange = (text: string) => {
        const lastChar = text.slice(-1)

        // If user types space or comma
        if (lastChar === ' ' || lastChar === ',') {
            const newTag = text.slice(0, -1).trim()
            if (newTag) {
                // Add the new tag to existing tags
                const updatedTags = [...tags, newTag]
                onChangeText(updatedTags.join(' '))
                setCurrentInput('')
            }
        } else {
            setCurrentInput(text)
        }
    }

    const removeTag = (indexToRemove: number) => {
        const updatedTags = tags.filter((_, index) => index !== indexToRemove)
        onChangeText(updatedTags.join(' '))
    }

    return (
        <View style={tw`flex flex-col`}>
            <View style={tw`flex flex-row flex-wrap gap-2 mb-2`}>
                {tags.map((tag, index) => (
                    <Pressable
                        key={index}
                        onPress={() => removeTag(index)}
                        style={[tw`flex-row items-center rounded-full px-2 py-1`, { backgroundColor: color + '70' }]}
                    >
                        <Text style={tw`font-HKGrotesk-Medium text-sm text-white mr-1`}>{tag}</Text>
                        <Text style={tw`font-HKGrotesk-Medium text-sm text-white`}>×</Text>
                    </Pressable>
                ))}
            </View>
            <TextInput
                style={[tw`font-HKGrotesk-Regular text-base w-full rounded-lg border p-2`, { backgroundColor: theme.colors.background.field, color: theme.colors.text.primary, borderColor: hasError ? theme.colors.status.danger : color + '40' }]}
                value={currentInput}
                onChangeText={handleTextChange}
                onBlur={onBlur}
                autoCapitalize="words"
                placeholder="Use space or comma to add tags"
                placeholderTextColor={theme.colors.text.secondary}
            />
        </View>
    )
}

export default TagInput 