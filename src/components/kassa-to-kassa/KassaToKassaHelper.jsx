import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";


export const MODULE_NAME = 'Köçürmələr';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/kassaitems/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/kassatokassa/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/kassaitems/{id}';
export const INSERT_URL = BACKEND_URL + '/api/kassatokassa/insupd';
export const DELETE_URL = BACKEND_URL + '/api/kassaitems/delete/{id}';

// rows
export function createData(item, onClick) {

    const id = item.id;
    return {
        id: item.id,
        kassaBank: item.kassaBank ?  item.kassaBank.label : '',
        kassaBank2: item.kassaBank2 ?  item.kassaBank2.label : '',
        kbType: item.kbType ?  item.kbType.label : '',
        kbType2: item.kbType2 ?  item.kbType2.label : '',
        tarix: item.tarix === 0 ? '' : moment.unix(item.tarix).format("DD/MM/YYYY"),
        price: item.price,
        currency: item.currency ? item.currency.label : '',
        //  action: (
        //     <div className="actions-right">
        //         <Button justIconThin round simple onClick={() => onClick(id, 'edit')}
        //                 color="warning" className="edit">
        //             <Edit/>
        //         </Button>
        //         {" "}
        //         <Button justIconThin round simple onClick={() => onClick(id, 'delete')} color="danger" className="remove">
        //             <Close/>
        //         </Button>
        //     </div>
        // )
    }
}

export const columns = [
    {
        Header: "Hardan",
        accessor: "kassaBank"
    },
    {
        Header: "Hara",
        accessor: "kassaBank2"
    },
    {
        Header: "Məbləğ",
        accessor: "price"
    },
    {
        Header: "Tarix",
        accessor: "tarix"
    },

    {
     //   Header: "Операция",
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

    kbTypeList = [];
    currencyList = [];
}


export class ValueData {
    id = 0;
    kassaBank = new ValueLabel();
    kassaBank2 = new ValueLabel();
    kbType = null; // kassa bank
    kbType2 = null; // kassa bank
    currency = new ValueLabel();

    tarix=moment(new Date()).unix();;
    price=0;


     }

export class Errors {

    kassaBankIsNull = false;
    kassaBank2IsNull = false;
    kbTypeIsNull = false;
    kbType2IsNull = false;
    currencyIsNull = false;
    tarixIsNull = false;
    priceIsNull = false;
}

export function createErrorObj(valueData) {

    const nameIsNull = valueData.name === null || valueData.name === '';

    if (nameIsNull ){
        return {nameIsNull}
    }
    return null;
}
