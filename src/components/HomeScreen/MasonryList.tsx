import React from 'react';
import {
  RefreshControl,
  Text, View, StyleSheet, useWindowDimensions, ScrollView,
} from 'react-native';
import Pin from '../Pin';

interface IMasonryList {
    pins: {
        id: string;
        imageUrl: string;
        title: string;
    }[];
    refreshing?: boolean;
    onRefresh?: () => void;
}
export interface IPin {
    id: string;
    imageUrl: string;
    title: string;
}

const MasonryList = ({ pins, refreshing, onRefresh }: IMasonryList) => {
  const WIDTH = useWindowDimensions().width;
  // get num Columns with different width device
  const numColumns = Math.ceil(WIDTH / 200);
  return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.container}>
                {Array.from(Array(numColumns)).map((column, columnIndex) => (
                    <View style={styles.column} key={`column_${columnIndex}`}>
                        {pins
                          .filter((item: any, index: number) => index % numColumns === columnIndex)
                          .map((pin) => (
                                <Pin pin={pin} key={pin.id} />
                          ))}
                    </View>
                ))}
            </View>
        </ScrollView>
  );
};
const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});
export default MasonryList;
