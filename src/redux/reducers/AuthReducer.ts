import AsyncStorage from '@react-native-async-storage/async-storage';
import TYPES from '../types';
import { IAuthAction } from '../actions/authAction';
import CONSTANTS from '../../constants';

const initialState = {
  isLogged: false,
};

const authReducer = async (state = initialState, action: IAuthAction) => {
  switch (action.type) {
    case TYPES.AUTH_LOGOUT:
      await AsyncStorage.setItem(CONSTANTS.IS_LOGIN, JSON.stringify(false));
      return {
        ...state,
        isLogged: action.payload,
      };
    case TYPES.AUTH_LOGIN:
      // save storage
      await AsyncStorage.setItem(CONSTANTS.IS_LOGIN, JSON.stringify(true));
      return {
        ...state,
        isLogged: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
