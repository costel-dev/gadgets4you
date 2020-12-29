import { productList, productDetails } from '../constants/productConstants';
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