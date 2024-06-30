import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {CompData, ValueData} from "./RolesHelper";
import {withStyles} from '@material-ui/core/styles';
import MuiDialog from "../../common/dialogs/MuiDialog";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {ifNull} from "../../../utils/Validator";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";


const style = {};

function RolesForm(props) {
    const {open, data, onChange, onClick} = props;
    const {valueData, errors} = data;


    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';
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
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Adı"
                            error={errors.nameIsNull}
                            fullWidth
                            value={ifNull(valueData.name)}
                            onChange={event => onChange({
                                component: 'tf',
                                name: event.target.name,
                                value: event.target.value
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            error={errors.titleIsNull}
                            id="title"
                            name="title"
                            label="Başlıq"
                            fullWidth
                            value={ifNull(valueData.title)}
                            onChange={event => onChange({
                                component: 'tf',
                                name: event.target.name,
                                value: event.target.value
                            })}
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

RolesForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
};

RolesForm.defaultProps = {
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
export default withStyles(style)(RolesForm);
