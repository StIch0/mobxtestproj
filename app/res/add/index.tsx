import React, { ReactElement } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const addIcon = (props: SvgProps): ReactElement => {
  return (
    <Svg width='32' height='32' viewBox='0 0 32 32' fill='none' {...props}>
      <Path
        d='M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z'
        stroke='black'
        strokeWidth='2'
        strokeMiterlimit='10'
      />
      <Path
        d='M11 16H21'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M16 11V21'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default addIcon;
