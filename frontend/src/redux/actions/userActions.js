import axios from 'axios';
import { userConstants } from '../constants/userConstants';
import { userOrder } from "../constants/orderContants";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: userConstants.USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // Send a request and wait for our response from the backend 
        const { data } = await axios.post('/api/users/login', { email, password}, config);
        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: data
        });
        // Set user to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: userConstants.USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: userConstants.USER_LOGOUT });
    dispatch({ type: userConstants.USER_DETAILS_RESET });
    dispatch({ type: userOrder.MY_ORDERS_LIST_RESET });
    dispatch({ type: userConstants.USER_LIST_RESET });
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: userConstants.USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // Send a request and wait for our response from the backend 
        const { data } = await axios.post('/api/users', {name, email, password}, config);
        dispatch({
            type: userConstants.USER_REGISTER_SUCCESS,
            payload: data
        });
        // Login the user after register
        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: data
        });
        // Set user to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: userConstants.USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: userConstants.USER_DETAILS_REQUEST
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
            type: userConstants.USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: userConstants.USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const updateUserProfile = (updatedUser) => async (dispatch, getState) => {
    try {
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_REQUEST
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
            type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });

        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: userConstants.USER_LIST_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // Send a request and wait for our response from the backend 
        const { data } = await axios.get(`/api/users`, config);
        dispatch({
            type: userConstants.USER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: userConstants.USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: userConstants.USER_DELETE_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // Send a request and wait for our response from the backend 
        await axios.delete(`/api/users/${id}`, config);
        dispatch({
            type: userConstants.USER_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: userConstants.USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const updateUser = (userToUpdate) => async (dispatch, getState) => {
    try {
        dispatch({
            type: userConstants.USER_UPDATE_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // Send a request and wait for our response from the backend 
        const { data } = await axios.put(`/api/users/${userToUpdate._id}`, userToUpdate, config);
        dispatch({
            type: userConstants.USER_UPDATE_SUCCESS,
        });
        dispatch({
            type: userConstants.USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: userConstants.USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}