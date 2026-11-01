import { useEffect } from "react"
import * as Crypto from "expo-crypto"
import * as Sentry from "@sentry/react-native"
import { usePostHog } from "posthog-react-native"

import GlobalStateStore from "~/stores/globalStateStore"

export default function TelemetryManager() {
    const posthog = usePostHog()

    const {
        optInCrashReports,
        telemetryUserId,
        setTelemetryUserId,
    } = GlobalStateStore()

    useEffect(() => {
        if (!optInCrashReports) {
            Sentry.setUser(null)

            posthog.optOut()
            posthog.reset()

            return
        }

        let userId = telemetryUserId

        if (!userId) {
            userId = Crypto.randomUUID()
            setTelemetryUserId(userId)
        }

        Sentry.setUser({
            id: userId,
        })

        posthog.optIn()
        posthog.identify(userId)
    }, [
        optInCrashReports,
        telemetryUserId,
        setTelemetryUserId,
        posthog,
    ])

    return null
}