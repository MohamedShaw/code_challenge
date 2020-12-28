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
  AppNavigation
} from "../common";
import usePost from "./usePost";
import { updateCart, addProductToCart } from "../actions/cartAction";

const AddToCartIcon = ({
  rtl,
  productId,
  updateCart,
  currentUser,
  onAddToCart,
  productData
}) => {
  const [cartData, setCartData] = useState({
    clientId: currentUser !== null && currentUser.id, // this.props.user.id,
    productId // this.props.productId
  });

  const onSuccess = data => {
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
  if (error) {
    if (data.status === 403) {
      if (data.message) showError(I18n.t("product-sold-out"));
      else {
        showError(I18n.t("something-went-wrong"));
      }
      // return null;
    }
    showError(data.message);
    // return null;
  }

  return (
    <AppView
      onPress={() => {
        if (currentUser !== null) {
          setCartData({
            clientId: currentUser.id, // this.props.user.id,
            productId // this.props.productId
          });
        } else {
          onAddToCart(productData, 1);
          showSuccess(I18n.t("added-to-cart"));


          // AppNavigation.push('signIn');
        }
      }}
      borderRadius={3}
      padding={1.5}
      center
      borderWidth={1}
      borderColor="inputBorderColor"
      marginHorizontal={1.5}
    >
      <AppIcon
        size={8}
        color="foreground"
        name="shopping-basket"
        type="font-awesome5"
      />
    </AppView>
  );
};

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  updateCart: bindActionCreators(updateCart, dispatch),
  onAddToCart: (product, counter) =>
    dispatch(addProductToCart(product, counter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToCartIcon);
