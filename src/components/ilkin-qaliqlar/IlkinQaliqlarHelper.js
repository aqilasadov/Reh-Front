import {BACKEND_URL} from "../../utils/Constants";
import ValueLabel from "../../utils/ValueLabel";
import * as moment from "moment";
import Button from "../../components-tim/CustomButtons/Button";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import React from "react";

export const MODULE_NAME = 'İlkin qalıqlar';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/faktura/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/faktura/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/faktura/{id}';
export const INSERT_URL = BACKEND_URL + '/api/faktura/insupd';
export const DELETE_URL = BACKEND_URL + '/api/faktura/delete/{id}';
export const GENERATE_FAKTURA_URL = BACKEND_URL + '/api/faktura/generatecode';


export const ILKIN_QALIQLAR = new ValueLabel(6, 'İlkin qalıqlar');




export const columns = [
    {
        flexGrow: 1.0,
        width: 200,
        label: "Malın adı",
        dataKey: "item"
    },
    {
        width: 200,
        label: "Ölçü vahidi",
        dataKey: "unitsetLine",
    },
    {
        width: 200,
        label: "Miqdarı",
        dataKey: "amount"
    },
    {
        width: 200,
        label: "Məbləği",
        dataKey: "price"
    },
    {
        width: 80,
        label: "Операция",
        dataKey: "action",
    }
];


export const columnsTitle = [
    {
        Header: "Faktura no",
        accessor: "fakturaNo"
    },
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





export function createDataTitle(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        fakturaNo: item.fakturaNo,
        tarix: item.tarix === 0 ? '' : moment.unix(item.tarix).format("MM/DD/YYYY"),


        action: (
            <div className="actions-right">



                <Button justIconThin round simple
                        onClick={() => onClick({clickFor: 'TITLE_MAIN_TABLE_CLICK', action: 'EDIT_ROW', id})}
                        color="warning">
                    <Edit/>
                </Button>
                {" "}
                <Button justIconThin round simple
                        onClick={() => onClick({clickFor: 'TITLE_MAIN_TABLE_CLICK', action: 'DELETE_ROW', id})}
                        color="warning">
                    <Close/>
                </Button>
            </div>
        )
    }
}

export const crtErrTitle = (name, ind) => name + '_' + ind;

export function createFilterObj(filterData) {
    return {fakturaType: 4 }
}
