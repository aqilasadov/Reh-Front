import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./ItemCardAmountHelper";
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
            fullWidth={true}

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
                <Grid item xs={12} sm={SM}>
                    <CustomInput
                        id="code"
                        labelText={'Kodu'}
                        error={errors.codeIsNull}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('code'),
                            name: 'code',
                            value: ifNull(valueData.code),
                            error: errors.codeIsNull
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={SM * 2}>
                    <CustomInput
                        id="name"
                        labelText={'Adı'}
                        error={errors.nameIsNull}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('name'),
                            name: 'name',
                            value: ifNull(valueData.name),
                            error: errors.nameIsNull
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={SM * 3}>
                    <Autocomplete source={compData.fakturaTypeList}
                                  id={'fakturaType'}
                                  name={'fakturaType'}
                                  value={valueData.fakturaType}
                                  placeholder={'Faktura növü'}
                                  textFieldProps={{
                                      label: 'Faktura növü',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.fakturaTypeIsNull,
                                  }}
                                  onChange={onChange('fakturaType')}/>
                </Grid>




                <Grid item xs={12} sm={SM * 3}>

                    <AsyncAutocomplete url={'/api/items/ac?label='}
                                       id={'item'}
                                       name={'item'}
                                       value={valueData.item}
                                       placeholder={'Mal'}
                                       textFieldProps={{
                                           label: 'Mal',
                                           InputLabelProps: {
                                               shrink: true,
                                           },
                                       }}
                                       onChange={onChange('item')}/>
                </Grid>




                <Grid item xs={12} sm={SM * 3}>

                    <Autocomplete source={compData.clientList}
                                  id={'client'}
                                  name={'client'}
                                  value={valueData.client}
                                  placeholder={'Клиент'}
                                  textFieldProps={{
                                      label: 'Клиент',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                  }}
                                  onChange={onChange('client')}/>
                </Grid>

                <Grid item xs={12} sm={SM}>
                    <CustomInput
                        id="priority"
                        labelText={'Vaciblik dərəcəsi'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('priority'),
                            name: 'priority',
                            value: ifNull(valueData.priority)
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={SM}>
                    <CustomInput
                        id="unitconvert"
                        labelText={'Vahidlər arasi cevirim'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('unitconvert'),
                            name: 'unitconvert',
                            value: ifNull(valueData.unitconvert)
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={SM}>
                    <CustomInput
                        id="price"
                        labelText={'Цена'}
                        error={errors.priceIsNull}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('price'),
                            name: 'price',
                            value: ifNull(valueData.price),
                            error: errors.priceIsNull,

                        }}
                    />
                </Grid>


                <Grid item xs={12} sm={SM}>

                    <Autocomplete source={compData.unitsetGrpList}
                                  id={'unitsetGrp'}
                                  name={'unitsetGrp'}
                                  value={valueData.unitsetGrp}
                                  placeholder={'Vahidlər arasi Bağlantı'}
                                  textFieldProps={{
                                      label: 'Vahidlər arasi Bağlantı',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                  }}
                                  onChange={onChange('unitsetGrp')}/>
                </Grid>

                <Grid item xs={12} sm={SM}>

                    <Autocomplete source={compData.branchList}
                                  id={'branch'}
                                  name={'branch'}
                                  value={valueData.branch}
                                  placeholder={'Filial'}
                                  textFieldProps={{
                                      label: 'Filial',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                  }}
                                  onChange={onChange('branch')}/>
                </Grid>

                <Grid item xs={12} sm={SM}>

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

                {/*<Grid item xs={12} sm={SM}>*/}
                    {/*<CustomInput*/}
                        {/*id="clspecode"*/}
                        {/*labelText={'Xüsusi kod'}*/}
                        {/*formControlProps={{fullWidth: true}}*/}
                        {/*inputProps={{*/}
                            {/*onChange: onChange('clspecode'),*/}
                            {/*name: 'clspecode',*/}
                            {/*value: ifNull(valueData.clspecode)*/}
                        {/*}}*/}
                    {/*/>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} sm={SM}>*/}
                    {/*<CustomInput*/}
                        {/*id="clspecode2"*/}
                        {/*labelText={'Xüsusi kod2'}*/}
                        {/*formControlProps={{fullWidth: true}}*/}
                        {/*inputProps={{*/}
                            {/*onChange: onChange('clspecode2'),*/}
                            {/*name: 'clspecode2',*/}
                            {/*value: ifNull(valueData.clspecode2)*/}
                        {/*}}*/}
                    {/*/>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} sm={SM}>*/}
                    {/*<CustomInput*/}
                        {/*id="clspecode3"*/}
                        {/*labelText={'Xüsusi kod3'}*/}
                        {/*formControlProps={{fullWidth: true}}*/}
                        {/*inputProps={{*/}
                            {/*onChange: onChange('clspecode3'),*/}
                            {/*name: 'clspecode3',*/}
                            {/*value: ifNull(valueData.clspecode3)*/}
                        {/*}}*/}
                    {/*/>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} sm={SM}>*/}
                    {/*<CustomInput*/}
                        {/*id="clspecode4"*/}
                        {/*labelText={'Xüsusi kod4'}*/}
                        {/*formControlProps={{fullWidth: true}}*/}
                        {/*inputProps={{*/}
                            {/*onChange: onChange('clspecode4'),*/}
                            {/*name: 'clspecode4',*/}
                            {/*value: ifNull(valueData.clspecode4)*/}
                        {/*}}*/}
                    {/*/>*/}
                {/*</Grid>*/}

                {/*<Grid item xs={12} sm={SM}>*/}
                    {/*<CustomInput*/}
                        {/*id="clspecode5"*/}
                        {/*labelText={'Xüsusi kod5'}*/}
                        {/*formControlProps={{fullWidth: true}}*/}
                        {/*inputProps={{*/}
                            {/*onChange: onChange('clspecode5'),*/}
                            {/*name: 'clspecode5',*/}
                            {/*value: ifNull(valueData.clspecode5)*/}
                        {/*}}*/}
                    {/*/>*/}
                {/*</Grid>*/}
                <Grid item xs={12} sm={SM}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id={'isActive'}
                                name={'isActive'}
                                value={ifNull(valueData.isActive).toString()}
                                checked={valueData.isActive === 1}
                                tabIndex={-1}
                                onClick={onChange('isActive')}
                                checkedIcon={
                                    <Check className={classes.checkedIcon}/>
                                }
                                icon={<Check className={classes.uncheckedIcon}/>}
                                classes={{
                                    checked: classes.checked,
                                    root: classes.checkRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Aktiv"
                    />
                </Grid>



                <Grid item xs={12} sm={SM}>
                    <DatePicker
                        style={{margin:0, paddingTop: '0px'}}
                        fullWith={true}
                        margin="normal"
                        label="Başlanğıc tarixi"
                        clearable
                        fullWidth={true}
                        keyboard
                        value={!valueData.begdate || valueData.begdate === 0 ? null : moment.unix(valueData.begdate).format("MM/DD/YYYY")}
                        format="DD/MM/YYYY"
                        onChange={onChange('begdate')}
                    />
                </Grid>

                <Grid item xs={12} sm={SM}>
                    <DatePicker
                        style={{margin:0, paddingTop: '0px'}}
                        fullWith={true}
                        margin="normal"
                        label="Bitiş tarixi"
                        clearable
                        fullWidth={true}
                        keyboard
                        value={!valueData.begdate || valueData.enddate === 0 ? null : moment.unix(valueData.enddate).format("MM/DD/YYYY")}
                        format="DD/MM/YYYY"
                        onChange={onChange('enddate')}
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
