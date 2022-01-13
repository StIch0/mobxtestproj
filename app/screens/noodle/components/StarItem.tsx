import React, { ReactElement } from 'react';
import StarIcon from '../../../res/star';

interface OwnProps {
  starItem: number;
  currentStar: number;
  setCurrentStar: (starItem: number) => void;
}

const StarItem = ({
  starItem,
  currentStar,
  setCurrentStar,
}: OwnProps): ReactElement => {
  const onPressStar = (): void => {
    console.log('starItem', starItem);

    setCurrentStar(starItem);
  };

  return <StarIcon isActive={currentStar >= starItem} onPress={onPressStar} />;
};

export default StarItem;
