import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  Text, View, StyleSheet, Image, Button, TextInput, Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { onSubmitPin } from '../services/ProductService';
import CONSTANTS, { COLORS } from '../constants';
import MyButton from '../components/AuthScreen/MyButton';

// eslint-disable-next-line no-redeclare
interface ImagePicker{
  uri: string,
  name: string,
  type: 'image/jpg',
}
interface Pin{
  title: string,
  imageUri: string,
  description: string,
}
const CreatePinScreen = () => {
  const navigation = useNavigation();
  const [imagePicker, setImagePicker] = useState<ImagePicker|undefined>(undefined);
  const [pin, setPin] = useState<Pin>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImagePicker({
        uri: result.uri,
        name: result.uri.slice(result.uri.lastIndexOf('/') + 1, result.uri.lastIndexOf('.jpg')),
        type: 'image/jpg',
      });
    }
  };
  const handleUploadImage = async () => {
    const formData = new FormData();
    let responseUrl = null;
    if (imagePicker != null) {
      // @ts-ignore
      formData.append('image', imagePicker);
      await fetch('http://192.168.1.7:3000/api/upload-image', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          responseUrl = res.response.secure_url;
        })
        .catch((e) => {
          console.log('error', e);
        });
    }
    return responseUrl;
  };
  const handleSubmitPin = async () => {
    const imageUrl = await handleUploadImage();
    const owner = await AsyncStorage.getItem(CONSTANTS.ID_USER);
    if (imageUrl == null || owner == null) {
      Alert.alert('Error', 'Please add a picture');
      return;
    }
    const res = await onSubmitPin({
      title,
      imageUrl,
      description,
      owner,
    });
    if (!res.error) {
      navigation.navigate('Home');
      handleClearForm();
    } else {
      Alert.alert('Error', res.error);
    }
  };
  const handleClearForm = () => {
    setImagePicker(undefined);
    setPin(undefined);
    setTitle('');
    setDescription('');
  };
  return (
        <View style={styles.container}>
            {/* <Button title={'Select image'} onPress={pickImage}/> */}
            {/* { */}
            {/*    imagePicker */}
            {/*    && <> */}
            {/*      <Image style={styles.image} source={{ uri: imagePicker.uri }}/> */}
            {/*      <View style={styles.textInput}> */}
            {/*        <TextInput value={title} onChangeText={(value) => setTitle(value)} placeholder={'Title'}/> */}
            {/*      </View> */}
            {/*      <View style={styles.textInput}> */}
            {/*        <TextInput value={description} onChangeText={(value) => setDescription(value)} placeholder={'Description'}/> */}
            {/*      </View> */}
            {/*      <Button title={'Submit pin'} onPress={handleSubmitPin}/> */}
            {/*    </> */}
            {/* } */}
          <View style={styles.imagePickerContainer}>
            <Image style={styles.image} source={{ uri: imagePicker ? imagePicker.uri : 'https://c03uk1vc.cloudimg.io/width/600/q60/https://static.wapmaker.net/5bc74209fce1810870a2ca73/2/trang%20phong%20thuy.jpg' }}/>
            <TouchableOpacity onPress={pickImage} style={styles.btnPickImage}>
              <Text numberOfLines={2} style={styles.textPickImage}>{imagePicker ? 'Chọn ảnh khác' : 'Lựa chọn\n hình ảnh'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text>Tiêu đề</Text>
                  <TextInput value={title} onChangeText={(value) => setTitle(value)} placeholder={'Đặt tiêu đề cho hình ảnh của bạn'} style={styles.textInput}/>
              </View>
            <View style={styles.inputContainer}>
              <Text>Mô tả</Text>
              <TextInput multiline={true} value={description} onChangeText={(value) => setDescription(value)} placeholder={'Đặt mô tả cho hình ảnh của bạn'} style={styles.textInput}/>
            </View>
            <MyButton style={styles.btnSubmit} title={'Thêm'} onPress={handleSubmitPin}/>
          </View>

        </View>
  );
};

const styles = StyleSheet.create({
  btnSubmit: {
    marginTop: 20,
    borderRadius: 24,
  },
  inputContainer: {
    marginTop: 8,
  },
  formContainer: {
    marginTop: 8,
  },
  textPickImage: {
    fontSize: 12,
    color: COLORS.primary,
  },
  btnPickImage: {
    alignItems: 'center',
    flexGrow: 1,
    marginLeft: 8,
  },
  image: {
    width: '72%',
    aspectRatio: 3 / 4,
    borderRadius: 8,
  },
  imagePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontWeight: 'bold',
    fontSize: 18,
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
});
export default CreatePinScreen;
