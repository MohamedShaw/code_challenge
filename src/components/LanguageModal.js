import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import {
  AppView,
  AppText,
  AppModal,
  AppButton,
  showError,
  AppIcon,
  AppNavigation,
  AppSpinner,
} from "../common";
import RNRestart from "react-native-restart";

const lang = [
  { name: "العربيه", id: "ar" },
  { name: "الانجليزيه", id: "en" },
];

class LanguageModal extends Component {
  state = {
    onRestart: false,
  };
  render() {
    const { isVisible, ...rest } = this.props;
    if (this.state.onRestart) {
      return (
        <AppView stretch center flex backgroundColor="white" style={{position:'absolute', top:0, bottom:0, left:0, right:0}}>
          <AppView
            backgroundColor="#FFF"
            center
            width={80}
            paddingVertical={10}
            borderRadius={2}
          >
            <AppText
              size={7}
              bold
              center
              marginTop={3}
              style={{ color: "#4A4A4A" }}
              marginBottom={5}
            >
              {I18n.t("change_Lang_Message")}
            </AppText>
            <AppSpinner size={23} />
          </AppView>
        </AppView>
      );
    }
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        {...rest}
      >
        <AppView
          width={80}
          backgroundColor="white"
          paddingVertical={4}
          borderRadius={5}
          paddingHorizontal={4}
        >
          <AppView stretch center paddingVertical={5}>
            <AppText> {I18n.t("language")} </AppText>
          </AppView>
          {lang.map((item, index) => (
            <>
              <AppView stretch backgroundColor="white" row>
                <AppButton
                  center={false}
                  paddingVertical={3.5}
                  stretch
                  flex
                  backgroundColor="transparent"
                  onPress={() => {
                    this.props.onConfirm(item.id);

                    this.setState({
                      onRestart:true
                    })
                    setTimeout(() => {
                      RNRestart.Restart();
                    }, 2000);

                    // AppNavigation.pop(this.props.componentId);
                  }}
                  paddingHorizontal={3}
                  height={6}
                  touchableOpacity
                >
                  <AppView stretch centerY>
                    <AppText size={5.5} color="#6A6A6A" bold>
                      {item.name}
                    </AppText>
                  </AppView>
                </AppButton>
                <AppView
                  circleRadius={6.5}
                  center
                  borderColor="grey"
                  borderWidth={0.5}
                >
                  {this.props.selected || index === 0 ? (
                    <AppView
                      backgroundColor="primary"
                      circleRadius={6.5}
                      center
                    >
                      <AppIcon name="check" type="entypo" color="white" />
                    </AppView>
                  ) : null}
                </AppView>
              </AppView>
              <AppView
                borderBottomColor={index === 1 ? undefined : "grey"}
                borderBottomWidth={index === 1 ? undefined : 0.5}
                stretch
                marginVertical={2}
              />
            </>
          ))}
        </AppView>
      </AppModal>
    );
  }
}
const mapStateToProp = (state) => ({
  currentUser: state.auth.currentUser,
  rtl: state.lang.rtl,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProp, mapDispatchToProps)(LanguageModal);
