import { useTheme } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import Svg, { Path } from 'react-native-svg';

const crossIcon = (): ReactElement => {
  const { dark } = useTheme();

  const stroke = dark ? '#ffffff' : '#222222';

  return (
    <Svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
      <Path
        d='M20 12L12 20'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M20 20L12 12'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default crossIcon;
