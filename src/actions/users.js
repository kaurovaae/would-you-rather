export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_USER = 'SAVE_USER';

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
