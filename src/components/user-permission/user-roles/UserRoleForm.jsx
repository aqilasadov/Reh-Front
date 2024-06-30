import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {CompData, ValueData} from "./UserRoleHelper";
import {withStyles} from '@material-ui/core/styles';
import MuiDialog from "../../common/dialogs/MuiDialog";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import AsyncAutocomplete from "../../common/ac/AsyncAutocomplete";


const style = {};

function UserRoleForm(props) {
    const {open, data, onChange, onClick} = props;
    const {valueData, errors} = data;


    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';
    return (
        <MuiDialog
            fullWidth={true}
            maxWidth={'sm'}
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
                    <Grid item xs={12} sm={12}>
                        <AsyncAutocomplete
                            name={'role'}
                            url={'/api/admin/rolepriv/list/role?label='}
                            textFieldProps={{
                                label: 'Vəzifə',
                                InputLabelProps: {shrink: true,},
                                error: errors.roleIsNull
                            }}
                            cacheOptions={true}
                            value={valueData.role ? valueData.role : null}
                            onChange={data => onChange({component: 'ac', name: 'role', value: data})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <AsyncAutocomplete
                            name={'user'}
                            url={'/api/admin/userrole/userlist?label='}
                            textFieldProps={{
                                label: 'İstifadəçi',
                                InputLabelProps: {shrink: true,},
                                error: errors.userIsNull,
                            }}
                            cacheOptions={true}
                            value={valueData.user ? valueData.user : null}
                            onChange={data => onChange({component: 'ac', name: 'user', value: data})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary"
                                               name="status"
                                               id="status"
                                               value={valueData.status}
                                               checked={valueData.status && valueData.status === 1}
                                               onChange={event => onChange({
                                                   component: 'cb',
                                                   name: event.target.name,
                                                   value: event.target.checked
                                               })}
                            />}
                            label="Aktiv"
                        />
                    </Grid>
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

UserRoleForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
};

UserRoleForm.defaultProps = {
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
export default withStyles(style)(UserRoleForm);
