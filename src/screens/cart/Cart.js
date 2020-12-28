import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { bindActionCreators } from "redux";
import _ from "lodash";
import Axios from "axios";
import {
  AppHeader,
  CartCard,
  AppFeedBack,
  ConfirmationModal,
} from "../../components";
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppList,
  AppButton,
  showError,
  AppForm,
  AppNavigation,
  AppInput,
  showSuccess,
  showInfo,
  AppSpinner,
} from "../../common";
import { updateCart } from "../../actions/cartAction";
import { refreshList } from "../../actions/list";
import Api, {
  API_ENDPOINT,
  ACCESS_DATA,
  validateRequst,
} from "../../utils/Network";
import AddressModal from "../../components/AddressModal";
import LoginModalInfo from "../../components/LoginModalInfo";
import { KeyboardAvoidingView } from "react-native";

class Cart extends Component {
  modalRef = React.createRef();

  state = {
    successfuly: false,
    isConfirmationModal: false,
    code: "",
    isLoading: false,
    cart_total: this.props.currentUser
      ? `${this.props.cart_total && this.props.cart_total} ${I18n.t("sar")}`
      : `${this.props.cart_total && this.props.cart_total.toFixed(2)} ${I18n.t(
          "sar"
        )}`,
    isVisible: false,
    codeSuccess: null,
    cartLoading: false,
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.cart_total !== this.props.cart_total &&
      (nextProps.cart_total || this.props.cart_total)
    ) {
      this.setState({
        cart_total: this.props.currentUser
          ? `${nextProps.cart_total} ${I18n.t("sar")}`
          : nextProps.cart_total.toFixed(2),
      });
    }
  }
  checkCode = async () => {
    this.setState({
      isLoading: true,
    });
    try {
      const res = await Axios.post(`${API_ENDPOINT}voucher/action`, {
        ...ACCESS_DATA,
        clientId: this.props.currentUser.id,
        code: this.state.code,
      });
      console.log("res ------------->>", res);

      this.setState({
        isLoading: false,
      });
      if (res.data.success) {
        this.setState({
          cart_total: res.data.total,
          codeSuccess: this.state.code,
        });
        showSuccess(res.data.message);
      } else {
        this.setState({
          cart_total: res.data.total,
        });
        showInfo(res.data.message);
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      showError(I18n.t("code-sure-err"));
    }
  };

  checkYourBounusCode = () => {
    const { currentUser } = this.props;
    return (
      <AppView
        stretch
        elevation={1.2}
        height={10}
        centerY
        marginBottom={10}
        row
        spaceBetween
        paddingHorizontal={10}
      >
        <AppButton
          title={I18n.t("check-your-code")}
          stretch
          onPress={() => {
            this.checkCode();
          }}
          height={7}
          processing={this.state.isLoading}
        />
        <AppView width={5} />
        <AppInput
          height={7}
          flex
          label={I18n.t("Your Code")}
          borderRadius={7}
          onChange={(val) => {
            this.setState({
              code: val,
            });
          }}
        />
      </AppView>
    );
  };

  renderTotal = ({ isSubmitting, handleSubmit, setSubmitting, values }) => {
    const totalTextSize = 6;
    const { currentUser } = this.props;
    console.log("cart_total", this.state.cart_total);

    return (
      <KeyboardAvoidingView behavior="padding" style={{ alignSelf: "stretch" }}>
        <AppView stretch center>
          {currentUser !== null && this.checkYourBounusCode()}
          <AppView row marginBottom={5}>
            <AppText size={totalTextSize} bold>
              {I18n.t("total")}
            </AppText>
            <AppText size={totalTextSize} bold marginHorizontal={1}>
              :
            </AppText>
            <AppText size={totalTextSize} bold>
              {this.state.cart_total}
            </AppText>
          </AppView>
          {this.props.cart_total !== 0 && (
            <AppView stretch row>
              <AppButton
                processing={isSubmitting}
                onPress={() => {
                  if (this.props.currentUser !== null) {
                    handleSubmit();
                  } else {
                    this.setState({
                      isVisitor: true,
                    });
                  }
                }}
                stretch
                title={I18n.t("pay")}
                flex
                height={7}
                borderRadius={0}
              />
              <AppButton
                onPress={() => {
                  if (this.props.currentUser !== null) {
                    const value = { ...values };
                    if (this.state.codeSuccess !== null) {
                      value.code_name = this.state.codeSuccess;
                    }
                    console.log("value before accexx ", value);

                    AppNavigation.push({
                      name: "uplaodPrescription",
                      passProps: {
                        onSubmit: this.checkOut,
                        setSubmitting,
                        value,
                      },
                    });
                  } else {
                    this.setState({
                      isVisitor: true,
                    });
                  }
                }}
                stretch
                title={I18n.t("upload-prescription")}
                flex
                height={7}
                borderRadius={0}
                backgroundColor="grey"
              />
            </AppView>
          )}
        </AppView>
        <ConfirmationModal
          closable={false}
          isVisible={this.state.isConfirmationModal}
          title={I18n.t("confirm-modal")}
          desc={I18n.t("confirm-modal-order")}
          yesLabel={I18n.t("yes")}
          noLabel={I18n.t("no")}
          onConfirm={() => {
            this.setState({ isConfirmationModal: false }, () => {
              this.confirmCheckOut(values, { setSubmitting });
            });
          }}
          changeState={(v) => {
            setSubmitting(false);
            this.setState({
              isConfirmationModal: false,
            });
          }}
        />
      </KeyboardAvoidingView>
    );
  };

  getApiRequest = () => {
    const clientId = this.props.currentUser.id; // this.props.user.id,
    return {
      url: `${API_ENDPOINT}cartitems?accessKey=${ACCESS_DATA.accessKey}&accessPassword=${ACCESS_DATA.accessPassword}&clientId=${clientId}`,

      responseResolver: (response) => {
        console.log("response ==>>", response);

        const { cart_total, cart_sub_total, cart_items } = response.data;

        let items_count = cart_items.total;
        if (!cart_items.hasOwnProperty("total")) {
          items_count = response.data.items_count;
        }
        this.props.updateCart({ cart_total, items_count, cart_sub_total });
        return {
          data: response.data.cart_items.data || [],
          pageCount: response.data.cart_items.last_page,
          page: response.data.cart_items.current_page,
        };
      },
    };
  };

  onSelect = async (addressId, values, setSubmitting) => {
    setSubmitting(true);
    const value = {
      ...values,
      addressId,
    };
    const data = new FormData();

    _.forEach(values, (val, key) => {
      data.append(key, JSON.stringify(val));
    });
    try {
      console.log("value checout  ===>", value);

      const res = await Api.post(`checkout`, value);
      const response = validateRequst(res);
      console.log("response --->>>>", res);

      if (response.isError) {
        setSubmitting(false);
        showError(response.data.message);
        this.setState({
          successfuly: false,
        });
        return;
      }
      this.setState({
        successfuly: true,
      });
      setSubmitting(false);
      this.props.updateCart({
        cart_total: 0,
        items_count: 0,
        cart_sub_total: 0,
      });
      this.props.refreshList("ordersList");
      setTimeout(() => {
        AppNavigation.setStackRoot({
          rtl: this.props.rtl,
          sideMenu: "menu",
          name: "home",
        });
      }, 1500);
    } catch (error) {
      console.log("error", JSON.parse(JSON.stringify(error)));
      this.setState({
        successfuly: false,
      });
      setSubmitting(false);
      if (!this.props.isConnected) {
        showError(I18n.t("no-internet-connection"));
      }
    }
  };

  checkOut = async (values, { setSubmitting }) => {
    setSubmitting(false);
    this.setState({
      isConfirmationModal: true,
    });
  };

  confirmCheckOut = async (values, { setSubmitting }) => {
    // setSubmitting(true);
    if (this.props.currentUser) {
      const value = { ...values };
      if (this.state.codeSuccess !== null) {
        value.code_name = this.state.codeSuccess;
      }
      AppNavigation.push({
        name: "myAddress",
        passProps: {
          currentUser: this.props.currentUser,
          onSelect: this.onSelect,
          values: value,
          setSubmitting: setSubmitting,
          code_name: this.state.codeSuccess,
        },
      });
    } else {
      console.log("is visitor");

      setSubmitting(false);
      this.setState({
        isVisitor: true,
      });
    }
  };

  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("cart")} hideCart />
        <AppView stretch height={5} />
        {this.state.cartLoading ? (
          <AppView stretch center>
            <AppSpinner />
          </AppView>
        ) : (
          <>
            {this.props.currentUser === null ? (
              <AppList
                refreshControl={this.props.ordersList}
                showsVerticalScrollIndicator={false}
                flex
                stretch
                idPathInData={
                  this.props.currentUser === null
                    ? "product_id"
                    : "cart_product_id"
                }
                // apiRequest={this.props.currentUser !== null && this.getApiRequest()}
                data={this.props.currentUser === null && this.props.cart}
                rowRenderer={(data) => (
                  <CartCard
                    {...{ data }}
                    static={this.props.currentUser === null}
                  />
                )}
              />
            ) : (
              <AppList
                refreshControl={this.props.ordersList}
                showsVerticalScrollIndicator={false}
                flex
                stretch
                idPathInData={
                  this.props.currentUser === null
                    ? "product_id"
                    : "cart_product_id"
                }
                apiRequest={
                  this.props.currentUser !== null && this.getApiRequest()
                }
                rowRenderer={(data) => (
                  <CartCard
                    {...{ data }}
                    static={this.props.currentUser === null}
                  />
                )}
              />
            )}
            <AppForm
              schema={{
                ...ACCESS_DATA,
                clientId: this.props.currentUser && this.props.currentUser.id, // this.props.user.id,
              }}
              render={this.renderTotal}
              onSubmit={this.checkOut}
            />
          </>
        )}

        <AppFeedBack
          visible={this.state.successfuly}
          changeState={(v) => {
            this.setState({
              successfuly: v,
            });
          }}
          iconName="md-checkmark"
          iconType="ion"
          iconSize={20}
          iconColor="white"
          message={I18n.t("congratulation")}
          hintMessage={I18n.t("added-successfully")}
        />
        <LoginModalInfo
          isVisible={this.state.isVisitor}
          stateChanged={() => {
            this.setState({
              isVisitor: false,
            });
          }}
        />
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected,
  ordersList: state.list,
  cart_total: state.cart.cart_total,
  cart: state.cart.cart,

  cart_sub_total: state.cart.cart_sub_total,

  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  updateCart: bindActionCreators(updateCart, dispatch),
  refreshList: bindActionCreators(refreshList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
