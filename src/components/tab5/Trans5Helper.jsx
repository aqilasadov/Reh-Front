import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";

export const MODULE_NAME = 'Касса';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/itemcardamount/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/itemcardamount/filterData5';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/itemcardamount/{id}';
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
        mebleg: item.mebleg,
        faiz: item.faiz,
        yekun: item.yekun,
        yekunCurrentKassa: item.yekunCurrentKassa,
        qazanc: item.qazanc,
        begdate: item.begdate === 0 ? '' : moment.unix(item.begdate).format("DD/MM/YYYY"),
        qeyd: item.qeyd,
        alan:item.alan,
        veren:item.veren,
        countryTypeId:item.countryTypeId,
        currency: item.currency === null ? '' : item.currency.label,
        currencyKassa: item.currencyKassa === null ? '' : item.currencyKassa.label,
        create_user:item.create_user,
        update_user:item.update_user,
        delete_user:item.delete_user,
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
        Header: "Дата",
        accessor: "begdate"
    },

    {
        Header: "Тип операции",
        accessor: "fakturaType"
    },
    {
        Header: "Клиент",
        accessor: "client"
    },
    {
        Header: "Сумма",
        accessor: "mebleg"
    },
    {
        Header: "Валюта",
        accessor: "currency"
    },


    {
        Header: "Итог($)",
        accessor: "yekun"
    },

    {
        Header: "Доход",
        accessor: "qazanc"
    },
    {
        Header: "Заметка",
        accessor: "qeyd"
    },

    {
        Header: "Создатель",
        accessor: "create_user"
    },
    {
        Header: "Редактор",
        accessor: "update_user"
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
    fakturaTypeList2 = [];
    clientList = [];
    currencyList3 = [];
    currencyList4 = [];
    kassamos="";
}

export class ValueData {
    id = 0;
    fakturaType = new ValueLabel();
    client = new ValueLabel();
    mebleg = 0;
    faiz = 0;
    yekun = 0;
    yekunCurrentKassa=0;
    qazanc = 0;
    begdate =moment(new Date()).unix();
    qeyd = '';
    veren='';
    alan='';
    countryTypeId=100;
    currency = new ValueLabel();
    currencyKassa= new ValueLabel();
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
