import Button from "../../components-tim/CustomButtons/Button";
import React from "react";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import List from "@material-ui/icons/List";
import Print from "@material-ui/icons/Print";
import * as moment from "moment";

export const ALIS_FAKTURA = 1;
export const SATIS_FAKTURA = 2;

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
        payDate: item.payDate === 0 ? '' : moment.unix(item.payDate).format("DD/MM/YYYY"),
        tarix: item.tarix === 0 ? '' : moment.unix(item.tarix).format("DD/MM/YYYY"),


        action: (
            <div className="actions-right">


                {
                    item.fakturaType && item.fakturaType.value === 1 &&
                    <Button justIcon round simple onClick={() => onClick({
                        clickFor: 'TITLE_MAIN_TABLE_CLICK', action: 'FF_FAKTURA',
                        data: {id, fakturaNo: item.fakturaNo, client: item.client === null ? '' : item.client.label}
                    })}
                            color="warning" className="edit">
                        <List/>
                    </Button>
                }
                {" "}
                <Button justIconThin round simple
                        onClick={() => onClick({clickFor: 'TITLE_MAIN_TABLE_CLICK', action: 'FAKTURA_PRINT', id})}
                        color="warning">
                    <Print/>
                </Button>
                {" "}
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

export function createFilterObj(filterData) {
    return {fakturaType: filterData.fakturaType}
}

export function checkFakturaType(fakturaType) {

    if (!fakturaType)
        return -1;

    if (fakturaType.value === 1 || fakturaType.value === 4)
        return ALIS_FAKTURA;
    else if (fakturaType.value === 2 || fakturaType.value === 5)
        return SATIS_FAKTURA;

    return -1;
}

export function getFakturaTitle(fakturaType) {
    const ft = checkFakturaType(fakturaType);
    if (ft === ALIS_FAKTURA)
        return 'Faktura-Alış';
    else if (ft === SATIS_FAKTURA)
        return 'Faktura-Satış';
    else
        return 'Faktura';
}
