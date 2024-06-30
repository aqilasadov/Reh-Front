import React from "react";
import {BACKEND_URL} from "../../../utils/Constants";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";


export const MODULE_NAME = 'İstifaçilərin vəzifələri';
// export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/admin/userrole/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/admin/userrole/';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/admin/userrole/{id}';
export const INSERT_URL = BACKEND_URL + '/api/admin/userrole/insupd/';
export const DELETE_URL = BACKEND_URL + '/api/admin/userrole/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: id,
        role: item.role ? item.role.label : '',
        user: item.user ? item.user.label : '',
        status: item.status === 1 ? 'Aktiv' : 'Passiv',
        action:
            <div style={{display: 'flex', justifyContent: 'center',}}>
                <Tooltip title="Edit">
                    <IconButton aria-label="Redaktə et"
                                onClick={() => onClick({clickFor: 'TABLE_CLICK', action: 'EDIT_ROW', id: id})}>
                        <Edit/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                    <IconButton aria-label="Sil"
                                onClick={() => onClick({clickFor: 'TABLE_CLICK', action: 'DELETE_ROW', id: id})}>
                        <Close/>
                    </IconButton>
                </Tooltip>
            </div>

    }
}

export const columns = [
    {
        flexGrow: 1.0,
        width: 300,
        label: "Vəzifə",
        dataKey: "role"
    },

    {
        width: 300,
        label: "İstifadəçi",
        dataKey: "user"
    },
    {
        width: 200,
        label: "Status",
        dataKey: "status"
    },
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
    id = 0;
    role = null;
    user = null;
    status = 1;
}

export class Errors {
    roleIsNull = false;
    userIsNull = false;
}

export function createErrorObj(valueData) {
    const err = new Errors();
    err.roleIsNull = !valueData.role || valueData.role === null || valueData.role.value <= 0;
    err.userIsNull = !valueData.user || valueData.user === null || valueData.user.value <= 0;

    if (err.roleIsNull || err.userIsNull) {
        return err;
    }
    return null;
}
