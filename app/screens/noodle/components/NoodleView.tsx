import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import uuid from 'react-native-uuid';
import { RootStackParamList } from '../../../navigation/types';
import { useNoodlesListStore } from '../../../stores/NoodlesStore';
import { NoodleItem } from '../../noodlesList/types';
import EmptyPhotoView from './EmptyPhotoView';
import PhotoItem from './PhotoItem';
import RatingView from './RatingView';

const { width } = Dimensions.get('window');

const NoodleView = observer(({}) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  const [ratingScore, setRatingScore] = useState(0);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { params } = useRoute<RouteProp<RootStackParamList, 'Noodle'>>();

  const { addNoodleItem, noodlesRecord, editNoodleItem } =
    useNoodlesListStore();

  useEffect(() => {
    runInAction(() => {
      if (params) {
        const { id } = params;
        const item = noodlesRecord[id];

        setTitle(() => item?.title || '');
        setRatingScore(() => item.ratingScore || 0);
        setDescription(() => item?.description || '');
        setCost(() => `${item?.cost || ''}`);
        setPhotos(() => [...item?.photos] || []);
      }
    });
  }, [params]);

  const renderItem = ({ item: uri }: ListRenderItemInfo<string>) => (
    <PhotoItem onPressRemovePhoto={onPressRemovePhoto} uri={uri} />
  );

  const onPressRemovePhoto = (uri: string) => {
    setPhotos((prevState) =>
      prevState.filter((innerIItem) => innerIItem !== uri),
    );
  };

  const onPressOpenCamera = (): void => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 10,
      },
      ({ assets = [] }: ImagePickerResponse) => {
        const photosList = assets.reduce((res: string[], innerItem) => {
          if (innerItem.uri) {
            res.push(innerItem.uri);
          }
          return res;
        }, []);

        const set = new Set([...photos].concat(photosList));
        setPhotos(() => [...set]);
      },
    );
  };

  const onPressAddNoodle = () => {
    runInAction(() => {
      const id = uuid.v4();

      const noodle: NoodleItem = {
        id: typeof id === 'string' ? id : id.join('-'),
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        description,
        photos,
        cost: +cost || 0,
        title,
        ratingScore,
      };

      if (params) {
        const item = noodlesRecord[params.id];

        const createdAt = item?.createdAt || new Date().toString();

        const editNoodle: NoodleItem = {
          ...noodle,
          id: params.id,
          createdAt,
        };

        editNoodleItem(editNoodle);
      } else {
        addNoodleItem(noodle);
      }
    });
    navigation.goBack();
  };

  const keyExtractor = (uri: string) => uri;

  const isEnabledButton = useMemo(
    () => Boolean(photos.length && title && description),
    [photos, title, description],
  );

  const photoList = useMemo(() => [...photos], [photos]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingVertical: 20 }}
        extraHeight={100}>
        <FlatList
          horizontal
          scrollEnabled={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={photoList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={
            <EmptyPhotoView onPressOpenCamera={onPressOpenCamera} />
          }
        />

        <TextInput
          style={styles.input}
          placeholder='Название'
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          style={[styles.input, { minHeight: 40, height: undefined }]}
          placeholder='Описание'
          onChangeText={setDescription}
          multiline
          value={description}
        />
        <TextInput
          style={styles.input}
          placeholder='Цена'
          onChangeText={setCost}
          keyboardType='number-pad'
          value={cost}
        />
        <RatingView initialValue={ratingScore} getStar={setRatingScore} />
        <Pressable
          disabled={!isEnabledButton}
          style={[styles.addButton, { opacity: isEnabledButton ? 1 : 0.7 }]}
          onPress={onPressAddNoodle}>
          <Text
            style={[styles.buttonText, { opacity: isEnabledButton ? 1 : 0.7 }]}>
            Добавить
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
});

export default NoodleView;

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: width - 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addButton: {
    width: width - 20,
    height: 40,
    backgroundColor: '#00aaff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    alignSelf: 'center',
  },
  input: {
    width: width - 20,
    height: 40,
    borderRadius: 4,
    padding: 4,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#ffffff',
  },
  container: {
    backgroundColor: '#ffffff',
  },
});
