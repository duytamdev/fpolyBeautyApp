import React from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity, Alert,
} from 'react-native';
import { COLORS } from '../../constants';

interface Props {
    owner?:{
        name:string,
        avatarUrl:string,
    }
}
const SectionAuthor = ({ owner }:Props) => {
  const handleFollow = () => {
    Alert.alert('Hu hu!!', 'Tính năng đang được phát triển');
  };
  return (
        <View style={styles.authorContainer}>
            <View style={styles.authorSectionLeft}>
                <Image source={{ uri: owner?.avatarUrl }} style={styles.avatar} />
                <View style={styles.infoAuthor}>
                    <Text style={{ color: COLORS.black, fontWeight: '700', fontSize: 14 }} numberOfLines={2}>{owner.name}</Text>
                    <Text>1000 người theo dõi</Text>
                </View>
            </View>
            <View style={styles.authorSectionRight}>
                <TouchableOpacity onPress={handleFollow} style={styles.btnFollow}>
                    <Text style={{ color: COLORS.black, fontWeight: '700' }}>Theo dõi</Text>
                </TouchableOpacity>
            </View>
        </View>
  );
};
const styles = StyleSheet.create({
  btnFollow: {
    backgroundColor: COLORS.gray_border,
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoAuthor: {
    marginLeft: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorSectionRight: {
    marginLeft: 8,
  },
  authorSectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,

  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
export default SectionAuthor;
