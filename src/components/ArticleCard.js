import React, { Component } from "react";
import { connect } from "react-redux";
import { AppView, AppImage, AppText, AppNavigation } from "../common";

class ArticleCard extends Component {
  render() {
    const {
      art_title: title,
      art_content: desc,
      banner_img_url: img
    } = this.props.data;
    return (
      <AppView
        stretch
        flex
        row
        margin={5}
        elevation={2}
        centerX
        borderRadius={10}
        onPress={() => {
          const {
            art_title: title,
            art_content: desc,
            banner_img_url: img
          } = this.props.data;
          AppNavigation.push({
            name: "articlesDetails",
            passProps: {
              data: { img, title, desc }
            }
          });
        }}
      >
        <AppImage height={22} width={35} source={{ uri: img }} />
        <AppView
          flex
          stretch
          marginVertical={5}
          marginLeft={5}
          marginRight={10}
        >
          <AppText bold color="darkgrey">
            {title}
          </AppText>
          <AppText color="grey" numberOfLines={4}>
            {desc}
          </AppText>
        </AppView>
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(ArticleCard);
