import React, { Component, useRef, useState } from "react";

import { AppHeader } from "../../components";
import { AppView, AppImage, AppText, AppButton, AppInput } from "../../common";
import { QuantityButton } from "../../components/CartCard";

export const ProductDetails = (props) => {
  console.log("props ==>>", props.data);
  const [counter, setCounter] = useState(1);
  let counterX = 1;
  const updateValue = (n) => {
    if (counter <= 1) {
      setCounter(1);
    } else {
      counterX = counter + n;
      setCounter(counterX);
    }
  };
  const renderQuantity = () => (
    <AppView flex height={5} row>
      <QuantityButton
        onPress={() => updateValue(-1)}
        name="minus"
        type="entypo"
      />
      <AppText>{counter}</AppText>
      <QuantityButton
        onPress={() => updateValue(1)}
        name="plus"
        type="entypo"
      />
    </AppView>
  );

  const { name, product_img, price, weight } = props.data;
  return (
    <AppView stretch flex backgroundColor="#E4E4E4">
      <AppHeader title={name} />
      <AppView
        stretch
        flex
        borderBottomLeftRadius={40}
        borderBottomRightRadius={40}
        backgroundColor="white"
        elevation={1.2}
        centerX

        // marginBottom={1}
      >
        <AppImage
          source={{ uri: product_img }}
          height={30}
          width={50}
          centerSelf
          marginTop={25}
        />
        <AppText bold size={12}>
          {name}
        </AppText>
        <AppText bold size={12}>
          {weight}
        </AppText>
        <AppText bold size={12}>
          {price}
        </AppText>

        <AppView stretch row marginHorizontal={7}>
          <AppText bold size={12}>
            Qty
          </AppText>
          {renderQuantity()}
        </AppView>
        <AppView stretch row marginHorizontal={7}>
          <AppText bold size={12}>
            Total
          </AppText>
          <AppText bold size={12} marginHorizontal={10} color="primary">
            {price}
          </AppText>
        </AppView>
        <AppText marginHorizontal={7} bold>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et
        </AppText>
        <AppButton
          stretch
          backgroundColor="primary"
          marginHorizontal={7}
          title={"ADD TO CART"}
          marginTop={10}
        />
      </AppView>
    </AppView>
  );
};
