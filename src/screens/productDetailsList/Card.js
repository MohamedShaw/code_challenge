import React, { Component } from "react";

import {
  AppView,
  AppImage,
  AppTabs,
  AppList,
  AppText,
  AppIcon,
  AppNavigation,
} from "../../common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addProductToCart } from "../../actions/cartAction";

class Card extends Component {
  render() {
    const { data, onAddToCart } = this.props;
    return (
      <AppView
        stretch
        width={48}
        height={25}
        marginBottom={1.6}
        backgroundColor="white"
        marginHorizontal={0.8}
        elevation={1.2}
        onPress={() => {
          AppNavigation.push({
            name: "productDetails",
            passProps: {
              data,
            },
          });
        }}
      >
        <AppImage
          source={{ uri: data.product_img }}
          equalSize={25}
          centerSelf
          marginTop={5}
        />
        <AppView
          bottom
          flex
          stretch
          left={this.props.rtl}
          paddingHorizontal={5}
          height={25}
        >
          <AppText bold>{data.name}</AppText>
          <AppText bold>{data.weight}</AppText>
          <AppView stretch row flex marginBottom={5}>
            <AppView flex left={!this.props.rtl}>
              <AppText bold>{data.price}</AppText>
            </AppView>
            <AppView
              circleRadius={5}
              center
              backgroundColor="#D4D4D4"
              onPress={() => {
                console.log("press");

                onAddToCart(data, 1);
              }}
            >
              <AppIcon name="add" color="white" />
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}
const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onAddToCart: (product, counter) =>
    dispatch(addProductToCart(product, counter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
