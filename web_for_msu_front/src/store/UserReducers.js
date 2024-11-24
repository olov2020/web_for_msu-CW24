const authStatus = {
    none: 'none',
    pupil: 'pupil',
    teacher: 'teacher',
    admin: 'admin',
    newsmaker: 'newsmaker',
}

const defaultState = {
    id: 0,
    email: "",
    authStatus: authStatus.newsmaker,
}

const SET_AUTH = "SET_AUTH"
const SET_NOTAUTH = "SET_NOTAUTH"

export const userReducer = (state = defaultState, action) => {
    const payload = action.payload

    switch (action.type) {
        case SET_AUTH:
            return {
                id: payload.id,
                email: payload.email,
                authStatus: payload.authStatus,
            }

        case SET_NOTAUTH:
            return {...defaultState}
        default:
            return state
    }
}

export const setAuthAction = (payload) => ({type: SET_AUTH, payload})
export const setNotAuthAction = (payload) => ({type: SET_NOTAUTH, payload})