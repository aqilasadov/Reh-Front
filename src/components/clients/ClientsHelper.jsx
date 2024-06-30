import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";

// rows
export function createData(id,code,companyName,firstName,lastName,voen,pin,city,region,zipCode,telefon, email,whatsup,clientsType,firstBalance, onClick) {
    return {

        id,code,companyName,firstName,lastName,voen,pin,city,region,zipCode,telefon, email,whatsup,

        clientsType: !clientsType ? '' : clientsType.label,
        firstBalance,
       // country: !country ? '' : country.label,
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
        Header: "Имя",
        accessor: "firstName"
    },
    {
        Header: "Фамилия",
        accessor: "lastName"
    },

    {
        Header: "Whatsap",
        accessor: "whatsup"
    },
    // {
    //     Header: "İlkin qalıq",
    //     accessor: "firstBalance"
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
    companyName = '';
    code = '';
    firstName = '';
    lastName = '';
    clientsType= new ValueLabel();

}

export class CompData {
    clientsTypeList = [
        new ValueLabel(1, 'Alıcı'),
        new ValueLabel(2, 'Satıcı'),

    ];

}

export class ValueData {
    id=0;
    code='';
    companyName='';
    firstName='';
    lastName='';
    voen='';
    pin='';
    country=new ValueLabel();
    city='';
    region='';
    zipCode='';
    telefon='';
    email='';
    whatsup='';
    clientsType= new ValueLabel();
    firstBalance=0;
}

export class Errors {
    firstNameIsNull = false;
    codeIsNull = false;
    clientsTypetNoIsNull = false;
    voenIsNull = false;
    telefonIsNull = false;
    firstBalanceIsNull = false;

}
