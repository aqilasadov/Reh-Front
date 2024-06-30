import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";


export const MODULE_NAME = 'Xidmətlər';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/servicecard/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/servicecard/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/servicecard/{id}';
export const INSERT_URL = BACKEND_URL + '/api/servicecard/insupd';
export const DELETE_URL = BACKEND_URL + '/api/servicecard/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        code: item.code,
        name1: item.name1,
        name2: item.name2,
        cardType: item.cardType === null ? '' : item.cardType.label,
        specode: item.specode,
        unitsetLine: item.unitsetLine === null ? '' : item.unitsetLine.label,
        isActive: item.isActive === 1 ? 'Aktiv' : 'Passiv',

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
        accessor: "name1"
    },
    {
        Header: "Statusu",
        accessor: "isActive"
    },
    // {
    //     Header: "Ad2",
    //     accessor: "name2"
    // },
    //  {
    //     Header: "Xüsusi kodu",
    //     accessor: "specode"
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
    unitsetLineList=[];
    cardTypeList=[];
}




export class ValueData {
    id = 0;
    code='';
    name1='';
    name2='';
    cardType = new ValueLabel();
    specode='';
    unitsetLine = new ValueLabel();
    isActive=0;
  }

export class Errors {
    codeIsNull = false;
    name1IsNull = false;
    cardTypeIsNull=false;
    unitsetLineIsNull=false;
}

export function createErrorObj(valueData) {
    const codeIsNull = valueData.code === null || valueData.code === '';
    const name1IsNull = valueData.name1 === null || valueData.name1 === '';

    if (name1IsNull || codeIsNull){
        return {name1IsNull, codeIsNull}
    }
    return null;
}
