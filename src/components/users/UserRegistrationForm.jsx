import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {CompData, ValueData} from "./UserRegistrationHelper";
import {withStyles} from '@material-ui/core/styles';
import MuiDialog from "../common/dialogs/MuiDialog";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {ifNull} from "../../utils/Validator";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from "@material-ui/core/IconButton/IconButton";


const style = {};

function UserRegistrationForm(props) {
    const {open, data, onChange, onClick} = props;
    const {valueData, compData, errors} = data;

    const [showPassword, setShowPassword] = React.useState(true);

    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';
    const SM = 3;
    return (
        <MuiDialog
            dialogContent={content()}
            dialogAction={action()}
            onClose={() => onClick({clickFor: 'ADD_EDIT_DIALOG', action: 'DISAGREE'})}
            open={open}
            title={title}
        />
    );

    function content() {
        return (
            <Fragment>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="fullname"
                            name="fullname"
                            label="Имя и фамилия"
                            error={errors.fullnameIsNull}
                            fullWidth
                            value={ifNull(valueData.fullname)}
                            onChange={event => onChange({
                                component: 'tf',
                                name: event.target.name,
                                value: event.target.value
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            error={errors.usernameIsNull}
                            id="username"
                            name="username"
                            label="Логин"
                            fullWidth
                            value={ifNull(valueData.username)}
                            onChange={event => onChange({
                                component: 'tf',
                                name: event.target.name,
                                value: event.target.value
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            // required
                            // error={errors.emailIsNull}
                            id="email"
                            name="email"
                            label="E-mail"
                            fullWidth
                            value={ifNull(valueData.email)}
                            onChange={event => onChange({
                                component: 'tf',
                                name: event.target.name,
                                value: event.target.value
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            error={errors.passwordIsNull}
                            id="password"
                            name="password"
                            label="Пароль"
                            fullWidth
                            value={ifNull(valueData.password)}
                            type={showPassword ? 'text' : 'password'}
                            onChange={event => onChange({
                                component: 'tf',
                                name: event.target.name,
                                value: event.target.value
                            })}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton aria-label="Toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="addressLine"
                            name="addressLine"
                            label="Адрес"
                            fullWidth
                            value={!valueData.address || valueData.address === null ? '' : valueData.address.addressLine}
                            onChange={event => onChange({
                                component: 'tf',
                                name: event.target.name,
                                value: event.target.value
                            })}
                        />
                    </Grid>
                    {/*<Grid item xs={12} sm={3}>*/}
                    {/*    <TextField*/}
                    {/*        style={{paddingTop: '5px'}}*/}
                    {/*        required*/}
                    {/*        id="zipCode"*/}
                    {/*        name="zipCode"*/}
                    {/*        label="Poct kodu"*/}
                    {/*        fullWidth*/}
                    {/*        value={!valueData.address || valueData.address === null ? '' : valueData.address.zipCode}*/}
                    {/*        onChange={event => onChange({*/}
                    {/*            component: 'tf',*/}
                    {/*            name: event.target.name,*/}
                    {/*            value: event.target.value*/}
                    {/*        })}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12} sm={9}>*/}
                    {/*    <AsyncAutocomplete*/}
                    {/*        name={'country'}*/}
                    {/*        url={'/api/clients/countryac?label='}*/}
                    {/*        textFieldProps={{*/}
                    {/*            label: 'Ölkə',*/}
                    {/*            InputLabelProps: {shrink: true,},*/}
                    {/*        }}*/}
                    {/*        cacheOptions={true}*/}
                    {/*        value={!valueData.address || valueData.address === null ? null : valueData.address.country}*/}
                    {/*        onChange={data => onChange({component: 'ac', name: 'country', value: data})}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            // style={{paddingTop: '5px'}}
                            required
                            id="mobile"
                            name="mobile"
                            label="Телефон"
                            fullWidth
                            value={ifNull(valueData.mobile)}
                            onChange={event => onChange({
                                component: 'tf',
                                name: event.target.name,
                                value: event.target.value
                            })}
                        />
                    </Grid>
                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*    <AsyncAutocomplete*/}
                    {/*        name={'branch'}*/}
                    {/*        url={'/api/branch/ac?label='}*/}
                    {/*        textFieldProps={{*/}
                    {/*            label: 'Filial',*/}
                    {/*            InputLabelProps: {shrink: true,},*/}
                    {/*        }}*/}
                    {/*        cacheOptions={true}*/}
                    {/*        value={!valueData.branch || valueData.branch === null ? null : valueData.branch}*/}
                    {/*        onChange={data => onChange({component: 'ac', name: 'branch', value: data})}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                </Grid>
            </Fragment>)
    }

    function action() {
        return (
            <Fragment>
                <Button onClick={() => onClick({clickFor: 'ADD_EDIT_DIALOG', action: 'DISAGREE'})}
                        color="primary">Отмена</Button>
                <Button onClick={() => onClick({clickFor: 'ADD_EDIT_DIALOG', action: 'AGREE'})} color="primary"
                        autoFocus>Сохранить</Button>
            </Fragment>
        )
    }
}

UserRegistrationForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
};

UserRegistrationForm.defaultProps = {
    open: true,
    onClick: () => {
    },
    onChange: () => {
    },
    dialogAction: () => {
    },
    data: {
        compData: new CompData(),
        valueData: new ValueData()
    }
};
export default withStyles(style)(UserRegistrationForm);
