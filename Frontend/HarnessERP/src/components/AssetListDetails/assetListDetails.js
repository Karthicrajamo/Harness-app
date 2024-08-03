import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import AssetListImage from '../AssetListImage/assetListImage';
import Icon from 'react-native-vector-icons/Ionicons';
// import SkeletonContent from 'react-native-skeleton-content';
import {Skeleton} from '@rneui/themed';
import {CustomThemeColors} from '../CustomThemeColors';
import TitleBar from '../common-utils/TitleBar';
import LinearGradient from 'react-native-linear-gradient';
import AssetListDetailsSkeleton from './AssetListDetailsSkeleton';

const {width} = Dimensions.get('window');

function AssetListDetails(props) {
  const [isActiveFoot, setIsActiveFoot] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const route = useRoute();
  const {assetItem} = route.params;
  const [subDetails, setSubDetails] = useState([]);
  const [assetId, setAssetId] = useState(assetItem ? assetItem.assetId : null);
  const [subDetailsLabel, setSubDetailsLabel] = useState([]);
  const [type, setType] = useState(assetItem ? assetItem.type : null);
  const [assetImagesData, setAssetImagesData] = useState([]);
  const [isImageExist, setIsImageExist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageList, setShowImageList] = useState(false);

  const handleAssetMainScreen = async () => {
    navigation.navigate('AssetListMainScreen');
  };

  const openQrScanner = () => {
    navigation.navigate('QrScanner');
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSubDetails(assetItem.assetId);
      await fetchAssetImages(assetItem.assetId);
      await fetchSubDetailsLabel(assetItem.type);
      setLoading(false);
    };
    fetchData();
  }, [assetItem.assetId, assetItem.type]);

  const fetchSubDetails = async assetId => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      const response = await fetch(
        `http://192.168.0.169:8084/api/assetList/assetSubDetailsValue?assetId=${assetId}`,
        {
          method: 'POST',
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
      setSubDetails(data);
    } catch (error) {
      console.error('Error fetching subdetails:', error);
    }
  };

  const fetchAssetImages = async assetId => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      const response = await fetch(
        `http://192.168.0.169:8084/api/assetList/assetImage?assetId=${assetId}`,
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
      console.log('&&&&&&&&&&&&&', data);
      setAssetImagesData(data);
      if (assetImagesData) {
        setIsImageExist(true);
      }
    } catch (error) {
      console.error('Error fetching asset Images:', error);
    }
  };

  const fetchSubDetailsLabel = async type => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      const response = await fetch(
        `http://192.168.0.169:8084/api/assetList/subDetails/assetLabels?type=${type}`,
        {
          method: 'POST',
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
      setSubDetailsLabel(data);
    } catch (error) {
      console.error('Error fetching subdetailslabel:', error);
    }
  };

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

  return (
    <>
      {loading && <AssetListDetailsSkeleton />}
      {!loading && (
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
                ImageGelleryOnClose={() => setShowImageList(false)}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.headText}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                    borderRadius: 10,
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  <Icon
                    name="pricetag"
                    size={15}
                    color={
                      assetItem.status == 'Active'
                        ? 'green'
                        : assetItem.status == 'Incomplete'
                        ? 'blue'
                        : assetItem.status == 'In-Active'
                        ? 'yellow'
                        : 'red'
                    }
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color:
                        assetItem.status == 'Active'
                          ? 'green'
                          : assetItem.status == 'Incomplete'
                          ? 'blue'
                          : assetItem.status == 'In-Active'
                          ? 'yellow'
                          : 'red',
                    }}>
                    {assetItem.assetCode}
                  </Text>
                </View>
              </Text>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={[styles.boldText, styles.bodyText]}>Type:</Text>
                <Text style={[styles.bodyText]}>{assetItem.type}</Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={styles.boldText}>Class: </Text>
                <Text style={[styles.bodyText]}>
                  {assetItem.classificationName}
                </Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={styles.boldText}>Asset No: </Text>
                <Text style={[styles.bodyText]}>{assetItem.assetId}</Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={styles.boldText}>Owner Ship: </Text>
                <Text style={[styles.bodyText]}>{assetItem.ownerShip}</Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={styles.boldText}>Location: </Text>
                <Text style={[styles.bodyText]}>{assetItem.locationName}</Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                  <Text style={styles.boldText}>Sub-Location: </Text>
                <Text style={[styles.bodyText]}>
                  {assetItem.subLocation} | {assetItem.subLocation} |{' '}
                  {assetItem.subLocation}
                </Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={styles.boldText}>Spec: </Text>
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
                <View style={{flexDirection: 'row', paddingLeft: 10}}>
                  <View style={{flex: 1}}>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Colour</Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {
                            color: subDetails.assetField1
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.assetField1
                          ? subDetails.assetField1
                          : 'No Data'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Size</Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {
                            color: subDetails.assetField2
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.assetField2
                          ? subDetails.assetField2
                          : 'No Data'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Height</Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {marginBottom: 0},
                          {
                            color: subDetails.assetField3
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.assetField3
                          ? subDetails.assetField3
                          : 'No Data'}
                      </Text>
                    </View>
                    {/* <Text style={{borderBottomWidth: 1, marginBottom: 15}}></Text> */}
                    <Text
                      style={[styles.bottomBorder, {marginRight: 0}]}></Text>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Serial No</Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {
                            color: subDetails.flexiField1
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.flexiField1
                          ? subDetails.flexiField1
                          : 'No Data'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Model No</Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {
                            color: subDetails.flexiField2
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.flexiField2
                          ? subDetails.flexiField2
                          : 'No Data'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>MFD Date</Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {
                            color: subDetails.flexiField2
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.flexiField3
                          ? subDetails.flexiField3
                          : 'No Data'}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Weight</Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {
                            color: subDetails.assetField4
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.assetField4
                          ? subDetails.assetField4
                          : 'No Data'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Model</Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {
                            color: subDetails.assetField5
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.assetField5
                          ? subDetails.assetField5
                          : 'No Data'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Type</Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {marginBottom: 0},
                          {
                            color: subDetails.assetField6
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.assetField6
                          ? subDetails.assetField6
                          : 'No Data'}
                      </Text>
                    </View>
                    <Text style={styles.bottomBorder}></Text>
                    <View>
                      <Text style={styles.footDetailsHeadText}>
                        Company Name
                      </Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {
                            color: subDetails.flexiField4
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.flexiField4
                          ? subDetails.flexiField4
                          : 'No Data'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>Display</Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          ,
                          {
                            color: subDetails.flexiField5
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.flexiField5
                          ? subDetails.flexiField5
                          : 'No Data'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footDetailsHeadText}>
                        Operating Type
                      </Text>
                      <Text
                        style={[
                          styles.footDetailsBodyText,
                          {
                            color: subDetails.flexiField6
                              ? 'black'
                              : CustomThemeColors.primary,
                          },
                        ]}>
                        {subDetails.flexiField6
                          ? subDetails.flexiField6
                          : 'No Data'}
                      </Text>
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
    width: width > 600 ? 600 : 300,
    height: width > 600 ? 400 : 150,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 16,
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
  },
  boldText: {
    fontWeight: 'bold',
    color:'black'
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
        elevation: 10,
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
    borderColor: 'grey',
  },
});

export default AssetListDetails;
