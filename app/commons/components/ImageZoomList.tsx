import React, { ReactElement } from 'react';
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import ImageViewer, {
  ImageViewerPropsDefine,
} from 'react-native-image-zoom-viewer';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import crossIcon from '../../res/cross';

const renderImageLoader = (): ReactElement => (
  <ActivityIndicator size='large' color={'#00aaff'} />
);

type OwnProps = {
  visible: boolean;
} & ImageViewerPropsDefine;

const ImageZoomList = ({
  visible,
  imageUrls,
  index,
  onCancel,
}: OwnProps): ReactElement => {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent>
      <ImageViewer
        enablePreload
        loadingRender={renderImageLoader}
        {...{ imageUrls, index, onCancel }}
        pageAnimateTime={250}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={onCancel}
        style={[styles.fullModalCloseButton, { top: insets.top + 10 }]}>
        {crossIcon()}
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullModalCloseButton: {
    position: 'absolute',
    backgroundColor: `#ffffff55`,
    right: 10,
    width: 50,
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageZoomList;
