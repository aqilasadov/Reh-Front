import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./KassaHelper";
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import {ifNull} from "../../utils/Validator";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import Autocomplete from "../common/ac/Autocomplete";


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

function KassaForm(props) {
    const {open, data, onChange, dialogAction} = props;
    const {valueData,compData, errors} = data;
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
                                id="name"
                                labelText={'Название'}
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


                        {/*<Grid item xs={12} sm={12}>*/}

                        {/*    <AsyncAutocomplete url={'/api/currency/ac?label='}*/}
                        {/*                       id={'currency'}*/}
                        {/*                       name={'currency'}*/}
                        {/*                       value={valueData.currency}*/}
                        {/*                       placeholder={'Valyuta'}*/}
                        {/*                       textFieldProps={{*/}
                        {/*                           label: 'Valyuta',*/}
                        {/*                           InputLabelProps: {*/}
                        {/*                               shrink: true,*/}
                        {/*                           },*/}
                        {/*                           error: errors.currencyIsNull,*/}
                        {/*                       }}*/}
                        {/*                       onChange={onChange('currency')}/>*/}
                        {/*</Grid>*/}


                        <Grid item xs={12} sm={12}>
                            <CustomInput
                                id="mebleg"
                                labelText={'Сумма'}
                                error={errors.meblegIsNull}
                                formControlProps={{fullWidth: true}}
                                inputProps={{
                                    onChange: onChange('mebleg'),
                                    name: 'mebleg',
                                    value: ifNull(valueData.mebleg),
                                    error: errors.meblegIsNull,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} style={{margin:0, paddingTop: '0px'}}>

                            <Autocomplete source={compData.currencyList}

                                          id={'currency'}
                                          name={'currency'}
                                          value={valueData.currency}
                                          placeholder={'Валюта'}
                                          textFieldProps={{
                                              label: 'Валюта',
                                              InputLabelProps: {
                                                  shrink: true,
                                              },
                                              error: errors.currencyIsNull,
                                          }}
                                          onChange={onChange('currency')}/>
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

KassaForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

KassaForm.defaultProps = {
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
export default withStyles(style)(KassaForm);
