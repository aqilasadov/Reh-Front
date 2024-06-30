import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./KassaItemsHelper";
import {ifNegative, ifNull} from "../../utils/Validator";
import Autocomplete from "../common/ac/Autocomplete";
import MuiDialog from "../common/dialogs/MuiDialog";
import * as moment from "moment";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import {DatePicker} from "material-ui-pickers";
import TextField from "@material-ui/core/TextField";

function KassaItemsForm(props) {
    const {open, data, onChange, dialogAction, isNagdOdenis} = props;
    const {valueData, compData, errors} = data;
    let fakturaType = -1;

    if (valueData.kassaType && (valueData.kassaType.value === 1 ||  valueData.kassaType.value === 2)){
        fakturaType = valueData.kassaType.value === 1 ? 2 : 1;
    }

    const kbTypeId = !valueData.kbType || valueData.kbType === null ? 0 : valueData.kbType.value;


    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';
    const SM = 3;
    return (
        <MuiDialog
            dialogContent={content()}
            dialogAction={action()}
            onClose={() => dialogAction('close')}
            open={open}
            title={title}
        />
    );

    function content() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={SM * 2 - 2}>
                    <TextField
                        id="code"
                        name="code"
                        label={'Nömrə'}
                        fullWidth
                        error={errors.codeIsNull}
                        onChange={event => onChange({c: 'tf', name: event.target.name, value: event.target.value})}
                        value={ifNull(valueData.code)}/>
                </Grid>
                <Grid item xs={12} sm={SM * 2 - 2}>
                    <DatePicker
                        style={{margin: 0, paddingTop: '0px'}}
                        fullWith={true}
                        margin="normal"
                        label="Tarix"
                        clearable
                        fullWidth={true}
                        keyboard
                        value={!valueData.tarix || valueData.tarix === 0 ? null : moment.unix(valueData.tarix).format("MM/DD/YYYY")}
                        format="DD/MM/YYYY"
                        onChange={event => onChange({c: 'dt', name: 'tarix', value: event})}
                        // onChange={onChange('tarix')}
                    />
                </Grid>
                <Grid item xs={12} sm={SM * 2 - 2}>
                    <TextField
                        id="price"
                        name="price"
                        label={'Məbləğ'}
                        fullWidth
                        error={errors.priceIsNull}
                        type="number"
                        onChange={event => onChange({c: 'tf', name: event.target.name, value: event.target.value})}
                        value={ifNegative(valueData.price)}
                    />
                </Grid>

                <Grid item xs={12} sm={SM * 4}>
                    <Autocomplete source={compData.kassaTypeList}
                                  id={'kassaType'}
                                  name={'kassaType'}
                                  disabled={isNagdOdenis}
                                  value={valueData.kassaType}
                                  placeholder={'Тип операции'}
                                  textFieldProps={{
                                      label: 'Тип операции',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.kassaTypeIsNull,
                                  }}
                                  onChange={event => onChange({c: 'ac', name: 'kassaType', value: event})}
                    />
                </Grid>
                <Grid item xs={12} sm={SM * 4}>
                    <Autocomplete source={compData.kbTypeList}
                                  id={'kbType'}
                                  name={'kbType'}
                                  value={valueData.kbType}
                                  disabled={isNagdOdenis}
                                  placeholder={'Kassa/Bank'}
                                  textFieldProps={{
                                      label: 'Kassa/Bank',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                  }}
                                  onChange={event => onChange({c: 'ac', name: 'kbType', value: event})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <AsyncAutocomplete url={'/api/kassa/ac?kbtype=' + kbTypeId + '&label='}
                                       id={'kassaBank'}
                                       name={'kassaBank'}
                                       value={valueData.kassaBank}

                                       textFieldProps={{
                                           label: !valueData.kbType ? 'Kassa' : valueData.kbType.label,
                                           InputLabelProps: {
                                               shrink: true,
                                           },
                                       }}
                                       cache={false}
                                       onChange={event => onChange({c: 'ac', name: 'kassaBank', value: event})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <AsyncAutocomplete url={`/api/clients/ac?typeId=${fakturaType}&label=`}
                                       id={'client'}
                                       name={'client'}
                                       value={valueData.client}
                                       placeholder={'Клиент'}
                                       disabled={isNagdOdenis}
                                       textFieldProps={{
                                           label: 'Клиент',
                                           InputLabelProps: {
                                               shrink: true,
                                           },
                                       }}
                                       onChange={event => onChange({c: 'ac', name: 'client', value: event})}

                    />
                </Grid>
                {/*<Grid item xs={12} sm={6}>*/}
                {/*    <AsyncAutocomplete url={'/api/faktura/ac?label='}*/}
                {/*                       id={'faktura'}*/}
                {/*                       name={'faktura'}*/}
                {/*                       value={valueData.faktura}*/}
                {/*                       placeholder={'Faktura nömrəsi'}*/}
                {/*                       textFieldProps={{*/}
                {/*                           label: 'Faktura nömrəsi',*/}
                {/*                           InputLabelProps: {*/}
                {/*                               shrink: true,*/}
                {/*                           },*/}
                {/*                           error: errors.fakturaIsNull,*/}
                {/*                       }}*/}
                {/*                       disabled={isNagdOdenis}*/}
                {/*                       onChange={event => onChange({c: 'ac', name: 'faktura', value: event})}*/}
                {/*    />*/}
                {/*</Grid>*/}
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="note"
                        name="note"
                        label={'Qeyd'}
                        fullWidth
                        error={errors.priceIsNull}
                        onChange={event => onChange({c: 'tf', name: event.target.name, value: event.target.value})}
                        value={ifNull(valueData.note)}/>
                </Grid>

            </Grid>
        );
    }

    function action() {
        return (
            <Fragment>
                <Button onClick={() => dialogAction('disagree')} color="primary">Отмена</Button>
                <Button onClick={() => dialogAction('agree')} color="primary"
                        autoFocus> {valueData.id === 0 ? 'Сохранить' : 'Изменять'}</Button>
            </Fragment>
        );
    }

}

KassaItemsForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    isNagdOdenis: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

KassaItemsForm.defaultProps = {
    open: true,
    onChange: () => {
    },
    dialogAction: () => {
    },
    data: {
        compData: new CompData(),
        valueData: new ValueData()
    }
};
export default KassaItemsForm;
