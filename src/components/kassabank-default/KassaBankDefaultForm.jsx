import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./KassaBankDefaultHelper";
import {withStyles} from '@material-ui/core/styles';
import {ifNegative, ifNull} from "../../utils/Validator";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
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

function KassaBankDefaultForm(props) {

    // const [kbType, setKbType] = useState(kbTypeList[0]);
    // const kbTypeId = kbType.value;

    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;

    const kbTypeId = !valueData.kbType || valueData.kbType === null ? 0 : valueData.kbType.value;


    const title = valueData.id === 0 ? 'Новый' : ' Редактировать';
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
                <Grid item xs={12} sm={4}>
                    <CustomInput
                        id="code"
                        labelText={'Nömrəsi'}
                        error={errors.codeIsNull}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('code'),
                            name: 'code',
                            value: ifNull(valueData.code)
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
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
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="price"
                        labelText={'Məbləğ'}
                        style={{margin:8, paddingTop: '8px'}}
                        error={errors.codeIsNull}
                        type="number"
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('price'),
                            name: 'price',
                            value: ifNegative(valueData.price)
                        }}
                    />
                </Grid>

              {/*  <Grid item xs={12} sm={SM * 4}>

                    <Autocomplete source={compData.kassaTypeList}
                                  id={'kassaType'}
                                  name={'kassaType'}
                                  value={valueData.kassaType}
                                  placeholder={'Тип операции'}
                                  textFieldProps={{
                                      label: 'Тип операции',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                  }}
                                  onChange={onChange('kassaType')}/>
                </Grid>*/}


                <Grid item xs={12} sm={SM * 4}>

                    <Autocomplete source={compData.kbTypeList}
                                  id={'kbType'}
                                  name={'kbType'}
                                  value={valueData.kbType}
                                  placeholder={'Kassa/Bank'}
                                  textFieldProps={{
                                      label: 'Kassa/Bank',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                  }}
                                  onChange={onChange('kbType')}/>
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
                                       onChange={onChange('kassaBank')}/>
                </Grid>

                {/*<Grid item xs={12} sm={12}>*/}

                    {/*<AsyncAutocomplete url={'/api/bank/ac?label='}*/}
                                       {/*id={'bank'}*/}
                                       {/*name={'bank'}*/}
                                       {/*value={valueData.bank}*/}
                                       {/*placeholder={'Bank Hesabları'}*/}
                                       {/*textFieldProps={{*/}
                                           {/*label: 'Bank Hesabları',*/}
                                           {/*InputLabelProps: {*/}
                                               {/*shrink: true,*/}
                                           {/*},*/}
                                       {/*}}*/}
                                       {/*onChange={onChange('bank')}/>*/}
                {/*</Grid>*/}

              {/*  <Grid item xs={12} sm={12}>

                    <AsyncAutocomplete url={'/api/clients/ac?label='}
                                       id={'client'}
                                       name={'client'}
                                       value={valueData.client}
                                       placeholder={'Müştəri'}
                                       textFieldProps={{
                                           label: 'Müştəri',
                                           InputLabelProps: {
                                               shrink: true,
                                           },
                                       }}
                                       onChange={onChange('client')}/>
                </Grid>*/}


               {/* <Grid item xs={12} sm={12}>

                    <AsyncAutocomplete url={'/api/faktura/ac?label='}
                                       id={'faktura'}
                                       name={'faktura'}
                                       value={valueData.faktura}
                                       placeholder={'Faktura nömrəsi'}
                                       textFieldProps={{
                                           label: 'Faktura nömrəsi',
                                           InputLabelProps: {
                                               shrink: true,
                                           },
                                       }}
                                       onChange={onChange('faktura')}/>
                </Grid>*/}


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

KassaBankDefaultForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

KassaBankDefaultForm.defaultProps = {
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
export default withStyles(style)(KassaBankDefaultForm);
