import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  Text, View, StyleSheet, Image, Button, TextInput,
} from 'react-native';

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
    if (imagePicker != null) {
      // @ts-ignore
      formData.append('image', imagePicker);
      await fetch('http://192.168.1.4:3000/api/upload-image', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log('ok', res);
        })
        .catch((e) => {
          console.log('error', e);
        });
    }
  };
  return (
        <View style={styles.container}>
            <Text>Hello world</Text>
            <Button title={'Select image'} onPress={pickImage}/>
            {
                imagePicker
                && <>
                  <Image style={styles.image} source={{ uri: imagePicker.uri }}/>
                  <View style={styles.textInput}>
                    <TextInput value={title} onChangeText={(value) => setTitle(value)} placeholder={'Title'}/>
                  </View>
                  <View style={styles.textInput}>
                    <TextInput value={description} onChangeText={(value) => setDescription(value)} placeholder={'Description'}/>
                  </View>
                  <Button title={'Submit pin'} onPress={handleUploadImage}/>
                </>
            }

        </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 48,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginVertical: 8,
    borderColor: '#000',
  },
  image: {
    width: 450,
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
export default CreatePinScreen;
