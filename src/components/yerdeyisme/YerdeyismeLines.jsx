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
import {crtErrTitle} from "./YerdeyismeHelper";

function YerdeyismeLines(props) {

    const {columns, onClick, onChange, faktura, errors} = props;
    const rows = faktura.fakturaItemList ? faktura.fakturaItemList.filter(item => item.op !== 3) : [];
    console.log('loadDataByFakturaId::rows: ', rows);
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
                rowGetter={({index}) => adapter({row: rows[index], onClick, onChange, index, errors})}
                columns={columns}
            />
        </Paper>
    )
}

function adapter(item) {
    const {row, index, onChange, onClick, errors} = item;
    return (
        {
            id: row.id,
            item: <FormControl fullWidth={true}>
                <AsyncAutocomplete url={'/api/items/acItemWithUnitsetLine?label='}
                                   id={'item'}
                                   name={'item'}
                                   value={row ? row.item : null}
                                   onChange={event => onChange({
                                       component: 'ac',
                                       name: 'item',
                                       value: event,
                                       row
                                   })}
                                   textFieldProps={{error: errors[crtErrTitle('item', index)]}}
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
                    // console.log('row 2: ', row);
                }
                }
                value={ifNull(row.price, '')}
            />,
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


YerdeyismeLines.propTypes = {
    faktura: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default YerdeyismeLines;
