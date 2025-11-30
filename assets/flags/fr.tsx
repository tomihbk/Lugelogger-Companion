import React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const FlagFR = (props: SvgProps) => (
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
        fill="#F50100"
        fillRule="evenodd"
        d="M22 0h10v24H22V0Z"
        clipRule="evenodd"
      />
      <Path
        fill="#2E42A5"
        fillRule="evenodd"
        d="M0 0h12v24H0V0Z"
        clipRule="evenodd"
      />
      <Path
        fill="#F7FCFF"
        fillRule="evenodd"
        d="M10 0h12v24H10V0Z"
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
export default FlagFR
