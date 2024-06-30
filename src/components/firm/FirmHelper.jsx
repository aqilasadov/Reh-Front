import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import ValueLabel from "../../utils/ValueLabel";
import Button from "../../components-tim/CustomButtons/Button";


const actionColumn = (id, onClick) =>
    <div className="actions-right">
        <Button justIcon round simple onClick={() => onClick(id, 'edit')}
                color="warning" className="edit">
            <Edit/>
        </Button>
        {" "}
        <Button justIcon round simple onClick={() => onClick(id, 'delete')} color="danger" className="remove">
            <Close/>
        </Button>
    </div>;
// rows
export function createData(id,name,logo,voen,pin,country,city,region,zipCode,telefon, email,whatsup,currency,fealiyyet,isEdv,isPartiya, onClick) {
    return {

        id,name,logo,voen,pin,country,city,region,zipCode,telefon, email,whatsup,

        currency: currency === null ? '' : currency.label,
        fealiyyet: fealiyyet === null ? '' : fealiyyet.label,
        isEdv,
        isPartiya,
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
        Header: "Firmanın adı",
        accessor: "name"
    },

    {
        Header: "Vöen",
        accessor: "voen"
    },
    {
        Header: "Fealiyyət növü",
        accessor: "fealiyyet"
    },

    {
        Header: "Telefonu",
        accessor: "telefon"
    },

    {
        Header: "Whatsap",
        accessor: "whatsup"
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
    voen = '';
   }

export class CompData {
    fealiyyetList=[];
    currencyList=[];

}

export class ValueData {
    id=0;
    name='';
    logo='';
    voen='';
    pin='';
    country='';
    city='';
    region='';
    zipCode='';
    telefon='';
    email='';
    whatsup='';
    currency= new ValueLabel();
    fealiyyet= new ValueLabel();
    isEdv=0;
    isPartiya=0;
  }

export class Errors {
    NameIsNull = false;
   // codeIsNull = false;
 //   clientsTypetNoIsNull = false;
    currencyIsNull = false;
    fealiyyetIsNull = false;
}
