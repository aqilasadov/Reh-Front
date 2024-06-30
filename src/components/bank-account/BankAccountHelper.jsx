import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";



// rows
export function createData(id, name, code, accountNo, cardType, currency,bankBranch, isActive, onClick) {
    return {
        id,
        name,
        code,
        accountNo,
        cardType: !cardType ? '' : cardType.label,
        currency: !currency ? '' : currency.label,
        bankBranch: !bankBranch ? '' : bankBranch.label,
        isActive: isActive === 1 ? 'Aktiv' : 'Passiv',
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
        accessor: "name"
    },
    {
        Header: "Kodu",
        accessor: "code"
    },
    {
        Header: "Hesab nömrəsi",
        accessor: "accountNo"
    },

    {
        Header: "Hesab növü",
        accessor: "cardType"
    },
    {
        Header: "Валюта",
        accessor: "currency"
    },
    {
        Header: "Statusu",
        accessor: "isActive"
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
    name = '';
    code = '';
    accountNo = '';
}

export class CompData {
    cardTypeList = [];
    currencyList = [];
}

export class ValueData {
    id = 0;
    name = '';
    code = '';
    accountNo = '';
    cardType = new ValueLabel();
    currency = new ValueLabel();
    bankBranch= new ValueLabel();
    isActive = 1;
}

export class Errors {
    nameIsNull = false;
    codeIsNull = false;
    accountNoIsNull = false;
    cardTypeNoIsNull = false;
    currencyNoIsNull = false;
    bankBranchNoIsNull = false;
}


export function createErrorObj(valueData) {

    const bankBranchNoIsNull = valueData.bankBranch === null || valueData.bankBranch === '';

    if (bankBranchNoIsNull ){
        return {bankBranchNoIsNull}
    }
    return null;
}

