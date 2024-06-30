import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./KassaToKassaHelper";
import {withStyles} from '@material-ui/core/styles';
import {ifNegative} from "../../utils/Validator";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import Autocomplete from "../common/ac/Autocomplete";
import MuiDialog from "../common/dialogs/MuiDialog";
import * as moment from "moment";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import {DatePicker} from "material-ui-pickers";
import TextField from "@material-ui/core/TextField";

const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};

function KassaToKassaForm(props) {

    // const [kbType, setKbType] = useState(kbTypeList[0]);
    // const kbTypeId = kbType.value;

    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;

    const kbTypeId = !valueData.kbType || valueData.kbType === null ? 0 : valueData.kbType.value;
    const kbTypeId2 = !valueData.kbType2 || valueData.kbType2 === null ? 0 : valueData.kbType2.value;

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





                <Grid item xs={12} sm={SM * 2 }>

                    <Autocomplete source={compData.kbTypeList}
                                  id={'kbType'}
                                  name={'kbType'}
                                  value={valueData.kbType}
                                  textFieldProps={{
                                      label: 'Hesabdan',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.kbTypeIsNull,
                                  }}
                                  onChange={onChange('kbType')}/>
                </Grid>


                <Grid item xs={12} sm={SM * 2}>
                                  <AsyncAutocomplete url={'/api/kassa/ac?kbtype=' + kbTypeId + '&label='}
                                       id={'kassaBank'}
                                       name={'kassaBank'}
                                       value={valueData.kassaBank}

                                       textFieldProps={{
                                           label: valueData.kbType ? valueData.kbType.label : 'Kassa',
                                           InputLabelProps: {
                                               shrink: true,
                                           },
                                           error: errors.kassaBankIsNull,
                                       }}
                                       cache={false}
                                       onChange={onChange('kassaBank')}/>
                </Grid>



                <Grid item xs={12} sm={SM * 2}>

                    <Autocomplete source={compData.kbTypeList}
                                  id={'kbType2'}
                                  name={'kbType2'}
                                  value={valueData.kbType2}
                                  textFieldProps={{
                                      label: 'Hesaba',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.kbType2IsNull,
                                  }}
                                  onChange={onChange('kbType2')}/>
                </Grid>


                <Grid item xs={12} sm={SM * 2}>
                    <AsyncAutocomplete url={'/api/kassa/ac?kbtype=' + kbTypeId2 + '&label='}
                                       id={'kassaBank2'}
                                       name={'kassaBank2'}
                                       value={valueData.kassaBank2}

                                       textFieldProps={{
                                           label: !valueData.kbType2 ? 'Kassa' : valueData.kbType2.label,
                                           InputLabelProps: {
                                               shrink: true,
                                           },
                                           error: errors.kassaBank2IsNull,
                                       }}
                                       cache={false}
                                       onChange={onChange('kassaBank2')}/>
                </Grid>
                <Grid item xs={12} sm={4}>

                    <Autocomplete source={compData.currencyList}
                                  id={'currency'}
                                  name={'currency'}
                                  value={valueData.currency}
                                  placeholder={'Валюта'}
                                  textFieldProps={{
                                      label: 'Валюта',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.currencyIsNull,
                                  }}
                                  onChange={onChange('currency')}/>
                </Grid>



                <Grid item xs={12} sm={SM + 1}>
                    <TextField
                        id="price"
                        style={{margin:8, paddingTop: '8px'}}
                        labelText={'Məbləğ'}
                        error={errors.priceIsNull}
                        formControlProps={{fullWidth: true}}
                        type="number"
                        inputProps={{
                            onChange: onChange('price'),
                            name: 'price',
                            value: ifNegative(valueData.price),
                            error: errors.priceIsNull
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={SM + 1}>
                    <DatePicker
                        style={{margin:0, paddingTop: '0px'}}
                        fullWith={true}
                        margin="normal"
                        label="Tarix"
                        clearable
                        fullWidth={true}
                        keyboard
                        value={!valueData.tarix || valueData.tarix === 0 ? null : moment.unix(valueData.tarix).format("MM/DD/YYYY")}
                        format="DD/MM/YYYY"
                        onChange={onChange('tarix')}
                        error={errors.tarixIsNull}
                    />
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

KassaToKassaForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

KassaToKassaForm.defaultProps = {
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
export default withStyles(style)(KassaToKassaForm);
