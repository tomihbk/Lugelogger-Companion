import { StateStorage } from "zustand/middleware"
import { createMMKV } from "react-native-mmkv"

const storage = createMMKV()

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    storage.set(name, value)
  },

  getItem: (name) => {
    return storage.getString(name) ?? null
  },

  removeItem: (name) => {
    storage.remove(name)
  },
}
