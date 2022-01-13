import React, { ReactElement } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { camera } from '../../../res/camera';

interface OwnProps {
  onPressOpenCamera: () => void;
}

const EmptyPhotoView = ({ onPressOpenCamera }: OwnProps): ReactElement => {
  return (
    <Pressable style={styles.container} onPress={onPressOpenCamera}>
      {camera()}
    </Pressable>
  );
};

export default EmptyPhotoView;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: `#aaaaaa`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginVertical: 7,
    alignSelf: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
});
