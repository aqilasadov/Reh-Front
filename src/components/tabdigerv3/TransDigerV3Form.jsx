import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./TransDigerV3Helper";
import {withStyles} from '@material-ui/core/styles';
import {ifNull} from "../../utils/Validator";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import Autocomplete from "../common/ac/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Check from "@material-ui/icons/Check";
import Datetime from "react-datetime";
import * as moment from "moment";
import MuiDialog from "../common/dialogs/MuiDialog";
import Dialog from "@material-ui/core/Dialog/Dialog";
import TextField from "@material-ui/core/TextField";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import {DatePicker} from "material-ui-pickers";
const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};
function ItemsForm(props) {
    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;
    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';
    const SM = 4;
    return (
        <MuiDialog
             maxWidth={'md'}
            // fullWidth={true}

            dialogContent={content()}
            dialogAction={action()}
            onClose={()=>dialogAction('close')}
            open={open}
            title={title}
        />
    );

    function content() {
        return (
            <Grid container spacing={1}>



                <Grid item xs={12} sm={2} style={{margin:0, paddingTop: '0px'}}>
                    <Autocomplete source={compData.fakturaTypeList5}
                                  id={'fakturaType2'}
                                  name={'fakturaType2'}
                                  value={valueData.fakturaType2}
                                  placeholder={'Тип операции'}
                                  textFieldProps={{
                                      label: 'Тип операции',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.faktura2TypeIsNull,
                                  }}
                                  onChange={onChange('fakturaType2')}/>
                </Grid>

                <Grid item xs={12} sm={3} style={{margin:0, paddingTop: '0px'}}>

                    <Autocomplete source={compData.clientList}
                                  id={'client'}
                                  name={'client'}
                                  value={valueData.client}
                                  placeholder={(valueData.id === 0)?'Клиент 1':'Клиент 1'}
                                  textFieldProps={{
                                      label: (valueData.id === 0)?'Клиент 1':'Клиент 1',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.clientIsNull,
                                  }}
                                  onChange={onChange('client')}/>
                </Grid>

                <Grid item xs={12} sm={2} style={{margin:0, paddingTop: '0px'}}>

                    <Autocomplete source={compData.currencyList4}

                                  id={'currencyKassa'}
                                  name={'currencyKassa'}
                                  value={valueData.currencyKassa}
                                  placeholder={'Счет 1'}
                                  textFieldProps={{
                                      label: 'Счет 1',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.currencyKassaIsNull,
                                  }}
                                  onChange={onChange('currencyKassa')}/>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <CustomInput
                        id="mebleg"
                        labelText={'Сумма'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('mebleg'),
                            name: 'mebleg',
                            value: ifNull(valueData.mebleg),
                            error: errors.meblegIsNull,
                        }}
                    />
                </Grid>



                <Grid item xs={12} sm={2}>
                    <DatePicker
                        style={{margin:0, paddingTop: '0px'}}
                        fullWith={true}
                        margin="normal"
                        label="Дата"
                        clearable
                        fullWidth={true}
                        keyboard
                        value={!valueData.begdate || valueData.begdate === 0 ? null :  new Date(0).setUTCSeconds(valueData.begdate)}
                        // value={!valueData.begdate || valueData.begdate === 0 ? null : moment.unix(valueData.begdate).format("MM/DD/YYYY")}
                        format="DD/MM/YYYY"
                        onChange={onChange('begdate')}
                    />
                </Grid>


                <Grid item xs={12} sm={3} style={{margin:0, paddingTop: '0px'}}>

                    <Autocomplete source={compData.clientList2}
                                  id={'client2'}
                                  name={'client2'}
                                  value={valueData.client2}
                                  placeholder={'Клиент 2'}
                                  textFieldProps={{
                                      label: 'Клиент 2',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.client2IsNull,
                                  }}
                                  onChange={onChange('client2')}/>
                </Grid>
                {/*//priority*/}









                <Grid item xs={12} sm={2} style={{margin:0, paddingTop: '0px'}}>

                    <Autocomplete source={compData.currencyList4}

                                  id={'currency'}
                                  name={'currency'}
                                  value={valueData.currency}
                                  placeholder={'Счет 2'}
                                  textFieldProps={{
                                      label: ' Счет 2',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.currencyIsNull,
                                  }}
                                  onChange={onChange('currency')}/>
                </Grid>





                {( ((valueData.currencyKassa===null) && (valueData.currency === null) )  ? false : ((valueData.currencyKassa.value !== 0) && (valueData.currencyKassa.value !== valueData.currency.value) && ( valueData.currency.value!== 0)))  &&
                    <Grid item xs={12} sm={1}>
                        <CustomInput
                            id="faiznew1"
                            labelText={'Курс'}
                            formControlProps={{fullWidth: true}}
                            inputProps={{
                                onChange: onChange('faiznew1'),
                                name: 'faiznew1',
                                value: ifNull(valueData.faiznew1)
                            }}
                        />
                    </Grid>
                }




                <Grid item xs={12} sm={4}>
                    <CustomInput
                        id="qeyd"
                        labelText={'Заметка'}
                        error={errors.nameIsNull}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('qeyd'),
                            name: 'qeyd',
                            value: ifNull(valueData.qeyd),
                            error: errors.qeydIsNull
                        }}
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
            </Fragment>);
    }
}

ItemsForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

ItemsForm.defaultProps = {
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
export default withStyles(style)(ItemsForm);
