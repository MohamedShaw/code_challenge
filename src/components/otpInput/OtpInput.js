import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppButton,
  AppNavigation,
  AppSpinner,
  AppOtpInput,
  showError,
  responsiveWidth,
} from "../../common";
import { SafeAreaView } from "react-native";
import styles from "./styles";
// import * as errors from '../../utils/Errors';

export default class OtpInput extends Component {
  state = {
    code: "",
    isSubmitting: false,
    sendLoading: false,
    reset: false,
  };

  handleSubmit = async () => {
    this.setState({
      isSubmitting: true,
    });

    if (this.props.forget) {
      this.handleResetPassword();
    } else {
      const verifyCode = this.state.code;
      let verifiedCode = false;
      try {
        verifiedCode = await phoneCheckRepo.verifyPhoneNumber(
          this.props.phone,
          verifyCode
        );
        console.log("verifiedCode", verifiedCode);
        if (verifiedCode) {
          if (this.props.isModal) {
            this.props.verifiedSuccess(true);
            AppNavigation.pop();
          } else {
            AppNavigation.push({
              name: "PersonalInformation",
              passProps: { phone: this.props.phone, popTo: this.props.popTo },
            });
          }
        }
      } catch (error) {
        if (error === errors.CONNECTION_ERROR) {
          // no connection
          this.props.onChangeState &&
            this.props.onChangeState(true, I18n.t("ui-networkConnectionError"));
        } else if (error === errors.INVALID_CODE) {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
          this.props.onChangeState &&
            this.props.onChangeState(true, I18n.t("wrong-verify-code"));
        } else if (typeof error === "object") {
          showError(error.message);
        }
      } finally {
        this.setState({
          isSubmitting: false,
        });
      }
    }
  };
  handleResetPassword = async () => {
    const verifyCode = this.state.code;
    this.setState({
      isSubmitting: true,
    });

    let verifiedCode = false;
    try {
      verifiedCode = await UpdatePasswordRepo.verifyUpdatePasswordRepo(
        this.props.phone,
        verifyCode
      );
      if (verifiedCode) {
        await AppNavigation.push({
          name: "resetPassword",
          passProps: { data: this.props.phone },
        });

        this.setState(
          {
            reset: true,
          },
          () => {
            this.setState({
              reset: false,
            });
          }
        );
      }
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        // no connection
        this.props.onChangeState &&
          this.props.onChangeState(true, I18n.t("ui-networkConnectionError"));
      } else if (error === errors.INVALID_CODE) {
        this.props.onChangeState &&
          this.props.onChangeState(true, I18n.t("wrong-verify-code"));
      } else if (typeof error === "object") {
        showError(error.message);
      }
    } finally {
      this.setState({
        isSubmitting: false,
      });
    }
  };

  reSendCode = async () => {
    if (this.state.sendLoading) return;

    this.setState({ errorTxt: "", sendLoading: true });
    const { phone } = this.props;

    let resendCode = false;
    try {
      resendCode = await phoneCheckRepo.checkPhoneNumber(phone);
      if (resendCode) {
        this.props.onChangeInfoModal(true, I18n.t("new-verify-code-sent"));
      }
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        // no connection
        this.props.onChangeState &&
          this.props.onChangeState(true, I18n.t("ui-networkConnectionError"));
      } else if (typeof error === "object") {
        showError(error.message);
      }
    } finally {
      this.setState(
        {
          sendLoading: false,
          reset: true,
        },
        () => {
          this.setState({
            reset: false,
          });
        }
      );
    }
  };

  reSendCodeForgetPassword = async () => {
    if (this.state.sendLoading) return;
    const { phone } = this.props;

    this.setState({ errorTxt: "", sendLoading: true });

    let resendCode = false;
    try {
      resendCode = await UpdatePasswordRepo.UpdatePasswordRepo(phone);
      if (resendCode) {
        this.props.onChangeInfoModal(true, I18n.t("new-verify-code-sent"));
      }
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        // no connection
        this.props.onChangeState &&
          this.props.onChangeState(true, I18n.t("ui-networkConnectionError"));
      } else if (typeof error === "object") {
        showError(error.message);
      }
    } finally {
      this.setState(
        {
          sendLoading: false,
          reset: true,
        },
        () => {
          this.setState({
            reset: false,
          });
        }
      );
    }
  };

  render() {
    return (
      <AppView stretch centerX flex>
        {this.props.otpScreen && (
          <>
            <AppView stretch centerX>
              <AppText marginTop={10} color="#777777" size={5.5}>
                {I18n.t("sms-message-otp")}
              </AppText>
              <AppText size={5.5}>{this.props.phone}</AppText>
              <AppText marginTop={10} color="#777777">
                {I18n.t("enter-verfication-code")}
              </AppText>
            </AppView>
          </>
        )}
        <AppOtpInput
          style={{ width: responsiveWidth(90), height: "20%" }}
          pinCount={4}
          code=""
          reset={this.state.reset}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputFieldStyleAfterAdd={styles.boxStyleBaseAfterAdd}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
            this.setState(
              {
                code: code,
              },
              () => {
                this.handleSubmit();
              }
            );
          }}
          // autoFocusOnLoad={true}
        />
        <AppView stretch center row marginTop={10}>
          <AppText color="#777777">{I18n.t("code-is-not arrived")}</AppText>
          {this.state.sendLoading ? (
            <AppView center>
              <AppSpinner size={6} />
            </AppView>
          ) : (
            <AppView
              onPress={() => {
                this.props.onConfirm();
              }}
            >
              <AppText color="primary">{I18n.t("resend-code")}</AppText>
            </AppView>
          )}
        </AppView>
        <AppView
          stretch
          stretchChildren
          style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        >
          <SafeAreaView>
            <AppView
              stretch
              paddingVertical={5}
              paddingHorizontal={6}
              borderTopWidth={0.5}
              borderColor="inputBorderColor"
            >
              <AppButton
                processing={this.state.isSubmitting}
                onPress={this.handleSubmit}
                stretch
              >
                {this.state.isSubmitting ? (
                  <AppView center>
                    <AppSpinner color="white" size={6} />
                  </AppView>
                ) : (
                  <AppText color="white" size={6}>
                    {I18n.t("sing-up-next")}
                  </AppText>
                )}
              </AppButton>
            </AppView>
          </SafeAreaView>
        </AppView>
      </AppView>
    );
  }
}
