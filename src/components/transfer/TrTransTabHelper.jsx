import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";

export const MODULE_NAME = 'Обмен';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/itemcardamount/compData2';
export const LOAD_DATA_URL = BACKEND_URL + '/api/itemcardamount/filterData7';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/itemcardamount/{id}';
export const INSERT_URL = BACKEND_URL + '/api/itemcardamount/insupd';
export const DELETE_URL = BACKEND_URL + '/api/itemcardamount/delete/{id}';


// rows

export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        fakturaType: item.fakturaType === null ? '' : item.fakturaType.label,
        client: item.client === null ? '' : item.client.label,
        mebleg: item.mebleg,
        faiz: item.faiz,
        faiz2: item.faiz2,
        yekun: item.yekun,
        qazanc: item.qazanc,
        begdate: item.begdate === 0 ? '' : moment.unix(item.begdate).format("DD/MM/YYYY"),
        qeyd: item.qeyd,
        alan:item.alan,
        veren:item.veren,
        countryTypeId:item.countryTypeId,
        currency: item.currency === null ? '' : item.currency.label,
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
        accessor: "alan"
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
        Header: "Итог",
        accessor: "yekun"
    },
    {
        Header: "К- курс",
        accessor: "faiz"
    },
    {
        Header: "П-курс",
        accessor: "faiz2"
    },
    {
        Header: "Доход",
        accessor: "qazanc"
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

}

export function createFilterObj(filterData) {
    return {}
}


export class CompData {
    res_mebleg="";
}

export class ValueData {
    id = 0;
    fakturaType = new ValueLabel();
    client = new ValueLabel();
    mebleg = 0;
    faiz = 0;
    faiz2 = 0;
    yekun = 0;
    qazanc = 0;
    begdate =moment(new Date()).unix();
    qeyd = '';
    veren='';
    alan='';
    countryTypeId=102;
    currency = new ValueLabel(2,"USD");
    res_mebleg="";
}

export class Errors {

    meblegIsNull = false;
    fakturaTypeIsNull = false;
    clientIsNull = false;
    currencyIsNull = false;

}

export function createErrorObj(valueData) {


    return null;
}
