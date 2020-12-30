import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
});
// Get cart items from localStorage if exists
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
// Get user info from localStorage if exists
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
// Get shipping address from localStorage if exists
const shippindAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

// Initiliaze our state with info from our localStorage
const initialState = {
    cart: { cartItems: cartItemsFromStorage, 
            shippingAddress: shippindAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const  store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;