import React, { ReactElement } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface OwnProps {
  isActive: boolean;
}

const StarIcon = ({
  isActive,
  ...props
}: SvgProps & OwnProps): ReactElement => (
  <Svg
    width='25'
    height='25'
    viewBox='0 0 22 22'
    fill='none'
    {...props}
    style={{ marginHorizontal: 3, marginVertical: 5 }}>
    <Path
      d='M11 16.7714L4.81959 20.0204L6 13.1388L1 8.26519L7.91033 7.26115L11 1L14.0897 7.26115L21 8.26519L16 13.1388L17.1804 20.0204L11 16.7714Z'
      stroke={'#00aaff'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={isActive ? '#00aaff' : 'none'}
    />
  </Svg>
);

export default StarIcon;
