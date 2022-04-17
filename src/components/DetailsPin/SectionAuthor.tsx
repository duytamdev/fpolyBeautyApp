import React from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../constants';

const SectionAuthor = () => (
        <View style={styles.authorContainer}>
            <View style={styles.authorSectionLeft}>
                <Image source={{ uri: 'https://i.pravatar.cc/300' }} style={styles.avatar} />
                <View style={styles.infoAuthor}>
                    <Text style={{ color: COLORS.black, fontWeight: '700', fontSize: 14 }} numberOfLines={2}>Nguyen Duy Tam</Text>
                    <Text>1000 người theo dõi</Text>
                </View>
            </View>
            <View style={styles.authorSectionRight}>
                <TouchableOpacity style={styles.btnFollow}>
                    <Text style={{ color: COLORS.black, fontWeight: '700' }}>Theo dõi</Text>
                </TouchableOpacity>
            </View>
        </View>
);
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