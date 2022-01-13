import React, { ReactElement } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const TrashIcon = ({ ...props }: SvgProps): ReactElement => (
  <Svg width='30' height='30' viewBox='0 0 30 30' fill='none' {...props}>
    <Path
      d='M21 8H9M16.7143 7H13.2857M9.85714 12C10.2477 15.9052 10.8571 22 10.8571 22C10.8571 22.6667 11.1429 23 11.7143 23C12.2857 23 13.1429 23 18.2857 23C18.8571 23 19.1429 22.6667 19.1429 22C19.1429 21.3333 20.1429 12 20.1429 12'
      stroke='#ffffff'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);
