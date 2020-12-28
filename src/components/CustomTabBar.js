import React, { Component } from "react";
import { connect } from "react-redux";
import { Animated } from "react-native";

import {
  AppView,
  AppButton,
  getColor,
  moderateScale,
  responsiveHeight
} from "../common";

class CustomTabBar extends Component {
  static defaultProps = {
    height: 5.5,
    activeTextColor: "primary",
    activeTextSize: 6.2,
    inactiveTextColor: "darkgrey",
    inactiveTextSize: 5.5,
    underlineColor: "transparent"
  };

  renderTab = (name, page, isActive, onPressHandler) => {
    const {
      activeTextColor,
      activeTextSize,
      activeTextBold,
      inactiveTextColor,
      inactiveTextSize,
      inactiveTextBold
    } = this.props;

    const textColor = isActive ? activeTextColor : inactiveTextColor;
    const textSize = isActive ? activeTextSize : inactiveTextSize;
    const textBold = isActive ? activeTextBold : inactiveTextBold;

    return (
      <AppButton
        key={String(page)}
        backgroundColor="transparent"
        flex
        stretch
        borderRadius={0}
        color={textColor}
        size={textSize}
        bold={textBold}
        touchableOpacity
        onPress={() => {
          onPressHandler(page);
        }}
        title={name}
        paddingVertical={0.1}
      />
    );
  };

  render() {
    const {
      tabs,
      height,
      activePage,
      goToPage,
      scrollValue,
      rtl,
      underlineColor
    } = this.props;

    let { containerWidth } = this.props;

    containerWidth -= moderateScale(16) + 2;

    const numberOfTabs = tabs.length;
    const tabUnderlineStyle = {
      position: "absolute",
      width: containerWidth / numberOfTabs,
      borderRadius: 4,
      backgroundColor: "transparent",
      bottom: responsiveHeight(0.5),
      top: responsiveHeight(0.5)
    };

    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        -responsiveHeight(0.5),
        (containerWidth / numberOfTabs) * (rtl ? -1 : 1)
      ]
    });

    return (
      <AppView
        row
        backgroundColor="transparent"
        borderColor="transparent"
        borderWidth={0}
        // borderRadius={0}
        height={height}
        marginVertical={7}
        marginHorizontal={8}
      >
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [{ translateX }]
            },
            this.props.underlineStyle
          ]}
        />
        {tabs.map(tab => {
          const isTabActive = activePage === tab.page;

          return this.renderTab(tab.label, tab.page, isTabActive, goToPage);
        })}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(CustomTabBar);
