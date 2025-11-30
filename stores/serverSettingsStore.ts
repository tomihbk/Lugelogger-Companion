import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./zustandStorage"
import { encode as base64Encode, decode as base64Decode } from "base-64"

// Simple XOR encryption with a key
// Note: This is basic obfuscation. For production, consider expo-crypto with rebuild
const ENCRYPTION_KEY =
  "your-secure-encryption-key-change-this-to-something-random"

interface ServerSettings {
  serverURL: string
  username: string
  password: string
}

interface ServerSettingsStoreProp {
  encryptedSettings: string | null
  getSettings: () => ServerSettings | null
  setSettings: (settings: ServerSettings) => void
  clearSettings: () => void
}

// Simple XOR encryption that works in React Native
const encryptData = (data: ServerSettings): string => {
  const jsonString = JSON.stringify(data)
  let encrypted = ""

  for (let i = 0; i < jsonString.length; i++) {
    const charCode =
      jsonString.charCodeAt(i) ^
      ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
    encrypted += String.fromCharCode(charCode)
  }

  return base64Encode(encrypted)
}

const decryptData = (encryptedData: string): ServerSettings | null => {
  try {
    const decoded = base64Decode(encryptedData)
    let decrypted = ""

    for (let i = 0; i < decoded.length; i++) {
      const charCode =
        decoded.charCodeAt(i) ^
        ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      decrypted += String.fromCharCode(charCode)
    }

    return JSON.parse(decrypted)
  } catch (error) {
    console.error("Failed to decrypt settings:", error)
    return null
  }
}

const ServerSettingsStore = create<ServerSettingsStoreProp>()(
  persist(
    (set, get) => ({
      encryptedSettings: null,

      getSettings: () => {
        const { encryptedSettings } = get()
        if (!encryptedSettings) return null
        return decryptData(encryptedSettings)
      },

      setSettings: (settings) => {
        const encrypted = encryptData(settings)
        set({ encryptedSettings: encrypted })
      },

      clearSettings: () => {
        set({ encryptedSettings: null })
      },
    }),
    {
      name: "server-settings-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)

export default ServerSettingsStore
