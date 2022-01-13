import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import crossIcon from '../../../res/cross';

interface OwnProps {
  uri: string;
  onPressRemovePhoto: (uri: string) => void;
}

const PhotoItem = ({ uri, onPressRemovePhoto }: OwnProps) => {
  const onPress = () => {
    onPressRemovePhoto(uri);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.container} source={{ uri }} />
      <Pressable
        style={styles.removeButton}
        onPress={onPress}
        hitSlop={{
          bottom: 10,
          left: 10,
          right: 10,
          top: 10,
        }}>
        {crossIcon()}
      </Pressable>
    </View>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
