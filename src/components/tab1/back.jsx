import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./Trans1Helper";
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

                <Grid item xs={12} sm={6}>
                    <DatePicker
                        style={{margin:0, paddingTop: '0px'}}
                        fullWith={true}
                        margin="normal"
                        label="Дата"
                        clearable
                        fullWidth={true}
                        keyboard
                        value={!valueData.begdate || valueData.begdate === 0 ? null : moment.unix(valueData.begdate).format("MM/DD/YYYY")}
                        format="DD/MM/YYYY"
                        onChange={onChange('begdate')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomInput
                        id="name"
                        labelText={'Заметка'}
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

                <Grid item xs={12} sm={6}>
                    <Autocomplete source={compData.fakturaTypeList}
                                  id={'fakturaType'}
                                  name={'fakturaType'}
                                  value={valueData.fakturaType}
                                  placeholder={'Тип операции'}
                                  textFieldProps={{
                                      label: 'Тип операции',
                                      InputLabelProps: {
                                          shrink: true,
                                      },
                                      error: errors.fakturaTypeIsNull,
                                  }}
                                  onChange={onChange('fakturaType')}/>
                </Grid>

                <Grid item xs={12} sm={6}>

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

                <Grid item xs={12} sm={6}>
                    <CustomInput
                        id="priority"
                        labelText={'Сумма'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('priority'),
                            name: 'priority',
                            value: ifNull(valueData.priority)
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomInput
                        id="unitconvert"
                        labelText={'Процент'}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('unitconvert'),
                            name: 'unitconvert',
                            value: ifNull(valueData.unitconvert)
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomInput
                        id="price"
                        labelText={'Итог'}
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

                <Grid item xs={12} sm={6}>
                    <CustomInput
                        id="price"
                        labelText={'Доход'}
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
