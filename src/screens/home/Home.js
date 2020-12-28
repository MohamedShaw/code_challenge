import React, { Component, useReducer, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  responsiveHeight,
  AppList,
  showError,
  AppSpinner,
  AppNavigation,
} from "../../common";
import { useGet, AppHeader } from "../../components";

import HomeSwiper from "./HomeSwiper";
import { updateCart } from "../../actions/cartAction";
import { ACCESS_DATA } from "../../utils/Network";
import { Linking, View } from "react-native";
import { getCart } from "../../actions/AuthActions";
import store from "../../store";
import Axios from "axios";

const Home = ({ updateCart, currentUser }) => {
  const [loading, data] = useGet("banners");
  console.log("banners", data);

  const [categories, setCategories] = useState([]);

  const [loadingCategeory, setLoading] = useState(true);
  useEffect(() => {
    getApiRequest();
  }, [loadingCategeory]);
  const getApiRequest = async () => {
    try {
      const response = await Axios.get(
        `https://5bcce576cf2e850013874767.mockapi.io/task/categories`
      );
      console.log("response home", response);

      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      showError("Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AppView flex stretch>
      <AppHeader showMenu />
      <HomeSwiper />

      <View
        style={{
          elevation: 1.2,
          flex: 1,
          alignSelf: "stretch",
        }}
      >
        <AppView
          stretch
          elevation={1.2}
          borderBottomLeftRadius={20}
          borderBottomRightRadius={20}
          backgroundColor="#FFFFFF"
          paddingTop={5}
          height={70}
          centerX
        >
          {loadingCategeory ? (
            <AppSpinner />
          ) : (
            <AppList
              flex
              stretch
              columns={2}
              rowHeight={170}
              // staticData
              marginHorizontal={2}
              data={categories}
              rowRenderer={(data) => {
                return (
                  <AppView
                    stretch
                    width={45}
                    marginBottom={2}
                    marginHorizontal={1}
                    borderRadius={7}
                    elevation={1.2}
                    onPress={() => {
                      AppNavigation.push({
                        name: "productDetailsList",
                        passProps: {
                          data,
                        },
                      });
                    }}
                  >
                    <AppImage
                      source={{ uri: data.category_img }}
                      flex
                      stretch
                      height={25}
                    >
                      <AppView
                        bottom
                        flex
                        stretch
                        left
                        paddingHorizontal={5}
                        height={15}
                      >
                        <AppText bold size={7}>
                          {data.name}
                        </AppText>
                      </AppView>
                    </AppImage>
                  </AppView>
                );
              }}
            />
          )}
        </AppView>
      </View>
    </AppView>
  );
};
const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  updateCart: bindActionCreators(updateCart, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
