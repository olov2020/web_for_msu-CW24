import {jwtDecode} from "jwt-decode";

const authStatus = {
    none: 'none',
    pupil: 'pupil',
    teacher: 'teacher',
    retired: 'retired',
    newsmaker: 'newsmaker',
    coursemaker: 'coursemaker',
    marksmaker: 'marksmaker',
    auditorymaker: 'auditorymaker',
    admin: 'admin',
}

const defaultState = {
    id: 0,
    authStatus: `${authStatus.retired} ${authStatus.pupil}`,
}

const SET_AUTH = "SET_AUTH"
const SET_NOTAUTH = "SET_NOTAUTH"

export const userReducer = (state = defaultState, action) => {
    const payload = action.payload

    switch (action.type) {
        case SET_AUTH:
            return {
                id: payload.id,
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

export const setAuthFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    return setAuthAction({
        id: decodedToken.sub.id,
        authStatus: decodedToken.sub.roles,
    });
}