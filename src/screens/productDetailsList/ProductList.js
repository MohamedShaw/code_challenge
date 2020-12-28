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
import {
  AppView,
  AppImage,
  AppTabs,
  AppList,
  AppText,
  AppIcon,
} from "../../common";
import colors from "../../common/defaults/colors";
import Card from "./Card";

export const ProductList = ({ data }) => {
  console.log("data ==>>", data);

  return (
    <AppList
      tabLabel="MEAT"
      flex
      stretch
      columns={2}
      rowHeight={170}
      // staticData

      data={data}
      rowRenderer={(data) => {
        return <Card data={data} />;
      }}
    />
  );
};
