import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet,ScrollView } from 'react-native';
import styles from './assetListFilterStyles';
import API_URL from '../ApiUrl';
import * as Keychain from 'react-native-keychain';
const AssetListFilter = ({ visible, onClose }) => {

  useEffect(() => {
    fetchAssetClassifications();
    fetchAssetTypes();
    fetchAssetSubDepartments();

  }, [])
  const [selectedOption, setSelectedOption] = useState(null);

 //Asset Classification Code  ----------------------------------------------------------------------------------------------------------------- 


  const [selectedOptionsClassify, setSelectedOptionsClassify] = useState([]);
  const [showSubOptionsClassify, setShowSubOptionsClassify] = useState(false);
  const [selectedSubOptionsClassify, setSelectedSubOptionsClassify] = useState([]);

  const [classifications, setClassifications] = useState([]);
  
  const fetchAssetClassifications = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({ service: 'jwt' });
      const token = credentials.password;
      console.log("token with berarer : ", `${token}`);
      // Replace with your API endpoint to fetch locations
      const response = await fetch(`${API_URL}/api/assetList/distinctAssetClassifications`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("fetched all classifications : ===============>>>>>>>>>> ", data);
      setClassifications(data);
    }
    catch (error) {
      console.error('Error fetching status:', error);
    }
  };
  const handleOptionSelectClassify = (option) => {
    setSelectedOption(option === selectedOption ? null : option);

    // Toggle selection of option
    if (selectedOptionsClassify.includes(option)) {
      setSelectedOptionsClassify(selectedOptionsClassify.filter((item) => item !== option));
    } else {
      setSelectedOptionsClassify([selectedOptionsClassify, option]);
    }

    // If "Asset Classification" is selected, show sub-options
    if (option === 'Asset Classification') {
      setShowSubOptionsClassify(!showSubOptionsClassify);
    }
  };

  const handleSubOptionSelectClassify = (option) => {

    // Toggle selection of sub-option
    if (selectedSubOptionsClassify.includes(option)) {
      setSelectedSubOptionsClassify(selectedSubOptionsClassify.filter((item) => item !== option));
    } else {
      setSelectedSubOptionsClassify([...selectedSubOptionsClassify, option]);
    }
  };

  const renderCheckboxClassify = (option) => {
    return (
      <TouchableOpacity
        style={[styles.checkbox, selectedSubOptionsClassify.includes(option) && styles.checked]}
        onPress={() => handleSubOptionSelectClassify(option)}
      >
        {selectedSubOptionsClassify.includes(option) && <View style={styles.checkmark} />}
      </TouchableOpacity>
    );
  };

  //Asset Type Code  --------------------------------------------------------------------------------------------------------------------- 
  
  const [selectedOptionsType, setSelectedOptionsType] = useState([]);
  const [showSubOptionsType, setShowSubOptionsType] = useState(false);
  const [selectedSubOptionsType, setSelectedSubOptionsType] = useState([]);

  const [assetTypes, setAssetTypes] = useState([]);

  const fetchAssetTypes = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({ service: 'jwt' });
      const token = credentials.password;
      console.log("token with berarer : ", `${token}`);
      // Replace with your API endpoint to fetch locations
      const response = await fetch(`${API_URL}/api/assetList/distinctAssetTypes`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("fetched all classifications : ===============>>>>>>>>>> ", data);
      setAssetTypes(data);
    }
    catch (error) {
      console.error('Error fetching status:', error);
    }
  };
  const handleOptionSelectType = (option) => {
    setSelectedOption(option === selectedOption ? null : option);

    // Toggle selection of option
    if (selectedOptionsType.includes(option)) {
      setSelectedOptionsType(selectedOptionsType.filter((item) => item !== option));
    } else {
      setSelectedOptionsType([...selectedOptionsType, option]);
    }

    // If "Asset Type" is selected, show sub-options
    if (option === 'Asset Type') {
      setShowSubOptionsType(!showSubOptionsType);
    }
  };

  const handleSubOptionSelectType = (option) => {
    // Toggle selection of sub-option
    if (selectedSubOptionsType.includes(option)) {
      setSelectedSubOptionsType(selectedSubOptionsType.filter((item) => item !== option));
    } else {
      setSelectedSubOptionsType([...selectedSubOptionsType, option]);
    }
  };

  const renderCheckboxType = (option) => {
    return (
      <TouchableOpacity
        style={[styles.checkbox, selectedSubOptionsType.includes(option) && styles.checked]}
        onPress={() => handleSubOptionSelectType(option)}
      >
        {selectedSubOptionsType.includes(option) && <View style={styles.checkmark} />}
      </TouchableOpacity>
    );
  };

//Asset Department Code  -------------------------------------------------------------------------------------------------------------------- 

const [selectedOptionsDept, setSelectedOptionsDept] = useState([]);
const [showSubOptionsDept, setShowSubOptionsDept] = useState(false);
const [selectedSubOptionsDept, setSelectedSubOptionsDept] = useState([]);
const [filterButtonVisible, setFilterButtonVisible] = useState(true);

const [assetSubDepartments, setassetSubDepartments] = useState([])
const fetchAssetSubDepartments = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: 'jwt' });
    const token = credentials.password;
    console.log("token with berarer : ", `${token}`);
    // Replace with your API endpoint to fetch locations
    const response = await fetch(`${API_URL}/api/assetList/distinctAssetTypes`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("fetched all classifications : ===============>>>>>>>>>> ", data);
    setassetSubDepartments(data);
  }
  catch (error) {
    console.error('Error fetching status:', error);
  }
};

const handleOptionSelectDept = (option) => {
  setSelectedOption(option === selectedOption ? null : option);

  // Toggle selection of option
  if (selectedOptionsDept.includes(option)) {
    setSelectedOptionsDept(selectedOptionsDept.filter((item) => item !== option));
  } else {
    setSelectedOptionsDept([...selectedOptionsDept, option]);
  }

  // If "Asset Department" is selected, show sub-options
  if (option === 'Sub Department') {
    setShowSubOptionsDept(!showSubOptionsDept);
  }
};

const handleSubOptionSelectDept = (option) => {
  // Toggle selection of sub-option

  if (selectedSubOptionsDept.includes(option)) {
    setSelectedSubOptionsDept(selectedSubOptionsDept.filter((item) => item !== option));
  } else {
    setSelectedSubOptionsDept([...selectedSubOptionsDept, option]);
  }
};

const renderCheckboxDept = (option) => {
  
  return (
    
    <TouchableOpacity
      style={[styles.checkbox, selectedSubOptionsDept.includes(option) && styles.checked]}
      onPress={() => handleSubOptionSelectDept(option)}
    >
      {selectedSubOptionsDept.includes(option) && <View style={styles.checkmark} />}
    </TouchableOpacity>
  );
};  

// Retrun Starts Here ------------------------------------------------------------------------------------------------------------------
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
        <ScrollView>
          <View style={styles.titles}>
            <Text style={styles.filtertitle}                  >Filters</Text>
            <Text style={styles.closetitle} onPress={onClose} >Close  </Text>
          </View>

{/* Asset  Classification  -------------------------------------------------------------------------------------------------------*/ }

          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.option, showSubOptionsClassify && styles.activeOption]}
              onPress={() => handleOptionSelectClassify('Asset Classification')}
            >
              <Text>Asset Classification</Text>
            </TouchableOpacity>
            {showSubOptionsClassify && (
              <View style={styles.subOptionsContainer}>
                
                {classifications.map((classification) =>(
                  <TouchableOpacity style={styles.subOption} onPress={() => handleSubOptionSelectClassify(classification)}>
                {renderCheckboxClassify(classification)}  
                  <Text>{classification}</Text>
                </TouchableOpacity>
                ))}
                

              </View>
            )}
          </View>

{/* Asset  Type --------------------------------------------------------------------------------------------------------------------- */}
         
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.option, showSubOptionsType && styles.activeOption]}
              onPress={() => handleOptionSelectType('Asset Type')}
            >
              <Text>Asset Type</Text>
            </TouchableOpacity>
            {showSubOptionsType && (
              <View style={styles.subOptionsContainer}>                
                {assetTypes.map((assetType) => (
                  <TouchableOpacity style={styles.subOption} onPress={() => handleSubOptionSelectType(assetType)}>
                  {renderCheckboxType(assetType)}
                    <Text>{assetType}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

{/* Sub  Department ----------------------------------------------------------------------------------------------------------------- */}
        
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.option, showSubOptionsDept && styles.activeOption]}
              onPress={() => handleOptionSelectDept('Sub Department')}
            >
              <Text>Sub Department</Text>
            </TouchableOpacity>
            {showSubOptionsDept && (
              <View style={styles.subOptionsContainer}>
                {assetSubDepartments.map((assetSubDepartment) => (
                  <TouchableOpacity style={styles.subOption} onPress={() => handleSubOptionSelectDept(assetSubDepartment)}>
                {renderCheckboxDept(assetSubDepartment)}
                  <Text>{assetSubDepartment}</Text>
                </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
{/* Add more filter options as needed */}

{/* Filter and cancel Button -------------------------------------------------------------------------------------------------------- */}
         
          <View style={styles.buttons}>
          {selectedOption && (
            <TouchableOpacity style={styles.button} onPress={() => console.log('Filter')}>
              <Text style={styles.buttontext}>Filter</Text>
            </TouchableOpacity>
             )}
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttontext}>Cancel </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};


export default AssetListFilter;
