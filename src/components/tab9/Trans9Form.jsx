import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./Trans9Helper";
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
            // maxWidth={'md'}
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



                {/*<Grid item xs={12} sm={6}>*/}
                {/*    <Autocomplete source={compData.fakturaTypeList}*/}
                {/*                  id={'fakturaType'}*/}
                {/*                  name={'fakturaType'}*/}
                {/*                  value={valueData.fakturaType}*/}
                {/*                  placeholder={'Тип операции'}*/}
                {/*                  textFieldProps={{*/}
                {/*                      label: 'Тип операции',*/}
                {/*                      InputLabelProps: {*/}
                {/*                          shrink: true,*/}
                {/*                      },*/}
                {/*                      error: errors.fakturaTypeIsNull,*/}
                {/*                  }}*/}
                {/*                  onChange={onChange('fakturaType')}/>*/}
                {/*</Grid>*/}

                <Grid item xs={12} sm={5}>

                    <Autocomplete source={compData.clientList}
                                  id={'client'}
                                  name={'client'}
                                  value={valueData.client}
                                  placeholder={(valueData.id === 0)?'Кому':'Кому'}
                                  textFieldProps={{
                                      label: (valueData.id === 0)?'Кому':'Кому',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.clientIsNull,
                                  }}
                                  onChange={onChange('client')}/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <CustomInput
                        id="alan"
                        labelText={(valueData.id === 0)?' ':' '}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('alan'),
                            name: 'alan',
                            value: ifNull(valueData.alan),

                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <CustomInput
                        id="faiznew1"
                        labelText={'Процент'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('faiznew1'),
                            name: 'faiznew1',
                            value: ifNull(valueData.faiznew1)
                        }}
                    />
                </Grid>
                { ( (valueData.currency===null) ? true : (valueData.currency.value !== 2) )&& <Grid item xs={12} sm={2}>
                    <CustomInput
                        id="faiz"
                        labelText={'П-курс'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('faiz'),
                            name: 'faiz',
                            value: ifNull(valueData.faiz)
                        }}
                    />
                </Grid>}


                {
                <Grid item xs={12} sm={5}>

                    <Autocomplete source={compData.clientList2}
                                  id={'client2'}
                                  name={'client2'}
                                  value={valueData.client2}
                                  placeholder={'От кого'}
                                  textFieldProps={{
                                      label: 'От кого',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.client2IsNull,
                                  }}
                                  onChange={onChange('client2')}/>
                </Grid>}
                {/*//priority*/}

                {
                <Grid item xs={12} sm={3}>
                    <CustomInput
                        id="veren"
                        labelText={' '}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('veren'),
                            name: 'veren',
                            value: ifNull(valueData.veren),
                                                 }}
                    />
                </Grid>}
                {
                <Grid item xs={12} sm={2}>
                    <CustomInput
                        id="faiznew2"
                        labelText={'Процент2'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('faiznew2'),
                            name: 'faiznew2',
                            value: ifNull(valueData.faiznew2)
                        }}
                    />
                </Grid>
                }
                {( (valueData.currency===null) ? true : (valueData.currency.value !== 2) )&&
                <Grid item xs={12} sm={2}>
                    <CustomInput
                        id="faiz2"
                        labelText={'К- курс'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('faiz2'),
                            name: 'faiz2',
                            value: ifNull(valueData.faiz2)
                        }}
                    />
                </Grid>}
                <Grid item xs={12} sm={6}>
                    <DatePicker
                        style={{margin:0, paddingTop: '0px'}}
                        fullWith={true}
                        margin="normal"
                        label="Дата"
                        clearable
                        fullWidth={true}
                        keyboard
                        value={!valueData.begdate || valueData.begdate === 0 ? null : new Date(0).setUTCSeconds(valueData.begdate)}
                        format="DD/MM/YYYY"
                        onChange={onChange('begdate')}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={3} style={{margin:0, paddingTop: '0px'}}>

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

{/*unitconvert*/}



                {/*<Grid item xs={12} sm={6}>*/}
                {/*    <CustomInput*/}
                {/*        id="yekun"*/}
                {/*        labelText={'Yekun'}*/}
                {/*        error={errors.priceIsNull}*/}
                {/*        formControlProps={{fullWidth: true}}*/}
                {/*        inputProps={{*/}
                {/*            onChange: onChange('yekun'),*/}
                {/*            name: 'yekun',*/}
                {/*            value: ifNull(valueData.yekun),*/}
                {/*            error: errors.yekunIsNull,*/}

                {/*        }}*/}
                {/*    />*/}
                {/*</Grid>*/}

                {/*<Grid item xs={12} sm={6}>*/}
                {/*    <CustomInput*/}
                {/*        id="qazanc"*/}
                {/*        labelText={valueData.fakturaType.value===1 ? 'Qazanc':'Zərər'}*/}
                {/*        error={errors.priceIsNull}*/}
                {/*        formControlProps={{fullWidth: true}}*/}
                {/*        inputProps={{*/}
                {/*            onChange: onChange('qazanc'),*/}
                {/*            name: 'qazanc',*/}
                {/*            value: ifNull(valueData.qazanc),*/}
                {/*            error: errors.qazancIsNull,*/}

                {/*        }}*/}
                {/*    />*/}
                {/*</Grid>*/}



                {(valueData.id === 0)&&
                    <Grid item xs={12} sm={3}>
                        <CustomInput
                            id="mebleg2"
                            labelText={'Сумма2'}
                            formControlProps={{fullWidth: true}}
                            inputProps={{
                                onChange: onChange('mebleg2'),
                                name: 'mebleg2',
                                value: ifNull(valueData.mebleg2),
                                error: errors.mebleg2IsNull,
                            }}
                        />
                    </Grid>}


                {(valueData.id === 0) &&
                    <Grid item xs={12} sm={3}>
                        <CustomInput
                            id="mebleg3"
                            labelText={'Сумма3'}
                            formControlProps={{fullWidth: true}}
                            inputProps={{
                                onChange: onChange('mebleg3'),
                                name: 'mebleg3',
                                value: ifNull(valueData.mebleg3),
                                error: errors.mebleg3IsNull,
                            }}
                        />
                    </Grid>
                }
                {(valueData.id === 0)&&
                    <Grid item xs={12} sm={3}>
                        <CustomInput
                            id="mebleg4"
                            labelText={'Сумма4'}
                            formControlProps={{fullWidth: true}}
                            inputProps={{
                                onChange: onChange('mebleg4'),
                                name: 'mebleg4',
                                value: ifNull(valueData.mebleg4),
                                error: errors.mebleg4IsNull,
                            }}
                        />
                    </Grid>}
                {(valueData.id === 0)&&
                    <Grid item xs={12} sm={3}>
                        <CustomInput
                            id="mebleg5"
                            labelText={'Сумма5'}
                            formControlProps={{fullWidth: true}}
                            inputProps={{
                                onChange: onChange('mebleg5'),
                                name: 'mebleg5',
                                value: ifNull(valueData.mebleg5),
                                error: errors.mebleg5IsNull,
                            }}
                        />
                    </Grid>}



                <Grid item xs={12} sm={12}>
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
