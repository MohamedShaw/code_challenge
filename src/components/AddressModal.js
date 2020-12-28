import React from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import {
  AppModal,
  AppView,
  AppText,
  AppIcon,
  AppButton,
  AppScrollView,
  AppNavigation
} from "../common";
import Api, { ACCESS_DATA } from "../utils/Network";
import Loader from "./Loader";

class AddressModal extends React.Component {
  state = {
    isModalVisible: false,
    items: [],
    loading: true
  };

  async componentDidMount() {
    console.log("data");

    try {
      const res = await Api.get(
        `clientaddresses?accessKey=${ACCESS_DATA.accessKey}&accessPassword=${
          ACCESS_DATA.accessPassword
        }&clientId=${this.props.currentUser.id}`
      );
      this.setState({
        items: res.data.data,
        loading: false
      });

      console.log("data ^^^^^^^^^سسسس-->>", res.data.data);
    } catch (error) {
      this.setState({
        loading: false
      });
    }
  }

  show = items => {
    this.setState({
      isModalVisible: true,
      items
    });
  };

  hide = () => {
    this.setState({
      isModalVisible: false
    });
  };

  renderModalContent = () => {
    const { items, loading } = this.state;
    console.log("loading ", items);

    if (!loading)
      return (
        <AppView
          touchableOpacity
          onPress={() => {
            this.hide();
            AppNavigation.push({
              name: "addNewAddress"
            });
          }}
          stretch
          center
          height={6}
        >
          <AppText>{I18n.t("add-new-address")}</AppText>
        </AppView>
      );
    return (
      <AppView
        marginHorizontal={5}
        height={60}
        marginTop={12}
        stretch
        borderRadius={15}
        paddingHorizontal={5}
        backgroundColor="white"
      >
        <AppScrollView stretch marginTop={10}>
          {loading ? (
            <Loader />
          ) : items.length !== 0 ? (
            items.map((item, key) => (
              <AppView
                touchableOpacity
                onPress={() => {
                  this.hide();
                  this.props.onSelect(item.adr_id);
                }}
                stretch
                center
                height={6}
              >
                <AppText>{item.full_address}</AppText>
              </AppView>
            ))
          ) : (
            <AppView flex stretch center>
              <AppText>{I18n.t("no-sub-cats")}</AppText>
            </AppView>
          )}
          <AppView stretch>
            <AppText>{I18n.t("or")}</AppText>
          </AppView>
          <AppView
            touchableOpacity
            onPress={() => {
              this.hide();
              AppNavigation.push({
                name: "addNewAddress"
              });
            }}
            stretch
            center
            height={6}
          >
            <AppText>{I18n.t("add-new-address")}</AppText>
          </AppView>
        </AppScrollView>
      </AppView>
    );
  };

  render = () => {
    const { ...rest } = this.props;
    return (
      <AppModal
        backdropOpacity={0.1}
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={this.state.isModalVisible}
        closeable
        backdropDissmiss
        // onBackdropPress={this.hide}
        changeState={v => {
          this.setState({
            isModalVisible: v
          });
        }}
        {...rest}
      >
        {this.renderModalContent()}
      </AppModal>
    );
  };
}

export default connect(
  null,
  null,
  null,
  { forwardRef: true }
)(AddressModal);
