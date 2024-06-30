import React from "react";
import Edit from "@material-ui/icons/Edit";
import Print from "@material-ui/icons/Print";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";


export const MODULE_NAME = 'Mədaxil/Məxaric';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/kassaitems/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/kassaitems/filterData1';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/kassaitems/{id}';
export const INSERT_URL = BACKEND_URL + '/api/kassaitems/insupd';
export const DELETE_URL = BACKEND_URL + '/api/kassaitems/delete/{id}';

// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        kassaBank: item.kassaBank === null ? '' : item.kassaBank.label,
        //  bank: item.bank === null ? '' : item.bank.label,
        kbType: item.kbType === null ? '' : item.kbType.label,
        client: item.client === null ? '' : item.client.label,
        kassaType: item.kassaType === null ? '' : item.kassaType.label,
        code: item.code,
        tarix: item.tarix === 0 ? '' : moment.unix(item.tarix).format("DD/MM/YYYY"),
        price: item.price,
       faktura: item.faktura === null ? '' : item.faktura.label,
        currency: item.currency === null ? '' : item.currency.label,
        status: item.status,
        note: item.note,
        action: (
            <div className="actions-right">
                <Button justIconThin round simple
                        onClick={() => onClick(
                            {
                                id,
                                action: 'print',
                                kbTypeId: item.kbType ? item.kbType.value : -1,
                                kassaTypeId: item.kassaType ? item.kassaType.value : -1
                            }
                        )}
                        color="warning" className="print">
                    <Print/>
                </Button>
                {" "}
                <Button justIconThin round simple onClick={() => onClick({action: 'edit', id})} color="warning"
                        className="edit">
                    <Edit/>
                </Button>
                {" "}
                <Button justIconThin round simple onClick={() => onClick({action: 'delete', id})} color="danger"
                        className="remove">
                    <Close/>
                </Button>
            </div>
        )
    }
}

export const columns = [
    {
        Header: "Nömrəsi",
        accessor: "code"
    },
    {
        Header: "Тип операции",
        accessor: "kassaType"
    },

    {
        Header: "Клиент",
        accessor: "client"
    },
    // {
    //     Header: "Faktura nömrəsi",
    //     accessor: "faktura"
    // },
    {
        Header: "Məbləğ",
        accessor: "price"
    },
    {
        Header: "Tarix",
        accessor: "tarix"
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

    kassaTypeList = [];
    kbTypeList = [];
    currencyList = [];
}


export class ValueData {
    id = 0;

    // kassa = new ValueLabel();
    // bank = new ValueLabel();

    kassaBank = new ValueLabel();
    kbType = new ValueLabel(); // kassa bank
    currency = new ValueLabel();
    client = new ValueLabel();
    kassaType = new ValueLabel(); // medaxl mexaric
    code = '';
    tarix = moment(new Date()).unix();
    price = 0;
    faktura = new ValueLabel();
    status = 1;
    note = '';

}

export class Errors {

    codeIsNull = false;
    priceIsNull = false;
    kassaTypeIsNull = false;


}

export function createErrorObj(valueData) {

    const nameIsNull = valueData.name === null || valueData.name === '';

    if (nameIsNull) {
        return {nameIsNull}
    }
    return null;
}
