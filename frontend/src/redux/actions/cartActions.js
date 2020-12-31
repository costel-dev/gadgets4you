import axios from 'axios';
import { cartUser } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
        type: cartUser.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });
    // Store our cart into localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: cartUser.CART_REMOVE_ITEM,
        payload: id
    });
    // Remove from our localStorage
    localStorage.removeItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (formData) => (dispatch) => {
    dispatch({
        type: cartUser.CART_SAVE_SHIPPING_ADDRESS,
        payload: formData
    });
    // Store to our localStorage
    localStorage.setItem('shippingAddress', JSON.stringify(formData));
}

export const savePaymentMethod = (formData) => (dispatch) => {
    dispatch({
        type: cartUser.CART_SAVE_PAYMENT_METHOD,
        payload: formData
    });
    // Store to our localStorage
    localStorage.setItem('paymentMethod', JSON.stringify(formData));
}