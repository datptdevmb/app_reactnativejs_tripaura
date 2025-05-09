import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IcSearch(props) {
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
        d="M21.75 20.69l-5.664-5.665a8.264 8.264 0 10-1.06 1.061l5.663 5.664 1.061-1.06zM3 9.75a6.75 6.75 0 116.75 6.75A6.758 6.758 0 013 9.75z"
        fill="#fff"
      />
    </Svg>
  )
}

export default IcSearch
