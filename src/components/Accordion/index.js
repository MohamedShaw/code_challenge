import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import InitialAccordion from "./InitialAccordion";

class Accordion extends Component {
  state = {
    selected: null
  };

  setSelected = indx => {
    this.setState({
      selected: indx
    });
  };

  render() {
    const { data, spring, style } = this.props;

    console.log("marginTop", this.props.marginTop, data);
    
    return (
      <View style={[{ alignSelf: "stretch" }, style]}>
        {data.map((item, key) => (
          <InitialAccordion
            {...{ key }}
            spring={spring}
            title={item.title}
            content={item.content}
            onSelect={() => this.setSelected(key)}
            autoClose={key !== this.state.selected}
            marginTop={this.props.marginTop}
          />
        ))}
      </View>
    );
  }
}

export default Accordion;
