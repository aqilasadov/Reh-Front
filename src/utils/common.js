import {LOGIN_KEY_TOKEN} from "../utils/Constants";

import jwt_decode from 'jwt-decode/lib/index';
import {
   } from "../constants/PrivilegeTypes";
import {PRIV_SELL_WAREHOUSE} from "../constants/PrivilegeTypes";
import {PRIV_BUY_WAREHOUSE} from "../constants/PrivilegeTypes";
import {PRIV_KASSABANK} from "../constants/PrivilegeTypes";
import {PRIV_REPORT} from "../constants/PrivilegeTypes";
import {PRIV_SETTINGS} from "../constants/PrivilegeTypes";

export function ifNull(data, val = '') {
    if (data === undefined || data === null)
        return val;
    else
        return data;
}

export function isEmpty(obj) {
    let name;
    for (name in obj) {
        return false;
    }
    return true;
}

export function isValidPassword(psw) {
    return psw.length > 3;
}

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function createAutoCompleteObj(idTitleList) {
    if (isEmpty(idTitleList))
        return;
    return idTitleList.map(item => ({value: item.id, label: item.title}));
}

export function getAuthToken() {
    return localStorage.getItem(LOGIN_KEY_TOKEN);
}

function userHasAccessId(arrayIds) {
    let authToken = getAuthToken();
    if (isEmpty(authToken)) return false;
    let jwt = jwt_decode(authToken);

    if (isEmpty(jwt)) return false;

    if (jwt.code == null) return false;

    let found = false;
    arrayIds.forEach(function (id) {
        if (!found && jwt.code.indexOf(id) > -1) found = true;
    });

    return found;
}

export function userHasAccess(privType) {
    return true;
    // Tam selahiyyeti varsa herzaman true qaytar
  //  if (userHasAccessId([66])) return true;

    switch (privType) {
        case PRIV_SELL_WAREHOUSE:
            return userHasAccessId([6]);

        case PRIV_BUY_WAREHOUSE:
            return userHasAccessId([7]);

        case PRIV_KASSABANK:
            return userHasAccessId([8]);

        case PRIV_REPORT:
            return userHasAccessId([9]);

        case PRIV_SETTINGS  :
            return userHasAccessId([10]);


        default:
            return false;
    }
}
