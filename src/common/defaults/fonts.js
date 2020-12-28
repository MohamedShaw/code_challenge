import { Platform } from "react-native";

export default {
  normal: Platform.OS === "ios" ? "Cairo-Regular" : "Cairo-Regular",
  bold: Platform.OS === "ios" ? "Cairo-Bold" : "Cairo-Bold",
  boldIsStyle: true
};
