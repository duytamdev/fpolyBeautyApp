import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { onGetAllPins } from '../services/ProductService';
import Pin from '../components/Pin';
import MasonryList from '../components/HomeScreen/MasonryList';

const HomeScreen = () => {
  const [pinList, setPinList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPins = async () => {
    try {
      const pins = await onGetAllPins();
      setPinList(pins.response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPins().then();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    fetchPins().then(() => setRefreshing(false));
  };
  return (
        <View style={styles.container}>
          {
            pinList.length > 0 && (
                  <MasonryList pins={pinList} onRefresh={onRefresh} refreshing={refreshing} />
            )
          }
        </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default HomeScreen;
