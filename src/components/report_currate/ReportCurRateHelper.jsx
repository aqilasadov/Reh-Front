import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";

export const MODULE_NAME = 'Курсы Баланс';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/currate/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/currate/filterData2';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/currate/{id}';
export const INSERT_URL = BACKEND_URL + '/api/currate/calculatebalans';
export const DELETE_URL = BACKEND_URL + '/api/currate/delete/{id}';


// rows
export function createData(item, onClick) {
    // const id = item.id;
    return {
        // id: item.id,
        tarix:item.tarix,
        title:item.title,

        price: item.price,


        // action: (
        //     <div className="actions-right">
        //         <Button justIconThin round simple onClick={() => onClick(id, 'edit')}
        //                 color="warning" className="edit">
        //             <Edit/>
        //         </Button>
        //         {" "}
        //         <Button justIconThin round simple onClick={() => onClick(id, 'delete')} color="danger"
        //                 className="remove">
        //             <Close/>
        //         </Button>
        //     </div>
        // )
    }
}


export const columns = [
    {
        Header: "Дата",
        accessor: "tarix"
    },
    {
        Header: "Валюта",
        accessor: "title"
    },
    {
        Header: "Цена",
        accessor: "price"
    },


];


export class CompData {
      currencyList = [];
}

export class FilterData {
    currency = '';
    price = '';

}

export function createFilterObj(filterData) {
    return {name: filterData.name, code: filterData.code, accountNo: filterData.accountNo}
}




export class ValueData {
    id = 0;
    currency = new ValueLabel();
    price = '';


}

export class Errors {
    priceIsNull = false;
    currencyIsNull = false;
}

export function createErrorObj(valueData) {
    const nameIsNull = valueData.name === null || valueData.name === '';
    const priceIsNull = valueData.price === null || valueData.price === '';

    if (nameIsNull || priceIsNull) {
        return {nameIsNull, priceIsNull}
    }
    return null;
}
