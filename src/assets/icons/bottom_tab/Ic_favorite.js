import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IcFavorite({ isFavorite, color, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M9 14.74l-.569-.513a102.055 102.055 0 01-3.037-2.871c-.8-.797-1.433-1.5-1.896-2.108-.464-.608-.788-1.158-.972-1.65a4.187 4.187 0 01-.276-1.486c0-.954.324-1.755.972-2.403.648-.648 1.449-.972 2.403-.972.66 0 1.279.17 1.856.507.578.337 1.084.828 1.519 1.473.435-.645.941-1.136 1.519-1.473a3.618 3.618 0 011.856-.507c.954 0 1.755.324 2.403.972.648.648.972 1.45.972 2.403 0 .498-.092.993-.276 1.485-.184.493-.508 1.044-.972 1.652-.463.608-1.093 1.31-1.89 2.107a87.354 87.354 0 01-3.044 2.87L9 14.74z"
        fill={color}
      />
    </Svg>
  )
}

export default IcFavorite
