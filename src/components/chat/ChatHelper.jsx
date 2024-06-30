import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";

export const MODULE_NAME = '';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/itemcardamount/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/chatgroup/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/itemcardamount/second/{id}';
export const INSERT_URL = BACKEND_URL + '/api/itemcardamount/insupd';
export const DELETE_URL = BACKEND_URL + '/api/itemcardamount/delete/{id}';


// rows

export function createData(item, onClick) {
    const id = item.cgId;
    return {
        id: item.cgId,

        cgTitle:item.cgTitle,

        action: (
            <div className="actions-right">
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
        Header: "Группы чатов ",
        accessor: "cgTitle"
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
    return {}
}


export class CompData {
    fakturaTypeList = [];
    clientList = [];
    clientList2 = [];
    currencyList = [];
}

export class ValueData {
    cgId = 0;

    cgTitle = '';

}

export class Errors {
    yekunIsNull = false;
    meblegIsNull = false;
    fakturaTypeIsNull = false;
    clientIsNull = false;
    currencyIsNull = false;

}

export function createErrorObj(valueData) {


    return null;
}
