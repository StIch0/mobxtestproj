import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StarItem from './StarItem';

const STAR_LIMIT = 10;

interface OwnProps {
  getStar: (starValue: number) => void;
  initialValue?: number;
}

const RatingView = ({ getStar, initialValue = 0 }: OwnProps): ReactElement => {
  const [currentStar, setCurrentStar] = useState(0);

  useEffect(() => {
    setCurrentStar(initialValue);
  }, [initialValue]);

  useEffect(() => {
    getStar(currentStar);
  }, [currentStar]);

  const starGenerator = (): ReactNode =>
    Array.from({ length: STAR_LIMIT }, (_, item) => (
      <StarItem
        key={item}
        currentStar={currentStar}
        setCurrentStar={setCurrentStar}
        starItem={item + 1}
      />
    ));

  return <View style={styles.starView}>{starGenerator()}</View>;
};

const styles = StyleSheet.create({
  starView: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 25,
    alignSelf: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RatingView;
