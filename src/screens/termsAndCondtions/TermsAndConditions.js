import React, { Component } from "react";

import { AppView, AppText, showError, AppScrollView, AppSpinner } from "../../common";
import { AppHeader } from "../../components";
import I18n from "react-native-i18n";
import Api, { ACCESS_DATA } from "../../utils/Network";

export default class TermsAndConditions extends Component {
  state = {
    terms: null,
    loading: true,
  };
  async componentDidMount() {
    try {
      const terms = await Api.get(
        `terms?accessKey=${ACCESS_DATA.accessKey}&accessPassword=${ACCESS_DATA.accessPassword}`
      );
      console.log("data", terms);
      
      this.setState({
        terms: terms.data.data,
        loading: false,
      });
    } catch (error) {
      showError(I18n.t("ui-error-happened"));
    }
  }
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("terms")} />
        {this.state.loading ? (
          <AppView center stretch flex>
            <AppSpinner />
          </AppView>
        ) : (
          <AppScrollView paddingVertical={5} paddingHorizontal={7}>
            <AppText>{this.state.terms.app_terms}</AppText>
          </AppScrollView>
        )}
      </AppView>
    );
  }
}
