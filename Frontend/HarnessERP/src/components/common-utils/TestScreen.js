import React from 'react';
import TableComponent from './TableComponent';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

const TestScreen = () => {
  return (
    <ScrollView>
      <View>
        <TableComponent />
        <TableComponent />
        <TableComponent />
        <TableComponent />
        {/* <TableComponent /> */}
        {/* <TableComponent /> */}
      </View>
    </ScrollView>
  );
};

export default TestScreen;
