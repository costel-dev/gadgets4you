import { productList, productDetails, productConstants } from '../constants/productConstants';
import axios from 'axios';

// GET All Products
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: productList.PRODUCT_LIST_REQUEST
        });
        const { data } = await axios.get('/api/products/');

        dispatch({
            type: productList.PRODUCT_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: productList.PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

// GET One Product
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: productDetails.PRODUCT_DETAILS_REQUEST
        });
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: productDetails.PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: productDetails.PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: productConstants.PRODUCT_DELETE_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // Send a request and wait for our response from the backend 
        await axios.delete(`/api/products/${id}`, config);
        dispatch({
            type: productConstants.PRODUCT_DELETE_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: productConstants.PRODUCT_CREATE_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // Send a request and wait for our response from the backend 
        const { data } = await axios.post(`/api/products`, {}, config);
        dispatch({
            type: productConstants.PRODUCT_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}