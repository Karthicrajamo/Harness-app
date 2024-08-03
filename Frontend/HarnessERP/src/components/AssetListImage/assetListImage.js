import React, {useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useNavigation} from '@react-navigation/native';
import TitleBar from '../common-utils/TitleBar';
import {CustomThemeColors} from '../CustomThemeColors';

const {width} = Dimensions.get('window');

const AssetListImage = ({assetImages, ImageGelleryOnClose}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // State to track selected image index
  const navigation = useNavigation();

  const onClose = () => {
    ImageGelleryOnClose(false);
  };

  const handleMenuPress = () => {
    console.log('Menu');
  };

  const handleSearchPress = () => {
    console.log('Search');
  };

  const handleQrScannerPress = () => {
    console.log('handleQrScannerPress');
  };

  const handleRefreshPress = () => {
    console.log('handleRefreshPress');
  };

  const renderItem = ({item, index}) => (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => setSelectedImageIndex(index)}>
        <Text style={{textAlign: 'center'}}>{item.imageTitle}</Text>
        <Image
          source={{uri: `data:image/jpeg;base64,${item.image}`}}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );

  // Format the asset images for ImageViewer
  const formattedImages = assetImages.map(image => ({
    url: `data:image/jpeg;base64,${image.image}`,
    title: image.imageTitle,
  }));

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => onClose()}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginTop: 5, alignItems: 'center'}}>
            <TitleBar
              text="Images"
              showMenuBar={true}
              onMenuPress={handleMenuPress}
              showSearchIcon={true}
              onSearchPress={handleSearchPress}
              showQrScannerIcon={true}
              onQrScannerPress={handleQrScannerPress}
              showRefreshIcon={true}
              onRefreshPress={handleRefreshPress}
              showCloseIcon={true}
              onClose={onClose}
            />
          </View>
          <FlatList
            data={assetImages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Example: Display images in multiple columns
            contentContainerStyle={styles.flatlistContentContainer}
          />

          {/* Modal to display large image */}
          {selectedImageIndex !== null && (
            <Modal
              visible={true}
              onRequestClose={() => setSelectedImageIndex(null)}
              transparent>
              <ImageViewer
                imageUrls={formattedImages}
                index={selectedImageIndex}
                onCancel={() => setSelectedImageIndex(null)}
                enableSwipeDown={true}
                renderHeader={() => (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedImageIndex(null)}>
                    <Text style={styles.closeText}>X</Text>
                  </TouchableOpacity>
                )}
              />
            </Modal>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  flatlistContentContainer: {
    padding: 5,
  },
  image: {
    flex: 1,
    width: width < 600 ? 100 : 250,
    height: 100,
    resizeMode: 'contain',
    margin: 10,
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    right: '45%',
    // left:0,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 20,
  },
  closeText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default AssetListImage;
