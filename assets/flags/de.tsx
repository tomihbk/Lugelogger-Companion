import React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const FlagDE = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M0 0h32v24H0z" />
      <Path
        fill="#FFD018"
        fillRule="evenodd"
        d="M0 16h32v8H0v-8Z"
        clipRule="evenodd"
      />
      <Path
        fill="#E31D1C"
        fillRule="evenodd"
        d="M0 8h32v8H0V8Z"
        clipRule="evenodd"
      />
      <Path
        fill="#272727"
        fillRule="evenodd"
        d="M0 0h32v8H0V0Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h32v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default FlagDE
