import axios from "axios";
import I18n from "react-native-i18n";
import store from "../store";
import { showSuccess, showError } from "../common";

export const API_ENDPOINT = "https://medicalbalsam.com.sa/api/";
const Api = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-localization": store.getState().lang.lang
  }
});
export const ACCESS_DATA = {
  accessKey: "MBALSAM545SD5w0303F2fxSchI5MA3lm",
  accessPassword: "MBg522sEMI22Z00rdl005raWM07medB"
};

export const addToFav = async productId => {
  try {
    const clientId = store.getState().auth.currentUser.id;
    const data = {
      ...ACCESS_DATA,
      clientId,
      productId
    };
    const res = await Api.post(`addtowishlist`, data);

    const response = validateRequst(res);
    if (response.isError) {
      if (response.data.status === 403) {
        showError(I18n.t("item-is-in-fav"));
        return;
      }
      showError(response.data.message);
      return;
    }
    showSuccess(I18n.t("added-to-fav"));
  } catch (error) {
    console.log(error, JSON.stringify(error));

    if (!store.getState().network.isConnected) {
      showError(I18n.t("no-internet-connection"));
    }
  }
};

export const removeFromFav = async (wishlistId, cb) => {
  try {
    const clientId = store.getState().auth.currentUser.id;
    const data = {
      ...ACCESS_DATA,
      clientId,
      wishlistId
    };
    console.log(data);
    const res = await Api.post(`removefromwishlist`, data);
    cb();
    const response = validateRequst(res);
    console.log(response);
    if (response.isError) {
      if (response.data.status === 403) {
        showSuccess(I18n.t("item-removed-from-fav"));
        return;
      }
      showError(response.data.message);
      return;
    }
    showSuccess(I18n.t("item-removed-from-fav"));
  } catch (error) {
    console.log(error, JSON.stringify(error));

    if (!store.getState().network.isConnected) {
      showError(I18n.t("no-internet-connection"));
    }
  }
};
export const validateRequst = response => {
  // Do something with response data
  const status = `${response.data.status}`;

  let error = false;
  if (!status.startsWith("2")) error = true;
  return { data: response.data, isError: error };
};

export default Api;
