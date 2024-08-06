import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Slider from '@react-native-community/slider'; // Import slider component
import {CustomThemeColors} from '../CustomThemeColors';
import {CheckBox} from 'react-native-elements';
import {Button} from 'react-native';

const calculateColumnWidths = (data, scaleFactor) => {
  const widths = {};
  data.forEach(row => {
    Object.keys(row).forEach(key => {
      const length = String(row[key]).length;
      widths[key] = Math.max(widths[key] || 0, length);
    });
  });

  const screenWidth = Dimensions.get('window').width;
  const totalWidth = Object.keys(widths).reduce(
    (sum, key) => sum + widths[key],
    0,
  );
  const effectiveScaleFactor =
    totalWidth > 0 ? (screenWidth / totalWidth) * scaleFactor : 1;

  const scaledWidths = {};
  Object.keys(widths).forEach(key => {
    const scaledWidth = Math.max(80, widths[key] * effectiveScaleFactor); // Minimum width of 100
    scaledWidths[key] = isFinite(scaledWidth) ? scaledWidth : 100; // Ensure width is a finite number
  });

  return scaledWidths;
};

function makeReadable(word) {
  // Split camelCase or PascalCase string into words
  const words = word.replace(/([a-z])([A-Z])/g, '$1 $2').split(/(?=[A-Z])/);

  // Capitalize each word
  const readableWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));

  // Join words with a space and return the transformed string
  return readableWords.join(' ');
}

const TableComponent = ({initialData, onRowIndexSelect, noModel}) => {
  console.log('initialData from prop : ', initialData);
  const [data, setData] = useState(initialData);

  const [columnWidths, setColumnWidths] = useState({});
  const [calculated, setCalculated] = useState(false);
  const [sliderValue, setSliderValue] = useState(1); // Initial value for the slider (scale factor)
  const [tableIndex, setTableIndex] = useState(-1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModel, setIsModel] = useState(true);

  useEffect(() => {
    // if(data != [] ){
    const calculatedWidths = calculateColumnWidths(data, sliderValue);
    setColumnWidths(calculatedWidths);
    // }
    setIsModel(noModel);
    setCalculated(true);
  }, [
    data,
    sliderValue,
    tableIndex,
    selectedRows,
    isChecked,
    onRowIndexSelect,
    toggleRowSelection,
  ]); // Update when data or sliderValue changes

  const toggleRowSelection = rowIndex => {
    const updatedSelection = [...selectedRows];
    updatedSelection[rowIndex] = !updatedSelection[rowIndex];
    setSelectedRows(updatedSelection);
    setTableIndex(rowIndex);
    setSelectedRow(data[rowIndex]);
    setModalVisible(true);
    if (isModel == false) {
      onRowIndexSelect(rowIndex);
    }
    setTableIndex(rowIndex), console.log(selectedRows);
    setIsChecked(false);

    // handleData(rowIndex);
  };

  // const handleData = rowIndex => {
  //   console.log(isChecked);
  //   console.log(data);
  //   if (rowIndex == data.length && isChecked == false) {
  //     // for (let i = 0; i < rowIndex; i++) {
  //     setSelectedRow(data); // Example: appending data[i] to prevSel array
  //     // });
  //     setModalVisible(true);
  //   }
  // };

  if (!calculated) {
    return <Text>Loading...</Text>;
  }

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    setSelectedRows(prevIsChecked => {
      const newIsChecked = !prevIsChecked;
      setSelectedRows(new Array(data.length).fill(false));
      return newIsChecked;
    });
    setTableIndex(-1);
  };

  const columns = Object.keys(data[0]);

  const renderDetails = () => {
    const renderedDetails = [];
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      renderedDetails.push(
        <View key={i} style={styles.modalRow}>
          <Text style={styles.modalLabel}>{makeReadable(column)}:</Text>
          <Text style={styles.modalValue}>{String(selectedRow[column])}</Text>
        </View>,
      );
    }
    return renderedDetails;
  };

  return (
    <View style={{}}>
      {isModel && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Row Details</Text>
              {selectedRow && (
                <ScrollView style={{marginBottom: 20}}>
                  {columns.map((column, index) => (
                    <View key={index} style={styles.modalRow}>
                      <Text style={styles.modalLabel}>
                        {makeReadable(column)}:
                      </Text>
                      <Text style={styles.modalValue}>
                        {String(selectedRow[column])}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              )}
              <Button
                style={{marginTop: 40}}
                title="Close"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.selectSlide}>
        <View style={styles.sliderContainer}>
          <Slider
            style={{width: '50%', height: 40}}
            minimumValue={0} // Minimum scale factor
            maximumValue={10} // Maximum scale factor
            minimumTrackTintColor={CustomThemeColors.primary}
            maximumTrackTintColor={CustomThemeColors.primary}
            value={sliderValue}
            onValueChange={value => setSliderValue(value)}
          />
          <Text
            style={{
              backgroundColor: CustomThemeColors.fadedPrimary,
              maxWidth: 100,
              padding: 5,
              borderRadius: 10,
              fontSize: 12,
              color:'black'
            }}>
            {sliderValue.toFixed(0) * 10}%
          </Text>
        </View>
        <View style={styles.container}>
          <CheckBox
            title={!isChecked ? 'Select All' : 'Deselect All'}
            checked={isChecked}
            containerStyle={{
              backgroundColor: 'white',
              borderWidth: 0,
              borderRadius: 5,
              padding: 3,
            }}
            onPress={() => {
              handleCheckbox();
              console.log(data.length);
            }}
          />
        </View>
      </View>

      <ScrollView>
        <ScrollView horizontal>
          <View style={styles.table}>
            {/* TABLE COLUMN HEADER */}
            <View style={styles.headerRow}>
              {columns.map((column, index) => (
                <Text
                  key={index}
                  style={[
                    styles.headerCell,
                    {width: columnWidths[column], fontSize: 12,},
                  ]}>
                  {makeReadable(column)}
                </Text>
              ))}
            </View>
            {/* TABLE ROWS */}
            {data.map((row, rowIndex) => (
              <TouchableOpacity
                onPress={() => {
                  toggleRowSelection(rowIndex);
                }}>
                <View
                  key={rowIndex}
                  // style={
                  //   tableIndex === rowIndex
                  //     ? styles.activeSelect
                  //     : rowIndex % 2 === 0
                  //     ? styles.oddRow
                  //     : styles.evenRow
                  // }>
                  style={
                    isChecked === true
                      ? styles.activeSelect
                      : selectedRows[rowIndex] === false &&
                        tableIndex === rowIndex
                      ? styles.currentWithoutActiveSelect
                      : tableIndex === rowIndex
                      ? styles.currentSelect
                      : selectedRows[rowIndex] === true
                      ? styles.activeSelect
                      : rowIndex % 2 === 0
                      ? styles.oddRow
                      : styles.evenRow
                  }>
                  {columns.map((column, cellIndex) => (
                    <Text
                      key={cellIndex}
                      style={[
                        cellIndex % 2 === 0 ? styles.oddCell : styles.oddCell,
                        {width: columnWidths[column], fontSize: 12},
                      ]}>
                      {String(row[column])}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '95%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'

  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  modalLabel: {
    fontWeight: 'bold',
    color:'black'
  },
  modalValue: {
    marginLeft: 30,
    marginRight: 5,
    color:'black'
  },

  activeSelect: {
    backgroundColor: '#A1EEBD',
    borderRadius: 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 5,
  },
  currentSelect: {
    backgroundColor: '#A1EEBD',
    borderWidth: 1,

    // backgroundColor: CustomThemeColors.primary,
    borderRadius: 5,
    borderColor: '#73BBA3',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  currentWithoutActiveSelect: {
    // backgroundColor: 'transparent',  // Set the background color to transparent
    borderColor: '#73BBA3',
    borderWidth: 1,
    // backgroundColor: CustomThemeColors.primary,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    borderRadius: 18,
    marginLeft: 10,
    borderWidth: 0,
  },
  headerRow: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    flexDirection: 'row',
    backgroundColor: CustomThemeColors.primary,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: 'white',
    // borderTopEndRadius: 15,
  },
  oddRow: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 5,
  },
  evenRow: {
    flexDirection: 'row',
    backgroundColor: CustomThemeColors.fadedPrimary,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    // borderBottomEndRadius:18
    paddingHorizontal: 5,
  },

  headerCell: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: CustomThemeColors.primary,
    // borderRightWidth: 1,
    // borderColor: '#ddd',
    fontWeight: 'bold',
    // borderRadius: 10,
    color: 'white',
  },

  oddCell: {
    paddingVertical: 3,
    // borderWidth: 1,
    color:'black',


    borderColor: '#ddd',
    borderEndStartRadius: 5,
    borderEndEndRadius: 5,
  },
  evenCell: {
    paddingVertical: 3,
    // borderWidth: 1,
    backgroundColor: 'lightgrey',
    borderEndStartRadius: 5,
    borderEndEndRadius: 5,
    borderColor: '#ddd',
  },
  sliderContainer: {
    marginHorizontal: 20,
    // width:'100',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // marginTop: 10,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  selectSlide: {
    // flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    // width: 300,
    // backgroundColor: 'grey',
    justifyContent: 'space-between',
    // alignContent: 'space-between',
    // alignItems: 'center',
  },
});

export default TableComponent;
