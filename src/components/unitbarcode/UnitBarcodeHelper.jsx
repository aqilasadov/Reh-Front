import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";


export const MODULE_NAME = 'Barcodlar';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/unitbarcode/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/unitbarcode/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/unitbarcode/{id}';
export const INSERT_URL = BACKEND_URL + '/api/unitbarcode/insupd';
export const DELETE_URL = BACKEND_URL + '/api/unitbarcode/delete/{id}';

// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        barcode: item.barcode,
        globalid: item.globalid,
        item: item.item === null ? '' : item.item.label,
        linenr: item.linenr,
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
        Header: "Barcode",
        accessor: "barcode"
    },
    {
        Header: "Vergi ID-si",
        accessor: "globalid"
    },
    {
        Header: "Mal",
        accessor: "item"
    },
    {
        Header: "Sırası",
        accessor: "linenr"
    },
    {
        Header: "Ölcü vahidi",
        accessor: "unitsetLine"
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
       unitsetLineList=[];
}

export class ValueData {
    id = 0;
    barcode='';
    globalid='';
    item = new ValueLabel();
    linenr=0;
    unitsetLine = new ValueLabel();

  }

export class Errors {
    barcodeIsNull = false;
    itemIsNull = false;
    unitsetLineIsNull=false;
}

export function createErrorObj(valueData) {
    const barcodeIsNull = valueData.barcode === null || valueData.barcode === '';
    const itemIsNull = valueData.item === null || valueData.item === '';

    if (itemIsNull || barcodeIsNull){
        return {itemIsNull, barcodeIsNull}
    }
    return null;
}
