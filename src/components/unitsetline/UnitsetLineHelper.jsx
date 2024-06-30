import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";


export const MODULE_NAME = 'Ölçü vahidləri';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/unitsetline/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/unitsetline/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/unitsetline/{id}';
export const INSERT_URL = BACKEND_URL + '/api/unitsetline/insupd';
export const DELETE_URL = BACKEND_URL + '/api/unitsetline/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        name: item.name,
        code: item.code,
        unitsetGrp: item.unitsetGrp === null ? '' : item.unitsetGrp.label,
        action: (
            <div className="actions-right">
                <Button justIconThin round simple onClick={() => onClick(id, 'edit')}
                        color="warning" className="edit">
                    <Edit/>
                </Button>
                {" "}
                <Button justIconThin round simple onClick={() => onClick(id, 'delete')} color="danger"
                        className="remove">
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
        accessor: "code"
    },
    {
        Header: "Ölçü vahidi qrupu",
        accessor: "unitsetGrp"
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

}

export function createFilterObj(filterData) {
    return {name: filterData.name, code: filterData.code, accountNo: filterData.accountNo}
}


export class CompData {
}

export class ValueData {
    id = 0;
    unitsetGrp = new ValueLabel();
    name = '';
    code = '';

}

export class Errors {
    nameIsNull = false;
    codeIsNull = false;
    unitsetGrpIsNull = false;
}

export function createErrorObj(valueData) {
    const nameIsNull = valueData.name === null || valueData.name === '';
    const codeIsNull = valueData.code === null || valueData.code === '';

    if (nameIsNull || codeIsNull) {
        return {nameIsNull, codeIsNull}
    }
    return null;
}
