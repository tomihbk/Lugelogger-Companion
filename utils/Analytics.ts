import { usePostHog } from "posthog-react-native"

export const useAnalytics = () => {
  const posthog = usePostHog()

  return {
    onboardingStep(onboarding: string) {
      posthog.capture("onboarding_step", {
        onboarding_step: onboarding,
      })
    },

    onboardingCompleted() {
      posthog.capture("onboarding_completed")
    },

    vehicleAdded() {
      posthog.capture("vehicle_added")
    },

    primaryVehicleChanged() {
      posthog.capture("primary_vehicle_changed")
    },

    recordCreated(recordType: string) {
      posthog.capture("record_created", {
        record_type: recordType,
      })
    },

    recordUpdated(recordType: string) {
      posthog.capture("record_updated", {
        record_type: recordType,
      })
    },

    recordDeleted(recordType: string) {
      posthog.capture("record_deleted", {
        record_type: recordType,
      })
    },

    recordTypeViewed(recordType: string) {
      posthog.capture("record_type_viewed", {
        record_type: recordType,
      })
    },

    settingChanged(settingType: string, newValue: any = {}) {
      posthog.capture("setting_changed", {
        setting_type: settingType,
        new_value: newValue,
      })
    },

    dashboardViewed() {
      posthog.capture("dashboard_viewed")
    },
  }
}
