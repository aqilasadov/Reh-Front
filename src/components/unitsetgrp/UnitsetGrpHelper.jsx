import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";
import {BACKEND_URL} from "../../utils/Constants";


export const MODULE_NAME = 'Ölçü vahidi qruplarının məlumatları';
export const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/unitsetGrp/compData';
export const LOAD_DATA_URL = BACKEND_URL + '/api/unitsetGrp/filterData';
export const LOAD_BY_ID_URL = BACKEND_URL + '/api/unitsetGrp/{id}';
export const INSERT_URL = BACKEND_URL + '/api/unitsetGrp/insupd';
export const DELETE_URL = BACKEND_URL + '/api/unitsetGrp/delete/{id}';


// rows
export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        title: item.title,
        code: item.code,
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
        Header: "Adı",
        accessor: "title"
    },
    {
        Header: "Kodu",
        accessor: "code"
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
    title = '';
    code = '';
 }

export function createFilterObj(filterData) {
    return {title: filterData.title, code: filterData.code}
}


export class CompData {
}

export class ValueData {
    id = 0;
    title = '';
    code = '';

}

export class Errors {
    titleIsNull = false;
    codeIsNull = false;
}

export function createErrorObj(valueData) {
    const titleIsNull = valueData.title === null || valueData.title === '';
    const codeIsNull = valueData.code === null || valueData.code === '';

    if (titleIsNull || codeIsNull){
        return {titleIsNull, codeIsNull}
    }
    return null;
}
