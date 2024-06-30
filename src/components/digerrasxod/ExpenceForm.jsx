import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import MuiDialog from "../common/dialogs/MuiDialog";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {ifNull} from "../../utils/Validator";
import {CompData, ValueData} from "./ExpenceHelper";
import Datetime from 'react-datetime';
import {DatePicker} from "material-ui-pickers";
import * as moment from "moment";
import Autocomplete from "../common/ac/Autocomplete";
const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};

function PartiyaForm(props) {
    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;
    const title = valueData.expId === 0 ? 'Новый' : 'Редактировать';
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


            <Grid item xs={12} sm={12} style={{margin:0, paddingTop: '0px'}}>

                <Autocomplete source={compData.etList}

                              id={'etId'}
                              name={'etId'}
                              value={valueData.etId}
                              placeholder={'Расходы'}
                              textFieldProps={{
                                  label: 'Расходы',
                                  InputLabelProps: {
                                      shrink: true,
                                  },
                                  error: errors.etIdIsNull,
                              }}
                              onChange={onChange('etId')}/>
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
                    value={!valueData.tarix || valueData.tarix === 0 ? null : new Date(0).setUTCSeconds(valueData.tarix)}
                    format="DD/MM/YYYY"
                    onChange={onChange('tarix')}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <CustomInput
                    id="price"
                    labelText={'Сумма'}

                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('price'),
                        name: 'price',
                        value: ifNull(valueData.price)
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12} style={{margin:0, paddingTop: '0px'}}>

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
                    id="qeyd"
                    labelText={'Заметка'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('qeyd'),
                        name: 'qeyd',
                        value: ifNull(valueData.qeyd)
                    }}
                />
            </Grid>




        </Grid>)
    }

    function action() {
        return (<Fragment>
            <Button onClick={() => dialogAction('disagree')} color="primary">Отмена</Button>
            <Button onClick={() => dialogAction('agree')} color="primary"
                    autoFocus> {valueData.expId === 0 ? 'Сохранить' : 'Изменять'}</Button>
        </Fragment>);
    }
}

PartiyaForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

PartiyaForm.defaultProps = {
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
export default withStyles(style)(PartiyaForm);
