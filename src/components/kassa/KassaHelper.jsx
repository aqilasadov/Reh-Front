import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";


export const MODULE_NAME = 'Начальная касса';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/kassa/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/kassa/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/kassa/{id}';
export const INSERT_URL = BACKEND_URL + '/api/kassa/insupd';
export const DELETE_URL = BACKEND_URL + '/api/kassa/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        name: item.name,
        code: item.code,
        branch: item.branch === null ? '' : item.branch.label,
        currency: item.currency === null ? '' : item.currency.label,
        mebleg: item.mebleg,
        action: (
            <div className="actions-right">
                              <Button justIconThin round simple onClick={() => onClick(id, 'delete')} color="danger" className="remove">
                    <Close/>
                </Button>
            </div>
        )
    }
}

export const columns = [
    {
        Header: "Название",
        accessor: "name"
    },

    {
        Header: "Валюта",
        accessor: "currency"
    },
    {
        Header: " Начальный баланс",
        accessor: "mebleg"
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
    mebleg=0;

}

export function createFilterObj(filterData) {
    return {name: filterData.name, code: filterData.code }
}


export class CompData {
    currencyList = [];
}

export class ValueData {
    id = 0;
    name = '';
    code = '';
    branch = new ValueLabel();
    currency = new ValueLabel();
    mebleg=0;
}

export class Errors {
    nameIsNull = false;
    currencyIsNull=false;
}

export function createErrorObj(valueData) {
    const nameIsNull = valueData.name === null || valueData.name === '';
    const currencyIsNull = valueData.currency === null || valueData.currency === 0;

    if (nameIsNull || currencyIsNull ){
        return {nameIsNull,currencyIsNull}
    }
    return null;
}
