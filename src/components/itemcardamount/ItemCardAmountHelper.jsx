import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";

export const MODULE_NAME = 'Alış və Satış qiymətləri';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/itemcardamount/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/itemcardamount/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/itemcardamount/{id}';
export const INSERT_URL = BACKEND_URL + '/api/itemcardamount/insupd';
export const DELETE_URL = BACKEND_URL + '/api/itemcardamount/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        code: item.code,
        name: item.name,
        fakturaType: item.fakturaType === null ? '' : item.fakturaType.label,
        priority: item.priority,
        item: item.item === null ? '' : item.item.label,
        unitconvert: item.unitconvert,
        unitsetGrp: item.unitsetGrp === null ? '' : item.unitsetGrp.label,
        client: item.client === null ? '' : item.client.label,
        price: item.price,
        isActive: item.isActive,
        begdate: item.begdate === 0 ? '' : moment.unix(item.begdate).format("MM/DD/YYYY"),
        enddate: item.enddate === 0 ? '' : moment.unix(item.enddate).format("MM/DD/YYYY"),
        branch: item.branch === null ? '' : item.branch.label,
        clspecode: item.clspecode,
        clspecode2: item.clspecode2,
        clspecode3: item.clspecode3,
        clspecode4: item.clspecode4,
        clspecode5: item.clspecode5,
        currency: item.currency === null ? '' : item.currency.label,
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
        Header: "Kod",
        accessor: "code"
    },
    {
        Header: "Adı",
        accessor: "name"
    },
    {
        Header: "Цена",
        accessor: "price"
    },
    {
        Header: "Клиент",
        accessor: "client"
    },
    // {
    //     Header: "Xüsusi kodu",
    //     accessor: "clspecode"
    // },
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
    unitsetGrpList = [];
    clientList = [];
    branchList = [];
    currencyList = [];
}

export class ValueData {
    id = 0;
    code = '';
    name = '';
    fakturaType = new ValueLabel();
    priority = 0;
    item = new ValueLabel();
    unitconvert = 0;
    unitsetGrp = new ValueLabel();
    client = new ValueLabel();
    price = 0;
    isActive = 0;
    begdate =moment(new Date()).unix();
    enddate = 0;
    branch = new ValueLabel();
    clspecode = '';
    clspecode2 = '';
    clspecode3 = '';
    clspecode4 = '';
    clspecode5 = '';
    currency = new ValueLabel();

}

export class Errors {
    codeIsNull = false;
    nameIsNull = false;
    priceIsNull = false;
    currencyIsNull = false;
    fakturaTypeIsNull = false;


}

export function createErrorObj(valueData) {
    const codeIsNull = valueData.code === null || valueData.code === '';
    const nameIsNull = valueData.name === null || valueData.name === '';
    const priceIsNull = valueData.price === null || valueData.price === '';

    if (nameIsNull || codeIsNull || priceIsNull) {
        return {nameIsNull, codeIsNull, priceIsNull}
    }
    return null;
}
