import {checkPassword}              from '../utils/api';
import {hideLoading, showLoading}   from "react-redux-loading";
import {setError}                   from "./error";

export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}

export function handleLogin(userId, password) {
    return (dispatch) => {
        dispatch(showLoading());
        return checkPassword(userId, password)
            .then((isValid) => {
                if (isValid) {
                    dispatch(setAuthedUser(userId));
                    dispatch(setError(null));
                } else {
                    dispatch(setError('Incorrect password. Please, try again.'));
                }
                dispatch(hideLoading());
            })
    }
}

export function handleLogout() {
    return (dispatch) => {
        dispatch(setAuthedUser(null));
    }
}
