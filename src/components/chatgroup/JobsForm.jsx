import React, {Fragment} from "react";
import Button from '@material-ui/core/Button/index';
import PropTypes from 'prop-types';
import {CompData, ValueData} from "./JobsHelper";
import {withStyles} from '@material-ui/core/styles/index';
import MuiDialog from "../../common/dialogs/MuiDialog";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';


import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';



const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;
const style = {};


function JobsForm(props) {
    const {open, data, onChange, onClick} = props;
    const {valueData, compData, errors} = data;

    const [showPassword, setShowPassword] = React.useState(true);
    console.log('data: compData aq ',  valueData.id)

    const title = valueData.id === 0 ? 'Новый' : 'Новый';
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
        // console.log("compData.usersList: ", compData.userList)
        return (
            <Fragment>
                <Grid container spacing={2}>



                    <Grid item xs={12} sm={12}>
                        <TextField
                            style={{paddingTop: '5px'}}
                            id="cgTitle"
                            name="cgTitle"
                            label="Название"
                            fullWidth
                            onChange={event => onChange({
                                component: 'tf',
                                name: event.target.name,
                                value: event.target.value
                            })}
                        />
                    </Grid>


                    <Grid item xs={12} sm={12}>
                        <Autocomplete
                            multiple
                            id="userList"
                            options={compData.userList ? compData.userList : []}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.label}
                            onChange={(p,value) => onChange({component: 'ac2', name: 'userList', value: value}) }

                            renderOption={(option, {selected}) => (
                                <React.Fragment>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{marginRight: 8}}
                                        checked={selected}
                                    />
                                    {option.label}
                                </React.Fragment>
                            )}
                            style={{width: 500}}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Пользователь" placeholder=""/>
                            )}
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

JobsForm.propTypes = {
    usersList: PropTypes.object,
    data: PropTypes.object,
    open: PropTypes.bool,
    dialogAction: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
};

JobsForm.defaultProps = {
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
    },
    usersList: {}
};
export default withStyles(style)(JobsForm);
