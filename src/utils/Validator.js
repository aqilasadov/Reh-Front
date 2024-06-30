export function isEmpty(obj) {
    let name;
    for (name in obj ) {
        return false;
    }
    return true;
}

export function isValidPassword(psw) {
    return psw.length > 2;
}


export function ifNull(data, val = '') {
    if (data === undefined || data === null)
        return val;
    else
        return data;
}
// isNegativ
export function ifNegative(value, def = 0) {
    return value < 0 ? def : value;
}

// function that returns true if value is email, false otherwise
export function verifyEmail(value) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRex.test(value);

}

// function that verifies if value contains only numbers
export function verifyNumber(value) {

    if(value === '')
        return true;

    const numberRex = /[0-9]+/g;
    // if (!re.test(val))
    //     return;

    // const numberRex = new RegExp("^[0-9]+$");
    return numberRex.test(value);

}


// verifies if value is a valid URL
export function verifyUrl(value) {
    try {
        new URL(value);
        return true;
    } catch (_) {
        return false;
    }
}
