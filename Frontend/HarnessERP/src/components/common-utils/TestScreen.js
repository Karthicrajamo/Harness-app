import React, { useEffect, useState } from 'react';
import SteinStore from 'stein-js-client';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const TestScreen = () => {
  const [dmy, setDmy] = useState([]);

  // Fetch data function
  const fetchData = async () => {
    const store = new SteinStore(
      'https://api.steinhq.com/v1/storages/66c32caf4d11fd04f01f65ed'
    );
    try {
      const response = await store.read('endpoint');
      setDmy(response);
      console.log(response); // Displaying the fetched data in the console
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // useEffect to trigger data fetch on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Data fetched from SteinHQ API:</Text>
        {/* Optionally render the data on the screen */}
        {dmy.map((item, index) => (
          <View key={index} style={styles.dataContainer}>
            <Text>{JSON.stringify(item)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default TestScreen;
