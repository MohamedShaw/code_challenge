import React, { Component } from "react";
import Animated, { Easing } from "react-native-reanimated";
import { StyleSheet, View, Text } from "react-native";

import { State, TapGestureHandler } from "react-native-gesture-handler";
import { runTiming, runSpring } from "../AnimUtils";

const { cond, Value, event, debug, call, eq, stopClock, Clock, or } = Animated;

class CalculatedAccordion extends Component {
  state = {
    isReady: false,
    isClosed: true,
  };

  gestureState = new Value(State.UNDETERMINED);

  clock = new Clock();

  isOpen = new Value(-1);

  springHeight = cond(
    eq(this.gestureState, State.UNDETERMINED),

    [
      call([], () => {
        console.log("spring");
        if (!this.state.isReady)
          this.setState({
            isReady: true,
          });
      }),
      cond(
        eq(this.isOpen, -1),
        this.props.minHeight,
        this.props.minHeight + this.props.maxHeight
      ),
    ],

    cond(
      eq(this.isOpen, -1),
      [
        runSpring(
          this.clock,
          this.props.minHeight,
          this.props.minHeight + this.props.maxHeight,
          () => {
            this.isOpen.setValue(1);
            this.gestureState.setValue(State.UNDETERMINED);
          }
        ),
      ],
      [
        runSpring(
          this.clock,
          this.props.minHeight + this.props.maxHeight,
          this.props.minHeight,
          () => {
            this.isOpen.setValue(-1);
            this.gestureState.setValue(State.UNDETERMINED);
          }
        ),
      ]
    )
  );

  timingHeight = cond(
    eq(this.gestureState, State.UNDETERMINED),

    [
      debug("BUTTON ", this.gestureState),
      stopClock(this.clock),
      call([], () => {
        console.log("timing Undetermined");
        if (!this.state.isReady) {
          this.setState({
            isReady: true,
          });

          console.log("Not ready");
        }
      }),
      cond(
        eq(this.isOpen, -1),
        this.props.minHeight,
        this.props.minHeight + this.props.maxHeight
      ),
    ],

    cond(
      eq(this.isOpen, -1),
      [
        runTiming(
          this.clock,
          this.props.minHeight,
          this.props.minHeight + this.props.maxHeight,
          () => {
            this.gestureState.setValue(State.UNDETERMINED);
            console.log("timing open");
            this.isOpen.setValue(1);
            this.props.onSelect();
            this.setState({
              isClosed: false,
            });
          }
        ),
      ],
      [
        runTiming(
          this.clock,
          this.props.minHeight + this.props.maxHeight,
          this.props.minHeight,
          () => {
            this.gestureState.setValue(State.UNDETERMINED);
            console.log("timing close");
            this.isOpen.setValue(-1);
            this.setState({
              isClosed: true,
            });
          }
        ),
      ]
    )
  );

  onStateChange = event([
    {
      nativeEvent: {
        state: this.gestureState,
      },
    },
  ]);

  close = () => {
    this.gestureState.setValue(State.ACTIVE);
    this.isOpen.setValue(1);
  };

  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.autoClose !== this.props.autoClose &&
      nextProps.autoClose &&
      !this.state.isClosed
    ) {
      this.close();
    }
  };

  render() {
    const { title, content, spring } = this.props;
    return (
      <Animated.View
        style={[
          {
            // backgroundColor: 'red',
            alignSelf: "stretch",

            overflow: "hidden",
            height: spring ? this.springHeight : this.timingHeight,
            opacity: this.state.isReady ? 1 : 0,
          },
        ]}
      >
        <TapGestureHandler
          minDist={0}
          onHandlerStateChange={this.onStateChange}
        >
          <Animated.View
            style={{
              alignSelf: "stretch",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {typeof title === "string" ? (
              <Text>{title}</Text>
            ) : (
              title(this.state.isClosed)
            )}
          </Animated.View>
        </TapGestureHandler>
        <View
          style={{
            alignSelf: "stretch",
            alignItems: "center",
            marginTop:  this.props.marginTop ? this.props.marginTop : undefined,
            paddingBottom:10
          }}
        >
          {typeof content === "string" ? <Text>{content}</Text> : content}
        </View>
      </Animated.View>
    );
  }
}

export default CalculatedAccordion;
