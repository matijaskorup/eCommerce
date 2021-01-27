import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../actionTypes';

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: '',
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      let item = action.payload;
      //product ce nam biti kao id
      let existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          //znaci prodemo kroz cartItems i samo zamjenimo postojeci item sa duplikatom (iako su jednaki)
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x,
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload,
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
