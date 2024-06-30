import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./ItemsHelper";
import {withStyles} from '@material-ui/core/styles';
import {ifNull} from "../../utils/Validator";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import Autocomplete from "../common/ac/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import MuiDialog from "../common/dialogs/MuiDialog";
import TextField from "@material-ui/core/TextField";

const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};

function ItemsForm(props) {
    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;
    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';
    const SM = 3;
    return (
        <MuiDialog
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
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
                    <CustomInput
                        id="name"
                        labelText={'Malın adı'}
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

                <Grid item xs={12} sm={4}>
                    {/*<CustomInput*/}
                        {/*id="barcode"*/}
                        {/*labelText={'Barkod'}*/}
                      {/*//  error={errors.nameIsNull}*/}
                        {/*formControlProps={{fullWidth: true}}*/}
                        {/*inputProps={{*/}
                            {/*onChange: onChange('barcode'),*/}
                            {/*name: 'barcode',*/}
                            {/*value: ifNull(valueData.barcode),*/}
                         {/*//   error: errors.nameIsNull*/}
                        {/*}}*/}
                    {/*/>*/}


                    <TextField
                        id="barcode"
                        name='barcode'
                        label={'Barkod'}
                        value={ifNull(valueData.barcode)}
                       // error={errors.barcodeIsNull}
                        onChange={onChange('barcode')}
                        fullWidth
                        inputProps={{
                            maxLength: 13,

                        }}
                    />


                </Grid>

                <Grid item xs={12} sm={4}>

                    <Autocomplete source={compData.unitsetLineList}
                                  id={'unitsetLine'}
                                  name={'unitsetLine'}
                                  value={valueData.unitsetLine}
                                  placeholder={'Ölçü vahidi'}
                                  textFieldProps={{
                                      label: 'Ölçü vahidi',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.unitsetLineIsNull,
                                  }}
                                  onChange={onChange('unitsetLine')}/>
                </Grid>
                <Grid item xs={12} sm={4}>

                    <Autocomplete source={compData.stgrpcodeList}
                                  id={'stgrpcode'}
                                  name={'stgrpcode'}
                                  value={valueData.stgrpcode}
                                  placeholder={'Qrup kodu'}
                                  textFieldProps={{
                                      label: 'Qrup kodu',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.stgrpcodeIsNull,
                                  }}
                                  onChange={onChange('stgrpcode')}/>
                </Grid>

                <Grid item xs={12} sm={4}>

                    <Autocomplete source={compData.cardTypeList}
                                  id={'cardType'}
                                  name={'cardType'}
                                  value={valueData.cardType}
                                  placeholder={'Kart növü'}
                                  textFieldProps={{
                                      label: 'Kart növü',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.cardTypeIsNull,
                                  }}
                                  onChange={onChange('cardType')}/>
                </Grid>



                <Grid item xs={12} sm={SM + 1}>
                    <CustomInput
                        id="vat"
                        labelText={'Ədv'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('vat'),
                            name: 'vat',
                            value: ifNull(valueData.vat),
                        //    value: valueData.vat===0 ? '': valueData.vat

                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={SM + 1}>
                    <CustomInput
                        id="taxesCode"
                        labelText={'Vergi kodu'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('taxesCode'),
                            name: 'taxesCode',
                            value: ifNull(valueData.taxesCode)
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={SM + 1}>
                    <CustomInput
                        id="speccode"
                        labelText={'Xüsusi kod'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('speccode'),
                            name: 'speccode',
                            value: ifNull(valueData.speccode)
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={SM + 1}>
                    <CustomInput
                        id="shelflife"
                        labelText={'Vitrin müddəti(gün)'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('shelflife'),
                            name: 'shelflife',
                            value: ifNull(valueData.shelflife),
                          //  value: valueData.shelflife===0 ? '': valueData.shelflife
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={SM + 2}>
                    <CustomInput
                        id="text"
                        labelText={'Заметка'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('text'),
                            name: 'text',
                            value: ifNull(valueData.text)
                        }}
                    />
                </Grid>
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
                                    <Check className={classes.checkedIcon} />
                                }
                                icon={<Check className={classes.uncheckedIcon} />}
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







            </Grid>
        );
    }

    function action() {
        return(
            <Fragment>
                <Button onClick={() => dialogAction('disagree')} color="primary">Отмена</Button>
                <Button onClick={() => dialogAction('agree')} color="primary"
                        autoFocus> {valueData.id === 0 ? 'Сохранить' : 'Изменять'}</Button>
            </Fragment>
        );
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
