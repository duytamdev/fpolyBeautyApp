import React, { useState } from 'react';
import {
  Text, View, StyleSheet, TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { COLORS } from '../../constants';

interface Props {
  label?: string;
  isPassword?: boolean;
  styleContainer?: any;
}
const MyInput = (props:Props) => {
  const {
    label, isPassword, styleContainer, ...rest
  } = props;
  const [isSecurity, setIsSecurity] = useState(true);

  return (
        <View style={[styles.container, styleContainer]}>
            <Text>{label}</Text>
           <View style={styles.inputContainer}>
            <TextInput secureTextEntry={isPassword ? isSecurity : false} style={styles.textInput} {...rest}/>
             {isPassword && <FontAwesome onPress={() => setIsSecurity(!isSecurity)} name={isSecurity ? 'eye' : 'eye-slash'} size={24} color={'rgba(25,59,103,0.35)'} />
             }
           </View>
        </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: '90%',
    lineHeight: 22,
    fontSize: 14,
    marginRight: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 4,
    height: 57,
    marginTop: 5,
    borderWidth: 1,
    borderColor: COLORS.gray_border,
  },
  container: {
    backgroundColor: '#fff',
    marginTop: 16,
  },
});
export default MyInput;
