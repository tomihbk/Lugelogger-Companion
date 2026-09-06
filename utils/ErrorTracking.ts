import * as Sentry from "@sentry/react-native"

type ErrorContext = Record<string, string | number | boolean | null | undefined>

export const ErrorTracking = {
  captureException(error: unknown, context?: ErrorContext) {
    Sentry.withScope((scope) => {
      if (context) {
        Object.entries(context).forEach(([key, value]) => {
          if (value !== undefined) {
            scope.setExtra(key, value)
          }
        })
      }

      Sentry.captureException(error)
    })
  },

  captureMessage(message: string) {
    Sentry.captureMessage(message)
  },

  addBreadcrumb(message: string, category?: string) {
    Sentry.addBreadcrumb({
      message,
      category,
      level: "info",
    })
  },
}
