import React from "react"
import { StyleSheet } from "react-native"
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg"
import { useTheme } from "~/hooks/useTheme"

import useThemeStore from "~/stores/themeStore"

const GRADIENT_CURVE = [
    { offset: "0%", strength: 1 },
    { offset: "15%", strength: 0.96 },
    { offset: "30%", strength: 0.855 },
    { offset: "45%", strength: 0.695 },
    { offset: "60%", strength: 0.495 },
    { offset: "72%", strength: 0.315 },
    { offset: "82%", strength: 0.17 },
    { offset: "90%", strength: 0.075 },
    { offset: "96%", strength: 0.02 },
    { offset: "100%", strength: 0 },
]

const createGradientStops = (color: string, intensity: number) => {
    const safeIntensity = Math.min(Math.max(intensity, 0), 1)

    return GRADIENT_CURVE.map(({ offset, strength }) => ({
        color,
        offset,
        opacity: safeIntensity * strength,
    }))
}

const AppBackground = () => {
    const { colorScheme } = useThemeStore()
    const theme = useTheme()

    const isDark = colorScheme === "dark"
    const glowColor = theme.colors.brand.primary
    const glowIntensity = isDark ? .15 : .2
    const gradientStops = createGradientStops(glowColor, glowIntensity)

    return (
        <Svg
            width="116%"
            height="104%"
            style={StyleSheet.absoluteFill}
            pointerEvents="none">
            <Defs>
                <RadialGradient id="topGlow" cx="50%" cy="50%" rx="50%" ry="50%">
                    {gradientStops.map(({ color, offset, opacity }) => (
                        <Stop
                            key={offset}
                            offset={offset}
                            stopColor={color}
                            stopOpacity={opacity}
                        />
                    ))}
                </RadialGradient>
            </Defs>

            <Circle
                cx="50%"
                cy={isDark ? "50%" : "30%"}
                r={isDark ? 250 : 180}
                fill="url(#topGlow)"
            />

        </Svg>
    )
}

export default AppBackground
