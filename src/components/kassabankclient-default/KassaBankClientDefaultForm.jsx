import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {clientTypeList, CompData, ValueData} from "./KassaBankClientDefaultHelper";
import {withStyles} from '@material-ui/core/styles';
import {ifNegative, ifNull} from "../../utils/Validator";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import MuiDialog from "../common/dialogs/MuiDialog";
import * as moment from "moment";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import {DatePicker} from "material-ui-pickers";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "../common/ac/Autocomplete";

const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};
function KassaBankClientDefaultForm(props) {

    // const [kbType, setKbType] = useState(kbTypeList[0]);
    // const kbTypeId = kbType.value;

    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;

    const fakturaType = valueData.clientType && (valueData.clientType.value === 1 || valueData.clientType.value === 2 ) ? valueData.clientType.value : -1;

    const kbTypeId = !valueData.kbType || valueData.kbType === null ? 0 : valueData.kbType.value;


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

                <Grid item xs={12} sm={4}>
                    <CustomInput
                        id="tranno"
                        labelText={'Nömrəsi'}
                        error={errors.trannoIsNull}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('tranno'),
                            name: 'tranno',
                            value: ifNull(valueData.tranno)
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="price"
                        labelText={'Məbləğ'}
                        type="number"
                        style={{margin:8, paddingTop: '8px'}}
                        error={errors.amountIsNull}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('amount'),
                            name: 'amount',
                            value: ifNegative(valueData.amount),

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
                        value={!valueData.operDate || valueData.operDate === 0 ? null : moment.unix(valueData.operDate).format("MM/DD/YYYY")}
                        format="DD/MM/YYYY"
                        onChange={onChange('operDate')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete source={clientTypeList}
                                       id={'clientType'}
                                       name={'clientType'}
                                       value={valueData.clientType}
                                       placeholder={'Müştəri növü'}
                                       textFieldProps={{
                                           label: 'Müştəri növü',
                                           InputLabelProps: {
                                               shrink: true,
                                           },
                                       }}
                                       onChange={onChange('clientType')}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <AsyncAutocomplete url={`/api/clients/ac?typeId=${fakturaType}&label=`}
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
                                       cache={false}
                                       onChange={onChange('client')}/>
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

KassaBankClientDefaultForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

KassaBankClientDefaultForm.defaultProps = {
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
export default withStyles(style)(KassaBankClientDefaultForm);
