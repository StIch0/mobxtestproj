import { NavigationProp, useNavigation } from '@react-navigation/core';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../../navigation/types';
import { EditPencil } from '../../../res/pencil';
import { TrashIcon } from '../../../res/trash';
import { useNoodlesListStore } from '../../../stores/NoodlesStore';

const { width } = Dimensions.get('window');

interface OwnProps {
  id: string;
}

const HiddenItem = ({ id }: OwnProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { removeNoodleItem } = useNoodlesListStore();

  const onPressEdit = () => {
    navigation.navigate('Noodle', { id });
  };

  const onPressRemove = () => {
    removeNoodleItem(id);
  };

  return (
    <View style={[styles.container]}>
      <Pressable style={styles.button} onPress={onPressEdit}>
        <EditPencil />
      </Pressable>
      <Pressable
        style={[styles.button, { backgroundColor: '#ff1103' }]}
        onPress={onPressRemove}>
        <TrashIcon />
      </Pressable>
    </View>
  );
};

export default HiddenItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    width: width - 60,
    alignSelf: 'center',
  },
  button: {
    width: 105,
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#00aaff',
    alignSelf: 'center',
  },
});
