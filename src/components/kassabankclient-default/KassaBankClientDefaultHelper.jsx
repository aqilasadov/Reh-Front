import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";

export const MODULE_NAME = 'Müştərilərin ilkin qalıqları';
// export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/clientoperation/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/clientoperation/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/clientoperation/{id}';
export const GENERATE_NEW_CODE_URL = BACKEND_URL + '/api/clientoperation/generatecode';
export const INSERT_URL = BACKEND_URL + '/api/clientoperation/insupd';
export const DELETE_URL = BACKEND_URL + '/api/clientoperation/delete/{id}';

// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        sourceType: item.sourceType === null ? '' : item.sourceType.label,
        tranno: item.tranno,
        client: item.client === null ? '' : item.client.label,
        amount: item.amount,
        operDate: item.operDate === 0 ? '' : moment.unix(item.operDate).format("DD/MM/YYYY"),
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

export const clientTypeList = [new ValueLabel(1, 'Malsatan'), new ValueLabel(2, 'Müştəri')];

export const columns = [
    {
        Header: "Kodu",
        accessor: "tranno"
    },


    {
        Header: "Клиент",
        accessor: "client"
    },

    {
        Header: "Məbləğ",
        accessor: "amount"
    },
    {
        Header: "Tarix",
        accessor: "operDate"
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


}


export class ValueData {
    id = 0;
    sourceType = new ValueLabel(4, "İlkin qalıq");
    tranno = '';
    client = new ValueLabel();
    amount = 0;
    operDate = moment(new Date()).unix();
}

export class Errors {

    nameIsNull = false;
}

export function createErrorObj(valueData) {

    const nameIsNull = valueData.name === null || valueData.name === '';

    if (nameIsNull) {
        return {nameIsNull}
    }
    return null;
}
