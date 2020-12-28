import { Navigation } from "react-native-navigation";
import { Platform, StatusBar } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import store from "./store";
import registerScreens from "./screens";
import {
  getColors,
  AppNavigation as nv,
  registerCustomIconType,
} from "./common";
import icoMoonConfig from "./common/utils/selection.json";
import { initInternetConnection } from "./actions/network";
import { initLang, setLang } from "./actions/lang";
import colors from "./common/defaults/colors";
import { autoLogin, getCart } from "./actions/AuthActions";
import {
  checkLocationPermission,
  initBackgroundGeolocation,
} from "./actions/location";

import SplashScreen from "react-native-splash-screen";

export const startApp = () => {
  registerCustomIconType("custom", icoMoonConfig);
  registerScreens();

  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        backgroundColor: colors.statusBar,
        style: "dark",
      },
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
      layout: {
        backgroundColor: "white",
        orientation: ["portrait"],
      },
      animations: {
        push: {
          waitForRender: false,
        },
        showModal: {
          waitForRender: false,
        },
      },
      bottomTabs: {
        visible: false,
        animate: false,
      },
    });
    await initLang("en", false)(store.dispatch);
    initInternetConnection(store.dispatch);

    // checkLocationPermission(true, () => {
    //   initBackgroundGeolocation(store.dispatch, store.getState);
    // });

    let cart = "";
    let total = 0;
    let counter = 0;
    // AsyncStorage.setItem("@CART", "");
    // AsyncStorage.setItem("@TOTAL", "");
    // AsyncStorage.setItem("@COUNTER", "");

    try {
      cart = await AsyncStorage.getItem("@CART");
      console.log("*******", cart);

      counter = await AsyncStorage.getItem("@COUNTER");
    } catch (error) {
      console.log("AsyncStorage#getItem error: ", error.message);
    }

    if (cart !== null) {
      cart = JSON.parse(cart);
      console.log("cart", cart);

      total = JSON.parse(total);
      console.log("total", total);

      counter = JSON.parse(counter);

      console.log("counter", counter);

      store.getState().cart.cart = cart;

      store.getState().cart.items_count = +cart.length;
    } else {
      AsyncStorage.setItem("@CART", "");
      AsyncStorage.setItem("@TOTAL", "");
      AsyncStorage.setItem("@COUNTER", "");
    }

    // await getCart()(store.dispatch, store.getState);
    const { exist } = await autoLogin(store.dispatch);

    console.log("%%%%%%%%%%%%%", exist);
    initInternetConnection(store.dispatch);
    SplashScreen.hide();

    nv.init("MAIN_STACK", {
      name: "IntroSwiper",
    });
  });
};
