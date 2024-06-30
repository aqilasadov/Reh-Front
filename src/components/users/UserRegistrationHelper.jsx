import React from "react";
import {BACKEND_URL} from "../../utils/Constants";
import ValueLabel from "../../utils/ValueLabel";
import Address from "../../utils/model/Address";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";


export const MODULE_NAME = 'Пользователи';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/users/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/users/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/users/{id}';
export const INSERT_URL = BACKEND_URL + '/api/users/insupd';
export const DELETE_URL = BACKEND_URL + '/api/users/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: id,
        branch: !item.branch || item.branch === null ? '' : item.branch.label,
        address: !item.address || item.address === null ? '' : item.address,
        email: item.email,
        fullname: item.fullname,
        mobile: item.mobile,
        username: item.username,
        action:
            <div style={{display: 'flex', justifyContent: 'center',}}>
                <Tooltip title="Edit">
                    <IconButton aria-label="Redaktə et" onClick={() => onClick({clickFor: 'TABLE_CLICK', action: 'EDIT_ROW', id: id})}>
                        <Edit/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                    <IconButton aria-label="Sil" onClick={() => onClick({clickFor: 'TABLE_CLICK', action: 'DELETE_ROW', id: id})}>
                        <Close/>
                    </IconButton>
                </Tooltip>
            </div>

    }
}

export const columns = [
    {
        flexGrow: 1.0,
        width: 250,
        label: "Имя и фамилия",
        dataKey: "fullname"
    },

    {
        width: 300,
        label: "Логин",
        dataKey: "username"
    },
    {
        width: 300,
        label: "E-mail",
        dataKey: "email"
    },
    {
        width: 300,
        label: "Телефон",
        dataKey: "mobile"
    },
    // {
    //     width: 300,
    //     label: "Filial",
    //     dataKey: "branch"
    // },
    {
        width: 250,
        label: "Операция",
        dataKey: "action",
    }
];

// hazirda istifade edilmir
export class FilterData {

}

// hazirda istifade edilmir
export function createFilterObj(filterData) {
    return {}
}


export class CompData {
}

export class ValueData {
    address = new Address();
    branch = new ValueLabel();
    email = "";
    fullname = "";
    mobile = "";
    password = Math.random().toString(36).substring(7);
    id = 0;
    username = "";
}

export class Errors {
    fullnameIsNull = false;
    // emailIsNull = false;
    usernameIsNull = false;
    passwordIsNull = false;
}

export function createErrorObj(valueData) {
    const err = new Errors();
    err.fullnameIsNull = !valueData.fullname || valueData.fullname === null || valueData.fullname === '';
    // err.emailIsNull    = !valueData.email || valueData.email === null || valueData.email === '';
    err.usernameIsNull = !valueData.username || valueData.username === null || valueData.username === '';
    err.passwordIsNull = !valueData.password || valueData.password === null || valueData.password === '';

    if (err.fullnameIsNull  || err.usernameIsNull || err.passwordIsNull) {
        return err;
    }
    return null;
}
