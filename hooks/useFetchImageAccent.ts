import { useEffect, useState } from "react"
import { File, Paths } from "expo-file-system"
import ImageColors from "react-native-image-colors"
import ServerSettingsStore from "~/stores/serverSettingsStore"
import { encode as base64Encode } from "base-64"
import { encode as utf8Encode } from "utf8"

export const useFetchImageAccent = (uri: string) => {
  const [color, setColor] = useState<string>("#000000")
  const { getSettings } = ServerSettingsStore()

  useEffect(() => {
    if (!uri) return

    let isMounted = true

    const fetchColor = async () => {
      try {
        const token = base64Encode(
          utf8Encode(`${getSettings()?.username}:${getSettings()?.password}`),
        )
        const filename = `${base64Encode(uri)
          .replace(/\//g, "_")
          .replace(/\+/g, "-")
          .replace(/=/g, "")}.jpg`

        const localFile = new File(Paths.cache, filename)

        if (!localFile.exists) {
          await File.downloadFileAsync(uri, localFile, {
            headers: { Authorization: `Basic ${token}` },
          })
        }

        const colors = await ImageColors.getColors(localFile.uri, {})
        //console.log("Extracted colors:", colors)
        if (isMounted) {
          setColor(
            String(
              (colors.platform === "android" && colors.vibrant) ||
                (colors.platform === "ios" && colors.background),
            ),
          )
        }
      } catch (err) {
        console.warn("Image color extraction failed:", err)
        if (isMounted) setColor("#000000")
      }
    }

    fetchColor()

    return () => {
      isMounted = false
    }
  }, [uri, getSettings])

  return color
}
