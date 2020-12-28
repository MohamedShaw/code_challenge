import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { connect } from "react-redux";

import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  getColors,
  AppImage,
  moderateScale,
} from "../common";
import colors from "../common/defaults/colors";

const APPBAR_HEIGHT = Platform.OS === "ios" ? 54 : 56;

class Header extends Component {
  static propTypes = {
    hideBack: PropTypes.bool,
    rowItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    showCart: PropTypes.bool,
    showSearch: PropTypes.bool,
  };

  static defaultProps = {
    hideBack: false,
    rowItems: [],
    showCart: true,
    showSearch: true,
  };

  goBack = () => {
    if (this.props.backHandler) {
      this.props.backHandler();
    } else {
      AppNavigation.pop();
    }
  };

  renderRight = () => {
    const {
      rowItems,
      showCart,
      showSearch,
      items_count,
      rtl,
      currentUser,
      cartObj,
    } = this.props;

    if ((rowItems && rowItems.length > 0) || showCart) {
      return (
        <AppView row stretch bottom>
          {rowItems &&
            rowItems.length > 0 &&
            rowItems.map((item) =>
              React.cloneElement(item, {
                key: String(Math.random()),
              })
            )}
          {showSearch && (
            <AppButton transparent onPress={() => {}}>
              <AppView>
                <AppIcon
                  name="search"
                  type="font-awesome5"
                  size={8}
                  color={this.props.transparent ? "white" : "#AFD2EB"}
                />
              </AppView>
            </AppButton>
          )}

          {showCart && (
            <AppButton
              marginLeft={5}
              marginReight={4}
              transparent
              onPress={() => AppNavigation.push("cart")}
            >
              <AppView>
                <AppIcon
                  name="basket"
                  type="simple-line"
                  size={10}
                  color={this.props.transparent ? "white" : "#AFD2EB"}
                />
                {
                  <AppView
                    style={{
                      position: "absolute",
                      top: -moderateScale(3.5),
                      ...(rtl
                        ? { left: -moderateScale(5) }
                        : { right: -moderateScale(5) }),
                    }}
                    circleRadius={6.5}
                    backgroundColor={colors.primary}
                    center
                  >
                    <AppText color="white" size={5}>
                      {currentUser !== null
                        ? cartObj.items_count
                        : this.props.cart !== null
                        ? this.props.cart.length
                        : 0}
                    </AppText>
                  </AppView>
                }
              </AppView>
            </AppButton>
          )}
        </AppView>
      );
    }

    return <AppView stretch flex />;
  };

  renderNavigatorBtn = () => {
    const { showMenu } = this.props;
    if (showMenu) {
      return (
        <AppView>
          <AppButton
            leftIcon={
              <AppIcon name="menu" type="feather" size={14} color="#79B4DD" />
            }
            onPress={AppNavigation.openMenu}
            paddingHorizontal={8}
            backgroundColor="transparent"
          />
        </AppView>
      );
    }
    return (
      <AppButton
        leftIcon={
          <AppIcon
            name="ios-arrow-forward"
            type="ion"
            size={12}
            color={this.props.transparent ? "white" : "#79B4DD"}
            reverse
          />
        }
        onPress={this.goBack}
        paddingHorizontal={8}
        backgroundColor="transparent"
      />
    );
  };

  renderLeft = () => (
    <AppView stretch row>
      {this.renderNavigatorBtn()}
    </AppView>
  );

  renderTitle = () => {
    const { title } = this.props;

    return (
      <AppView stretch center flex>
        {title ? (
          <AppText
            size={8}
            bold
            numberOfLines={1}
            color={this.props.transparent ? "white" : colors.primary}
          >
            {title}
          </AppText>
        ) : (
          this.renderLogo()
        )}
      </AppView>
    );
  };

  renderLogo = () => {
    const { title } = this.props;
    return (
      <AppView flex={3} right stretch centerY>
        <AppImage
          // source={{ uri: null }}
          resizeMode="contain"
          width={25}
          height={25}
        />
      </AppView>
    );
  };

  render() {
    const { title, showLogo, transparent } = this.props;
    return (
      <SafeAreaView
        style={{
          alignSelf: "stretch",
          backgroundColor: transparent ? "transparent" : "#6EA842",
        }}
      >
        <AppView
          stretch
          style={{
            height: APPBAR_HEIGHT,
            // marginTop: StatusBar.currentHeight
          }}
          row
          spaceBetween
          backgroundColor={transparent ? "transparent" : "white"}
        >
          {this.renderLeft()}

          <AppView stretch>{this.renderTitle()}</AppView>
          {this.renderRight()}
        </AppView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  items_count: state.cart.items_count,
  cartObj: state.cart,

  cart: state.cart.cart,
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(Header);
