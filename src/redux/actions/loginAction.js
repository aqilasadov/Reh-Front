import {avrFetch, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import {BACKEND_URL, LOGIN_KEY_TOKEN} from "../../utils/Constants";
import getRequestHeaders from "../../utils/HeaderUtils";
import {isEmpty} from "../../utils/Validator";


export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// LOGIN ACTIONS
function logInRequest() {
    return {
        type: LOGIN_REQUEST
    }
}

function logInSuccess(token) {
    console.log("token333",token);

    return {
        type: LOGIN_SUCCESS,
        token:token.token,
       userInfo: token.userInfo,
    }
}

function logInFailure(err) {
    console.log('logInFailure: ', err);
    return {
        type: LOGIN_FAILURE,
        error: err
    }
}

export function loadUserInfo() {
    const token = localStorage.getItem(LOGIN_KEY_TOKEN);
    return setCurrentUser(token);
}

export function setCurrentUser(token) {

    return {
        type: SET_CURRENT_USER,
        token
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    };
}

export function login(loginUser) {
    console.log('authenticate', loginUser);
    return (dispatch) => {
        dispatch(logInRequest());
        return avrFetch(BACKEND_URL + '/api/user/login',
            {
                mode: 'cors',
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify(loginUser)
            }, ['Authorization', 'Accept'])
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (result) => {

                    if (result.code) {

                        dispatch(logInSuccess(result.data));
                    }
                    else {
                        dispatch(logInFailure({error: result.message}));
                    }

                },
                (error) => {
                    alert(error.message);
                    dispatch(logInFailure({error: error.message}));
                }
            );
    }
}


export function logout() {
    return dispatch => {
        return fetch(BACKEND_URL + '/api/user/logout', {
                mode: 'cors',
                headers: getRequestHeaders(),
                method: 'GET',
                // Todo Burda method GET olmasi lazimdi, Mock proqrama gore POST qoymali olduq, N MOCK proqram style
                //body: JSON.stringify(data)
            }
        ).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then(jsonRes => {
        }).finally(() => {
            dispatch(logoutUser());

        })
    };
}
