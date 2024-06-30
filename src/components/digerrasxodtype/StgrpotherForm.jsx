import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {TextField} from "@material-ui/core";
import {CompData, ValueData} from "./StgrpotherHelper";
import FormControl from "@material-ui/core/FormControl";
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import {ifNull} from "../../utils/Validator";
import CustomSelect from "../common/select/CustomSelect";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import CardBody from "../../components-tim/Card/CardBody";
import CardHeader from "../../components-tim/Card/CardHeader";
import CardIcon from "../../components-tim/Card/CardIcon";
import Card from "../../components-tim/Card/Card";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Check from "@material-ui/icons/Check";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}))(props => {
    const {children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <IconButton>
                        <CloseIcon/>
                    </IconButton>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};

function StgrpcodeForm(props) {
    const {open, data, onChange, dialogAction, classes} = props;
    const {valueData, compData, errors} = data;
    console.log('valueData', valueData);

    return (
        <Fragment>
            <Dialog
                aria-labelledby="customized-dialog-title"
                disableBackdropClick
                open={open}
                onClose={() => dialogAction('close')}
                aria-describedby="alert-dialog-description">
                <DialogTitle id="customized-dialog-title" onClose={() => dialogAction('disagree')}>
                    {valueData.id === 0 ? 'Новый' : 'Редактировать'}
                </DialogTitle>
                <DialogContent>

                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <CustomInput
                                id="etTitle"
                                labelText={'Название'}
                                error={errors.etTitleIsNull}
                                formControlProps={{fullWidth: true}}
                                inputProps={{
                                    onChange: onChange('etTitle'),
                                    name: 'etTitle',
                                    value: ifNull(valueData.etTitle)
                                }}
                            />
                        </Grid>

                    </Grid>
                    {/*</CardBody>*/}
                    {/*</Card>*/}

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => dialogAction('disagree')} color="primary">Отмена</Button>
                    <Button onClick={() => dialogAction('agree')} color="primary"
                            autoFocus> {valueData.id === 0 ? 'Сохранить' : 'Изменять'}</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );

}

StgrpcodeForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

StgrpcodeForm.defaultProps = {
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
export default withStyles(style)(StgrpcodeForm);
