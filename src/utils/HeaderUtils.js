import {isEmpty} from "./Validator";
import {LOGIN_KEY_TOKEN} from "./Constants";

const requestHeaders = new Headers({
    'Accept': 'application/json',
    "Content-type": "application/json; charset=UTF-8",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Cache-Control': 'max-age=20, min-fresh=15',
});

Object.freeze(requestHeaders);

export default function getRequestHeaders() {
    let authToken = "Bearer "+localStorage.getItem(LOGIN_KEY_TOKEN);

    if(isEmpty(authToken)) {
        requestHeaders.delete("Authorization");
    }
    else {
        requestHeaders.delete("Authorization");
        requestHeaders.append("Authorization", `${authToken}`);
    }
    return requestHeaders;
}
