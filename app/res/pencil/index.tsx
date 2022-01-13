import React, { ReactElement } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const EditPencil = ({ ...props }: SvgProps): ReactElement => (
  <Svg width='30' height='30' viewBox='0 0 30 30' fill='none' {...props}>
    <Path
      d='M16.8939 9.14853L20.8515 13.1061M21.2613 7.57957L22.4204 8.73871C23.1932 9.51148 23.1932 10.7644 22.4204 11.5371L10.9576 23H7V19.0424L18.4629 7.57957C19.2356 6.80681 20.4885 6.80681 21.2613 7.57957Z'
      stroke='#ffffff'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);
