import { Platform } from "react-native";

export default {
  statusBar: Platform.Version < 23 ? "#6EA842" : "transparent",
  foreground: "#6FB050",
  primary: "#D9550A",
  background: "#A6E478",
  secondary: "#FFDD00",
  thirdly: "#ee4037",
  primaryLight: "#00397A",
  safe: "#007F41",
  warning: "#FFC107",
  error: "#D0021B",
  danger: "#C62828",
  disabled: "#AcB5BB",
  grey: "#AEAEAE",
  darkgrey: "#787879",
  inputBorderColor: "#F1F2F0",
  inputBorderWidth: 0.5,
  star: "#FFC850",
  online: "#6EC245",
  offline: "#D70707",
};
