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

export const Fotter = ({ data }) => {
  return (
    <AppView
      stretch
      borderBottomLeftRadius={40}
      borderBottomRightRadius={40}
      height={8}
      backgroundColor={colors.primary}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      row
    >
      <AppView flex center>
        <AppText color="white" bold size={8}>
          Filter
        </AppText>
      </AppView>
      <AppView flex center>
        <AppText color="white" bold size={8}>
          Sort by
        </AppText>
      </AppView>
    </AppView>
  );
};
