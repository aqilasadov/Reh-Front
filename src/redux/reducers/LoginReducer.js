import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER, SET_CURRENT_USER} from "../actions/loginAction";
import {AUTH_USERINFO_KEY, LOGIN_KEY_TOKEN} from "../../utils/Constants";
import parseJwt from "../../utils/parseJwt";
import {isEmpty} from "../../utils/Validator";

const initialState = {
    isAuthenticated: false,
    logInProgress: false,
    signInErrorMessage: '',
    resetCaptcha: true,
    user: {}
};

export default (state = initialState, action) => {
    console.log('LoginReducer: ', action);
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                logInProgress: true,
                isAuthenticated: false,
                signInErrorMessage: '',
                resetCaptcha: false,
            });

        case LOGIN_SUCCESS:
            localStorage.setItem(LOGIN_KEY_TOKEN, action.token);
            localStorage.setItem(AUTH_USERINFO_KEY, JSON.stringify(action.userInfo));
            const user = parseJwt(action.token);
            console.log('LoginReducer: ', user);
            return Object.assign({}, state, {
                logInProgress: false,
                isAuthenticated: true,
                user: user,
                resetCaptcha: false,
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                logInProgress: false,
                signInErrorMessage: action.error.error,
                resetCaptcha: true,
            });

        case SET_CURRENT_USER:
            if (isEmpty(action.token)) {
                return state;
            }
            localStorage.setItem(LOGIN_KEY_TOKEN, action.token);
            let decodeToken = parseJwt(action.token);
            return {
                isAuthenticated: !isEmpty(decodeToken),
                user: decodeToken
            };
        case LOGOUT_USER:
            localStorage.removeItem(LOGIN_KEY_TOKEN);
            localStorage.removeItem(AUTH_USERINFO_KEY);
            return {
                isAuthenticated: false,
                user: {}
            };
        default:
            return state;
    }
}
