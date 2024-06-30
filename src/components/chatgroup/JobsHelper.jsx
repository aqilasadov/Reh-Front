import React from "react";
import {BACKEND_URL} from "../../utils/Constants";

import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";


export const MODULE_NAME = 'Группа чата';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/chatgroup/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/chatgroup/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/chatgroup/{id}';
export const INSERT_URL = BACKEND_URL + '/api/chatgroup/insupd';
export const DELETE_URL = BACKEND_URL + '/api/chatgroup/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.cgId;
    return {
        id: id,
        cgTitle: item.cgTitle,

        action:
            <div style={{display: 'flex', justifyContent: 'center',}}>
                {/*<Tooltip title="Edit">*/}
                {/*    <IconButton aria-label="Edit" onClick={() => onClick({clickFor: 'TABLE_CLICK', action: 'EDIT_ROW', id: id})}>*/}
                {/*        <Edit/>*/}
                {/*    </IconButton>*/}
                {/*</Tooltip>*/}

              <Tooltip title="Delete">
                    <IconButton aria-label="Delete" onClick={() => onClick({clickFor: 'TABLE_CLICK', action: 'DELETE_ROW', id: id})}>
                        <Close/>
                    </IconButton>
                </Tooltip>
            </div>

    }
}

export const columns = [
    {
        flexGrow: 1.0,
        width: 200,
        label: "Название",
        dataKey: "cgTitle"
    },



    {
        width: 100,
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

    userList = [];
}

export class ValueData {
    cgId = 0;
    userList={};
    cgTitle = '';

}

export class Errors {
    nameIsNull = false;
    emailIsNull = false;
    usernameIsNull = false;
    passwordIsNull = false;
}

export function createErrorObj(valueData) {


    return null;
}
