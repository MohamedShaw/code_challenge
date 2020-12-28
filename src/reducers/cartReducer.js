import AsyncStorage from "@react-native-community/async-storage";
import * as types from "../actions/types";

const initialState = {
  cart_total: 0,
  items_count: 0,
  cart_sub_total: 0,
  cart_quantity: 0,
  cart: [],
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CART:
      console.log("action.payload ===>>>>>>>", action.payload);

      return {
        ...state,
        cart_sub_total: action.payload.cart_sub_total,
        cart_total: action.payload.cart_total,
        items_count: action.payload.items_count,
      };

    case types.ADD_PRODUCT_CART:
      console.log("action.payload", action.payload);

      let newCart = state.cart.slice();
      let items_count = state.items_count;
      // findIndex return 1 or -1
      const selected = newCart.findIndex(
        (item) => +item.id === +action.payload.id
      );

      console.log("selected", selected);

      if (selected >= 0) {
        if (action.payload.counter + newCart[selected].items_count < 0)
          return state;

        const addNewObj = action.payload;
        newCart[selected].items_count += action.payload.counter;
      } else {
        const addNewObj = action.payload;
        addNewObj.items_count = action.payload.counter;

        newCart = [...newCart, addNewObj];
      }

      console.log("newCart", newCart);

      items_count += +action.payload.counter;

      AsyncStorage.setItem("@CART", JSON.stringify(newCart));
      AsyncStorage.setItem("@COUNTER", JSON.stringify(items_count));

      return {
        ...state,
        cart: newCart,
        items_count: items_count,
      };

    case types.REMOVE_ITEM_IN_CART:
      const itemId = action.payload.id;

      const counterRemoved = action.payload.items_count;

      const cartAfterRemoved = state.cart.filter((item) => item.id !== itemId);
      // console.log("remove ====", cartRemoved);

      AsyncStorage.setItem("@CART", JSON.stringify(cartAfterRemoved));
      AsyncStorage.setItem(
        "@COUNTER",
        JSON.stringify(+(state.items_count - counterRemoved))
      );

      return {
        ...state,
        cart: [...cartAfterRemoved],
        items_count: state.items_count - counterRemoved,
      };
    case types.CLEAR_CART:
      return {
        cart_total: 0,
        items_count: 0,
        cart_sub_total: 0,
        cart_quantity: 0,
        cart: [],
      };

    default:
      return state;
  }
};
export default CartReducer;
