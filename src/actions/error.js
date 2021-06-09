export const SET_ERROR = 'SET_ERROR';

export function setError(message) {
    return {
        type: SET_ERROR,
        message
    }
}

export function handleClearError() {
    return (dispatch) => {
        dispatch(setError(null));
    }
}
