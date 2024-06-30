import Button from "../../components-tim/CustomButtons/Button";
import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import List from "@material-ui/icons/List";
import {BACKEND_URL} from "../../utils/Constants";
import * as moment from "moment";
import {ifNull} from "../../utils/Validator";

export const MODULE_NAME = 'Fakturalar';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/faktura/compData?ft=';
export const LOAD_DATA_URL = BACKEND_URL + '/api/faktura/filterData';
export const GENERATE_FAKTURA_URL = BACKEND_URL + '/api/faktura/generatecode';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/faktura/{id}';
export const INSERT_URL = BACKEND_URL + '/api/faktura/insupd';
export const DELETE_URL = BACKEND_URL + '/api/faktura/delete/{id}';
export const LOAD_MAL_XID_DATA_URL = BACKEND_URL + '/api/fakturaitem/fakturaitemload';

export function createDataTitle(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        fakturaNo: item.fakturaNo,
        fakturaType: item.fakturaType === null ? '' : item.fakturaType.label,
        branch: item.branch === null ? '' : item.branch.label,
        client: item.client === null ? '' : item.client.label,
        discount: item.discount,
        partiya: item.partiya === null ? '' : item.partiya.label,
        payDate: item.payDate === 0 ? '' : moment.unix(item.payDate).format("MM/DD/YYYY"),
        tarix: item.tarix === 0 ? '' : moment.unix(item.tarix).format("MM/DD/YYYY"),


        action: (
            <div className="actions-right">

                {item.fakturaType && item.fakturaType.value === 1 &&

                <Button justIcon round simple onClick={() => onClick({
                    clickFor: 'TITLE_TABLE_CLICK', action: 'FF_FAKTURA',
                    data: {id, fakturaNo: item.fakturaNo, client: item.client === null ? '' : item.client.label}
                })}
                        color="warning" className="edit">
                    <List/>
                </Button>
                }
                {" "}
                <Button justIconThin round simple
                        onClick={() => onClick({clickFor: 'TITLE_TABLE_CLICK', action: 'EDIT_ROW', id})}
                        color="warning">
                    <Edit/>
                </Button>
                {" "}
                <Button justIconThin round simple
                        onClick={() => onClick({clickFor: 'TITLE_TABLE_CLICK', action: 'DELETE_ROW', id})}
                        color="warning">
                    <Close/>
                </Button>
            </div>
        )
    }
}

export const columnsTitle = [
    {
        Header: "Faktura no",
        accessor: "fakturaNo"
    },
    {
        Header: "Faktura növü",
        accessor: "fakturaType"
    },
    {
        Header: "Filial",
        accessor: "branch"
    },
    {
        Header: "Müştəri",
        accessor: "client"
    },
    {
        Header: "Partiya",
        accessor: "partiya"
    },
    {
        Header: "Endirim",
        accessor: "discount"
    },
    // {
    //     Header: "Son ödə. tarixi",
    //     accessor: "payDate"
    // },
    {
        Header: "Tarix",
        accessor: "tarix"
    },
    {
        Header: "Операция",
        accessor: "action",
        sortable: false,
        filterable: false,
        style: {height: 50}
    }
];


export function createData(item, onClick) {
    console.log('fakturaType: ', item);
    const isItem = !item.mxType || item.mxType === null ? true : item.mxType.value === 1;


    const id = item.id;
    const index = item.index;

    return {
        id: item.id,
        mxType: !item.mxType || item.mxType === null ? '' : item.mxType.label,
        item: isItem ? !item.item || item.item === null ? '' : item.item.label :
            !item.serviceCard || item.serviceCard === null ? '' : item.serviceCard.label,
        unitsetLine: !item.unitsetLine || item.unitsetLine === null ? '' : item.unitsetLine.label,

        amount: item.amount ? item.amount : 0.00,
        price: item.price,
        vat: item.vat ? item.vat : 0.00,
        vatMebleg: item.vat && item.vat > 0 ? (item.price * item.amount * (item.vat / 100)).toFixed(2) : 0.00,
        yekunMebleg: ifNull(item.amount) * ifNull(item.price),
        parentId: item.parentId,

        action: (
            <div className="actions-right">
                <Button justIconThin round simple
                        onClick={() => onClick({clickFor: 'ITEMS_TABLE_CLICK', action: 'EDIT_ROW', id, index})}
                        color="warning">
                    <Edit/>
                </Button>
                {" "}
                <Button justIconThin round simple
                        onClick={() => onClick({clickFor: 'ITEMS_TABLE_CLICK', action: 'DELETE_ROW', id, index})}
                        color="warning">
                    <Close/>
                </Button>
            </div>
        )
    }
}

export const columns = [
    {
        width: 200,
        label: "Mal/Xid.",
        dataKey: "mxType",
    },
    {
        flexGrow: 1.0,
        width: 600,
        label: "Mal / Xidmətin adı",
        dataKey: "item",
    },
    {
        width: 200,
        label: "Ölçü vahidi",
        dataKey: "unitsetLine",
    },
    {
        width: 200,
        label: "Miqdarı",
        dataKey: "amount",
    },
    {
        width: 200,
        label: "Цена",
        dataKey: "price",
    },
    {
        width: 200,
        label: "ƏDV %",
        dataKey: "vat",
    },
    {
        width: 200,
        label: "ƏDV MƏB.",
        dataKey: "vatMebleg",
    },
    {
        width: 200,
        label: "Məbləğ",
        dataKey: "yekunMebleg",
    },
    {
        width: 150,
        label: "Операция",
        dataKey: "action",
    }
];


export class CompData {
    fakturaTypeList = [];
    unitsetLineList = [];
    mxTypeList = [];
}


export class Faktura {
    id = 0;
    branch = null;
    client = null;
    fakturaType = null;
    partiya = null;
    warehouse = null;
    discount = 0.0;
    fakturaNo = '';
    payDate = 0;
    tarix = 0;
    fakturaItemList = [];
}

export class FakturaItem {
    id = 0;
    fakturaId = 0;
    amount = 0;
    destWarehouse = null;

    serviceCard = null;
    item = null;
    unitsetLine = null;

    parentId = 0;
    price = 0;
    sourceWarehouse = null;
    vat = 0;
}


export class FilterData {
    fakturaType = 1;
}

export function createFilterObj(filterData) {
    return {fakturaType: filterData.fakturaType}
}




export class Errors {
    fakturaNoIsNull = false;
    fakturaTypeIsNull = false;
    clientIsNull = false;
    serviceOrItemIsNull = false;
    itemsIsEmpty = false;

    unitsetLineIsNull = false;
    priceIsNull = false;
    amountIsNull = false;
}

export function createErrorObj(valueData, isItem) {

    console.group('createErrorObj')
    console.log('valueData: ', valueData);
    console.log('isItem: ', isItem);
    const err = new Errors();

    if (!isItem) {
        err.fakturaNoIsNull = !valueData.title || valueData.title.fakturaNo === null || valueData.title.fakturaNo === '';

        err.fakturaTypeIsNull =
            isItem ||
            !valueData.title ||
            !valueData.title.fakturaType
            || valueData.title.fakturaType === null
            || valueData.title.fakturaType.value <= 0;

        err.clientIsNull = !valueData.title || !valueData.title.client || valueData.title.client === null || valueData.title.client.value <= 0;

    }

    err.serviceOrItemIsNull = (
        (!valueData.serviceCard || valueData.serviceCard === null || valueData.serviceCard.value <= 0) &&
        (!valueData.item || valueData.item === null || valueData.item.value <= 0)
    );

    err.unitsetLineIsNull = !valueData.unitsetLine || valueData.unitsetLine.value <= 0;
    err.amountIsNull = !valueData.amount || valueData.amount <= 0;
    err.priceIsNull = !valueData.price || valueData.price <= 0;

    err.itemsIsEmpty = !isItem && (!valueData.items || valueData.items === null || valueData.items.length === 0);

    console.log('serviceCard: ', valueData.serviceCard);
    console.log('serviceCard: ', valueData.serviceCard);
    console.log('item: ', valueData.item);
    console.log('err: ', err);
    console.log('itemsIsEmpty: ', err.itemsIsEmpty);
    console.groupEnd();
    if (
        (!isItem && (err.fakturaNoIsNull || err.fakturaTypeIsNull || err.clientIsNull || err.itemsIsEmpty)) ||
        (isItem && (err.serviceOrItemIsNull || err.unitsetLineIsNull || err.amountIsNull || err.priceIsNull))
    ) {
        return err;
    }
    return null;
}
