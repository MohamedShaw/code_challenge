import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Text, StyleSheet } from "react-native";
import {
  AppView,
  AppText,
  AppImage,
  AppIcon,
  moderateScale,
  AppNavigation,
  responsiveFontSize
} from "../common";
import colors from "../common/defaults/colors";

import { refreshList } from "../actions/list";
import { removeFromFav } from "../utils/Network";
import AddToCartIcon from "./AddToCartIcon";

const styles = StyleSheet.create({
  priceText: {
    textAlignVertical: "center",
    fontSize: responsiveFontSize(6.5),
    color: colors.foreground,
    fontWeight: "bold"
  }
});
class ProductCard extends Component {
  refresh = () => {
    this.props.refreshList("favoritList");
  };

  renderPrcie = () => {
    const {
      product_final_price: price,
      product_price,
      product_discount_percentage
    } = this.props.fav_product;
    const offerlineHeight = 7;
    const pricelineHeight = 9;
    return (
      <AppView width={18}>
        <AppView row>
          <Text style={styles.priceText}>{(+price).toFixed(2)}</Text>
          <AppText
            color="grey"
            marginHorizontal={2}
            lineHeight={pricelineHeight}
            size={5.5}
          >
            {I18n.t("sar")}
          </AppText>
        </AppView>

        {product_discount_percentage > 0 && (
          <AppView row>
            <AppText color="grey" bold lineHeight={offerlineHeight}>
              {(+product_price).toFixed(2)}
            </AppText>
            <AppText
              color="grey"
              marginHorizontal={2}
              lineHeight={offerlineHeight}
            >
              {I18n.t("sar")}
            </AppText>
            <AppView
              stretch
              borderWidth={1}
              borderColor="grey"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: moderateScale(2)
              }}
            />
          </AppView>
        )}
      </AppView>
    );
  };

  renderBottom = () => {
    const { fav_id: wishlistId } = this.props;
    const product_id = this.props.fav_product.product_id;
    console.log("product id", product_id);

    return (
      <AppView stretch marginHorizontal={5} row spaceBetween marginBottom={20}>
        {this.renderPrcie()}
        <AppView row>
          <AddToCartIcon productId={product_id} />
          <AppView
            onPress={() => removeFromFav(wishlistId, this.refresh)}
            borderRadius={3}
            padding={1.5}
            center
            borderColor="inputBorderColor"
            borderWidth={1}
          >
            <AppIcon color="foreground" name="heart" type="ant" size={11} />
          </AppView>
          <AppIcon />
        </AppView>
      </AppView>
    );
  };

  render() {
    const {
      main_img_url: img,
      product_name: title,
      product_id: id,
      ...rest
    } = this.props.fav_product;
    return (
      <AppView
        {...rest}
        onPress={() =>
          AppNavigation.push({
            name: "productDetails",
            passProps: {
              id
            }
          })
        }
      >
        <AppView
          width={42}
          height={36}
          elevation={2}
          borderRadius={10}
          margin={5}
          centerX
        >
          <AppImage source={{ uri: img }} height={23} width={35} />
          <AppView stretch height={6} marginHorizontal={5}>
            <AppText size={6.5} color="darkgrey" bold numberOfLines={1}>
              {title}
            </AppText>
          </AppView>
          {this.renderBottom()}
        </AppView>
      </AppView>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  refreshList: bindActionCreators(refreshList, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(ProductCard);
