import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./WarehouseHelper";
import {withStyles} from '@material-ui/core/styles';
import {ifNull} from "../../utils/Validator";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import MuiDialog from "../common/dialogs/MuiDialog";


const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};

function WarehouseForm(props) {
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
        return (<Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
                <CustomInput
                    id="nr"
                    labelText={'Kodu'}
                    error={errors.nrIsNull}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('nr'),
                        name: 'nr',
                        value: ifNull(valueData.nr),
                        error: errors.nrIsNull,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <CustomInput
                    id="name"
                    labelText={'Adı'}
                    error={errors.nameIsNull}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('name'),
                        name: 'name',
                        value: ifNull(valueData.name),
                        error: errors.nameIsNull,
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={12}>

                <AsyncAutocomplete url={'/api/branch/ac?label='}
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
            <Grid item xs={12} sm={12}>
                <CustomInput
                    id="userText"
                    labelText={'Qeyd'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('userText'),
                        name: 'userText',
                        value: ifNull(valueData.userText)
                    }}
                />
            </Grid>

        </Grid>);
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

WarehouseForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

WarehouseForm.defaultProps = {
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
export default withStyles(style)(WarehouseForm);
