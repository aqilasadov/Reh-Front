import Paper from "@material-ui/core/Paper";
import WrappedVirtualizedTable from "../common/custom-virualized-table/MuiVirtualizedTable";
import {createFFName, ffItemColumns} from "./FFFakturaHelper";
import * as React from "react";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

function FFFakturaItems(props) {
    const {data, onChange, onClick, valueData} = props;
    let {rows} = data;
    let isFirst = true;

    const columns = Object.assign([], ffItemColumns);


    rows =
        rows.map(
            (item) => {
                let newItem = Object.assign({}, item);
                console.log('ffItems: ', item);
                item.ffValues.map((itemVal) => {

                    //const tempName = itemVal.label + '_' + itemVal.fakturaItemId;
                    const name = createFFName(itemVal.label, itemVal.fakturaItemId);
                    const colName = createFFName("col_" + itemVal.label, itemVal.clientId);
                    if (isFirst) {
                        columns.push({
                            width: 250,
                            label: itemVal.label,
                            dataKey: colName,
                        });
                    }


                    newItem = Object.assign({}, newItem, {
                        [colName]: createInput({
                            name: name,
                            value: {value: itemVal.value, label: itemVal.fakturaItemId}, //itemVal.value,
                        })
                    })

                });
                isFirst = false;

                //item.push()
                return newItem;
            }
        );

    // console.groupEnd();

    function createInput(input) {
        const val = valueData[input.name] ? valueData[input.name] : {};
        return (
            <TextField
                required
                id={input.name}
                name={input.name}
                fullWidth
                type="number"
                onChange={event => onChange({
                    component: 'tf',
                    name: event.target.name,
                    value: {value: parseFloat(event.target.value), label: val.label},
                    type: 'FF_VALUE',
                })}
                style={{paddingRight: 20}}
                value={val.value}
            />
        );
    }

    return (
        <Grid>
            <Grid item xs={12}>
                <Paper style={{height: 300, width: '100%', margin: 0}}>
                    <WrappedVirtualizedTable
                        rowCount={rows.length}
                        rowGetter={({index}) => rows[index]}
                        columns={columns}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <Button
                        style={{margin: 10}}
                        onClick={() => onClick({
                            clickFor: 'FF_LINE_CLICK',
                            action: 'CLICK_SAVE'
                        })}
                        variant="contained"
                        color="secondary">
                        Yaddaşa al
                    </Button>
                </Grid>
            </Grid>
        </Grid>

    );
}

FFFakturaItems.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default FFFakturaItems;
