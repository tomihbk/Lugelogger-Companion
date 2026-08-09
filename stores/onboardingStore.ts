import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./zustandStorage"

export const CURRENT_SETUP_VERSION = 1

export interface OnboardingSteps {
  index: boolean
  server: boolean
  "favorite-vehicle": boolean
  preferences: boolean
}

interface OnboardingStoreState {
  setupVersion: number

  steps: OnboardingSteps

  completeStep: (step: keyof OnboardingSteps) => void

  finish: () => void
  reset: () => void
}

const initialSteps: OnboardingSteps = {
  index: false,
  server: false,
  "favorite-vehicle": false,
  preferences: false,
}

const useOnboardingStore = create<OnboardingStoreState>()(
  persist(
    (set) => ({
      setupVersion: 0,// This helps us track if the user has completed the onboarding process for the current version of the app, let's say we add a new onboarding step in the future, we can increment this version number and force the user to go through the onboarding process again.

      steps: initialSteps,

      completeStep: (step) =>
        set((state) => ({
          steps: {
            ...state.steps,
            [step]: true,
          },
        })),

      finish: () =>
        set({
          setupVersion: CURRENT_SETUP_VERSION,
        }),

      reset: () =>
        set({
          setupVersion: 0,
          steps: { ...initialSteps },
        }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)

export default useOnboardingStore
