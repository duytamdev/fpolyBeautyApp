import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { onGetAllPins } from '../services/ProductService';
import MasonryList from '../components/HomeScreen/MasonryList';
import MyContentLoader from '../components/HomeScreen/MyContentLoader';

const HomeScreen = () => {
  const [pinList, setPinList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchPins = async () => {
    try {
      const pins = await onGetAllPins();
      setPinList(pins.response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchPins().then(() => {
      setLoading(false);
    });
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    fetchPins().then(() => setRefreshing(false));
  };
  return (
        <View style={styles.container}>
           {
            loading ? (<MyContentLoader/>
            ) : (
                <>
                  {
                    // eslint-disable-next-line max-len
                    pinList.length > 0 && (<MasonryList pins={pinList} onRefresh={onRefresh} refreshing={refreshing} />)
                  }
                </>
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
