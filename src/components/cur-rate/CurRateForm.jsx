import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./CurRateHelper";
import {withStyles} from '@material-ui/core/styles';
import {ifNull} from "../../utils/Validator";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import Autocomplete from "../common/ac/Autocomplete";
import MuiDialog from "../common/dialogs/MuiDialog";
import {DatePicker} from "material-ui-pickers";


import * as moment from "moment";

const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};

function CurRateForm(props) {
    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;
    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';
    //const SM = 3;
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
        return (<Grid container spacing={1}>
            <Grid item xs={12} sm={12}>

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

            <Grid item xs={12} sm={12}>
                <CustomInput
                    id="price"
                    labelText={'Цена'}
                    error={errors.nameIsNull}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('price'),
                        name: 'price',
                        value: ifNull(valueData.price),
                        error: errors.priceIsNull
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <DatePicker
                    style={{margin:0, paddingTop: '0px'}}
                    fullWith={true}
                    margin="normal"
                    label="Дата"
                    clearable
                    fullWidth={true}
                    keyboard
                    value={!valueData.createDate || valueData.createDate === 0 ? null : moment.unix(valueData.createDate).format("MM/DD/YYYY")}
                    format="DD/MM/YYYY"
                    onChange={onChange('createDate')}
                />


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

CurRateForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

CurRateForm.defaultProps = {
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
export default withStyles(style)(CurRateForm);
