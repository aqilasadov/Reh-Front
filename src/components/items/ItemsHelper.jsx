import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";


export const MODULE_NAME = 'Mallar';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/items/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/items/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/items/{id}';
export const INSERT_URL = BACKEND_URL + '/api/items/insupd';
export const DELETE_URL = BACKEND_URL + '/api/items/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        code: item.code,
        name: item.name,
        stgrpcode: item.stgrpcode === null ? '' : item.stgrpcode.label,
        isActive: item.isActive,
        cardType: item.cardType === null ? '' : item.cardType.label,
        vat: item.vat===0 ? '': item.vat,
        taxesCode: item.taxesCode,
        speccode: item.speccode,
        shelflife: item.shelflife,
        text: item.text,
        barcode: item.barcode,
        unitsetLine: item.unitsetLine === null ? '' : item.unitsetLine.label,
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
        Header: "Kod",
        accessor: "code"
    },
    {
        Header: "Adı",
        accessor: "name"
    },
    {
        Header: "Ədv",
        accessor: "vat"
    },
    {
        Header: "Vergi kodu",
        accessor: "taxesCode"
    },
    {
        Header: "Barkod",
        accessor: "barcode"
    },
    {
        Header: "Xüsusi kodu",
        accessor: "speccode"
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
    stgrpcodeList=[];
    cardTypeList=[];
    unitsetLineList=[];
}

export class ValueData {
    id = 0;
    code='';
    name='';
    stgrpcode = new ValueLabel();
    isActive=0;
    cardType = new ValueLabel();
    vat=null;
    taxesCode='';
    speccode='';
    shelflife=null;
    text='';
    barcode='';
    unitsetLine=new ValueLabel();
  }

export class Errors {
    codeIsNull = false;
    nameIsNull = false;
    stgrpcodeIsNull = false;
    cardTypeIsNull = false;
    unitsetLineIsNull = false;
    barcodeIsNull=false;
}

export function createErrorObj(valueData) {
    const codeIsNull = valueData.code === null || valueData.code === '';
    const nameIsNull = valueData.name === null || valueData.name === '';

    if (nameIsNull || codeIsNull){
        return {nameIsNull, codeIsNull}
    }
    return null;
}
