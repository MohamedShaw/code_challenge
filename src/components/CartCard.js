import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { bindActionCreators } from "redux";
import {
  AppView,
  AppImage,
  AppText,
  AppButton,
  AppIcon,
  AppInput,
  moderateScale,
  showError,
  showSuccess,
} from "../common";
import Api, { validateRequst, ACCESS_DATA } from "../utils/Network";
import {
  updateCart,
  addProductToCart,
  removeItem,
} from "../actions/cartAction";
import { refreshList } from "../actions/list";

export const QuantityButton = (props) => {
  const { name, onPress, type } = props;
  return (
    <AppView onPress={onPress}>
      <AppIcon color="grey" name={name} type={type} size={10} />
    </AppView>
  );
};
class CartCard extends Component {
  counter = this.props.static
    ? this.props.data.items_count
    : this.props.data.cart_quantity;

  updateValue = (val) => {
    if (this.props.currentUser === null) {
      console.log("on update pressed", val);

      const { data } = this.props;
      const maxVal = this.props.data.product_quantity;
      const minVal = 1;
      const newVal = this.counter + val;
      if (newVal >= +minVal && newVal <= +maxVal) {
        this.counter = newVal;
        this.quantityInputRef.inputRef.current.setNativeProps({
          text: `${newVal}`,
        });

        const id = this.props.data.product_id;
        this.props.onAddProduct(this.props.data, val);

        this.props.updateItemInList(id, { items_count: newVal });
      }
    } else {
      const maxVal = this.props.data.product_details.product_quantity;
      const minVal = 1;
      const newVal = this.counter + val;
      if (newVal >= +minVal && newVal <= +maxVal) {
        this.counter = newVal;
        this.quantityInputRef.inputRef.current.setNativeProps({
          text: `${newVal}`,
        });

        const id = this.props.data.cart_product_id;

        this.props.updateItemInList(id, { cart_quantity: newVal });
        this.UpdateQuantity(newVal);
      }
    }
  };

  UpdateQuantity = async (val) => {
    try {
      const data = {
        ...ACCESS_DATA,
        clientId: this.props.currentUser.id, // this.props.user.id,
        productId: this.props.data.product_details.product_id,
        productQuantity: +val,
      };
      const res = await Api.post(`updatecart`, data);

      const response = validateRequst(res);
      console.log("res", response);
      if (response.isError) {
        if (response.data.status === 403) {
          showError(I18n.t("something-went-wrong"));
          return;
        }
        showError(response.data.message);
        return;
      }
      const { cart_total, items_count, cart_sub_total } = response.data;
      this.props.updateCart({ cart_total, items_count, cart_sub_total });
      showSuccess(I18n.t("quantity-updated-sucessfully"));
    } catch (error) {
      console.log(error, JSON.stringify(error));

      if (!this.props.isConnected) {
        showError(I18n.t("no-internet-connection"));
      }
    }
  };

  renderQuantity = () => (
    <AppView flex height={5} row>
      <QuantityButton
        onPress={() => this.updateValue(-1)}
        name="minus"
        type="entypo"
      />
      <AppInput
        editable={false}
        bold
        size={7}
        color="grey"
        ref={(ref) => (this.quantityInputRef = ref)}
        width={10}
        number
        textStyle={{
          textAlign: "center",
          textAlignVertical: "center",
        }}
        height={6}
        onChange={this.onChange}
        initialValue={`${this.counter}`}
        noBorder
      />
      <QuantityButton
        onPress={() => this.updateValue(1)}
        name="plus"
        type="entypo"
      />
    </AppView>
  );

  onChange = (value) => {
    const maxVal = this.props.static
      ? this.props.data.product_quantity
      : this.props.data.product_details.product_quantity;
    const minVal = 1;
    const val = +value;
    if (val >= +minVal && val <= +maxVal) {
      this.counter = 0;
      this.updateValue(+val);
    } else {
      setTimeout(() => {
        this.updateValue(maxVal - this.counter);
      }, 500);
    }
  };

  refresh = () => {
    this.props.refreshList("ordersList");
  };

  removeProduct = async () => {
    if (this.props.currentUser === null) {
      console.log("************");
      this.props.removeItem(this.props.data);
      this.props.removeItemFromList(this.props.data.product_id);
    } else {
      try {
        const data = {
          ...ACCESS_DATA,
          clientId: this.props.currentUser.id, // this.props.user.id,
          itemId: this.props.data.cart_id,
        };
        const res = await Api.post(`removefromcart`, data);

        console.log(res);
        const response = validateRequst(res);

        if (response.isError) {
          if (response.data.status === 403) {
            showError(I18n.t("something-went-wrong"));
            return;
          }
          showError(response.data.message);
          return;
        }
        this.refresh();

        const { cart_total, items_count, cart_sub_total } = response.data;
        this.props.updateCart({ cart_total, items_count, cart_sub_total });
        showSuccess(I18n.t("removed-sucessfully"));
      } catch (error) {
        console.log(error, JSON.stringify(error));

        if (!this.props.isConnected) {
          showError(I18n.t("no-internet-connection"));
        }
      }
    }
  };

  renderInfo = () => {
    const {
      product_name: name,
      product_final_price: price,
      product_discount_percentage,
      product_price,
    } = this.props.static ? this.props.data : this.props.data.product_details;
    console.log("props --->>>", this.props.data);

    return (
      <AppView stretch flex marginHorizontal={5}>
        <AppView stretch flex>
          <AppText bold color="darkgrey">
            {name}
          </AppText>
          <AppView>
            <AppView row>
              <AppText bold color="foreground" size={9}>
                {(+price).toFixed(2)}
              </AppText>
              <AppText marginHorizontal={1} color="grey">
                {I18n.t("sar")}
              </AppText>

              {product_discount_percentage > 0 && (
                <AppView row marginHorizontal={10}>
                  <AppText color="grey" bold>
                    {(+product_price).toFixed(2)}
                  </AppText>
                  <AppText color="grey" marginHorizontal={2}>
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
                      top: moderateScale(5),
                    }}
                  />
                </AppView>
              )}
            </AppView>
          </AppView>
        </AppView>
        <AppView row stretch spaceBetween ma>
          {this.renderQuantity()}
          <AppView
            onPress={this.removeProduct}
            paddingHorizontal={2}
            borderWidth={0.5}
            borderColor="grey"
            borderRadius={5}
          >
            <AppIcon name="ios-trash" color="danger" size={10} />
          </AppView>
        </AppView>
      </AppView>
    );
  };

  render() {
    const { main_img_url: img } = this.props.static
      ? this.props.data
      : this.props.data.product_details;

    return (
      <AppView
        stretch
        row
        marginHorizontal={5}
        marginBottom={5}
        elevation={2}
        centerX
        borderRadius={10}
      >
        <AppImage height={12} width={35} source={{ uri: img }} />
        {this.renderInfo()}
      </AppView>
    );
  }
}
const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser,
  isConnected: state.network.isConnected,
});
const mapDispatchToProps = (dispatch) => ({
  updateCart: bindActionCreators(updateCart, dispatch),
  refreshList: bindActionCreators(refreshList, dispatch),
  removeItem: bindActionCreators(removeItem, dispatch),
  onAddProduct: bindActionCreators(addProductToCart, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartCard);
