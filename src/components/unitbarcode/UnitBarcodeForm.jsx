import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./UnitBarcodeHelper";
import {withStyles} from '@material-ui/core/styles';
import {ifNull} from "../../utils/Validator";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import Autocomplete from "../common/ac/Autocomplete";
import MuiDialog from "../common/dialogs/MuiDialog";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";

const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};


function UnitBarcodeForm(props) {
    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;
    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';
    const SM = 4;
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
        return (<Grid container spacing={1}>
            <Grid item xs={12} sm={SM * 3}>
                <CustomInput
                    id="barcode"
                    labelText={'Barcode'}
                    error={errors.barcodeIsNull}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('barcode'),
                        name: 'barcode',
                        value: ifNull(valueData.barcode),
                        error: errors.barcodeIsNull
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={SM * 3}>
                <CustomInput
                    id="globalid"
                    labelText={'Vergi ID-si'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('globalid'),
                        name: 'globalid',
                        value: ifNull(valueData.globalid)
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={SM * 3}>

                <AsyncAutocomplete url={'/api/items/ac?label='}
                                   id={'item'}
                                   name={'item'}
                                   value={valueData.item}
                                   placeholder={'Mallar'}
                                   textFieldProps={{
                                       label: 'Mallar',
                                       InputLabelProps: {
                                           shrink: true,
                                       },
                                       error: errors.itemIsNull,
                                   }}
                                   onChange={onChange('item')}/>
            </Grid>



            <Grid item xs={12} sm={SM * 3}>
                <CustomInput
                    id="linenr"
                    labelText={'Sırası'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('linenr'),
                        name: 'linenr',
                        value: ifNull(valueData.linenr)
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={SM * 3}>
                <Autocomplete source={compData.unitsetLineList}
                              id={'unitsetLine'}
                              name={'unitsetLine'}
                              value={valueData.unitsetLine}
                              placeholder={'Kart növü'}
                              textFieldProps={{
                                  label: 'Ölcü vahidi',
                                  InputLabelProps: {
                                      shrink: true,
                                  },
                                  error: errors.unitsetLineIsNull,
                                  style: {marginTop: '7px'}
                              }}
                              onChange={onChange('unitsetLine')}/>
            </Grid>
        </Grid>);
    }

    function action() {
        return (<Fragment>
            <Button onClick={() => dialogAction('disagree')} color="primary">Отмена</Button>
            <Button onClick={() => dialogAction('agree')} color="primary"
                    autoFocus> {valueData.id === 0 ? 'Сохранить' : 'Изменять'}</Button>
        </Fragment>);
    }

}

UnitBarcodeForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

UnitBarcodeForm.defaultProps = {
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
export default withStyles(style)(UnitBarcodeForm);
