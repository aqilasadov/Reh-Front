import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";

export const MODULE_NAME = '';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/itemcardamount/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/itemcardamount/filterDataConvert';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/itemcardamount/convert/{id}';
export const INSERT_URL = BACKEND_URL + '/api/itemcardamount/insupd3';
export const DELETE_URL = BACKEND_URL + '/api/itemcardamount/delete/{id}';


// rows

export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        fakturaTypeValue: item.fakturaType === null ? '' : item.fakturaType.value,
        fakturaType2: item.fakturaType2 === null ? '' : item.fakturaType2.label,
        client: item.client === null ? '' : item.client.label,
        client2: item.client2 === null ? '' : item.client2.label,
        mebleg: item.mebleg.toString(),
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
        faiznew2: 0,
        faiznew3: item.faiznew3,
        yekun: item.yekun.toString(),
        qazanc: item.qazanc.toString(),
        begdate: item.begdate === 0 ? '' : moment.unix(item.begdate).format("DD/MM/YYYY"),
        qeyd: item.qeyd,
        alan:item.alan,
        veren:item.veren,
        countryTypeId:item.countryTypeId,
        currency: item.currency === null ? '' : item.currency.label,
        currencyKassa: item.currencyKassa === null ? '' : item.currencyKassa.label,
        qeydyekunCurrentKassa: item.qeydyekunCurrentKassa.toString(),
        create_user:item.create_user,
        update_user:item.update_user,
        delete_user:item.delete_user,
        action: (
            <div className="actions-right">
                {/*<Button justIconThin round simple onClick={() => onClick(id, 'edit')}*/}
                {/*        color="warning" className="edit">*/}
                {/*    <Edit/>*/}
                {/*</Button>*/}
                {/*{" "}*/}
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
        accessor: "faiznew1"
    },
    {
        Header: "Faiz",
        accessor: "faiz"
    },
    {
        Header: "Доход",
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
    fakturaTypeList = [];
    clientList = [];
    clientList2 = [];
    currencyList = [];
    currencyList4 = [];
    currateDef = 0;
    currateDefEuro=0;
    clientFilterList=[];
}

export class ValueData {
    id = 0;
    fakturaType2 = new ValueLabel(19,"Купил");
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
    faiznew3=null;
    yekun = 0;
    qazanc = 0;
    begdate =moment(new Date()).unix();
    qeyd = '';
    veren='';
    alan='';
    countryTypeId=1000;
    currency = new ValueLabel();
    currencyKassa= new ValueLabel();
    updateId=0;
    qeydyekunCurrentKassa=0;
}

export class Errors {
    yekunIsNull = false;
    meblegIsNull = false;
    faktura2TypeIsNull = false;
    clientIsNull = false;
    client2IsNull = false;
    currencyIsNull = false;
    currencyKassaIsNull = false;


}

export function createErrorObj(valueData) {


    return null;
}
