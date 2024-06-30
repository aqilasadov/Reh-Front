import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";
import ValueLabel from "../../utils/ValueLabel";

export const MODULE_NAME = 'Расходы';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/expence/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/expence/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/expence/{id}';
export const INSERT_URL = BACKEND_URL + '/api/expence/insupd';
export const DELETE_URL = BACKEND_URL + '/api/expence/delete/{id}';

// rows
export function createData(item, onClick) {
    const id = item.expId;
    return {
        expId: item.expId,
        price: item.price,
        qeyd: item.qeyd,
        tarix: item.tarix === 0 ? '' : moment.unix(item.tarix).format("DD/MM/YYYY"),
        currency: item.currency === null ? '' : item.currency.label,
        etId: item.etId === null ? '' : item.etId.label,
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
        Header: "Дата",
        accessor: "tarix"
    },
    {
        Header: "Название расхода",
        accessor: "etId"
    },
    {
        Header: "Сумма",
        accessor: "price"
    },
    {
        Header: "Валюта",
        accessor: "currency"
    },

    {
        Header: "Заметка",
        accessor: "qeyd"
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
    client = new ValueLabel(-1, "Все");
    begdate = moment(new Date().setHours(-72, 0, 0)).unix();
    enddate = moment(new Date().setHours(23, 59, 59)).unix();
}

export function createFilterObj(filterData) {
    return {

        client: filterData.client.value,
        begdate: filterData.begdate,
        enddate: filterData.enddate,
    }
}


export class CompData {
    currencyList = [];
    etList = [];
}

export class ValueData {
    expId = 0;
    price = '';
    qeyd = '';
    tarix =moment(new Date()).unix();
    currency = new ValueLabel();
    etId = new ValueLabel();
}

export class Errors {

}

export function createErrorObj(valueData) {

    return null;
}
