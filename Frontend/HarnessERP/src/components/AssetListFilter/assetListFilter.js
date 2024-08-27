import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {API_URL} from '../ApiUrl';
import * as Keychain from 'react-native-keychain';
import {CustomThemeColors} from '../CustomThemeColors';

const AssetListFilter = ({
  visible,
  onClose,
  setSubFilteredData,
  filterOptionsAPI,
  filterCriteriaAPI,
  setSelectedItemsHistory,
  selectedItemsHistory,
}) => {
  const [itemUniqueKeys, setItemUniqueKeys] = useState(['']);
  const [filteredDataLocal, setFilteredDataLocal] = useState([]);
  const [listOfFilterOptionsMap, setListOfFilterOptionsMap] = useState([]);
  const [selectedOptionSets, setSelectedOptionSets] = useState(null);
  const [filterKeys, setFilterKeys] = useState(null);
  const [highlightSelection, setHighlightSelection] = useState([]);
  const [isSelectionValid, setIsSelectionValid] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    assetClassifications: [],
    assetTypes: [],
    subDepartments: [],
  });

  useEffect(() => {
    if (selectedItemsHistory) {
      setSelectedItems(selectedItemsHistory);
    }
  }, [selectedItemsHistory]);

  function convertJsonToKeyValuePairArray(jsonData) {
    const dataArray = [];

    for (let key in jsonData) {
      dataArray.push({
        title: key,
        data: jsonData[key],
      });
    }
    console.log('dataArray : ', dataArray);
    return dataArray;
  }

  const isItemSelected = (title, element) => {
    return selectedItems[title]?.includes(element);
  };

  useEffect(() => {
    const anySelected = Object.keys(selectedItems).some(
      key => selectedItems[key].length > 0,
    );
    setIsSelectionValid(anySelected);
  }, [selectedItems]);

  const toggleItemSelection = (title, element) => {
    const isSelected = selectedItems[title]?.includes(element);

    setSelectedItems(prev => ({
      ...prev,
      [title]: isSelected
        ? prev[title].filter(item => item !== element)
        : [...(prev[title] || []), element],
    }));

    setSelectedItemsHistory(prev => ({
      ...prev,
      [title]: isSelected
        ? prev[title].filter(item => item !== element)
        : [...(prev[title] || []), element],
    }));
  };

  useEffect(() => {
    fetchSubFilterDataByCriteria();
    console.log('Selected items have been updated:', selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    fetchSubFilterOptions();
  }, []);

  const fetchSubFilterOptions = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      const response = await fetch(`${API_URL}${filterOptionsAPI}`, {
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
      setListOfFilterOptionsMap(convertJsonToKeyValuePairArray(data));
      console.log("list filter-----"+convertJsonToKeyValuePairArray(data))
      console.log("list filter-----"+data)

      setFilterKeys(listOfFilterOptionsMap.map(item => item.title));
      console.log("list filter mapping_____"+listOfFilterOptionsMap.map(item => item.title))
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };


  const toTitleCase = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const fetchSubFilterDataByCriteria = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({service: 'jwt'});
      const token = credentials.password;
      const response = await fetch(`${API_URL}${filterCriteriaAPI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          classificationNames: selectedItems.assetClassifications,
          assetTypes: selectedItems.assetTypes,
          subDeptNames: selectedItems.subDepartments,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFilteredDataLocal(data);
      console.log('response: ', data);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const handleSubFilter = () => {
    setSubFilteredData(filteredDataLocal);
    console.log('filteredDataLocal: ', filteredDataLocal);
    console.log('selectedItems: ', selectedItems);
  };
  function makeReadable(word) {
    // Split camelCase or PascalCase string into words
    const words = word.replace(/([a-z])([A-Z])/g, '$1 $2').split(/(?=[A-Z])/);
  
    // Capitalize each word
    const readableWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
  
    // Join words with a space and return the transformed string
    return readableWords.join(' ');
  }


  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          <ScrollView>
            {listOfFilterOptionsMap.map((item, index) => (
              <View key={index}>
                <Text style={styles.filterTitle}>{makeReadable(item.title) }</Text>
                {/* <Text style={styles.filterTitle}>{item.title == "assetClassifications"?"Asset Classification":"hii"}</Text> */}

                <View style={styles.filterContainer}>
                  {item.data.map((element, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.filterItem,
                        isItemSelected(item.title, element) && styles.selectedItem,
                      ]}
                      onPress={() => {
                        toggleItemSelection(item.title, element);
                      }}>
                      <Text
                        style={{
                          color: isItemSelected(item.title, element) ? 'white' : 'grey',
                        }}>
                        {element}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                    handleSubFilter();
                    console.log('Filter Button Clicked');
                  

                }}>
                <Text style={styles.buttonText}>Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AssetListFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  filterTitle: {
    fontWeight: '400',
    marginBottom: 8,
    color:'black'

  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 5,
    paddingHorizontal: 5,
  },
  filterItem: {
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: CustomThemeColors.primary,
    borderRadius: 20,
    marginBottom: 10,
    marginRight: 5,
  },
  selectedItem: {
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: CustomThemeColors.primary,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: CustomThemeColors.primary,
    color: 'white',
    marginRight: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
