import React, { Component } from "react";
import { connect } from "react-redux";

import { AppView, AppText, AppImage } from "../common";

class HomeCategoryCard extends Component {
  render() {
    const { img, name, onPress } = this.props;

    const equalSize = 28;
    return (
      <AppView
        {...{ onPress }}
        center
        borderRadius={10}
        equalSize={equalSize}
        elevation={2}
        marginVertical={3}
      >
        <AppImage
          flex
          stretch
          // height={12}
          source={img}
          resizeMode="cover"
          // backgroundColor="green"
        />
        <AppView stretch height={5} center>
          <AppText bold color="foreground" size={4} numberOfLines={2}>
            {name}
          </AppText>
        </AppView>
      </AppView>
    );
  }
}

export default connect()(HomeCategoryCard);
