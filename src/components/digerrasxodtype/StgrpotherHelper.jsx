import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";


export const MODULE_NAME = 'Виды расходов';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/stgrpcode/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/expencetype/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/expencetype/{id}';
export const INSERT_URL = BACKEND_URL + '/api/expencetype/insupd';
export const DELETE_URL = BACKEND_URL + '/api/expencetype/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.etId;
    return {
        etId: item.etId,
        etTitle: item.etTitle,
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
        Header: "Название",
        accessor: "etTitle"
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

}

export function createFilterObj(filterData) {
    return {name: filterData.name, code: filterData.code, accountNo: filterData.accountNo }
}


export class CompData {
}

export class ValueData {
    etId = 0;
    etTitle = '';

}

export class Errors {
    etTitleIsNull = false;
}

export function createErrorObj(valueData) {


    return null;
}
