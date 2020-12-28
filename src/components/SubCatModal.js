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
  AppNavigation,
} from "../common";

class SubCatModal extends React.Component {
  state = {
    isModalVisible: false,
    items: [],
    categories: [],
  };

  show = (items, categories) => {
    this.setState({
      isModalVisible: true,
      items,
      categories,
    });
  };

  hide = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  renderModalContent = () => {
    const { items } = this.state;
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
          {items.length > 0 ? (
            items.map((item, key) => (
              <AppView
                touchableOpacity
                onPress={() => {
                  this.hide();
                  AppNavigation.push({
                    name: "productsScreen",
                    passProps: {
                      title: item.sub_cat_name,
                      endPoint: "productssubcatsfilter",
                      params: [`subCatsIds=${item.cat_id}`],
                      slectedId: this.props.slectedId,
                      categories: this.state.categories,
                    },
                  });
                }}
                stretch
                center
                height={6}
                key={item.cat_id}
              >
                <AppText>{item.sub_cat_name}</AppText>
              </AppView>
            ))
          ) : (
            <AppView flex stretch center>
              <AppText>{I18n.t("no-sub-cats")}</AppText>

              <AppView
                touchableOpacity
                onPress={() => {
                  this.hide();
                  AppNavigation.push({
                    name: "productsScreen",
                    passProps: {
                      title: this.state.categories.main_cat_name,
                      endPoint: "productsfilter",
                      params: [`mainCatsIds=${this.state.categories.cat_id}`],
                      slectedId: this.state.categories.cat_id,
                      categories: this.state.categories,
                    },
                  });
                }}
               
                height={6}
                backgroundColor="foreground"
                marginTop={10}
                width={50}
                borderRadius={7}
                center
              >
                <AppText color="white">{this.state.categories.main_cat_name}</AppText>
              </AppView>
            </AppView>
          )}
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
        changeState={(v) => {
          this.setState({
            isModalVisible: v,
          });
        }}
        {...rest}
      >
        {this.renderModalContent()}
      </AppModal>
    );
  };
}

export default connect(null, null, null, { forwardRef: true })(SubCatModal);
