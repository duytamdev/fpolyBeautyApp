import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  RefreshControl,
} from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useDispatch } from 'react-redux';
import CONSTANTS, { COLORS } from '../constants';
import { onGetPinsByUser } from '../services/ProductService';
import MasonryList from '../components/HomeScreen/MasonryList';
import AccountLoader from '../components/AccountScreen/AccountLoader';
import { authActions } from '../redux/reducers/authSlice';

export interface IUserinfo {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
}

const AccountScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<IUserinfo>({} as IUserinfo);
  const [pinsOfUser, setPinsOfUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const hideMenu = () => setVisibleOptions(false);
  const showMenu = () => setVisibleOptions(true);

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const value = await AsyncStorage.getItem(CONSTANTS.USER_INFO);
      if (value !== null) {
        // We have data!!
        setUserInfo(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const getPinsUser = async (id:string) => {
    await onGetPinsByUser(id).then((res) => {
      setPinsOfUser(res.response);
    });
  };
  const onRefresh = () => {
    setRefreshing(true);
    getPinsUser(userInfo.id).then();
    getUserInfo().then();
    setRefreshing(false);
  };
  const goToUpdateScreen = () => {
    navigation.navigate('ProfileUser');
    hideMenu();
  };
  const handleLogout = () => {
    dispatch(authActions.logout());
    hideMenu();
  };

  useEffect(() => {
    getUserInfo().then();
  }, []);
  useEffect(() => {
    if (userInfo.id) {
      getPinsUser(userInfo.id).then();
    }
  }, [userInfo]);
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // do something
  //     getUserInfo().then();
  //   });
  //
  //   return unsubscribe;
  // }, [navigation]);
  useEffect(() => () => {
    setLoading(false);
  }, []);
  return (
       <>
         {loading && (<AccountLoader/>)}
         <ScrollView
             style={styles.root}
             showsVerticalScrollIndicator={false}
             refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
             }
         >
           {userInfo && (
               <>
                 <View
                     style={[
                       styles.container,
                       { paddingTop: insets.top + 18 },
                     ]}
                 >
                   <View style={styles.icons}>
                     <TouchableOpacity>
                       <Feather
                           style={styles.icon}
                           name="share"
                           size={24}
                           colors={'#000'}
                       />
                     </TouchableOpacity>
                     <Menu
                         visible={visibleOptions}
                         anchor={ <Entypo
                             onPress={showMenu}
                             style={styles.icon}
                             name={'dots-three-horizontal'}
                             color={'#000'}
                         /> }
                         onRequestClose={hideMenu}
                     >
                       <MenuItem onPress={goToUpdateScreen}>C???p nh???t th??ng tin</MenuItem>

                       <MenuDivider />
                       <MenuItem onPress={handleLogout}>
                         <Text style={{ color: COLORS.error }}>????ng xu???t</Text>
                       </MenuItem>
                     </Menu>
                   </View>
                   <Image
                       style={styles.image}
                       source={{ uri: userInfo.avatarUrl }}
                   />
                   <Text style={styles.title}>{userInfo.name}</Text>
                   <Text style={styles.subTitle}>
                     1200 followers | 50 followings
                   </Text>
                 </View>
                 {
                     pinsOfUser.length > 0 && (
                         <MasonryList pins={pinsOfUser} />
                     )
                 }
                 {/* {userInfo.pins && <MasonryList pins={userInfo.pins} />} */}
               </>
           )}
         </ScrollView>
       </>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    paddingHorizontal: 10,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingEnd: 10,
  },
  subTitle: {
    color: '#181818',
    fontWeight: '600',
    margin: 10,
  },
  image: {
    aspectRatio: 1,
    width: '40%',
    borderRadius: 200,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
export default AccountScreen;
