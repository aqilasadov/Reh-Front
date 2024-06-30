import React from 'react';
import Paper from '@material-ui/core/Paper';
import WrappedVirtualizedTable from "../common/custom-virualized-table/MuiVirtualizedTable";
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "../common/ac/Autocomplete";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import TextField from "@material-ui/core/TextField";
import {ifNegative, ifNull} from "../../utils/Validator";
import Button from "../../components-tim/CustomButtons/Button";

import Add from "@material-ui/icons/Add";
import Cancel from "@material-ui/icons/Cancel"
import {crtErrTitle} from "./AbstractFakutra";
import InputAdornment from "@material-ui/core/InputAdornment";

export const columns = [
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
        label: "ƏDV %",
        dataKey: "vat",
    },
    {
        width: 200,
        label: "ƏDV MƏB.",
        dataKey: "vatMebleg",
    },
    {
        width: 200,
        label: "Məbləğ",
        dataKey: "yekunMebleg",
    },
    {
        width: 150,
        label: "Операция",
        dataKey: "action",
    }
];

function FakturaLines(props) {

    const {onClick, onChange, faktura, errors, compData} = props;
    const rows = faktura.fakturaItemList ? faktura.fakturaItemList.filter(item => item.op !== 3) : [];
    return (
        <Paper style={{height: '500px', width: '100%', margin: 0}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', paddingTop: 10, paddingRight: 10}}>
                <Button justIcon round
                        onClick={() => onClick({
                            clickFor: 'ITEMS_TABLE_CLICK',
                            action: 'ADD_ROW',
                            row: {id: 0, op: 1, unitsetLineList: []}
                        })}
                        color="danger" className="remove">
                    <Add/>
                </Button>
            </div>
            <WrappedVirtualizedTable
                rowCount={rows.length}
                rowGetter={({index}) => adapter({row: rows[index], onClick, onChange, index, errors, compData})}
                columns={columns}
            />
        </Paper>
    )
}

function adapter(item) {
    const {row, index, onChange, onClick, errors, compData} = item;
    const isItem = row.mxType ? row.mxType.value !== 2 : false;
    const mxUrl = isItem ? '/api/items/acItemWithUnitsetLine?label=' : '/api/servicecard/ac?label=';
    const mxName = isItem ? 'item' : 'serviceCard';
    return (
        {
            id: row.id,
            mxType:
                <FormControl fullWidth={true}>
                    <Autocomplete source={compData ? compData.mxTypeList : []}
                                  id={'mxType'}
                                  name={'mxType'}
                                  value={row ? row.mxType : null}
                                  onChange={event => onChange({
                                      component: 'ac',
                                      name: 'mxType',
                                      value: event,
                                      row
                                  })}
                                  textFieldProps={{error: errors[crtErrTitle('mxType', index)]}}
                    />
                </FormControl>,
            item: <FormControl fullWidth={true}>
                <AsyncAutocomplete url={mxUrl}
                                   id={mxName}
                                   name={mxName}
                                   value={row ? row[mxName] : null}
                                   onChange={event => onChange({
                                       component: 'ac',
                                       name: mxName,
                                       value: event,
                                       row
                                   })}
                                   textFieldProps={{error: errors[crtErrTitle(mxName, index)]}}

                />
            </FormControl>,
            unitsetLine: <FormControl fullWidth={true}>
                <Autocomplete source={row.unitsetLineList}
                              id={'unitsetLine'}
                              name={'unitsetLine'}
                              value={row ? row.unitsetLine : null}
                              onChange={event => onChange({
                                  component: 'ac',
                                  name: 'unitsetLine',
                                  value: event,
                                  row,
                              })}
                              textFieldProps={{error: errors[crtErrTitle('unitsetLine', index)]}}
                />
            </FormControl>,
            amount:
                <TextField
                    error={errors[crtErrTitle('amount', index)]}
                    required
                    id="amount"
                    name="amount"
                    fullWidth
                    type="number"
                    onChange={event => onChange({
                        component: 'tf',
                        name: event.target.name,
                        value: ifNegative(event.target.value),
                        row,
                    })}
                    value={ifNull(row.amount, '')}
                />,
            price: <TextField
                error={errors[crtErrTitle('price', index)]}
                required
                id="price"
                name="price"
                fullWidth
                type="number"
                onChange={event => {
                    // console.log('row 1: ', row);
                    // row['price'] = event.target.value;
                    onChange({
                        component: 'tf',
                        name: event.target.name,
                        value: event.target.value,
                        row,
                    })
                }
                }
                value={ifNull(row.price, '')}
            />,
            vat: <TextField
                required
                id="vat"
                name="vat"
                fullWidth
                type="number"
                onChange={event => onChange({
                    component: 'tf',
                    name: event.target.name,
                    value: ifNegative(event.target.value),
                    row,
                })}
                value={ifNull(row.vat, '')}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
            />,
            vatMebleg: row.vat && row.vat > 0 ? (ifNull(row.price,0) * ifNull(row.amount,0) * (row.vat / 100)).toFixed(2) : 0.00,
            yekunMebleg: ifNull(row.amount) * ifNull(row.price),
            action:
                <Button justIcon round simple
                        onClick={() => onClick({
                            clickFor: 'ITEMS_TABLE_CLICK',
                            action: 'DELETE_ROW',
                            index,
                            row,
                        })}
                        color="warning" className="remove">
                    <Cancel/>
                </Button>
        }
    );
}


FakturaLines.propTypes = {
    faktura: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    compData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default FakturaLines;



