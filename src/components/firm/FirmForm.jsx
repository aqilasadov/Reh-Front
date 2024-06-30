import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./FirmHelper";
import {withStyles} from '@material-ui/core/styles';
import {ifNull} from "../../utils/Validator";
import CustomSelect from "../common/select/CustomSelect";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Check from "@material-ui/icons/Check";
import MuiDialog from "../common/dialogs/MuiDialog";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";

function FirmForm(props) {
    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;
    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';
    const SM = 4;

    return (
        <MuiDialog onClose={() => dialogAction('close')}
                   dialogContent={content()}
                   dialogAction={action()}
                   open={open}
                   title={title}/>

    );

    function content() {
        return (<Grid container spacing={1}>
            <Grid item xs={12} sm={SM}>
                <CustomInput
                    id="name"
                    labelText={'Firmanın adı'}
                    error={errors.NameIsNull}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('name'),
                        name: 'name',
                        value: ifNull(valueData.name),
                        error: errors.NameIsNull
                    }}
                />

            </Grid>


            <Grid item xs={12} sm={SM}>
                <CustomInput
                    id="voen"
                    labelText={'Vöen'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('voen'),
                        name: 'voen',
                        value: ifNull(valueData.voen)
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={SM}>
                <CustomSelect required
                              id="fealiyyet"
                              name={'fealiyyet'}
                              label="Fəaliyyət növü"
                              selectProps={{
                                  error: errors.fealiyyetIsNull
                              }}
                              value={valueData.fealiyyet === null ? 0 : valueData.fealiyyet.value}
                              data={compData.fealiyyetList}
                              onChange={onChange('fealiyyet')}

                              fullWidth/>
            </Grid>

            <Grid item xs={12} sm={SM}>
                <CustomInput
                    id="pin"
                    labelText={'Fin'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('pin'),
                        name: 'pin',
                        value: ifNull(valueData.pin)
                    }}
                />

            </Grid>
            <Grid item xs={12} sm={SM}>
                <CustomInput
                    id="country"
                    labelText={'Ölkə'}
                    formControlProps={{fullWidth: true}}

                    inputProps={{
                        onChange: onChange('country'),
                        name: 'country',
                        value: ifNull(valueData.country)
                    }}
                />

            </Grid>

            <Grid item xs={12} sm={SM}>
                <CustomInput
                    id="city"
                    labelText={'Şəhər'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('city'),
                        name: 'city',
                        value: ifNull(valueData.city)
                    }}
                />

            </Grid>


            <Grid item xs={12} sm={SM}>
                <CustomInput
                    id="region"
                    labelText={'Region'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('region'),
                        name: 'region',
                        value: ifNull(valueData.region)
                    }}
                />

            </Grid>

            <Grid item xs={12} sm={SM}>
                <CustomInput
                    id="zipCode"
                    labelText={'Poçt kodu'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('zipCode'),
                        name: 'zipCode',
                        value: ifNull(valueData.zipCode)
                    }}
                />

            </Grid>
            <Grid item xs={12} sm={SM}>
                <CustomInput
                    id="telefon"
                    labelText={'Telefonu'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('telefon'),
                        name: 'telefon',
                        value: ifNull(valueData.telefon)
                    }}
                />

            </Grid>
            <Grid item xs={12} sm={SM}>
                <CustomInput
                    id="email"
                    labelText={'E-mail'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('email'),
                        name: 'email',
                        value: ifNull(valueData.email)
                    }}
                />

            </Grid>

            <Grid item xs={12} sm={SM}>
                <CustomInput
                    id="whatsup"
                    labelText={'Whatsap'}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                        onChange: onChange('whatsup'),
                        name: 'whatsup',
                        value: ifNull(valueData.whatsup)
                    }}
                />

            </Grid>

            <Grid item xs={12} sm={SM}>
                <CustomSelect required
                              id="currency"
                              name={'currency'}
                              label="Валюта"
                              selectProps={{
                                  error: errors.currencyIsNull
                              }}
                              value={valueData.currency === null ? 0 : valueData.currency.value}
                              data={compData.currencyList}
                              onChange={onChange('currency')}
                              fullWidth/>
            </Grid>
            <Grid item xs={12} sm={SM}>
                <FormControlLabel
                    control={
                        <Checkbox
                            id={'isEdv'}
                            name={'isEdv'}
                            value={ifNull(valueData.isEdv).toString()}
                            checked={valueData.isEdv === 1}
                            tabIndex={-1}
                            onClick={onChange('isEdv')}
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
                    label="Ədv ödəyicisidir"
                />
            </Grid>
            <Grid item xs={12} sm={SM}>
                <FormControlLabel
                    control={
                        <Checkbox
                            id={'isPartiya'}
                            name={'isPartiya'}
                            value={ifNull(valueData.isPartiya).toString()}
                            checked={valueData.isPartiya === 1}
                            tabIndex={-1}
                            onClick={onChange('isPartiya')}
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
                    label="Partiya tətbiqi"
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
            </Fragment>
        );
    }

}

FirmForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

FirmForm.defaultProps = {
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
const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};
export default withStyles(style)(FirmForm);
