import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  View, ActivityIndicator,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ProgressDialog from 'react-native-progress-dialog';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { onGetPinById } from '../services/ProductService';
import { COLORS } from '../constants';
import SectionAuthor from '../components/DetailsPin/SectionAuthor';
import SectionInfo from '../components/DetailsPin/SectionInfo';

interface Pin{
  _id:string;
  title?:string;
  description?:string;
  imageUrl:string;
  owner:{
    avatarUrl:string;
    name:string;
  }
}
const DetailsPin = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const pinId = route.params?._id;
  // const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [pin, setPin] = useState<Pin>({} as Pin);
  const [ratio, setRatio] = useState(1);
  const insets = useSafeAreaInsets();
  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    }
  };
  const handleDownloadImage = async () => {
    const uri = pin.imageUrl;
    await getPermissionAsync();
    setLoadingDownload(true);
    try {
      const localuri = await FileSystem.downloadAsync(
        pin.imageUrl,
        `${FileSystem.documentDirectory}${pin._id}.jpg`,
      );
      const asset = await MediaLibrary.createAssetAsync(localuri.uri);
      const album = await MediaLibrary.getAlbumAsync('Download');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Download', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (e) {
      console.log(e);
    }
    setLoadingDownload(false);
    Alert.alert('H??nh ???nh ???? ???????c t???i v??? th??nh c??ng');
  };
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    setLoading(true);
    onGetPinById(pinId).then((res) => {
      setPin(res.response);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (pin.imageUrl) {
      Image.getSize(pin.imageUrl, (width, height) => setRatio(width / height));
    }
  }, [pin.imageUrl]);

  useEffect(() => () => {
    setLoadingDownload(false);
  }, []);

  return (
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <ProgressDialog loaderColor={COLORS.primary} label={'??ang t???i...'} visible={loadingDownload} />
        {
          loading ? (<View style={{
            height: '100%', justifyContent: 'center', alignItems: 'center',
          }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
              </View>)
            : (
                  <>
                    {pin && (
                        <ScrollView style={styles.container}>
                          <View style={{ position: 'relative' }}>
                            <Image
                                source={{ uri: pin.imageUrl }}
                                style={[styles.image, { aspectRatio: ratio }]}
                            />
                            <TouchableOpacity
                                onPress={handleDownloadImage}
                                style={[styles.btnDownload, { top: insets.top + 20 }]}
                            >
                              <Feather name="download" size={24} color="white" />
                            </TouchableOpacity>
                          </View>
                          {pin.owner && <SectionAuthor owner={{ name: pin.owner.name, avatarUrl: pin.owner.avatarUrl }}/>}
                          <SectionInfo title={pin.title} description={pin.description}/>
                        </ScrollView>
                    )}
                  </>
            )
        }

        {/* absolute buttons */}
        <TouchableOpacity
            style={[styles.preBack, { top: insets.top + 20 }]}
            onPress={goBack}
        >
          <Ionicons name={'chevron-back'} color={'#fff'} size={36} />
        </TouchableOpacity>

      </SafeAreaView>
  );
};
const styles = StyleSheet.create({

  contentContainer: {
    paddingHorizontal: 20,
  },
  btnDownload: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
    width: 36,
    height: 36,
    position: 'absolute',
    right: 20,
  },
  preBack: {
    position: 'absolute',
    left: 20,
  },
  title: {
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 35,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: '100%',
  },
});
export default DetailsPin;
