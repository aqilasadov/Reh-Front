import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./UnitsetLineHelper";
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

function UnitsetLineForm(props) {
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
                        error: errors.nameIsNull
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={12}>

                <AsyncAutocomplete url={'/api/unitsetGrp/ac?label='}
                                   id={'unitsetGrp'}
                                   name={'unitsetGrp'}
                                   value={valueData.unitsetGrp}
                                   placeholder={'Ölçü qrupu'}
                                   textFieldProps={{
                                       label: 'Ölçü qrupu',
                                       InputLabelProps: {
                                           shrink: true,
                                       },
                                       error: errors.unitsetGrpIsNull,
                                   }}
                                   onChange={onChange('unitsetGrp')}/>
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

UnitsetLineForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

UnitsetLineForm.defaultProps = {
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
export default withStyles(style)(UnitsetLineForm);
