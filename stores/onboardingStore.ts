import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./zustandStorage"

export const CURRENT_SETUP_VERSION = 1

export type OnboardingStep =
  | "welcome"
  | "server"
  | "signIn"
  | "favoriteVehicle"
  | "preferences"

type OnboardingRoute =
  | "/(onboarding)"
  | "/(onboarding)/server"
  | "/(onboarding)/sign-in"
  | "/(onboarding)/favorite-vehicle"
  | "/(onboarding)/preferences"
  | "/(onboarding)/finish"

type OnboardingSteps = Record<OnboardingStep, boolean>

interface OnboardingStoreState {
  setupVersion: number
  steps: OnboardingSteps

  completeStep: (step: OnboardingStep) => void
  uncompleteStep: (step: OnboardingStep) => void
  finish: () => void
  reset: () => void
}

const initialSteps: OnboardingSteps = {
  welcome: false,
  server: false,
  signIn: false,
  favoriteVehicle: false,
  preferences: false,
}

const useOnboardingStore = create<OnboardingStoreState>()(
  persist(
    (set) => ({
      setupVersion: 0, // This helps us track if the user has completed the onboarding process for the current version of the app, let's say we add a new onboarding step in the future, we can increment this version number and force the user to go through the onboarding process again.
      steps: initialSteps,

      completeStep: (step) =>
        set((state) => ({
          steps: {
            ...state.steps,
            [step]: true,
          },
        })),

      uncompleteStep: (step) =>
        set((state) => ({
          steps: {
            ...state.steps,
            [step]: false,
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
      name: "onboarding-progress-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)

export const isOnboardingComplete = (setupVersion: number): boolean =>
  setupVersion >= CURRENT_SETUP_VERSION

export const firstIncompleteRoute = (
  steps: OnboardingSteps,
): OnboardingRoute => {
  if (!steps.welcome) return "/(onboarding)"
  if (!steps.server) return "/(onboarding)/server"
  if (!steps.signIn) return "/(onboarding)/sign-in"
  if (!steps.favoriteVehicle) return "/(onboarding)/favorite-vehicle"
  if (!steps.preferences) return "/(onboarding)/preferences"

  return "/(onboarding)/finish"
}

export default useOnboardingStore
