import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./BankAccountHelper";
import {ifNull} from "../../utils/Validator";
import CustomSelect from "../common/select/CustomSelect";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Check from "@material-ui/icons/Check";
import MuiDialog from "../common/dialogs/MuiDialog";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import {withStyles} from "@material-ui/core";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import TextField from "@material-ui/core/TextField";
function BankAccountForm(props) {
    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;
    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';

    console.log('valueData', valueData);

    return (
            <MuiDialog
                dialogContent={content()}
                dialogAction={action()}
                onClose={()=>dialogAction('close')}
                open={open}
                title={title}
            />
    );
    function action(){
        return(
            <Fragment>
                <Button onClick={() => dialogAction('disagree')} color="primary">Отмена</Button>
                <Button onClick={() => dialogAction('agree')} color="primary"
                        autoFocus> {valueData.id === 0 ? 'Сохранить' : 'Изменять'}</Button>
            </Fragment>
        );
    }
    function content() {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                        <TextField
                            id="code"
                            name='code'
                            label={'Kodu'}
                            value={ifNull(valueData.code)}
                            error={errors.codeIsNull}
                            onChange={onChange('code')}
                            inputProps={{
                                maxLength: 6
                            }}
                        />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomInput
                        id="name"
                        labelText={'Adı'}
                        error={errors.nameIsNull}
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                            onChange: onChange('name'),
                            name: 'name',
                            value: ifNull(valueData.name),
                            error: errors.nameIsNull,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CustomSelect required
                                  id="currency"
                                  name={'currency'}
                                  label="Валюта"
                                  selectProps={{
                                      error: errors.currencyNoIsNull
                                  }}
                                  value={valueData.currency === null ? 0 : valueData.currency.value}
                                  data={compData.currencyList}
                                  onChange={onChange('currency')}
                                  fullWidth/>
                </Grid>
                <Grid item xs={12} sm={12}>

                    <AsyncAutocomplete url={'/api/bankbranch/ac?label='}
                                       id={'bankBranch'}
                                       name={'bankBranch'}
                                       value={valueData.bankBranch}
                                       placeholder={'Bank'}
                                       textFieldProps={{
                                           label: 'Bank',
                                           InputLabelProps: {
                                               shrink: true,
                                           },
                                           error: errors.bankBranchNoIsNull,
                                       }}
                                       onChange={onChange("bankBranch")}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="accountNo"
                        name='accountNo'
                        label={'Hesab nömrəsi'}
                        value={ifNull(valueData.accountNo)}
                        error={errors.accountNoIsNull}
                        onChange={onChange('accountNo')}
                        fullWidth
                        inputProps={{
                            maxLength: 28,

                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomSelect required
                                  id="cardType"
                                  name={'cardType'}
                                  label="Hesab növü"
                                  selectProps={{
                                      error: errors.cardTypeNoIsNull
                                  }}
                                  value={!valueData.cardType ? 0 : valueData.cardType.value}
                                  data={compData.cardTypeList}
                                  onChange={onChange('cardType')}
                                  fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
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

}

BankAccountForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

BankAccountForm.defaultProps = {
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

const styles = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};
export default withStyles(styles)(BankAccountForm);
