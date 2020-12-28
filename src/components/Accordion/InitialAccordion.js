import React, { Component } from "react";
import { View, Text } from "react-native";

import CalculatedAccordion from "./CalculatedAccordion";

class InitialAccordion extends Component {
  state = {
    minHeight: 0,
    maxHeight: 0,
    isTitleReady: false,
    isContentReady: false
  };

  setMinHeight = ({ nativeEvent }) => {
    if (this.state.minHeight === 0)
      this.setState({
        minHeight: nativeEvent.layout.height,
        isTitleReady: true
      });
  };

  setMaxHeight = ({ nativeEvent }) => {

    console.log("nativeEvent.layout",nativeEvent.layout);
    
    if (this.state.maxHeight === 0)
      this.setState({
        maxHeight: nativeEvent.layout.height,
        isContentReady: true
      });
  };

  render() {
    const { title, content, spring, autoClose, onSelect } = this.props;
    const { isContentReady, isTitleReady, minHeight, maxHeight } = this.state;
    const isReady = isContentReady && isTitleReady;

    if (!isReady)
      return (
        <View
          style={[
            {
              alignSelf: "stretch",

              overflow: "hidden",
              opacity: 0
            }
          ]}
        >
          <View
            style={{
              alignSelf: "stretch",
              alignItems: "center",
              justifyContent: "center"
            }}
            onLayout={this.setMinHeight}
          >
            {typeof title === "string" ? <Text>{title}</Text> : title(false)}
          </View>
          <View
            style={{
              alignSelf: "stretch",
              alignItems: "center"
            }}
            onLayout={this.setMaxHeight}
          >
            {typeof content === "string" ? <Text>{content}</Text> : content}
          </View>
        </View>
      );
      console.log("content", content);
      
    return (
      <CalculatedAccordion
        autoClose={autoClose}
        spring={spring}
        title={title}
        content={content}
        minHeight={minHeight}
        maxHeight={maxHeight}
        onSelect={onSelect}
        marginTop={this.props.marginTop}
      />
    );
  }
}

export default InitialAccordion;
