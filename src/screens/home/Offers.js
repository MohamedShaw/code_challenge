import React, { Component } from "react";
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppButton,
  AppNavigation
} from "../../common";
import I18n from "react-native-i18n";
import productImg from "../../assets/imgs/product2.png";
import { ProductCard, Loader } from "../../components";

const Offers = () => {
  const [loading, data] = useGet("productsoffers");
  return (
    <AppView stretch marginVertical={5}>
      <AppView stretch row spaceBetween>
        <AppText size={7} bold color="darkgrey">
          {I18n.t("best-offers")}
        </AppText>
        <AppButton
          transparent
          onPress={() =>
            AppNavigation.push({
              name: "offersProductsScreen",
              passProps: {
                title: I18n.t("best-offers"),
                endPoint: "offers"
              }
            })
          }
        >
          <AppText size={7} bold color="foreground">
            {I18n.t("more")}
          </AppText>
        </AppButton>
      </AppView>
      <AppScrollView stretch horizontal marginVertical={5}>
        {loading ? (
          <Loader />
        ) : (
          data.map(item => {
            return <ProductCard {...{ key: item.product_id }} {...item} />;
          })
        )}
      </AppScrollView>
    </AppView>
  );
};
export default Offers;
