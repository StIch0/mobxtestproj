import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import ImageZoomList from '../../commons/components/ImageZoomList';
import noSpaceString from '../../commons/helpers/noSpaceString';
import { useNoodlesChListStore } from '../../stores/NoodleChStore';
import HiddenItem from './components/HiddenItem';
import NoodleItemView from './components/NoodleItemView';

const { width } = Dimensions.get('window');

const renderHiddenItem = ({ item: id }: ListRenderItemInfo<string>) => (
  <HiddenItem id={id} />
);

const keyExtractor = (id: string) => id;

const NoodlesList = observer(({}) => {
  const {
    noodleStore: { noodlesIdxItems, noodlesRecord },
  } = useNoodlesChListStore();

  const [list, setList] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue) {
      const newList = noodlesIdxItems.filter((id) => {
        const noSpaceSearchValue = noSpaceString(searchValue);

        return (
          noSpaceString(noodlesRecord[id].title)?.includes(
            noSpaceSearchValue,
          ) ||
          noSpaceString(noodlesRecord[id].description).includes(
            noSpaceSearchValue,
          )
        );
      });

      setList(newList);
    } else {
      runInAction(() => {
        setList(noodlesIdxItems);
      });
    }
  }, [searchValue, noodlesIdxItems]);

  const [zoomImageVisible, setZoomImageVisible] = useState(false);
  const [imageUrls, setImageUrls] = useState<{ url: string }[]>([]);

  const renderItem = ({
    item: id,
  }: ListRenderItemInfo<string>): ReactElement => {
    return <NoodleItemView id={id} onPressImage={onPressImage} />;
  };

  const onPressImage = (noodleId: string): void => {
    const noodleItem = noodlesRecord[noodleId];

    const urlsList = noodleItem?.photos.map((url) => ({ url })) || [];

    setImageUrls(() => urlsList);
    setZoomImageVisible(() => true);
  };

  const onPressCancel = (): void => {
    setZoomImageVisible(() => false);
    setImageUrls(() => []);
  };

  return (
    <>
      <SwipeListView
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        rightOpenValue={-150}
        previewRowKey={'0'}
        leftOpenValue={150}
        closeOnRowBeginSwipe
        previewOpenDelay={3000}
        ListHeaderComponent={
          <TextInput
            style={styles.input}
            placeholder='Введите слово для поиска'
            onChangeText={setSearchValue}
            value={searchValue}
          />
        }
        renderHiddenItem={renderHiddenItem}
        style={styles.list}
        contentContainerStyle={styles.contentContainerStyleSwipe}
      />
      <ImageZoomList
        visible={zoomImageVisible}
        imageUrls={imageUrls}
        onCancel={onPressCancel}
      />
    </>
  );
});

export default NoodlesList;

const styles = StyleSheet.create({
  list: {
    width,
    backgroundColor: '#ffffff',
  },
  contentContainerStyleSwipe: {
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  input: {
    height: 40,
    borderRadius: 4,
    width: width - 60,
    alignSelf: 'center',
    borderColor: '#00aaff',
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
  },
});
