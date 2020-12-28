import React, { Component } from "react";
import { connect } from "react-redux";
import { Animated } from "react-native";

import View from "./View";
import Text from "./Text";
import Button from "./Button";

import { getTheme } from "./Theme";
import { getThemeColor } from "./utils/colors";
import colors from "./defaults/colors";

class DefaultTabBar extends Component {
  static defaultProps = {
    ...getTheme().tabBar,
  };

  renderTab = (name, page, isActive, onPressHandler) => {
    const {
      activeTextColor,
      activeTextSize,
      activeTextBold,
      inactiveTextColor,
      inactiveTextSize,
      inactiveTextBold,
    } = this.props;

    const textColor = isActive ? activeTextColor : inactiveTextColor;
    const textSize = isActive ? activeTextSize : inactiveTextSize;
    const textBold = isActive ? activeTextBold : inactiveTextBold;

    return (
      <Button
        key={String(page)}
        backgroundColor="white"
        flex
        stretch
        borderRadius={0}
        ph={0}
        pv={0}
        height={6}
        color={"black"}
        size={5.6}
        onPress={() => {
          onPressHandler(page);
        }}
        title={name}
      />
    );
  };

  render() {
    const {
      containerWidth,
      tabs,
      backgroundColor,
      height,
      activePage,
      goToPage,
      scrollValue,
      rtl,
      underlineColor,
      underlineHeight,
    } = this.props;

    const numberOfTabs = tabs.length;
    const tabUnderlineStyle = {
      position: "absolute",
      width: containerWidth / numberOfTabs,
      height: underlineHeight,
      backgroundColor: colors.primary,
      bottom: 0,
    };

    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, (containerWidth / numberOfTabs) * (rtl ? -1 : 1)],
    });

    return (
      <View row backgroundColor={backgroundColor} height={6}>
        {tabs.map((tab) => {
          const isTabActive = activePage === tab.page;

          return this.renderTab(tab.label, tab.page, isTabActive, goToPage);
        })}

        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [{ translateX }],
            },
            this.props.underlineStyle,
          ]}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(DefaultTabBar);
