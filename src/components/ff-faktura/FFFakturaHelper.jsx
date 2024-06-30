import Button from "../../components-tim/CustomButtons/Button";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import React from "react";


export const columns = [
    {
        width: 200,
        label: "Xidmət",
        dataKey: "serviceCard",
    },
    {
        flexGrow: 1.0,
        width: 600,
        label: "Xidmət göstərən",
        dataKey: "client",
    },
    {
        width: 200,
        label: "Növü",
        dataKey: "ffType",
    },
    {
        width: 200,
        label: "Цена",
        dataKey: "price",
    },
    {
        width: 150,
        label: "Операция",
        dataKey: "action",
    }
];
export const ffItemColumns = [
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
        label: "ƏDV",
        dataKey: "vat",
    },
    // {
    //     width: 150,
    //     label: "Операция",
    //     dataKey: "action",
    // }
];

export function createItemsData(item, onClick) {
    const isItem = !item.mxType || item.mxType === null ? true : item.mxType.value === 1;


    const id = item.id;
    const index = item.index;

    // const ffColLabel = !item.ffValues ? null : item.ffValues.label;
    // const ffColVal = !item.ffValues ? null : item.ffValues.value;
    // if (ffColLabel != null)
    //     ffItemColumns.push({
    //         width: 150,
    //         label: item.ffValues.label,
    //         dataKey: item.ffValues.label
    //     });
    //
    // console.log('ffItemColumns: ', ffItemColumns);
    return {
        id: item.id,
        mxType: !item.mxType || item.mxType === null ? '' : item.mxType.label,
        item: isItem ? !item.item || item.item === null ? '' : item.item.label :
            !item.serviceCard || item.serviceCard === null ? '' : item.serviceCard.label,
        unitsetLine: !item.unitsetLine || item.unitsetLine === null ? '' : item.unitsetLine.label,

        amount: item.amount,
        price: item.price,
        vat: item.vat,
        parentId: item.parentId,
        ffValues: item.ffValues,
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

export function createData(item, onClick) {
    const id = item.id;
    return {
        id: item.id,
        serviceCard: !item.serviceCard || item.serviceCard === null ? '' : item.serviceCard.label,
        client: !item.client || item.client === null ? '' : item.client.label,
        ffType: !item.ffType || item.ffType === null ? '' : item.ffType.label,
        price: item.price,

        action: (
            <div className="actions-right">
                <Button justIconThin round simple
                        onClick={() => onClick({clickFor: 'FF_TITLE_TABLE_CLICK', action: 'EDIT_ROW', id})}
                        color="warning">
                    <Edit/>
                </Button>
                {" "}
                <Button justIconThin round simple
                        onClick={() => onClick({clickFor: 'FF_TITLE_TABLE_CLICK', action: 'DELETE_ROW', id})}
                        color="warning">
                    <Close/>
                </Button>
            </div>
        )
    }
}

export function createFFName(label, id) {
    const name = (label + '_' + id).toLowerCase().replace(" ", "_");
    console.log('createFFName: ', name);
    return name;
}


export class ffFakturaTitle {
    id = 0;
    serviceCard = null;
    fakturaType = null;
    client = null;
    ffType = null;
    pid = 0;
    price = 0;
}

export class CompData {
    serviceTypeList = [];
    ffTypeList = [];
}


export class Errors {
    serviceCardIsNull = false;
    clientIsNull = false;
    ffTypeIsNull = false;
    priceIsNull = false;
}

export function createErrorObj(valueData) {
    const err = new Errors();

    err.serviceCardIsNull = !valueData.serviceCard;
    err.clientIsNull = !valueData.client;
    err.ffTypeIsNull = !valueData.ffType;
    err.priceIsNull = !valueData.price || valueData.price <= 0;
    if (err.serviceCardIsNull || err.clientIsNull || err.ffTypeIsNull || err.priceIsNull) {
        return err;
    }
    return null;
}
