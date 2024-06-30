import React, {Fragment} from "react";
import WrappedVirtualizedTable from "../common/custom-virualized-table/MuiVirtualizedTable";
import Paper from "@material-ui/core/Paper";
import {columns, createData} from './Fakturav2Helper'
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "../common/ac/Autocomplete";
import Button from "../../components-tim/CustomButtons/Button";
import Add from "@material-ui/icons/Add";
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel"
import {ifNegative, ifNull, isNegative} from "../../utils/Validator";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import InputAdornment from "@material-ui/core/InputAdornment";

function FakturaItems(props) {

    const {items, data, onChange, onClick, editableIndex, editableItemRow} = props;
    const {compData, errors} = data;

    console.log('items: ', items);
    const rows = editableIndex === 0 ? [editableRow(editableItemRow), ...itemsToRows(items)] :
        items.map(item => {
            if (item.index === editableIndex) {
                return editableRow(editableItemRow)
            }
            return itemToRow(item);
        });

    return (
        <Paper style={{height: 450, width: '100%', margin: 0}}>
            <WrappedVirtualizedTable
                rowCount={rows.length}
                rowGetter={({index}) => rows[index]}
                //  onRowClick={(event) => onRowSelected(event.rowData)}
                columns={columns}
            />
        </Paper>
    );

    function itemsToRows(items) {
        if (!items || items === null)
            return [];
        return items.map((item, index) => {
            item.index = index + 1;
            return createData(item, onClick)
        })
    }

    function itemToRow(item) {
        return createData(item, onClick);
    }

    function editableRow(editableItemValue) {
        const isItem = editableItemValue.mxType ? editableItemValue.mxType.value !== 2 : false;
        const apiName = isItem ? 'items' : 'servicecard';
        const mxName = isItem ? 'item' : 'serviceCard';
        console.log('editableItemValue: ', editableItemValue);
        return (
            {
                id: 0,
                mxType:
                    <FormControl fullWidth={true}>
                        <Autocomplete source={compData.mxTypeList}
                                      id={'mxType'}
                                      name={'mxType'}
                                      value={editableItemValue.mxType}
                                      onChange={event => onChange({
                                          component: 'ac',
                                          name: 'mxType',
                                          value: event,
                                          isItems: true
                                      })}
                        />
                    </FormControl>,

                item: <FormControl fullWidth={true}>
                    <AsyncAutocomplete url={'/api/' + apiName + '/ac?label='}
                                       id={mxName}
                                       name={mxName}
                                       value={editableItemValue[mxName] ? editableItemValue[mxName] : null}
                                       onChange={event => onChange({
                                           component: 'ac',
                                           name: mxName,
                                           value: event,
                                           isItems: true
                                       })}
                                       textFieldProps={{error: errors.serviceOrItemIsNull}}
                    />
                </FormControl>,
                unitsetLine: <FormControl fullWidth={true}>
                    <Autocomplete source={compData.unitsetLineList}
                                  id={'unitsetLine'}
                                  name={'unitsetLine'}
                                  value={editableItemValue.unitsetLine}
                                  onChange={event => onChange({
                                      component: 'ac',
                                      name: 'unitsetLine',
                                      value: event,
                                      isItems: true
                                  })}
                                  textFieldProps={{error: errors.unitsetLineIsNull}}
                    />
                </FormControl>,
                amount:
                    <TextField
                        required
                        id="amount"
                        name="amount"
                        fullWidth
                        type="number"
                        onChange={event => onChange({
                            component: 'tf',
                            name: event.target.name,
                            value: ifNegative(event.target.value),
                            isItems: true
                        })}
                        value={ifNull(editableItemValue.amount, '')}
                        error={errors.amountIsNull}
                    />,
                price: <TextField
                    required
                    id="price"
                    name="price"
                    fullWidth
                    type="number"
                    onChange={event => onChange({
                        component: 'tf',
                        name: event.target.name,
                        value: ifNegative(event.target.value),
                        isItems: true
                    })}
                    value={ifNull(editableItemValue.price, '')}
                    error={errors.priceIsNull}
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
                        isItems: true
                    })}
                    value={ifNull(editableItemValue.vat, '')}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                />,
                //yekunMebleg: 0,
                parentId: 0,
                action:
                    editableIndex === 0 ?
                        <Button justIcon round simple
                                onClick={() => onClick({clickFor: 'ITEMS_TABLE_CLICK', action: 'ADD_ROW'})}
                                color="danger" className="remove">
                            <Add/>
                        </Button>
                        :
                        (
                            <Fragment>
                                <Button justIcon round simple
                                        onClick={() => onClick({clickFor: 'ITEMS_TABLE_CLICK', action: 'SAVE_ROW'})}
                                        color="warning" className="remove">
                                    <Save/>
                                </Button>
                                {" "}
                                <Button justIcon round simple
                                        onClick={() => onClick({
                                            clickFor: 'ITEMS_TABLE_CLICK',
                                            action: 'CANCEL_ROW',
                                        })}
                                        color="warning" className="remove">
                                    <Cancel/>
                                </Button>
                            </Fragment>
                        )

            }
        );
    }
}

FakturaItems.propTypes = {
    editableIndex: PropTypes.number
};
FakturaItems.defaultProps = {
    editableIndex: 0
};
export default FakturaItems;
