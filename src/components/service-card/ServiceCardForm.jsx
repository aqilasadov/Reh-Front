import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {CompData, ValueData} from "./ServiceCardHelper";
import {withStyles} from '@material-ui/core/styles';
import {ifNull} from "../../utils/Validator";
import CardBody from "../../components-tim/Card/CardBody";
import CardHeader from "../../components-tim/Card/CardHeader";
import Card from "../../components-tim/Card/Card";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import customCheckboxRadioSwitch from "../../assets/jss/components/customCheckboxRadioSwitch";
import Slide from "@material-ui/core/Slide/Slide";
import Autocomplete from "../common/ac/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Check from "@material-ui/icons/Check";
import MuiDialog from "../common/dialogs/MuiDialog";


const style = {
    ...customCheckboxRadioSwitch,
    ...cardTitle
};

function ServiceCardForm(props) {
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
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} sm={SM}>
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
                <Grid item xs={12} sm={SM * 3}>
                    <CustomInput
                        id="name1"
                        labelText={'Adı'}
                        error={errors.name1IsNull}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('name1'),
                            name: 'name1',
                            value: ifNull(valueData.name1),
                            error: errors.name1IsNull
                        }}
                    />
                </Grid>

                {/*<Grid item xs={12} sm={SM}>*/}
                    {/*<CustomInput*/}
                        {/*id="specode"*/}
                        {/*labelText={'Xüsusi kod'}*/}
                        {/*formControlProps={{fullWidth: true}}*/}
                        {/*inputProps={{*/}
                            {/*onChange: onChange('specode'),*/}
                            {/*name: 'specode',*/}
                            {/*value: ifNull(valueData.specode)*/}
                        {/*}}*/}
                    {/*/>*/}
                {/*</Grid>*/}

                {/*<Grid item xs={12} sm={SM * 3}>*/}
                    {/*<CustomInput*/}
                        {/*id="name2"*/}
                        {/*labelText={'Ad2'}*/}
                        {/*formControlProps={{fullWidth: true}}*/}
                        {/*inputProps={{*/}
                            {/*onChange: onChange('name2'),*/}
                            {/*name: 'name2',*/}
                            {/*value: ifNull(valueData.name2)*/}
                        {/*}}*/}
                    {/*/>*/}
                {/*</Grid>*/}


                <Grid item xs={12} sm={SM*2}>

                    <Autocomplete source={compData.unitsetLineList}
                                  id={'unitsetLine'}
                                  name={'unitsetLine'}
                                  value={valueData.unitsetLine}
                                  placeholder={'Ölçü vahidi'}
                                  textFieldProps={{
                                      label: 'Ölçü vahidi',
                                      InputLabelProps: {
                                          shrink: true,

                                      },
                                      error: errors.unitsetLineIsNull,
                                  }}
                                  onChange={onChange('unitsetLine')}/>
                </Grid>

                {/*<Grid item xs={12} sm={SM * 3}>*/}

                    {/*<Autocomplete source={compData.cardTypeList}*/}
                                  {/*id={'cardType'}*/}
                                  {/*name={'cardType'}*/}
                                  {/*value={valueData.cardType}*/}
                                  {/*placeholder={'Kart növü'}*/}
                                  {/*textFieldProps={{*/}
                                      {/*label: 'Kart növü',*/}
                                      {/*InputLabelProps: {*/}
                                          {/*shrink: true,*/}

                                      {/*},*/}
                                      {/*error: errors.cardTypeIsNull,*/}
                                  {/*}}*/}
                                  {/*onChange={onChange('cardType')}/>*/}
                {/*</Grid>*/}



                <Grid item xs={12} sm={SM}>
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

    function action() {
        return(
            <Fragment>
                <Button onClick={() => dialogAction('disagree')} color="primary">Отмена</Button>
                <Button onClick={() => dialogAction('agree')} color="primary"
                        autoFocus> {valueData.id === 0 ? 'Сохранить' : 'Изменять'}</Button>
            </Fragment>
        );
    }

}

ServiceCardForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};

ServiceCardForm.defaultProps = {
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
export default withStyles(style)(ServiceCardForm);
