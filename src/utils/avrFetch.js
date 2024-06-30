import getRequestHeaders from "./HeaderUtils";
import {logout, LOGOUT_USER} from "../redux/actions/loginAction";
import {isEmpty} from "./Validator";
import {LOGIN_KEY_TOKEN} from "./Constants";

export function avrFetch(input, init = {}, ignoreHeaders = []) {
    // Do stuff on arguments
    if(isEmpty(init.mode)) {
        init.mode = "cors";
    }

    if(isEmpty(init.headers)) {
        init.headers = new Headers();
    }
    else {
        let headers = init.headers;
        init.headers = new Headers();
        Object.keys(headers).forEach(function (key) {
            init.headers.append(key, headers[key]);
        });
    }

    // Set default headers if not provided
    for (let pair of getRequestHeaders().entries()) {
        // Ignore if is in ignore list
        if(ignoreHeaders.filter((element) => { return element.toLowerCase() === pair[0].toLowerCase();}).length > 0) {
            continue;
        }

        if(!init.headers.has(pair[0])) {
            init.headers.append(pair[0], pair[1]);
        }
    }
    return window.fetch(input, init).then(function(response) {
        // Do stuff with the response

        // Detect unauthorized request
        if(checkIfResponseUnAuthorized(response)) {
            //store.dispatch({type: LOGOUT_USER});
            logout({});
        }

        return response;
    });
}
export function AvrFetchException(message, source) {
    this.message = message;
    this.source = source;
};

export function validateResponse(response) {
    if (!response.ok) {

        localStorage.removeItem(LOGIN_KEY_TOKEN);
        console.log("sildim tokeni");
        window.location.reload();
        // if(checkIfResponseUnAuthorized(response)) {
        //
        //     logout({});
        // }
        throw new AvrFetchException('Произошла ошибка при подключении к сети!', response);
        // throw  new  logout({});
    }
    return response;
}

export function readResponseAsText(response) {
    return response.text();
}

export function readResponseAsJSON(response) {
    return response.json();
}

export function readResponseAsBlob(response) {
    return response.blob();
}

export function checkIfResponseUnAuthorized(response) {
    if(typeof response === "undefined")
        return false;

    if(response instanceof AvrFetchException)
        return typeof response.source !== "undefined" && response.source.status === 401;

    return response.status === 401;
}

export function logError(error) {
    //alert(error)
    console.log('Error on fetch: \n', error);
}
