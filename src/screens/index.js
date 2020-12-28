import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { Provider } from "react-redux";
import store from "../store";

import Home from "./home/Home";
import Menu from "./menu/Menu";
import Cart from "./cart/Cart";
import ProductDetailsList from "./productDetailsList/ProductDetails";
import { ProductDetails } from "./productDetails/ProductDetails";
import { IntroSwiper } from "./intro/Intro";

export default function () {
  const createScene = (InternalComponent) => () =>
    gestureHandlerRootHOC(
      class SceneWrapper extends Component {
        render() {
          return (
            <Provider store={store}>
              <InternalComponent {...this.props} />
            </Provider>
          );
        }
      }
    );

  Navigation.registerComponent("home", createScene(Home));
  Navigation.registerComponent("menu", createScene(Menu));
  Navigation.registerComponent("cart", createScene(Cart));
  Navigation.registerComponent(
    "productDetailsList",
    createScene(ProductDetailsList)
  );

  Navigation.registerComponent("productDetails", createScene(ProductDetails));
  Navigation.registerComponent("IntroSwiper", createScene(IntroSwiper));
}
