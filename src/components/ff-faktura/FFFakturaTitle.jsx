import Paper from "@material-ui/core/Paper";
import WrappedVirtualizedTable from "../common/custom-virualized-table/MuiVirtualizedTable";
import {columns} from "./FFFakturaHelper";
import * as React from "react";
import PropTypes from 'prop-types';
import {Fragment} from "react";
import MuiDialog from "../common/dialogs/MuiDialog";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "../common/ac/Autocomplete";
import Button from "@material-ui/core/Button";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import {ifNull} from "../../utils/Validator";
import TextField from "@material-ui/core/TextField";

function FFFakturaTitle(props) {
    const {data, onClick, onChange, open} = props;
    const {rows, compData, valueData, errors} = data;
    return (
        <Fragment>

            <Paper style={{height: 200, width: '100%', margin: 0}}>
                <WrappedVirtualizedTable
                    rowCount={rows.length}
                    rowGetter={({index}) => rows[index]}
                    columns={columns}
                />
            </Paper>
            <MuiDialog
                maxWidth={'sm'}
                fullWidth={true}
                dialogContent={content()}
                dialogAction={action()}
                onClose={() => onClick({clickFor: 'MUI_DIALOG_CLICK', action: 'CLICK_CLOSE_BUTTON'})}
                open={open}
                title={'FF Faktura'}
            />
        </Fragment>
    );

    function content() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Autocomplete source={compData.ffTypeList}
                                  id={'ffType'}
                                  name={'ffType'}
                                  value={valueData.ffType}
                                  textFieldProps={{
                                      label: 'Hesablama növü',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.ffTypeIsNull,
                                  }}
                                  onChange={
                                      value => onChange(
                                          {
                                              component: 'ac',
                                              name: 'ffType',
                                              value: value,
                                              type: 'TITLE_VALUE',
                                          })
                                  }/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AsyncAutocomplete
                        url={'/api/servicecard/ac?label='}
                        id={'serviceCard'}
                        name={'serviceCard'}
                        value={valueData.serviceCard}
                        placeholder={'Xidmət'}
                        textFieldProps={{
                            label: 'Xidmət',
                            InputLabelProps: {
                                shrink: true,
                                fullWidth: true
                            },
                            error: errors.serviceCardIsNull,
                        }}
                        onChange={
                            value => onChange(
                                {
                                    component: 'ac',
                                    name: 'serviceCard',
                                    value: value,
                                    type: 'TITLE_VALUE',
                                })
                        }/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <AsyncAutocomplete url={'/api/clients/ac?label='}
                                       id={'client'}
                                       name={'client'}
                                       value={valueData.client}
                                       textFieldProps={{
                                           label: 'Müştəri',
                                           InputLabelProps: {
                                               shrink: true
                                           },
                                           error: errors.clientIsNull,
                                       }}
                                       onChange={event => onChange({
                                           component: 'ac',
                                           name: 'client',
                                           value: event,
                                           type: 'TITLE_VALUE',
                                       })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="price"
                        name="price"
                        label={'Məbləğ'}
                        fullWidth
                        type="number"
                        onChange={event => onChange({
                            component: 'tf',
                            name: event.target.name,
                            value: event.target.value,
                            type: 'TITLE_VALUE',
                        })}
                        error={errors.priceIsNull}
                        value={ifNull(valueData.price, '')}
                    />
                </Grid>
            </Grid>
        );
    }

    function action() {
        return (
            <Fragment>
                <Button onClick={() => onClick({clickFor: 'MUI_DIALOG_CLICK', action: 'CLICK_CLOSE_BUTTON'})}
                        color="primary">Отмена</Button>
                <Button onClick={() => onClick({clickFor: 'MUI_DIALOG_CLICK', action: 'CLICK_SAVE_BUTTON'})}
                        color="primary"
                        autoFocus> {!valueData.id || valueData.id === 0 ? 'Сохранить' : 'Изменять'}</Button>
            </Fragment>
        );
    }
}

FFFakturaTitle.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};
export default FFFakturaTitle;
