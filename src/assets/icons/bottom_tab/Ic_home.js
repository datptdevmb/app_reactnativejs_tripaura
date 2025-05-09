import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IcHome({color ,props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M21.444 9.473l-1.67 10a3 3 0 01-1 1.79 3.2 3.2 0 01-2 .7h-9.61a3 3 0 01-2.93-2.49l-1.67-10a3 3 0 01.23-1.7 3 3 0 011.12-1.29l6.48-4a3 3 0 013.15 0l6.47 4c.507.3.911.747 1.16 1.28a3 3 0 01.27 1.71z"
        fill={color}
      />
    </Svg>
  )
}

export default IcHome
