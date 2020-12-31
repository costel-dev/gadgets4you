import { userOrder } from '../constants/orderContants';
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: userOrder.ORDER_CREATE_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // Send a request and wait for our response from the backend 
        const { data } = await axios.post(`/api/orders`, order, config);
        dispatch({
            type: userOrder.ORDER_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: userOrder.ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}