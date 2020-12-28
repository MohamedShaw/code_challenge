import I18n from "react-native-i18n";
import AsyncStorage from "@react-native-community/async-storage";
import { AppNavigation, showError } from "../common";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_RESET_ERROR,
  LOGOUT,
  CLEAR_CART,
} from "./types";
import Api, {
  API_ENDPOINT,
  ACCESS_DATA,
  validateRequst,
} from "../utils/Network";
import store from "../store";
import { updateCart } from "./cartAction";

export const signIn = (values, setSubmitting) => async (dispatch, getState) => {
  try {
    console.log("onsign in", values);

    const res = await Api.post(`clientlogin`, values);

    const response = validateRequst(res);

    if (response.isError) {
      setSubmitting(false);
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError"),
      });
      showError(response.data.message);
      return;
    }
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
    await getCart()(dispatch, getState);
    // await AsyncStorage.setItem("@CART", "");
    // await AsyncStorage.setItem("@TOTAL", "");
    // await AsyncStorage.setItem("@COUNTER", "");

    await AsyncStorage.setItem(
      "@CurrentUser",
      JSON.stringify(response.data.data)
    );
    setSubmitting(false);

    AppNavigation.init("MAIN_STACK", {
      rtl: store.getState().lang.rtl,
      name: "home",
      sideMenu: "menu",
    });
  } catch (error) {
    console.log("error", JSON.parse(JSON.stringify(error)));

    setSubmitting(false);

    if (!error.response) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError"),
      });
    }
  }
};

export const signUp = (values, setSubmitting) => async (dispatch, getState) => {
  try {
    console.log(
      "*********************************************" + JSON.stringify(values)
    );

    const res = await Api.post(`clientregister`, values);

    console.log("^^^^^^^^^^^", res);

    const response = validateRequst(res);
    console.log("response ***** --->>>>", response.data.data);

    if (response.isError) {
      setSubmitting(false);
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError"),
      });
      showError(response.data.message);
      return;
    } // success
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
    await getCart()(dispatch, getState);

    await AsyncStorage.setItem(
      "@CurrentUser",
      JSON.stringify(response.data.data)
    );

    AppNavigation.init("MAIN_STACK", {
      rtl: store.getState().lang.rtl,
      name: "home",
      sideMenu: "menu",
    });
  } catch (error) {
    console.log("error -->>", error.response);
    setSubmitting(false);

    if (!error.response) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError"),
      });
    } else if (error.response && error.response.data.email) {
      dispatch({
        type: LOGIN_FAIL,
        payload: "البريد الاكتروني مستخدم من قبل",
      });
    }
  }
};

export const autoLogin = async (dispatch, getState) => {
  let user = "";
  try {
    user = await AsyncStorage.getItem("@CurrentUser");
    user = JSON.parse(user);
    console.log(user);

    // getCart()(dispatch, getState);
    await AsyncStorage.setItem("@CART", "");
    await AsyncStorage.setItem("@TOTAL", "");
    await AsyncStorage.setItem("@COUNTER", "");

    if (user) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });

      return { exist: true };
    }
  } catch (error) {
    console.log("AsyncStorage#getItem error: ", error.message);
    return false;
  }
  return { exist: false };
};

export const logout = (id) => async (dispatch, getState) => {
  await AsyncStorage.setItem("@CurrentUser", "");

  await AsyncStorage.setItem("@CART", "");
  await AsyncStorage.setItem("@TOTAL", "");
  await AsyncStorage.setItem("@COUNTER", "");
  dispatch({ type: CLEAR_CART });
  AppNavigation.init("MAIN_STACK", {
    rtl: store.getState().lang.rtl,
    name: "home",
    sideMenu: "menu",
  });
  setTimeout(() => dispatch({ type: LOGOUT }), 1500);
};

export const getCart = () => async (dispatch, getState) => {
  console.log("------------------------->>>>>>");

  const { cart } = store.getState().cart;
  console.log("cart---->>>>", cart);

  const { cart_sub_total } = store.getState().cart;
  const { cart_total } = store.getState().cart;
  if (cart !== null && cart.length !== 0) {
    const ids = cart.map((item) => item.product_id);
    console.log("ids ==>", ids);

    const productWithQuantity = cart.map((item) => {
      const data = {
        product_id: item.product_id,
        quantity: item.items_count,
      };
      return data;
    });
    console.log("productWithQuantity", productWithQuantity);

    try {
      const res = await Api.post(
        `carts?accessKey=${ACCESS_DATA.accessKey}&accessPassword=${ACCESS_DATA.accessPassword}`,
        {
          clientId: store.getState().auth.currentUser.id,
          products: productWithQuantity,
        }
      );

      console.log("in res--->", res);

      const response = validateRequst(res);

      const { cart_total, items_count, cart_sub_total } = response.data.data;
      updateCart({ cart_total, items_count, cart_sub_total })(
        dispatch,
        getState
      );
      if (response.isError) {
        showError(response.data.message);
        return;
      }
    } catch (error) {}

    // for (let index = 0; index < ids.length; index++) {
    //   console.log("in For");

    //   try {
    //     const res = await Api.post(
    //       `addtocart?accessKey=${ACCESS_DATA.accessKey}&accessPassword=${ACCESS_DATA.accessPassword}`,
    //       {
    //         clientId: store.getState().auth.currentUser.id,
    //         productId: ids[index],
    //       }
    //     );

    //     console.log("in res--->", res);

    //     const response = validateRequst(res);

    //     const { cart_total, items_count, cart_sub_total } = response.data.data;
    //     updateCart({ cart_total, items_count, cart_sub_total })(
    //       dispatch,
    //       getState
    //     );
    //     if (response.isError) {
    //       showError(response.data.message);
    //       return;
    //     }
    //   } catch (error) {}
    // }
    console.log("remove cart");

    await AsyncStorage.setItem("@CART", "");
  }
};
