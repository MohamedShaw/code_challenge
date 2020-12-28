import React, { Component } from "react";
import I18n from "react-native-i18n";
import { AppButton, AppView, AppText, AppList,AppNavigation } from "../common";

class MyOrdersCard extends Component {
  render() {
    const pending = "pending";
    const { created_since, order_status, order_id,order_encrypted_id } = this.props.data;
    const statusColor = {
      "الطلب قيد الانتظار": "#C2E0B7",
      refused: "#E59A9A",
      cancelled: "#E59A9A",
      received: "",
      processed: "",
      "تم تغليف الطلب": "foreground",
      shipped: "",
      "تم استلام الطلب": "#A5CBE3",
      done: "",
    };
    return (
      <AppView
        stretch
        // paddingHorizontal={7}
        paddingVertical={5}
        row
        spaceBetween
        marginBottom={3}
        backgroundColor="#C9C9C9"
        onPress={() =>
          AppNavigation.push({
            name: "orderDetails",
            passProps: {
              orderId: order_id,
              order_encrypted_id: order_encrypted_id
            },
          })
        }
      >
        <AppView flex center>
          <AppText>{I18n.t("order-id")}</AppText>
          <AppText>{order_encrypted_id}</AppText>
        </AppView>
        <AppView flex center>
          <AppText>{I18n.t("order-date")}</AppText>
          <AppText>{created_since}</AppText>
        </AppView>
        <AppView flex center>
          <AppText>{I18n.t("order-state")}</AppText>
          <AppView
            paddingHorizontal={4}
            backgroundColor={statusColor[order_status]}
            borderRadius={5}
          >
            <AppText>{order_status}</AppText>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}

export default MyOrdersCard;
