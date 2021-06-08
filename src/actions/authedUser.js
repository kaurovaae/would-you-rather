export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}

export function handleLogin(userId) {
    return (dispatch) => {
        dispatch(setAuthedUser(userId));
    }
}

export function handleLogout() {
    return (dispatch) => {
        dispatch(setAuthedUser(null));
    }
}
