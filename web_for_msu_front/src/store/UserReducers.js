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
    directory: 'directory',
    sovet: 'sovet',
    admin: 'admin',
}

const defaultState = {
    id: 0,
    authStatus: authStatus.none,
    name: '',
    surname: '',
    email: '',
    photo: '',
    admin: '',
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
                name: payload.name,
                surname: payload.surname,
                email: payload.email,
                photo: payload.photo,
                admin: payload.admin,
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
    const photo = localStorage.getItem('photo');

    return setAuthAction({
        id: decodedToken.sub.id,
        authStatus: decodedToken.sub.roles,
        name: decodedToken.sub.name,
        surname: decodedToken.sub.surname,
        email: decodedToken.sub.email,
        photo: photo,
        admin: decodedToken.sub.admin,
    });
}