import { UPDATE_CART, ADD_PRODUCT_CART, REMOVE_ITEM_IN_CART } from "./types";

export const updateCart = (payload) => ({
  type: UPDATE_CART,
  payload,
});

export const addProductToCart = (data, counter) => (dispatch) => {
  // console.log("DATA IN ATIONSSSS ,", data) ;

  dispatch({ type: ADD_PRODUCT_CART, payload: { ...data, counter } });
};

export const removeItem = (data) => (dispatch) => {
  console.log("************** in actions");

  dispatch({ type: REMOVE_ITEM_IN_CART, payload: data });
};
