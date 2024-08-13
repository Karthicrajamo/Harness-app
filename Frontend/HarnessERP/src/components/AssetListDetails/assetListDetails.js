import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import styles from './assetListDetailsStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import AssetListImage from '../AssetListImage/assetListImage';
import ImageSwiper from 'react-native-image-swiper';
import Pinchable from 'react-native-pinchable'; // Assuming correct component name
import {CustomThemeColors} from '../CustomThemeColors';
import TitleBar from '../common-utils/TitleBar';
import Icon from 'react-native-vector-icons/Ionicons';
import API_URL from '../ApiUrl';
import AssetListDetailsSkeleton from './AssetListDetailsSkeleton';

const {width} = Dimensions.get('window');

function AssetListDetails(props) {
  const [isActiveFoot, setIsActiveFoot] = useState(1);

  const navigation = useNavigation();

  const handleClose = () => {
    navigation.navigate('AssetListMainScreen');
  };

  const handleMenuPress = () => {
    console.log('Menu');
  };

  //   ----------------------------------------------------------
  const route = useRoute();
  const {assetItem} = route.params;
  const [subDetails, setSubDetails] = useState([]);
  const [assetId, setAssetId] = useState(assetItem ? assetItem.assetId : null);
  const [subDetailsAssetLabels, setSubDetailsAssetLabels] = useState([]);
  const [subDetailsFlexiLabels, setSubDetailsFlexiLabels] = useState([]);
  const [type, setType] = useState(assetItem ? assetItem.type : null);
  const [isLoading, setIsLoading] = useState(true);

  const openQrScanner = () => {
    navigation.navigate('QrScanner');
  };

  const handleAssetMainScreen = async () => {
    navigation.navigate('AssetListMainScreen');
  };
  const toggleFullScreen = () => {
    navigation.navigate('AssetListImage');
  };

  useEffect(() => {
    fetchSubDetails(assetItem.assetId);
    fetchAssetImages(assetItem.assetId);
    fetchSubDetailsAssetLabels(assetItem.type);
    setIsLoading(false);
  }, [assetItem.assetId]);

  const fetchSubDetails = async assetId => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      console.log('token', token);

      const response = await fetch(
        `${API_URL}/api/assetList/assetSubDetailsValue?assetId=${assetId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );
      console.log('response', response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setSubDetails(data);
    } catch (error) {
      console.error('Error fetching subdetails:', error);
    }
  };
  console.log(
    '7685784 subDetails (assetList/assetSubDetailsValue)',
    subDetails,
  );
  console.log(
    '7685785 subDetailsAssetLabels (subDetails/assetLabels)',
    subDetailsAssetLabels,
  );
  console.log(
    '7685786 subDetailsFlexiLabel  (subDetails/flexiLabels)',
    subDetailsFlexiLabels,
  );

  const AssetDetailsHalfLength = Math.ceil(subDetailsAssetLabels.length / 2);
  const AssetDetailsLeftColumnLabels = subDetailsAssetLabels.slice(
    0,
    AssetDetailsHalfLength,
  );
  const AssetDetailsrightColumnLabels = subDetailsAssetLabels.slice(
    AssetDetailsHalfLength,
  );

  const flexiDetailsHalfLength = Math.ceil(subDetailsFlexiLabels.length / 2);
  const flexiDetailsLeftColumnLabels = subDetailsFlexiLabels.slice(
    0,
    flexiDetailsHalfLength,
  );
  const flexiDetailsRightColumnLabels = subDetailsFlexiLabels.slice(
    flexiDetailsHalfLength,
  );

  const [assetImagesData, setAssetImagesData] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchAssetImages = async assetId => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;

      const response = await fetch(
        `${API_URL}/api/assetList/assetImage?assetId=${assetId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('response of asset Image: ', data);
      setAssetImagesData(data);
    } catch (error) {
      console.error('Error fetching asset Images:', error);
    }
  };

  const [showImageList, setShowImageList] = useState(false);

  const handleFetchAssetImages = () => {
    // Replace assetId with your actual assetId value or pass it as an argument
    fetchAssetImages(assetId);
    setShowImageList(true);
  };

  // const showImageGallery = () => {
  //   setShowImageList(true);
  // }
  // const closeImageGallery = () => {
  //   setShowImageList(false);
  // }

  // const arrayBufferToBase64 = (buffer) => {
  //   let binary = '';
  //   const bytes = new Uint8Array(buffer);
  //   const len = bytes.byteLength;
  //   for (let i = 0; i < len; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return btoa(binary);
  // };
  const renderImage = () => {
    if (assetImagesData.length > 0) {
      const imageData = assetImagesData[currentImageIndex];
      const base64String = imageData.image;
      const base64Image = `data:image/jpeg;base64,${base64String}`;
      return (
        <View style={styles.imgContainer}>
          <Image source={{uri: base64Image}} style={styles.image} />
        </View>
      );
    }
    return (
      <View style={styles.imgContainer}>
        <Image
          source={require('../../images/Component1.png')}
          style={styles.image}
        />
      </View>
    );
  };

  // ----------------------------------------------------------------------------------------------------
  // Fetch data for sub details Label Top

  useEffect(() => {
    fetchSubDetailsAssetLabels(assetItem.type);
  }, [assetItem.type]);
  console.log('type>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', type);
  const ll = subDetailsAssetLabels.length;
  console.log('response of ll data : ===============>>>>>>>>>> ', ll);

  const fetchSubDetailsAssetLabels = async type => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      console.log('token', token);

      const response = await fetch(
        `${API_URL}/api/assetList/subDetails/assetLabels?type=${type}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );
      console.log('response', response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSubDetailsAssetLabels(data);
    } catch (error) {
      console.error('Error fetching subdetailslabel:', error);
    }
  };

  // ----------------------------------------------------------------------------------------------------
  // Fetch data for sub details Label Bottom

  useEffect(() => {
    fetchSubDetailsFlexiLabels(assetItem.type);
  }, [assetItem.type]);
  console.log('type>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', type);
  const flexilength = subDetailsFlexiLabels.length;
  const tempFlexilength = subDetailsFlexiLabels.length;
  console.log(
    'response of Flexidata : ===============>>>>>>>>>> ',
    subDetailsFlexiLabels,
  );
  console.log(
    'response of Flexilength data : ===============>>>>>>>>>> ',
    flexilength,
  );

  const fetchSubDetailsFlexiLabels = async type => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      console.log('token', token);

      const response = await fetch(
        `${API_URL}/api/assetList/subDetails/flexiLabels?type=${type}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );
      console.log('response', response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setSubDetailsFlexiLabels(data);
    } catch (error) {
      console.error('Error fetching subdetailsflexilabel:', error);
    }
  };

  return (
    <>
      {isLoading && <AssetListDetailsSkeleton />}
      {!isLoading && (
        <>
          <View style={styles.container}>
            <TitleBar
              text="Asset Details"
              showMenuBar={true}
              onMenuPress={() => navigation.openDrawer()}
              showQrScannerIcon={true}
              onQrScannerPress={openQrScanner}
              showCloseIcon={true}
              onClose={handleAssetMainScreen}
            />
            <TouchableOpacity onPress={() => setShowImageList(true)}>
              {renderImage()}
            </TouchableOpacity>
            {showImageList && (
              <AssetListImage
                assetImages={assetImagesData}
                ImageGelleryOnClose={() => {
                  setShowImageList(false);
                }}
              />
            )}
            {/* <Text style={styles.headText}> */}
            {/* <View style={styles.textContainer1}> */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center', // Center vertically
              }}>
              {/* Centered View */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center', // Center content horizontally
                  alignItems: 'center', // Center content vertically
                }}>
                <Icon
                  name="pricetag"
                  size={15}
                  color={
                    assetItem.status === 'Active'
                      ? 'green'
                      : assetItem.status === 'In Active'
                      ? 'blue'
                      : assetItem.status === 'Disposal'
                      ? 'red'
                      : 'black'
                  }
                />
                <Text> </Text>
                <Text> </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color:
                      assetItem.status === 'Active'
                        ? 'green'
                        : assetItem.status === 'In Active'
                        ? 'blue'
                        : assetItem.status === 'Disposal'
                        ? 'red'
                        : 'black',
                  }}>
                  {assetItem.assetCode}
                </Text>
              </View>

              {/* Right-Aligned View */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center', // Center vertically
                  justifyContent: 'flex-end', // Align content to the right
                  marginRight: 20,
                }}>
                <Text> </Text>
                <Text> </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    // backgroundColor: 'yellow',
                    color: 'green',
                  }}>
                  {assetItem.ownerShip}
                </Text>
              </View>
            </View>

            {/* </View> */}
            {/* </Text> */}
            <View style={styles.textContainer}>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={[styles.boldText, styles.bodyHeaderText]}>
                  Type:
                </Text>
                <Text style={[styles.bodyText]}>{assetItem.type}</Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={[styles.boldText, styles.bodyHeaderText]}>
                  Class:{' '}
                </Text>
                <Text style={[styles.bodyText]}>
                  {assetItem.classificationName}
                </Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={[styles.boldText, styles.bodyHeaderText]}>
                  Asset No:{' '}
                </Text>
                <Text style={[styles.bodyText]}>{assetItem.assetId}</Text>
              </View>
              {/* <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={[styles.boldText, styles.bodyHeaderText]}>
                  Owner Ship:{' '}
                </Text>
                <Text style={[styles.bodyText]}>{assetItem.ownerShip}</Text>
              </View> */}
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={[styles.boldText, styles.bodyHeaderText]}>
                  Location:{' '}
                </Text>
                <Text style={[styles.bodyText]}>{assetItem.locationName}</Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={[styles.boldText, styles.bodyHeaderText]}>
                  Sub-Location:{' '}
                </Text>
                <Text style={[styles.bodyText]}>
                  {assetItem.subLocation3} | {assetItem.subLocation2} |{' '}
                  {assetItem.subLocation1}
                </Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={[styles.boldText, styles.bodyHeaderText]}>
                  Spec:{' '}
                </Text>
                <Text style={[styles.bodyText]}>{assetItem.custSpec}</Text>
              </View>
            </View>
          </View>
          <ScrollView>
            <View style={styles.footerContainer}>
              <View style={styles.footerHead}>
                <TouchableOpacity onPress={() => setIsActiveFoot(1)}>
                  <View
                    style={[
                      styles.footerTab,
                      isActiveFoot === 1 && styles.activeTab,
                    ]}>
                    <Text
                      style={[
                        styles.headFootText,
                        isActiveFoot === 1 && styles.activeText,
                      ]}>
                      Asset Details
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsActiveFoot(2)}>
                  <View
                    style={[
                      styles.footerTab,
                      isActiveFoot === 2 && styles.activeTab,
                    ]}>
                    <Text
                      style={[
                        styles.headFootText,
                        isActiveFoot === 2 && styles.activeText,
                      ]}>
                      Additional Details
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {isActiveFoot === 1 && (
                <View style={{flexDirection: 'row', paddingLeft: 10}}>
                  <View style={{flex: 1}}>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Department</Text>
                      <Text style={styles.footDetailsBodyText}>
                        {assetItem.deptName}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>
                        Acquisation Date
                      </Text>
                      <Text style={styles.footDetailsBodyText}>
                        {assetItem.acquisitionDate}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>
                        Supplier Name
                      </Text>
                      <Text style={styles.footDetailsBodyText}>
                        {assetItem.supplierName}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>
                        Depreciated %
                      </Text>
                      <Text style={styles.footDetailsBodyText}>
                        {assetItem.purchaseVal} %
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>
                        Salvage Value
                      </Text>
                      <Text style={styles.footDetailsBodyText}>
                        {assetItem.salvageVal}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                    <View>
                      <Text style={styles.footDetailsHeadText}>
                        Sub-Department
                      </Text>
                      <Text style={styles.footDetailsBodyText}>
                        {assetItem.subDeptName}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Life Time</Text>
                      <Text style={styles.footDetailsBodyText}>
                        {assetItem.lifetimeOfAssetValue} - Years
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>
                        Purchase Value
                      </Text>
                      <Text style={styles.footDetailsBodyText}>
                        {assetItem.purchaseVal}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>
                        Depreciated Value
                      </Text>
                      <Text style={styles.footDetailsBodyText}>
                        {assetItem.purchaseVal}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Book Value</Text>
                      <Text style={styles.footDetailsBodyText}>
                        {assetItem.bookValue}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              {isActiveFoot === 2 && (
                <View style={{flex: 1, paddingLeft: 10}}>
                  <View style={{flex: 1}}>
                    {/* =========== subdetails asset labels and values */}
                    <View style={styles.flexiFieldContainer}>
                      <View style={styles.flexiFieldColumn}>
                        {AssetDetailsLeftColumnLabels.map(
                          (assetlabel, index) => (
                            <View key={index}>
                              <Text style={styles.footDetailsHeadText}>
                                {assetlabel.assetFieldName}
                              </Text>
                              <Text
                                style={[
                                  styles.footDetailsBodyText,
                                  {
                                    color: subDetails[`assetField${index + 1}`]
                                      ? 'black'
                                      : CustomThemeColors.primary,
                                  },
                                ]}>
                                {subDetails[`assetField${index + 1}`]
                                  ? subDetails[`assetField${index + 1}`]
                                  : '-'}
                              </Text>
                            </View>
                          ),
                        )}
                      </View>
                      <View style={styles.flexiFieldColumn}>
                        {AssetDetailsrightColumnLabels.map(
                          (assetlabel, index) => (
                            <View key={index}>
                              <Text style={styles.footDetailsHeadText}>
                                {assetlabel.assetFieldName}
                              </Text>
                              <Text
                                style={[
                                  styles.footDetailsBodyText,
                                  {
                                    color: subDetails[
                                      `assetField${
                                        index + flexiDetailsHalfLength + 1
                                      }`
                                    ]
                                      ? 'black'
                                      : CustomThemeColors.primary,
                                  },
                                ]}>
                                {subDetails[
                                  `assetField${
                                    index + flexiDetailsHalfLength + 1
                                  }`
                                ]
                                  ? subDetails[
                                      `assetField${
                                        index + flexiDetailsHalfLength + 1
                                      }`
                                    ]
                                  : '-'}
                              </Text>
                            </View>
                          ),
                        )}
                      </View>
                    </View>

                    <Text style={[styles.bottomBorder, {flex: 1}]}></Text>

                    {/* =========== subdetails flexi labels and values */}

                    <View style={styles.flexiFieldContainer}>
                      <View style={styles.flexiFieldColumn}>
                        {flexiDetailsLeftColumnLabels.map(
                          (flexilabel, index) => (
                            <View key={index}>
                              <Text style={styles.footDetailsHeadText}>
                                {flexilabel.flexiFieldName}
                              </Text>
                              <Text
                                style={[
                                  styles.footDetailsBodyText,
                                  {
                                    color: subDetails[`flexiField${index + 1}`]
                                      ? 'black'
                                      : CustomThemeColors.primary,
                                  },
                                ]}>
                                {subDetails[`flexiField${index + 1}`]
                                  ? subDetails[`flexiField${index + 1}`]
                                  : '-'}
                              </Text>
                            </View>
                          ),
                        )}
                      </View>
                      <View style={styles.flexiFieldColumn}>
                        {flexiDetailsRightColumnLabels.map(
                          (flexilabel, index) => (
                            <View key={index}>
                              <Text style={styles.footDetailsHeadText}>
                                {flexilabel.flexiFieldName}
                              </Text>
                              <Text
                                style={[
                                  styles.footDetailsBodyText,
                                  {
                                    color: subDetails[
                                      `flexiField${
                                        index + flexiDetailsHalfLength + 1
                                      }`
                                    ]
                                      ? 'black'
                                      : CustomThemeColors.primary,
                                  },
                                ]}>
                                {subDetails[
                                  `flexiField${
                                    index + flexiDetailsHalfLength + 1
                                  }`
                                ]
                                  ? subDetails[
                                      `flexiField${
                                        index + flexiDetailsHalfLength + 1
                                      }`
                                    ]
                                  : '-'}
                              </Text>
                            </View>
                          ),
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={openQrScanner}
              style={{
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Icon
                name="qr-code"
                size={50}
                color={CustomThemeColors.primary}
              />
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
      {/* </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1.2,
    alignItems: 'center',
    marginBottom: 10,
  },
  imgContainer: {
    // flex:1,
    marginVertical: width < 600 ? 10 : 30,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(55, 136, 229, 0.26)',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
    width: '95%',
    alignItems: 'center',
    padding: 10,
  },
  imgCont: {
    borderRadius: 10,
    objectFit: 'contain',
    // height: 150,
  },
  image: {
    objectFit: 'contain',
    width: width > 600 ? 600 : 340,
    height: width > 600 ? 400 : 170,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 16,
    // flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer1: {
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  headText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bodyText: {
    color: 'black',
    textAlign: 'left',
    marginRight: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  footerContainer: {
    // flex: 1,
    backgroundColor: '#F0F2F5',
    borderRadius: 15,
    width: '95%',
    height: 'auto',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(55, 136, 229, 0.26)',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  footerHead: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footerTab: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  headFootText: {
    textAlign: 'center',
    color: 'grey',
    fontWeight: 'bold',
    marginBottom: 8,
    width: '100%',
  },
  activeText: {
    color: CustomThemeColors.primary,
    fontSize: 16,
    marginBottom: 0,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: CustomThemeColors.primary,
  },
  footDetails: {
    flexDirection: 'row',
    marginTop: 10,
  },
  footDetailsBodyText: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    width: '50%',
    // marginHorizontal: 30
  },
  flexiFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  flexiFieldColumn: {
    flex: 1,
    paddingHorizontal: 0,
  },
  flexiFieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  footDetailsHeadText: {
    color: 'grey',
    fontWeight: 'light',
    marginBottom: 3,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    marginRight: 10,
    marginBottom: 15,
    borderColor: 'lightgrey',
  },
  bodyHeaderText: {
    color: 'grey',
    textAlign: 'left',
    marginLeft: 5,
  },
});

export default AssetListDetails;
