import axios from 'axios';
import { user } from '../constants/userConstants';
import { userOrder } from "../constants/orderContants";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: user.USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // Send a request and wait for our response from the backend 
        const { data } = await axios.post('/api/users/login', { email, password}, config);
        dispatch({
            type: user.USER_LOGIN_SUCCESS,
            payload: data
        });
        // Set user to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: user.USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: user.USER_LOGOUT });
    dispatch({ type: user.USER_DETAILS_RESET });
    dispatch({ type: userOrder.MY_ORDERS_LIST_RESET });
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: user.USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // Send a request and wait for our response from the backend 
        const { data } = await axios.post('/api/users', {name, email, password}, config);
        dispatch({
            type: user.USER_REGISTER_SUCCESS,
            payload: data
        });
        // Login the user after register
        dispatch({
            type: user.USER_LOGIN_SUCCESS,
            payload: data
        });
        // Set user to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: user.USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: user.USER_DETAILS_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // Send a request and wait for our response from the backend 
        const { data } = await axios.get(`/api/users/${id}`, config);
        dispatch({
            type: user.USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: user.USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const updateUserProfile = (updatedUser) => async (dispatch, getState) => {
    try {
        dispatch({
            type: user.USER_UPDATE_PROFILE_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // Send a request and wait for our response from the backend 
        const { data } = await axios.put(`/api/users/profile`, updatedUser, config);
        dispatch({
            type: user.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: user.USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}