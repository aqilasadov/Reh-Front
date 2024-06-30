import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";

export const MODULE_NAME = '';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/itemcardamount/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/itemcardamount/filterData16';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/itemcardamount/third/{id}';
export const INSERT_URL = BACKEND_URL + '/api/itemcardamount/insupd';
export const DELETE_URL = BACKEND_URL + '/api/itemcardamount/delete/{id}';


// rows

export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        fakturaTypeValue: item.fakturaType === null ? '' : item.fakturaType.value,
        fakturaType: item.fakturaType === null ? '' : item.fakturaType.label,
        client: item.client === null ? '' : item.client.label,
        client2: item.client2 === null ? '' : item.client2.label,
        mebleg: item.mebleg,
        mebleg2: item.mebleg2,
        mebleg3: item.mebleg3,
        mebleg4: item.mebleg4,
        mebleg5: item.mebleg5,
        mebleg6: item.mebleg6,
        mebleg7: item.mebleg7,
        mebleg8: item.mebleg8,
        mebleg9: item.mebleg9,
        faiz: item.faiz,
        faiz2: item.faiz2,
        faiznew1: item.faiznew1,
        faiznew2: item.faiznew2,
        yekun: item.yekun,
        qazanc: item.qazanc,
        begdate: item.begdate === 0 ? '' : moment.unix(item.begdate).format("DD/MM/YYYY"),
        qeyd: item.qeyd,
        alan:item.alan,
        veren:item.veren,
        countryTypeId:item.countryTypeId,
        currency: item.currency === null ? '' : item.currency.label,
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
        Header: "Дата",
        accessor: "begdate"
    },

    {
        Header: "Тип операции",
        accessor: "fakturaType"
    },
    {
        Header: "Müştəri",
        accessor: "client"
    },
    {
        Header: "Сумма",
        accessor: "mebleg"
    },
    {
        Header: "Заметка",
        accessor: "alan"
    },
    {
        Header: "Заметка",
        accessor: "veren"
    },
    {
        Header: "Валюта",
        accessor: "currency"
    },
    {
        Header: "Yekun",
        accessor: "yekun"
    },
    {
        Header: "Курс",
        accessor: "faiz"
    },
    {
        Header: "Faiz",
        accessor: "faiznew1"
    },
    {
        Header: "Qazanc",
        accessor: "qazanc"
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
    id = 0;
    fakturaType = new ValueLabel();
    client = new ValueLabel();
    client2 = new ValueLabel();
    mebleg = null;
    mebleg2 =null;
    mebleg3 =null;
    mebleg4 =null;
    mebleg5 = null;
    mebleg6 =null;
    mebleg7 =null;
    mebleg8 =null;
    mebleg9 = null;
    faiz = null;
    faiz2 = null;
    faiznew1=null;
    faiznew2=null;
    yekun = 0;
    qazanc = 0;
    begdate =moment(new Date()).unix();
    qeyd = '';
    veren='';
    alan='';
    countryTypeId=5;
    currency = new ValueLabel();

    // currency =new ValueLabel(5,"IRR");
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
