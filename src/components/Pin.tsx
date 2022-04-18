import React, { useEffect, useState } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { IPin } from './HomeScreen/MasonryList';

const Pin = (props: { pin: IPin }) => {
  const { imageUrl, title, _id } = props.pin;
  const [isLiked, setIsLiked] = useState(false);
  const [ratio, setRatio] = useState(1);
  const navigation = useNavigation();
  useEffect(() => {
    if (imageUrl) {
      Image.getSize(imageUrl, (width, height) => setRatio(width / height));
    }
  }, [imageUrl]);

  const onLike = () => {
    setIsLiked(!isLiked);
  };
  const goToPinPage = () => {
    // @ts-ignore
    navigation.navigate('DetailsPin', { _id });
  };
  return (
        <TouchableOpacity onPress={goToPinPage} style={styles.pin}>
            <View>
                <Image
                    style={[styles.image, { aspectRatio: ratio }]}
                    source={{ uri: imageUrl }}
                />
                <TouchableOpacity style={styles.heartBtn} onPress={onLike}>
                    <AntDesign
                        name={isLiked ? 'heart' : 'hearto'}
                        size={16}
                        color={isLiked ? '#ec2222' : '#000'}
                    />
                </TouchableOpacity>
            </View>
            {title && (
                <Text numberOfLines={3} style={styles.title}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  heartBtn: {
    backgroundColor: '#d3cfd4',
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 45,
  },
  pin: {
    width: '100%',
    padding: 4,
  },
  image: {
    width: '100%',
    borderRadius: 15,
    aspectRatio: 1 / 2,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    margin: 5,
    color: '#181818',
  },
});
export default Pin;
