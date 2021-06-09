import {RECEIVE_USERS, SAVE_USER}               from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };
        case SAVE_USER:
            return {
                ...state,
                [action.user.id]: action.user
            };
        default:
            return state;
    }
}
