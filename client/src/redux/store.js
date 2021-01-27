import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productList,
  productDetails,
  productDelete,
  productCreate,
  productUpdate,
  productReviewCreate,
  productTopRated,
} from './reducers/productReducers';
import { cart } from './reducers/cartReducers';
import {
  userLogin,
  userRegister,
  userDetails,
  userUpdateProfile,
  userList,
  userDelete,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  orderCreate,
  orderDetails,
  orderPay,
  orderListMy,
  orderList,
  orderDeliver,
} from './reducers/orderReducers';

const reducer = combineReducers({
  productList,
  orderDeliver,
  productUpdate,
  productTopRated,
  productDetails,
  productReviewCreate,
  productCreate,
  cart,
  userLogin,
  userRegister,
  userDetails,
  userUpdateProfile,
  orderCreate,
  orderDetails,
  orderPay,
  orderList,
  orderListMy,
  userList,
  userDelete,
  userUpdate: userUpdateReducer,
  productDelete,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  //imamo pristup opet za cijeli state i tu handlamo initial state od cijelog statea
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
