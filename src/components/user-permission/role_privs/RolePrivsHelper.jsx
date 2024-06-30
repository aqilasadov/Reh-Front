import React from "react";
import {BACKEND_URL} from "../../../utils/Constants";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";


export const MODULE_NAME = 'Vəzifə Səlahiyyətləri';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/admin/roles/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/admin/roleprivs/';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/admin/rolepriv/{id}';
export const INSERT_URL = BACKEND_URL + '/api/admin/rolepriv/insupd/';
export const DELETE_URL = BACKEND_URL + '/api/admin/rolepriv/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: id,
        role: item.role ? item.role.label : '',
        priv: item.priv ? item.priv.label : '',
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
        label: "Səlahiyyət",
        dataKey: "priv"
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
    priv = null;
    status = 1;
}

export class Errors {
    roleIsNull = false;
    privIsNull = false;
}

export function createErrorObj(valueData) {
    const err = new Errors();
    err.roleIsNull = !valueData.role || valueData.role === null || valueData.role.value <= 0;
    err.privIsNull = !valueData.priv || valueData.priv === null || valueData.priv.value <= 0;

    if (err.roleIsNull || err.privIsNull) {
        return err;
    }
    return null;
}
