import React, {Fragment} from "react";
import MuiDialog from "../common/dialogs/MuiDialog";
import Button from "@material-ui/core/Button";
import {CompData, ValueData} from "./ClientsHelper";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import {ifNull} from "../../utils/Validator";
import CustomSelect from "../common/select/CustomSelect";
import TextField from "@material-ui/core/TextField";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import {withTranslation} from "react-i18next";
function ClientsForm(props) {
    const {open, data, onChange, dialogAction, classes,t} = props;
    const {valueData, compData, errors} = data;
    const title = valueData.id === 0 ? 'Новый' : 'Редактировать';
    const SM = 3;
    return (
        <MuiDialog
            dialogContent={content()}
            dialogAction={action()}
            onClose={() => dialogAction('close')}
            open={open}
            title={title}
        />
    );

    function content() {
        return (
            <Grid container spacing={1}>

                <Grid item xs={12} sm={12}>
                    <CustomInput
                        id="firstName"
                        labelText={t("client_name")}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('firstName'),
                            name: 'firstName',
                            value: ifNull(valueData.firstName)
                        }}
                    />

                </Grid>
                <Grid item xs={12} sm={12}>
                    <CustomInput
                        id="lastName"
                        labelText={t("surname")}
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                            onChange: onChange('lastName'),
                            name: 'lastName',
                            value: ifNull(valueData.lastName)
                        }}/>
                </Grid>

                <Grid item xs={12} sm={12}>
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
                {/*<Grid item xs={12} sm={12}>*/}
                {/*    <CustomInput*/}
                {/*        id="firstBalance"*/}
                {/*        labelText={'İlkin qalıq'}*/}
                {/*        formControlProps={{fullWidth: true}}*/}
                {/*        inputProps={{*/}
                {/*            onChange: onChange('firstBalance'),*/}
                {/*            name: 'firstBalance',*/}
                {/*            value: ifNull(valueData.firstBalance)*/}
                {/*        }}*/}
                {/*    />*/}

                {/*</Grid>*/}
            </Grid>
        );
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

ClientsForm.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
};
ClientsForm.defaultProps = {
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

export default withTranslation() (ClientsForm);
