import { observer } from 'mobx-react-lite';
import React, { ReactElement } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNoodlesListStore } from '../../../stores/NoodlesStore';

const { width } = Dimensions.get('window');

interface OwnProps {
  id: string;
  onPressImage: (id: string) => void;
}

const NoodleItemView = observer(
  ({ id, onPressImage }: OwnProps): ReactElement => {
    const { noodlesRecord } = useNoodlesListStore();

    const noddleItem = noodlesRecord[id];

    if (!noddleItem) {
      return <></>;
    }

    const {
      photos,
      title,
      description,
      createdAt,
      cost,
      updatedAt,
      ratingScore,
    } = noddleItem;

    const onPressNoodleImage = () => {
      onPressImage(id);
    };

    return (
      <View style={styles.container}>
        <Pressable onPress={onPressNoodleImage}>
          <Image source={{ uri: photos[0] }} style={styles.image} />
        </Pressable>
        <View style={styles.textView}>
          <Text style={styles.title}>{title || 'Название'}</Text>
          <Text numberOfLines={0} style={styles.desc}>
            {description}
          </Text>
          <Text style={styles.cost}>{`ЦЕНА: ${cost} ₽`}</Text>
          <Text style={styles.dateTime} numberOfLines={2}>
            {`Создано:\n${new Date(createdAt).toLocaleString()}`}
          </Text>
          <Text style={styles.dateTime} numberOfLines={2}>
            {`Обновлено:\n${new Date(updatedAt).toLocaleString()}`}
          </Text>
          <Text style={styles.rating}>{`Рейтинг: ${ratingScore}/10`}</Text>
        </View>
      </View>
    );
  },
);

export default NoodleItemView;

const styles = StyleSheet.create({
  container: {
    width: width - 60,
    alignSelf: 'center',
    minHeight: 105,
    borderRadius: 8,
    backgroundColor: '#00aaff',
    padding: 8,
    marginBottom: 4,
    flexDirection: 'row',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    lineHeight: 16,
    color: '#ffffff',
  },
  textView: {
    width: width - 170,
    padding: 5,
  },
  dateTime: {
    fontSize: 14,
    lineHeight: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  cost: {
    fontSize: 14,
    lineHeight: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    lineHeight: 19,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
