import React, { Component } from "react";
import I18n from "react-native-i18n";
import { Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  AppView,
  AppText,
  AppImage,
  AppIcon,
  moderateScale,
  AppNavigation,
  responsiveFontSize,
  showInfo,
} from "../common";
import colors from "../common/defaults/colors";
import { addToFav } from "../utils/Network";
import { AddToCartIcon } from ".";

const styles = StyleSheet.create({
  priceText: {
    textAlignVertical: "center",
    fontSize: responsiveFontSize(6.5),
    color: colors.foreground,
    fontWeight: "bold",
  },
});
class ProductCard extends Component {
  renderPrcie = () => {
    const {
      product_final_price: price,
      product_price,
      product_discount_percentage,
    } = this.props;
    const offerlineHeight = 7;
    const pricelineHeight = 9;
    return (
      <AppView width={20} >
        <AppView row flex>
          <Text style={styles.priceText}>{(+price).toFixed(2)}</Text>
          <AppText
            color="grey"
            // marginHorizontal={2}
            marginLeft={2}
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
                top: moderateScale(2),
              }}
            />
          </AppView>
        )}
      </AppView>
    );
  };

  renderBottom = () => {
    const {
      product_id,
      main_img_url,
      product_name,
      product_price,
      product_sale_price,
      product_quantity,
      product_discount_percentage,
      product_final_price,
    } = this.props;
    const productData = {
      product_id,

      main_img_url,
      product_name,
      product_price,
      product_sale_price,
      product_quantity,
      product_discount_percentage,
      product_final_price,
    };
    return (
      <AppView stretch  row spaceBetween marginBottom={20}>
        {this.renderPrcie()}

        <AppView row>
          {product_quantity > 0 && (
            <AddToCartIcon productId={product_id} productData={productData} />
          )}
          <AppView
            onPress={() => {
              if (this.props.currentUser === null) {
                showInfo(I18n.t("please-sign-in"));
              } else addToFav(product_id);
            }}
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
    } = this.props;

    return (
      <AppView
        {...rest}
        onPress={() =>
          AppNavigation.push({
            name: "productDetails",
            passProps: {
              id,
            },
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
          <AppView stretch height={6} marginHorizontal={5} centerX>
            <AppText color="darkgrey" bold numberOfLines={1}>
              {title}
            </AppText>
            {this.props.product_quantity === 0 && (
            <AppText color="red">{I18n.t("quantity-out")}</AppText>
          )}
          </AppView>
         
          {this.renderBottom()}
        </AppView>
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps, null)(ProductCard);
