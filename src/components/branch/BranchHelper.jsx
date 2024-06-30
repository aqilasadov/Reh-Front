import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";


export const MODULE_NAME = 'Filial məlumatları';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/branch/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/branch/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/branch/{id}';
export const INSERT_URL = BACKEND_URL + '/api/branch/insupd';
export const DELETE_URL = BACKEND_URL + '/api/branch/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        name: item.name,
        adress: item.adress,
       telefon: item.telefon,
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
        Header: "Ünvanı",
        accessor: "adress"
    },
    {
        Header: "Telefonu",
        accessor: "telefon"
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
    adress = '';
    telefon = '';
}

export function createFilterObj(filterData) {
    return {name: filterData.name, adress: filterData.adress, telefon: filterData.telefon }
}


export class CompData {
}

export class ValueData {
    id = 0;
    name = '';
    adress = '';
    telefon = '';
}

export class Errors {
    nameIsNull = false;
   }

export function createErrorObj(valueData) {
    const nameIsNull = valueData.name === null || valueData.name === '';


    if (nameIsNull ){
        return {nameIsNull}
    }
    return null;
}
