import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";
import ValueLabel from "../../utils/ValueLabel";

export const MODULE_NAME = 'Расходы';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/partiya/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/partiya/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/partiya/{id}';
export const INSERT_URL = BACKEND_URL + '/api/partiya/insupd';
export const DELETE_URL = BACKEND_URL + '/api/partiya/delete/{id}';

// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        siranomresi: item.siranomresi,
        qeyd: item.qeyd,
        tarix: item.tarix === 0 ? '' : moment.unix(item.tarix).format("DD/MM/YYYY"),
        currency: item.currency === null ? '' : item.currency.label,
        xerc: item.xerc === null ? '' : item.xerc.label,
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
        accessor: "xerc"
    },
    {
        Header: "Сумма",
        accessor: "siranomresi"
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

}

export function createFilterObj(filterData) {
    return {name: filterData.name, code: filterData.code, accountNo: filterData.accountNo }
}


export class CompData {
    currencyList = [];
    xercList = [];
}

export class ValueData {
    id = 0;
    siranomresi = '';
    qeyd = '';
    tarix =moment(new Date()).unix();
    currency = new ValueLabel();
    xerc = new ValueLabel();
}

export class Errors {

}

export function createErrorObj(valueData) {

    return null;
}
