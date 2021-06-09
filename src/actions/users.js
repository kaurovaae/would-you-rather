import {hideLoading, showLoading} from "react-redux-loading";
import {addNewUser} from "../utils/api";
import {setAuthedUser} from "./authedUser";

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_USER = 'SAVE_USER';
export const ADD_USER = 'ADD_USER';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function saveUser(user) {
    return {
        type: SAVE_USER,
        user
    }
}

export function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

export const handleAddUser = (name, password) => {
    return (dispatch, getState) => {
        dispatch(showLoading());

        return addNewUser({
            name,
            password
        })
            .then((user) => {
                dispatch(addUser(user));
                dispatch(setAuthedUser(user.id));
            })
            .then(() => dispatch(hideLoading()))
    }
};
