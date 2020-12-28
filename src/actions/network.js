import NetInfo from "@react-native-community/netinfo";

import { SET_INTERNET_CONNECTION } from './types';

export async function initInternetConnection(dispatch) {
  NetInfo.isConnected.addEventListener('connectionChange', isConnected => {
    dispatch({ type: SET_INTERNET_CONNECTION, payload: isConnected });
  });

  const isConnected = await NetInfo.isConnected.fetch();
  dispatch({ type: SET_INTERNET_CONNECTION, payload: isConnected });
}
