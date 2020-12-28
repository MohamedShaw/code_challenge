import React from "react";
import { AppModal, AppView, AppText, AppIcon, AppScrollView } from "../common";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
const SortItem = props => {
  const { title, onPress } = props;
  return (
    <AppView
      touchableOpacity
      stretch
      height={7.5}
      row
      {...{ onPress }}
      borderBottomWidth={1}
      borderColor="background"
    >
      <AppIcon name="ios-arrow-back" color="white" marginHorizontal={3} />
      <AppText bold color="white" size={7}>
        {title}
      </AppText>
    </AppView>
  );
};
class SortModal extends React.Component {
  state = {
    isModalVisible: false
  };
  sortItems = [
    { title: I18n.t("most-related"), value: "mostCloesly" },
    { title: I18n.t("most-common"), value: "mostCommon" },
    { title: I18n.t("recently-arrived"), value: "recentlyArrived" },
    { title: I18n.t("from-low-to-high-price"), value: "lessToMore" },
    { title: I18n.t("from-high-to-low-price"), value: "moreToLess" }
  ];
  show = () => {
    this.setState({
      isModalVisible: true
    });
  };
  hide = () => {
    this.setState({
      isModalVisible: false
    });
  };
  renderModalContent = () => {
    return (
      <AppView
        marginHorizontal={5}
        height={80}
        marginTop={12}
        stretch
        backgroundColor="foreground"
        borderRadius={15}
        paddingHorizontal={5}
      >
        <AppScrollView stretch>
          <AppText bold color="white" marginVertical={5} size={6.5}>
            {I18n.t("sort-by")}
          </AppText>
          {this.sortItems.map((item, key) => {
            const { title, value } = item;
            return (
              <SortItem
                {...{ title }}
                onPress={() => {
                  this.hide();
                  this.props.onPress(`orderBy=${value}`);
                }}
                {...{ key }}
              />
            );
          })}
        </AppScrollView>
      </AppView>
    );
  };
  render = () => {
    const { ...rest } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={this.state.isModalVisible}
        closeable
        backdropDissmiss
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
)(SortModal);
