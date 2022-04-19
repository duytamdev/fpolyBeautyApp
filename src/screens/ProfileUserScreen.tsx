import React, { useEffect, useState } from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity,
  TextInput, ToastAndroid,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { IUserinfo } from './AccountScreen';
import CONSTANTS, { COLORS } from '../constants';
import { onUpdateInfo } from '../services/UserService';
import { IImagePicker } from './CreatePinScreen';

export interface PropsUser{
  id: string;
  name: string;
  imagePicker?: string;
}

const Header = ({ name, imagePicker, id }:PropsUser) => {
  const navigation = useNavigation();

  const handleUploadImage = async () => {
    const formData = new FormData();
    let responseUrl = null;
    if (imagePicker != null) {
      // @ts-ignore
      formData.append('image', imagePicker);
      await fetch(`${CONSTANTS.HOST}/upload-image`, {
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
  const handleUpdateInfo = async () => {
    const avatarUrl = await handleUploadImage();
    const data = {
      id,
      name,
      avatarUrl,
    };
    console.log(data);
    await onUpdateInfo(data)
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={26} color="black" />
        <Text style={{ fontSize: 16, textAlign: 'center' }}>Thông tin cá nhân</Text>
        <TouchableOpacity onPress={handleUpdateInfo} style={styles.btnUpdate}>
          <Text style={{ color: '#fff' }}>Xong</Text>
        </TouchableOpacity>
      </View>
  );
};
const ProfileUserScreen = () => {
  const [userInfo, setUserInfo] = useState<IUserinfo>({} as IUserinfo);
  const [newName, setNewName] = useState('');
  // const [newAvatarUrl, setNewAvatarUrl] = useState<null|string>(null);
  const [imagePicker, setImagePicker] = useState<IImagePicker|undefined|null>(null);
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
  const getUserInfo = async () => {
    try {
      const value = await AsyncStorage.getItem(CONSTANTS.USER_INFO);
      if (value !== null) {
        // We have data!!
        setUserInfo(JSON.parse(value));
        setNewName(JSON.parse(value).name);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo().then();
  }, []);
  return (
        <View style={styles.container}>
            {
                userInfo && (
                    <>
                      <Header imagePicker={imagePicker} name={newName} id={userInfo.id}/>

                      <View style={styles.content}>
                        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                          <Image style={styles.avatar} source={{ uri: (imagePicker != null) ? imagePicker?.uri : userInfo.avatarUrl }}/>
                          <View style={{
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: 8,
                          }}>
                            <Text style={{ color: '#fff' }}>Cập nhật</Text>
                          </View>
                        </TouchableOpacity>
                        <View style={styles.textInputContainer}>
                          <Text>Tên</Text>
                          <TextInput
                              placeholder={'Vui lòng nhập tên'}
                              style={styles.textInput}
                              defaultValue={userInfo.name}
                              onChangeText={(v) => setNewName(v)}/>
                        </View>

                      </View>

                    </>

                )
            }

        </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textInputContainer: {
    paddingHorizontal: 8,

    width: '100%',
    marginTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnUpdate: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: '40%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  avatarContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 100,

  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
});
export default ProfileUserScreen;
