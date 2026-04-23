import React from "react"
import { Image, ImageProps } from "react-native"
import ServerSettingsStore from "~/stores/serverSettingsStore"
import { encode as base64Encode } from "base-64"
import { encode as utf8Encode } from "utf8"

type Props = ImageProps & {
    uri: string
}

const AuthenticatedImage = ({ uri, ...attributs }: Props) => {
    const savedSettings = ServerSettingsStore().getSettings()

    const token = base64Encode(
        utf8Encode(`${savedSettings?.username}:${savedSettings?.password}`)
    )

    return (
        <Image
            {...attributs}
            source={{ uri, headers: { Authorization: `Basic ${token}` } }} />
    )
}

export default AuthenticatedImage