import Animated, { Easing } from "react-native-reanimated";

const {
  spring,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
  call
} = Animated;

// Timing Aniamtion
export const runTiming = (clock, value, dest, cb) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 100,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest)
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, [call([], cb), stopClock(clock)]),
    // we made the block return the updated position
    state.position
  ]);
};

// Spring Animation

export const runSpring = (clock, value, dest, cb) => {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const config = {
    // damping: 15,
    // damping: 14,
    damping: 25,
    mass: 1,
    // stiffness: 121.6,
    stiffness: 20,
    overshootClamping: false,
    restSpeedThreshold: 10,
    restDisplacementThreshold: 10,
    toValue: new Value(0)
  };

  return block([
    cond(clockRunning(clock), set(config.toValue, dest), [
      // If the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.velocity, 1000),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    // we run the step here that is going to update position
    spring(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, [debug("", stopClock(clock)), call([], cb)]),
    // we made the block return the updated position
    state.position
  ]);
};
