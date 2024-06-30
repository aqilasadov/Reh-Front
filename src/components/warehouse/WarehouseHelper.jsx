import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";


export const MODULE_NAME = 'Anbar məlumatları';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/warehouse/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/warehouse/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/warehouse/{id}';
export const INSERT_URL = BACKEND_URL + '/api/warehouse/insupd';
export const DELETE_URL = BACKEND_URL + '/api/warehouse/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        name: item.name,
        nr: item.nr,
        branch: item.branch === null ? '' : item.branch.label,
        userText: item.userText,
        action: (
            <div className="actions-right">
                <Button justIconThin round simple onClick={() => onClick(id, 'edit')}
                        color="warning" className="edit">
                    <Edit/>
                </Button>
                {" "}
                <Button justIconThin round simple onClick={() => onClick(id, 'delete')} color="danger" className="remove">
                    <Close/>
                </Button>
            </div>
        )
    }
}

export const columns = [
    {
        Header: "Adı",
        accessor: "name"
    },
    {
        Header: "Kodu",
        accessor: "nr"
    },
    {
        Header: "Filial",
        accessor: "branch"
    },
    {
        Header: "Qeyd",
        accessor: "userText"
    },
    {
        Header: "Операция",
        accessor: "action",
        sortable: false,
        filterable: false,
        style: {height: 30}
    }
];

export class FilterData {
    name = '';
    code = '';
    accountNo = '';
}

export function createFilterObj(filterData) {
    return {name: filterData.name, code: filterData.code, accountNo: filterData.accountNo }
}


export class CompData {
}

export class ValueData {
    id = 0;
    branch = new ValueLabel();
    name = '';
    nr = '';
    userText = '';
}

export class Errors {
    nameIsNull = false;
    nrIsNull = false;
}

export function createErrorObj(valueData) {
    const nameIsNull = valueData.name === null || valueData.name === '';
    const nrIsNull = valueData.nr === null || valueData.nr === '';

    if (nameIsNull || nrIsNull){
        return {nameIsNull, nrIsNull}
    }
    return null;
}
