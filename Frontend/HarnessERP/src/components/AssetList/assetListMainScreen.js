import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Image,
  Modal,
  Animated,
  KeyboardAvoidingView,
  Alert,
  Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './assetListMainScreenStyles';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import AssetListSort from '../AssetListSort/assetListSort';
import AssetListFilter from '../AssetListFilter/assetListFilter';

import * as Keychain from 'react-native-keychain';
import API_URL from '../ApiUrl';
import {CustomThemeColors} from '../CustomThemeColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {horizontalScale, moderateScale, verticalScale} from '../themes/Metrics';
import {Chip} from 'react-native-paper';
// import AssetListFilter from '../AssetListFilter/assetListFilter';
import RequestCameraPermission from '../common-utils/RequestCameraPermission';
import QrScanner from '../common-utils/QrScanner';
import CustomMarkerImage from '../assets/scanner-target-frame.png';
import {AsyncLocalStorage} from 'async_hooks';
import MarqueeText from '../common-utils/MarqueeText';
import LoadingIndicator from '../commonUtils/LoadingIndicator';
import SearchModal from '../common-utils/SearchModal';
import TitleBar from '../common-utils/TitleBar';

import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const AssetListMainScreen = () => {
  const navigation = useNavigation(); //For Nagivation
  const [isLoading, setIsLoading] = useState(false);

  //Close Button Code
  const handleHomeScreen = async () => {
    navigation.navigate('HomeScreen');
  };

  const handleAssetDetailsScreen = item => {
    navigation.navigate('AssetListDetails', {assetItem: item});
  };

  //Sort Button Code
  const [showSortPopup, setShowSortPopup] = useState(false); // State to control visibility of the sort popup

  const handleSortButtonPress = () => {
    setShowSortPopup(true); // Show the sort popup when the "Sort" button is pressed
  };

  // const [sortBy, setSortBy] = useState("assetCode");
  // const [previouslySelectedSort, setPreviouslySelectedSort] = useState([])

  // const handleSortChange = (selectedSortOption) => {
  //   setShowSortPopup(!setShowSortPopup)
  //   setSortBy(selectedSortOption); // Update sortBy state based on user selection
  //   fetchData();
  //   console.log("89475894h selectedSortOption", selectedSortOption);

  const [sortBy, setSortBy] = useState('assetCode');
  const handleSortChange = option => {
    setSortBy(option); // Update sortBy state based on user selection
    fetchData();
  };
  //Filter Button Code
  const [showSortPopup1, setShowSortPopup1] = useState(false); // State to control visibility of the sort popup
  const handleFilterButtonPress = () => {
    setShowSortPopup1(true); // Show the sort popup when the "Sort" button is pressed
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [depModalVisible, setDepModalVisible] = useState(false);
  const handleCloseModal = () => {
    setModalVisible(false);
    setDepModalVisible(false);
  };

  const [qrScannerOpen, setQrScannerOpen] = useState(false);

  const openQrScanner = () => {
    navigation.navigate('QrScanner');
  };
  //LOADING FILTERS
  useEffect(() => {
    // Fetch departments, locations, and statuses when component mounts
    setCurrentPage(1);
    fetchDepartments();
    fetchLocations();
    fetchStatuses();
    fetchData();
  }, [currentPage, selectedDepartment, selectedStatus]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDepCategories, setSelectedDepCategories] = useState([]);
  const [selectedStatusCategories, setSelectedStatusCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleCheckboxChange = category => {
    if (selectedCategories.includes(category)) {
      // If the category is already selected and the checkbox is unchecked, remove it from selectedCategories and selectedLocation
      const updatedCategories = selectedCategories.filter(
        item => item !== category,
      );
      setSelectedCategories(updatedCategories);

      const updatedLocations = selectedLocation.filter(
        location => location !== category,
      );
      setSelectedLocation(updatedLocations);

      console.log('Unchecked,locs updatedCategories:', updatedCategories);
      console.log('Unchecked,locs updatedLocations:', updatedLocations);
    } else {
      // If the checkbox is checked, add the category to selectedCategories and selectedLocation
      const updatedCategories = [...selectedCategories, category];
      setSelectedCategories(updatedCategories);
      setSelectedLocation(updatedCategories); // Keep selectedLocation in sync

      console.log('Checked, updatedCategories:', updatedCategories);
    }
  };
  const handleDepCheckboxChange = category => {
    if (selectedDepCategories.includes(category)) {
      // If the category is already selected and the checkbox is unchecked, remove it from selectedDepCategories
      const updatedCategories = selectedDepCategories.filter(
        item => item !== category,
      );
      setSelectedDepCategories(updatedCategories);

      // Update selectedDepartment accordingly
      const updatedDepart = selectedDepartment.filter(
        depart => depart !== category,
      );
      setSelectedDepartment(updatedDepart);

      console.log('Unchecked,dep updatedCategories:', updatedCategories);
      console.log('Unchecked,dep updatedDepartments:', updatedDepart);
    } else {
      // If the checkbox is checked, add the category to selectedDepCategories
      const updatedCategories = [...selectedDepCategories, category];
      setSelectedDepCategories(updatedCategories);
      setSelectedDepartment(updatedCategories);

      console.log('Checked,dep updatedCategories:', updatedCategories);
    }
  };

  // const handleStatusCheckboxChange = category => {
  //   if (selectedStatusCategories.includes(category)) {
  //     // If the category is already selected and the checkbox is unchecked, remove it from selectedStatusCategories
  //     const updatedCategories = selectedStatusCategories.filter(
  //       item => item !== category,
  //     );
  //     setSelectedStatusCategories(updatedCategories);

  //     // Update selectedStatus accordingly
  //     const updatedStatus = selectedStatus.filter(
  //       status => status !== category,
  //     );
  //     // setSelectedStatus(updatedStatus);
  //     setSelectedStatus(updatedCategories);

  //     console.log('Unchecked,status updatedCategories:', updatedCategories);
  //     console.log('Unchecked,status updatedStatus:', updatedStatus);
  //   } else {
  //     // If the checkbox is checked, add the category to selectedStatusCategories
  //     const updatedCategories = [...selectedStatusCategories, category];
  //     setSelectedStatusCategories(updatedCategories);
  //     setSelectedStatus(updatedCategories); // Append the new status to the list

  //     console.log('Checked,status updatedCategories:', updatedCategories);
  //     console.log('Checked,status updatedStatus:', selectedStatus);
  //   }
  // };
  const handleStatusCheckboxChange = (category) => {
    if (tempSelectedStatusCategories.includes(category)) {
      // If the category is already selected and the checkbox is unchecked, remove it from tempSelectedStatusCategories
      const updatedCategories = tempSelectedStatusCategories.filter(
        item => item !== category,
      );
      setTempSelectedStatusCategories(updatedCategories);
  
      console.log('Unchecked, tempSelectedStatusCategories:', updatedCategories);
    } else {
      // If the checkbox is checked, add the category to tempSelectedStatusCategories
      const updatedCategories = [...tempSelectedStatusCategories, category];
      setTempSelectedStatusCategories(updatedCategories);
  
      console.log('Checked, tempSelectedStatusCategories:', updatedCategories);
    }
  };
  

  // useEffect(() => {
  //   setSelectedLocation(selectedCategories);
  // }, [selectedLocation]);

 

  //department, locations, statuses use states:
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const [criteriaResponse, setCriteriaResponse] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [subFilteredData, setSubFilteredData] = useState([]);

  useEffect(() => {
    // if (subFilteredData >= 0) {
    console.log(
      'asset main : 876689090hjhjjhj87 subFilteredData : ',
      subFilteredData,
    );
    setFilteredData([]);
    setFilteredData(subFilteredData);
    setShowSortPopup1(false);
    setCurrentPage(1);
    criteriaResponse.totalPages = 1;
    // }
  }, [subFilteredData]);
  //prop 1
  const filterOptionsAPI = '/api/assetList/getSubFilterOptions';

  //prop 2
  const filterCriteriaAPI = '/api/assetList/subFilterCriteria';

  const [pageableData, setPageableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [previouslySelectedSort, setPreviouslySelectedSort] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [fetchedData, setFetchedData] = useState();
  const [tempSelectedStatusCategories, setTempSelectedStatusCategories] = useState([...selectedStatusCategories]);


  const [displayData, setDisplayData] = useState(filteredData);
  const itemsPerPage = 10;
  const [selectedItemsHistory, setSelectedItemsHistory] = useState({
    assetClassifications: [],
    assetTypes: [],
    subDepartments: [],
  });
  useEffect(() => {
    // Fetch data whenever selectedStatusCategories or currentPage changes
    fetchData();
  }, [selectedStatusCategories, currentPage]);
  
  useEffect(() => {
    // console.log('searchData' + searchData);
    // if(searchData.length>0){
    //   setFilteredData(null)
    // }
  }, [filteredData, searchData, handleSearchLoad,tempSelectedStatusCategories]);

  useEffect(() => {}, [displayData,tempSelectedStatusCategories]);

  useEffect(() => {
    const data = searchData.length > 0 ? searchData : filteredData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayData(data.slice(startIndex, endIndex));
  }, [searchData, filteredData, currentPage]);

  const nextPage = () => {
    const data = searchData.length > 0 ? searchData : filteredData;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayData(data.slice(startIndex, endIndex));
    }
  };

  const prevPage = () => {
    const data = searchData.length > 0 ? searchData : filteredData;
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      const startIndex = (currentPage - 2) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayData(data.slice(startIndex, endIndex));
    }
  };

  const jumpToFirstPage = () => {
    setCurrentPage(1);
    const startIndex = 0;
    const endIndex = startIndex + itemsPerPage;
    setDisplayData(filteredData.slice(startIndex, endIndex));
  };

  const jumpToLastPage = () => {
    const data = searchData.length > 0 ? searchData : filteredData;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    setCurrentPage(totalPages);
    const startIndex = (totalPages - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayData(data.slice(startIndex, endIndex));
  };
  // DEPARTMENT API REQUEST -----------------------------------------------------------------------

  const fetchDepartments = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      console.log(' token with berarer for department: ', `${token}`);
      // Replace with your API endpoint to fetch departments
      const response = await fetch(`${API_URL}/api/department/allDepartments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(
        'response fetch department : ===============>>>>>>>>>> ',
        data,
      );
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // LOCATION API REQUEST -----------------------------------------------------------------------
  const fetchLocations = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      if (!credentials) {
        throw new Error('No credentials found');
      }

      const token = credentials.password;
      console.log('Token with bearer:', `${token}`);

      // Fetching locations from the API
      const response = await fetch(`${API_URL}/api/assetList/allLocations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Use JSON.stringify to log the entire response data
      console.log('Response locations:', JSON.stringify(data));

      // Setting the locations data
      setLocations(data);
    } catch (error) {
      // Improved error logging
      console.error('Error fetching locations:', error);
    }
  };

  // STATUS API REQUEST -----------------------------------------------------------------------
  const fetchStatuses = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      console.log('token with berarer statussss: ', `${token}`);
      // Replace with your API endpoint to fetch locations
      const response = await fetch(
        `${API_URL}/api/assetList/distinctStatuses`,
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
      console.log('status data' + data);
      setStatus(data);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  
  // FILTERED DATA
  const fetchData = async () => {
    try {
      console.log('sortBy:', sortBy);
      setIsLoading(true);

      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      console.log('Token with bearer:', token);

      // Fetch data from the API and filter it in one go
      const response = await fetch(`${API_URL}/api/assetList/mainFilters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          deptName: '',
          locationName: '',
          status: '',
          sortBy: sortBy,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('All data fetched:', data.length);

      // Filter the data based on selected locations, departments, and status
      const filteredData = data.filter(item => {
        const locationMatch =
          selectedLocation.length === 0 ||
          selectedLocation.includes(item.locationName);
        const departmentMatch =
          selectedDepartment.length === 0 ||
          selectedDepartment.includes(item.deptName);
        const statusMatch =
          selectedStatus.length === 0 || selectedStatus.includes(item.status);
        return locationMatch && departmentMatch && statusMatch;
      });

      // Process and update the filtered data
      setSearchData([]);
      setCriteriaResponse(filteredData);
      setPageableData(filteredData.pageable || {}); // Assuming pageable data is the same for all requests
      setFetchedData(filteredData);
      setFilteredData(filteredData);

      console.log('Filtered data:', filteredData.slice(0, 9));
    } catch (error) {
      console.error('Error fetching or filtering data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data whenever any filter changes
    fetchData();
  }, [
    // selectedDepartment,
    // selectedLocation,
    // selectedStatus,
    currentPage,
    sortBy,
  ]);

  const toTitleCase = str => {
    // console('str data>>>>>>>>>>>>>>' + str);
    // console('str data char>>>>>>>>>>>>>>' + str.charAt(0));
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  };
  //------------------------------------------------------------------------------------------------------------

  // Search Modal
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const openSearchModal = () => setSearchModalVisible(true);
  const closeSearchModal = () => setSearchModalVisible(false);

  const handleSearchComplete = query => {
    // Perform the search operation here
    const results = filteredData.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    ); // Example search logic
    setSearchResults(results);
    closeSearchModal();
  };

  // const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearchLoad = data => {
    // setSearchPerformed(true);
    console.log('searchLOad+' + data);
    setSearchData([]);
    setSearchData(data);
    setFilteredData([]);
    setFilteredData(data);
  };

  //Refresh Component
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    // Perform refresh actions here
    setRefreshing(true); // Show the refresh component
    setTimeout(() => {
      setRefreshing(false); // Hide the refresh component after some delay or when refresh is complete
      navigation.replace('AssetListMainScreen');
      // fetchData();
    }, 1000); // Simulating a delay here, replace with actual refresh logic
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View
        style={{
          backgroundColor: 'white',
          height: '100%',
          paddingTop: 10,
          paddingBottom: 10,
        }}>
        {/* HEADER */}
        {/* {loading ? ( */}
        {isLoading ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 44,
            }}>
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={'92%'}
              height={40}
              style={{borderRadius: 15}}
            />
          </View>
        ) : (
          <TitleBar
            text="Asset Details"
            showMenuBar={true}
            onMenuPress={() => navigation.openDrawer()}
            showSearchIcon={true}
            onSearchPress={openSearchModal}
            showQrScannerIcon={true}
            onQrScannerPress={openQrScanner}
            showRefreshIcon={true}
            onRefreshPress={handleRefresh}
            showCloseIcon={true}
            onClose={handleHomeScreen}
          />
        )}

        {/* Search Modal */}

        <SearchModal
          visible={searchModalVisible}
          onClose={closeSearchModal}
          onSearch={handleSearchLoad}
          // setSearchData={setSearchData}
        />

        {/* --------------------- Popup List Start For All Three ---------------------------------------------- */}
        {/* MAIN FILTER SECTION (DEPARTMENT, LOCATION, STATUS) */}
        {/* <View style={styles.mainFIlterContainer}> */}
        {/* --------------------- Popup List For Department ---------------------------------------------- */}

        {/* {isLoading ? (
            <>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 44,
                  // marginVertical:10
                }}>
                <Skeleton
                  LinearGradientComponent={LinearGradient}
                  animation="wave"
                  width={'95%'}
                  height={30}
                  style={{borderRadius: 15}}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 20,
                  // marginVertical:10
                }}>
                <Skeleton
                  LinearGradientComponent={LinearGradient}
                  animation="wave"
                  width={'95%'}
                  height={30}
                  style={{borderRadius: 15}}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 44,
                  // marginVertical:10
                }}>
                <Skeleton
                  LinearGradientComponent={LinearGradient}
                  animation="wave"
                  width={'95%'}
                  height={30}
                  style={{borderRadius: 15}}
                />
              </View>
            </> */}
        {/* ) : (
            <View style={styles.mainFIlterElementContainer}>
              <View style={styles.mainFIlterElementTitleContainer}>
                <Text style={styles.mainFIlterElementTitle}>Department</Text>
              </View>
              <View style={styles.mainFIlterElementPickerContainer}>
                <Picker
                  style={{color: 'black'}}
                  selectedValue={selectedDepartment}
                  onValueChange={selectedValue => {
                    setSelectedDepartment(selectedValue);
                    jumpToFirstPage();
                    console.log('selectedValue 009', selectedValue);
                  }}
                  // itemStyle={styles.pickerItem} // Example of itemStyle
                >
                  <Picker.Item label="All" value="" />
                  {departments.map((dept, index) => (
                    <Picker.Item
                      key={index.toString()}
                      label={dept.toUpperCase()}
                      value={dept}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )} */}

        {/* {!isLoading && (
            <View style={styles.mainFIlterElementContainer}>
              <View style={styles.mainFIlterElementTitleContainer}>
                <Text style={styles.mainFIlterElementTitle}>Location</Text>
              </View>
              <View style={styles.mainFIlterElementPickerContainer}>
                <Picker
                  style={{color: 'black'}}
                  selectedValue={selectedLocation}
                  onValueChange={selectedValue => {
                    setSelectedLocation(selectedValue);
                    jumpToFirstPage();
                  }}>
                  <Picker.Item label="All" value="" />
                  {locations.map(loc => (
                    <Picker.Item
                      key={loc.locationId}
                      label={loc.locationName.toUpperCase()}
                      value={loc.locationName}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )}
          {!isLoading && (
            <View style={styles.mainFIlterElementContainer}>
              <View style={styles.mainFIlterElementTitleContainer}>
                <Text style={styles.mainFIlterElementTitle}>Status</Text>
              </View>
              <View style={styles.mainFIlterElementPickerContainer}>
                <Picker
                  style={{color: 'black'}}
                  selectedValue={selectedStatus}
                  onValueChange={selectedValue => {
                    setSelectedStatus(selectedValue);
                    jumpToFirstPage();
                  }}>
                  <Picker.Item label="All" value="" />
                  {status
                    .filter(
                      Stat =>
                        !['DELETED', 'INCOMPLETE'].includes(Stat.toUpperCase()),
                    )
                    .map((Stat, index) => (
                      <Picker.Item
                        key={index.toString()}
                        label={Stat.toUpperCase()}
                        value={Stat}
                      />
                    ))}
                </Picker>
              </View>
            </View>
          )}*/}
        {/* </View>  */}
        {/* --------------------- Popup List End For All Three ---------------------------------------------- */}
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              borderRadius: 20,
              width: '95%',
              overflow: 'hidden',
              marginTop: 5,
            }}>
            <Button
              title="Department"
              onPress={() => setDepModalVisible(true)}
            />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              borderRadius: 20,
              width: '95%',
              overflow: 'hidden',
              marginTop: 5,
            }}>
            <Button title="Location" onPress={() => setModalVisible(true)} />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              borderRadius: 20,
              width: '95%',
              overflow: 'hidden',
              marginTop: 5,
              mariginBottom: 5,
            }}>
            <Button
              title="Status"
              onPress={() => setStatusModalVisible(true)}
            />
          </View>
        </View>

        {/* Department Filter */}
        <Modal
          visible={depModalVisible}
          animationType="slide"
          onRequestClose={() => setDepModalVisible(false)} // Close modal on hardware back button
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setDepModalVisible(false)}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            {/* Render the list of departments with checkboxes */}
            {departments.map((department, index) => (
              <View key={index} style={styles.checkboxContainer}>
                <CheckBox
                  value={selectedDepCategories.includes(department)}
                  key={index}
                  onValueChange={() => handleDepCheckboxChange(department)}
                />
                <Text style={styles.checkboxLabel}>{department}</Text>
              </View>
            ))}

            {/* Apply Filter Button */}
            <Button
              title="Apply Filter"
              onPress={() => {
                console.log('Selected Categories:', selectedDepCategories);

                setSelectedDepartment(selectedDepCategories);
                setCurrentPage(1);

                fetchData();

                setDepModalVisible(false);
              }}
            />

            {/* Render the filtered items */}
            <FlatList
              data={filteredItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <Text>{item}</Text>}
            />
          </View>
        </Modal>
        {/* Location Filter */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)} // Close modal on hardware back button
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            {/* Render the list of locations with checkboxes */}
            {locations.map((location, index) => (
              <View key={index} style={styles.checkboxContainer}>
                <CheckBox
                  value={selectedCategories.includes(location.locationName)}
                  key={index}
                  onValueChange={() =>
                    handleCheckboxChange(location.locationName)
                  }
                />
                <Text style={styles.checkboxLabel}>
                  {location.locationName}
                </Text>
              </View>
            ))}

            {/* Apply Filter Button */}
            <Button
              title="Apply Filter"
              onPress={() => {
                // Log the selected categories and locations before fetching data
                console.log('Selected Categories:', selectedCategories);

                // Set the selected categories as the selected locations
                setSelectedLocation(selectedCategories);

                // Fetch data based on the selected locations
                setCurrentPage(1);
                fetchData();

                // Close the modal after applying the filter
                setModalVisible(false);
              }}
            />

            {/* Render the filtered items */}
            <FlatList
              data={filteredItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <Text>{item}</Text>}
            />
          </View>
        </Modal>
        <Modal
  visible={statusModalVisible}
  animationType="slide"
  onRequestClose={() => {
    setTempSelectedStatusCategories([...selectedStatusCategories]); // Revert changes
    setStatusModalVisible(false);
  }}
>
  <View style={styles.modalContainer}>
    <TouchableOpacity
      style={styles.closeIconContainer}
      onPress={() => {
        setTempSelectedStatusCategories([...selectedStatusCategories]); // Revert changes
        setStatusModalVisible(false);
      }}
    >
      <Icon name="close" size={24} color="#000" />
    </TouchableOpacity>

    {status.map((statusItem, index) => (
      <View key={index} style={styles.checkboxContainer}>
        <CheckBox
          value={tempSelectedStatusCategories.includes(statusItem)}
          onValueChange={() => handleStatusCheckboxChange(statusItem)}
        />
        <Text style={styles.checkboxLabel}>{statusItem}</Text>
      </View>
    ))}

    <Button
      title="Apply Filter"
      onPress={() => {
        console.log('Selected Categories:', tempSelectedStatusCategories);
        setSelectedStatusCategories(tempSelectedStatusCategories);
        setSelectedStatus(tempSelectedStatusCategories);// Apply changes
        console.log('Selected Categories:', );
        setCurrentPage(1);
        fetchData();
        setStatusModalVisible(false);
      }}
    />

    <FlatList
      data={filteredItems}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Text>{item}</Text>}
    />
  </View>
</Modal>

        {/* SORT AND FILTER SECTION */}
        <View style={styles.sortAndFilterContainer}>
          {/* <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 44,
              // marginVertical:10
            }}>
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={'95%'}
              height={30}
              style={{ borderRadius: 15 }} />
          </View> */}

          <View style={styles.sortElementContainer}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  marginLeft: 5,
                }}>
                <Skeleton
                  LinearGradientComponent={LinearGradient}
                  animation="wave"
                  width={'95%'}
                  height={30}
                  style={{borderRadius: 15}}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleSortButtonPress}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: CustomThemeColors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    padding: 5,
                  }}>
                  <View>
                    <Text
                      style={{
                        color: CustomThemeColors.primary,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      Sort
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <MaterialIcons
                      name="sort"
                      size={25}
                      style={{color: CustomThemeColors.primary}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.filterElementContainer}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  marginRight: 5,
                }}>
                <Skeleton
                  LinearGradientComponent={LinearGradient}
                  animation="wave"
                  width={'95%'}
                  height={30}
                  style={{borderRadius: 15}}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleFilterButtonPress}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: CustomThemeColors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    padding: 5,
                  }}>
                  <View>
                    <Text
                      style={{
                        color: CustomThemeColors.primary,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      Filter
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <MaterialIcons
                      name="filter-alt"
                      size={25}
                      color={CustomThemeColors.primary}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* {showSortPopup && <AssetListSort onClose={handleCloseSortPopup} />} */}

          {showSortPopup && (
            // <AssetListSort onClose={() => setShowSortPopup(false)} />
            <AssetListSort
              onClose={() => {
                setShowSortPopup(false);
              }}
              setSortBy={selectedSortOption => {
                handleSortChange(selectedSortOption);
              }}
              setPreviouslySelectedSort={setPreviouslySelectedSort}
              previousSort={previouslySelectedSort}
            />
          )}
          {/* <AssetListFilter visible={modalVisible} onClose={handleCloseModal} /> */}
          {showSortPopup1 && (
            <AssetListFilter
              onClose={() => setShowSortPopup1(false)}
              setSubFilteredData={setSubFilteredData}
              filterOptionsAPI={filterOptionsAPI}
              filterCriteriaAPI={filterCriteriaAPI}
              setSelectedItemsHistory={setSelectedItemsHistory}
              selectedItemsHistory={selectedItemsHistory}
            />
          )}
        </View>

        {/* LIST OF DETAILS */}
        {isLoading ? (
          <>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                width={'95%'}
                height={90}
                style={{borderRadius: 15}}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                width={'95%'}
                height={90}
                style={{borderRadius: 15}}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                width={'95%'}
                height={90}
                style={{borderRadius: 15}}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                width={'95%'}
                height={90}
                style={{borderRadius: 15}}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                width={'95%'}
                height={90}
                style={{borderRadius: 15}}
              />
            </View>
          </>
        ) : (
          <View
            style={{
              padding: 5,
              backgroundColor: CustomThemeColors.header,
              flex: 1,
            }}>
            <ScrollView style={styles.scrollView}>
              {displayData.length > 0 ? (
                displayData.map((item, index) => (
                  <View key={index} style={styles.flatListContainer}>
                    <View style={styles.flatListItemContainer}>
                      <TouchableWithoutFeedback
                        onPress={() => handleAssetDetailsScreen(item)}>
                        <View style={styles.flatListItemSubContainer}>
                          <View style={styles.innerContainer}>
                            <View style={styles.headerContainer}>
                              <View
                                style={[
                                  styles.tag,
                                  {backgroundColor: CustomThemeColors.primary},
                                ]}>
                                <Text style={styles.tagText}>
                                  {item.assetCode}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.tag,
                                  {
                                    backgroundColor: CustomThemeColors.primary,
                                    marginLeft: 10,
                                  },
                                ]}>
                                <Text style={styles.tagText}>{item.type}</Text>
                              </View>

                              <View
                                style={[
                                  styles.tag,
                                  {
                                    backgroundColor: 'green',
                                    marginLeft: 10,
                                  },
                                ]}>
                                <Text style={styles.tagText}>
                                  {item.ownerShip}
                                </Text>
                              </View>
                            </View>

                            <View style={styles.rowContainer}>
                              <Text style={styles.categoryText}>
                                {toTitleCase(item.category)}
                              </Text>
                              <Text style={styles.separator}> | </Text>
                              <Text style={styles.classificationText}>
                                {toTitleCase(item.classificationName)}
                              </Text>
                            </View>

                            <View style={styles.rowContainer}>
                              <Text style={styles.boldText}>Departments:</Text>
                              <Text style={styles.departmentText}>
                                {toTitleCase(item.deptName)}
                              </Text>
                              <Text style={styles.separator}> | </Text>
                              <Text style={styles.subDepartmentText}>
                                {item.subDeptName
                                  ? toTitleCase(item.subDeptName)
                                  : item.subDeptName}
                              </Text>
                            </View>

                            <View style={styles.locationContainer}>
                              <MaterialIcons
                                name="place"
                                size={14}
                                color={CustomThemeColors.primary}
                                style={styles.locationIcon}
                              />
                              <Text style={styles.locationText}>
                                {toTitleCase(item.locationName)}
                              </Text>
                              <Text style={styles.separator}> | </Text>
                              <Text style={styles.locationText}>
                                {toTitleCase(item.subLocation3)}
                              </Text>
                              <Text style={styles.separator}> | </Text>
                              <Text style={styles.locationText}>
                                {toTitleCase(item.subLocation2)}
                              </Text>
                              <Text style={styles.separator}> | </Text>
                              <Text style={styles.locationText}>
                                {toTitleCase(item.subLocation1)}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.iconContainer}>
                            <MaterialIcons
                              name="arrow-forward-ios"
                              size={20}
                              color={CustomThemeColors.primary}
                              onPress={() => handleAssetDetailsScreen(item)}
                            />
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text>No Data Available</Text>
                </View>
              )}

              {isLoading && (
                <View style={styles.skeletonContainer}>
                  <Skeleton
                    LinearGradientComponent={LinearGradient}
                    animation="wave"
                    width={'95%'}
                    height={10}
                    style={{borderRadius: 15}}
                  />
                </View>
              )}
            </ScrollView>
          </View>
        )}

        {/* FOOTER */}
        {!isLoading && (
          <View
            style={{
              backgroundColor: CustomThemeColors.whiteBackgroundColor,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              padding: 5,
              height: 'auto',
              flex: 0.06,
            }}>
            <View style={{flexDirection: 'row', width: '80%'}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: CustomThemeColors.whiteBackgroundColor,
                }}
                onPress={jumpToFirstPage}>
                <View>
                  <MaterialIcons
                    name="keyboard-double-arrow-left"
                    size={25}
                    color={CustomThemeColors.primary}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: CustomThemeColors.whiteBackgroundColor,
                }}
                onPress={prevPage}>
                <View>
                  <MaterialIcons
                    name="keyboard-arrow-left"
                    size={25}
                    color={CustomThemeColors.primary}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: CustomThemeColors.whiteBackgroundColor,
                }}>
                <View>
                  <Text
                    style={{
                      color: CustomThemeColors.primary,
                      fontWeight: 'bold',
                      fontSize: 18,
                      marginHorizontal: 10,
                    }}>
                    {currentPage} /{' '}
                    {Math.ceil(
                      (searchData.length > 0 ? searchData : filteredData)
                        .length / itemsPerPage,
                    )}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: CustomThemeColors.whiteBackgroundColor,
                }}
                onPress={nextPage}>
                <View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={25}
                    color={CustomThemeColors.primary}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: CustomThemeColors.whiteBackgroundColor,
                }}
                onPress={jumpToLastPage}>
                <View>
                  <MaterialIcons
                    name="keyboard-double-arrow-right"
                    size={25}
                    color={CustomThemeColors.primary}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isLoading && <LoadingIndicator message="Please wait..." />}
        {/* {refreshing && <LoadingIndicator message="Refreshing..."/>} */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AssetListMainScreen;
