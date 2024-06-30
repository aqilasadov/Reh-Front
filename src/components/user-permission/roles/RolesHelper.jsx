import React from "react";
import {BACKEND_URL} from "../../../utils/Constants";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";


export const MODULE_NAME = 'Vəzifələr';
export const LOAD_COMP_DATA_URL =   BACKEND_URL + '/api/admin/roles/compData';
export const LOAD_DATA_URL =        BACKEND_URL + '/api/admin/roles/';
export const LOAD_BY_ID_URL =       BACKEND_URL + '/api/admin/role/{id}';
export const INSERT_URL =           BACKEND_URL + '/api/admin/role/insupd/';
export const DELETE_URL =           BACKEND_URL + '/api/admin/role/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: id,
        name: item.name,
        title: item.title,
        status: item.status === 1 ? 'Aktiv' : 'Passiv',
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
        width: 300,
        label: "Adı",
        dataKey: "name"
    },

    {
        width: 300,
        label: "Başlıq",
        dataKey: "title"
    },
    {
        width: 200,
        label: "Statusu",
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
    name = "";
    title = "";
    status = 1;
}

export class Errors {
    nameIsNull = false;
    titleIsNull = false;
}

export function createErrorObj(valueData) {
    const err = new Errors();
    err.nameIsNull = !valueData.name || valueData.name === null || valueData.name === '';
    err.titleIsNull    = !valueData.title || valueData.title === null || valueData.title === '';

    if (err.nameIsNull || err.titleIsNull) {
        return err;
    }
    return null;
}
