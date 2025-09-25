import React from "react"
import FlagEN from "./en"
import FlagFR from "./fr"
import FlagES from "./es"
import FlagDE from "./de"

type FlagProps = {
  width?: number
  height?: number
}

export function Flag(lang: string, props: FlagProps = {}){
  switch (lang) {
    case "en":
      return <FlagEN {...props} />
    case "fr":
      return <FlagFR {...props} />
    case "es":
      return <FlagES {...props} />
    case "de":
      return <FlagDE {...props} />
  }
}


// svg converted thanks to https://react-svgr.com/playground/