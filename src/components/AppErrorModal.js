import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  AppModal,
  responsiveFontSize,
  moderateScale
} from "../common";

class AppErrorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: props.errorMessage,
      errorText: props.errorText,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.visible && this.props.visible) {
      const { errorMessage, errorText } = this.props;
      this.setState({ errorMessage, errorText });
    }
  };

  renderInvalidModal = () => {
    const { visible, fromSignIn, skip, color, label, ...rest } = this.props;

    const { errorMessage, errorText } = this.state;

    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        hideModalContentWhileAnimating
        {...rest}
        isVisible={visible}
      >
        <AppView
          paddingHorizontal={10}
          borderRadius={2}
          stretch
          backgroundColor="white"
          style={{
            backgroundColor: "white",
            alignSelf: "center",

            borderRadius: moderateScale(2),
          }}
          width={80}
        >
          <AppView centerX stretch paddingTop={8}>
            <AppIcon
              name="warning"
              type="font-awesome"
              size={28}
              color={color || "#4A4A4A"}
            />
          </AppView>
          <AppView stretch centerX paddingVertical={5}>
            {errorMessage &&
              errorMessage.map((item, index) => (
                <AppText
                  lineHeight={10.5}
                  size={6}
                  center
                  marginTop={3}
                  style={styles.errorModalText}
                  key={index}
                >
                  {item}
                </AppText>
              ))}
            {errorText && (
              <AppText
                lineHeight={10.5}
                size={6}
                center
                marginTop={3}
                style={{
                  errorModalText: {
                    color: "#4A4A4A",
                    lineHeight: responsiveFontSize(9),
                  },
                }}
              >
                {errorText}
              </AppText>
            )}
          </AppView>

          <AppView stretch marginBottom={5} paddingTop={5}>
            <AppButton
              touchableOpacity
              title={label || (skip ? I18n.t("skip") : I18n.t("try-it-again"))}
              stretch
              height={7}
              onPress={() => {
                if (this.props.onConfirm) {
                  this.props.onConfirm();
                } else {
                  this.props.changeState(false);
                }
              }}
            />
          </AppView>
        </AppView>
      </AppModal>
    );
  };

  render() {
    return <React.Fragment>{this.renderInvalidModal()}</React.Fragment>;
  }
}

export default AppErrorModal;
