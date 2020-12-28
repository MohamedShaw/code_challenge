import React, { Component } from "react";
import I18n from "react-native-i18n";
import { AppView, AppText, CheckBox } from "../common";
import { CHECK_BOX_DISPLAY_NAME } from "../utils/Constants";

const CheckBoxItem = props => {
  const { name, ...rest } = props;
  return (
    <AppView marginTop={5} stretch row spaceBetween>
      <AppText size={6.5}>{name}</AppText>
      <CheckBox {...rest} />
    </AppView>
  );
};
CheckBoxItem.displayName = CHECK_BOX_DISPLAY_NAME;
export default CheckBoxItem;
