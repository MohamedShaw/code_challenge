import React from "react";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";
import { AppView, responsiveWidth, moderateScale } from "../common";
import colors from "../common/defaults/colors";

class AppSwiper extends React.Component {
  renderSwiper = ({
    style,
    dotStyle,
    activeDotStyle,
    children,
    showsPagination,
    autoplay,
    onIndexChanged,
  }) => (
    <Swiper
      width={responsiveWidth(100)}
      Style={[style]}
      {...{ autoplay }}
      {...{ showsPagination }}
      dotStyle={[
        {
          width: responsiveWidth(3),
          height: responsiveWidth(3),
          borderRadius: responsiveWidth(3 / 2),
          borderColor: colors.primary,
          borderWidth: 1,
        },
        dotStyle,
      ]}
      activeDotStyle={[
        {
          width: responsiveWidth(3),
          height: responsiveWidth(3),
          borderRadius: responsiveWidth(1.5),
        },
        activeDotStyle,
      ]}
      dotColor={"white"}
      activeDotColor={colors.primary}
      onIndexChanged={(i) => onIndexChanged(i)}
    >
      {children}
    </Swiper>
  );

  render() {
    const {
      containerStyle,
      style,
      dotStyle,
      activeDotStyle,
      showsPagination,
      autoplay,
      children,
      onIndexChanged,
      ...rest
    } = this.props;
    return (
      <AppView stretch center {...rest}>
        {this.renderSwiper({
          style,
          dotStyle,
          activeDotStyle,
          children,
          showsPagination,
          autoplay,
          onIndexChanged,
        })}
      </AppView>
    );
  }
}
export default connect()(AppSwiper);
