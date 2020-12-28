import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "react-native-i18n";
import {
  AppView,
  AppButton,
  AppIcon,
  showError,
  showSuccess,
  moderateScale,
  AppNavigation,
} from "../common";
import usePost from "./usePost";
import { updateCart, addProductToCart } from "../actions/cartAction";

const AddToCartBtn = ({
  rtl,
  productId,
  productData,
  updateCart,
  currentUser,
  onAddToCart,
}) => {
  const [cartData, setCartData] = useState({
    clientId: currentUser !== null && currentUser.id, // this.props.user.id,
    productId, // this.props.productId
  });
  const onSuccess = (data) => {
    const { cart_total, items_count, cart_sub_total } = data;
    updateCart({ cart_total, items_count, cart_sub_total });
    showSuccess(I18n.t("added-to-cart"));
  };
  const [posting, error, data] = usePost(
    "addtocart",
    cartData,
    onSuccess,
    "data"
  );

  if (error && !posting) {
    if (data.status === 403) {
      if (data.message) showError(I18n.t("product-sold-out"));
      else {
        showError(I18n.t("something-went-wrong"));
      }
      return (
        <AppView stretch marginVertical={5}>
          <AppButton
            stretch
            disabled={productData.product_quantity === 0}
            processing={posting}
            title={I18n.t("add-to-cart")}
            onPress={() => {
              if (currentUser !== null) {
                setCartData({
                  clientId: currentUser.id, // this.props.user.id,
                  productId, // this.props.productId
                });
              } else {
                onAddToCart(productData, 1);

                // AppNavigation.push('signIn');
              }
            }}
          />
          <AppIcon
            style={{
              position: "absolute",

              top: 0,
              bottom: 0,
              ...(!rtl
                ? { right: moderateScale(5) }
                : { left: moderateScale(5) }),
            }}
            name="shopping-basket"
            type="font-awesome5"
          />
        </AppView>
      );
    }
    showError(data.message);
    return (
      <AppView stretch marginVertical={5}>
        <AppButton
          stretch
          disabled={productData.product_quantity === 0}
          processing={posting}
          title={I18n.t("add-to-cart")}
          onPress={() => {
            if (currentUser !== null) {
              setCartData({
                clientId: currentUser.id, // this.props.user.id,
                productId, // this.props.productId
              });
            } else {
              onAddToCart(productData, 1);

              // AppNavigation.push('signIn');
            }
          }}
        />
        <AppIcon
          style={{
            position: "absolute",

            top: 0,
            bottom: 0,
            ...(!rtl
              ? { right: moderateScale(5) }
              : { left: moderateScale(5) }),
          }}
          name="shopping-basket"
          type="font-awesome5"
        />
      </AppView>
    );
  }

  console.log("productData", productData);

  return (
    <AppView stretch marginVertical={5}>
      <AppButton
        stretch
        disabled={productData.product_quantity === 0}
        processing={posting}
        title={I18n.t("add-to-cart")}
        onPress={() => {
          if (currentUser !== null) {
            setCartData({
              clientId: currentUser.id, // this.props.user.id,
              productId, // this.props.productId
            });
          } else {
            onAddToCart(productData, 1);

            // AppNavigation.push('signIn');
          }
        }}
      />
      <AppIcon
        style={{
          position: "absolute",

          top: 0,
          bottom: 0,
          ...(!rtl ? { right: moderateScale(5) } : { left: moderateScale(5) }),
        }}
        name="shopping-basket"
        type="font-awesome5"
      />
    </AppView>
  );
};

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateCart: bindActionCreators(updateCart, dispatch),
  onAddToCart: (product, counter) =>
    dispatch(addProductToCart(product, counter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartBtn);
