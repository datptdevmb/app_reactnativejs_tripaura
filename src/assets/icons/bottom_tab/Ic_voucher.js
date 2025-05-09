import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IcVoucher({props, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      {...props}>
      <Path
        d="M4.333 4a2 2 0 00-2 2v4a2 2 0 110 4v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 010-4V6a2 2 0 00-2-2h-16zm11.5 3l1.5 1.5-8.5 8.5-1.5-1.5 8.5-8.5zm-6.69.04a1.77 1.77 0 110 3.54 1.77 1.77 0 010-3.54zm6.38 6.38a1.77 1.77 0 110 3.54 1.77 1.77 0 010-3.54z"
        fill={color || '#0572E7'}
      />
    </Svg>
  );
}

export default IcVoucher;
