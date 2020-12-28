import React, { Component } from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { bindActionCreators } from "redux";
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppIcon,
  moderateScale,
  AppButton,
  AppNavigation,
} from "../../common";
import { AppAccordion, Loader, SubCatModal } from "../../components";

import { logout } from "../../actions/AuthActions";

class Menu extends Component {
  render() {
    return <AppView stretch flex backgroundColor="primary" />;
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  catigoreis: state.cat.data,
  currentUser: state.auth.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  logout: bindActionCreators(logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
