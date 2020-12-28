import React, { Component } from "react";
import { Share } from "react-native";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import {
  AppHeader,
  AppSwiper,
  CustomTabBar,
  useGet,
  Loader,
  AddToCartBtn,
} from "../../components";
import { AppView, AppImage, AppTabs, AppList, AppText } from "../../common";
import colors from "../../common/defaults/colors";
import { ProductList } from "./ProductList";
import { Fotter } from "./Fotter";

const ProductDetails = (props) => {
  const { category_img, name, products } = props.data;
  return (
    <AppView stretch flex backgroundColor="#E4E4E4">
      <AppView
        stretch
        flex
        borderBottomLeftRadius={40}
        borderBottomRightRadius={40}
        // marginBottom={1}
      >
        <AppImage source={{ uri: category_img }} height={30} stretch>
          <AppHeader transparent title={name} />
        </AppImage>
        <AppTabs default activePage={0}>
          <AppView stretch flex tabLabel={"Meat"} backgroundColor="white">
            <ProductList data={products} />
          </AppView>

          <AppView stretch flex paddingTop={5} tabLabel={"Fish"}>
            <ProductList data={products} />
          </AppView>
        </AppTabs>
        <Fotter />
      </AppView>
    </AppView>
  );
};
const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(ProductDetails);
