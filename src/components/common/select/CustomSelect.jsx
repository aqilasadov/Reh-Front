import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core/index";
import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function CustomSelect(props) {

    const classes = useStyles();
    const {id, label, formControl, data, value, selectProps} = props;
    return (
        <FormControl className={classes.formControl}
                     fullWidth
                     {...formControl}>
            <InputLabel htmlFor={id}
                //className={classes.selectLabel}
            > {label} </InputLabel>
            <Select
                MenuProps={{className: classes.selectMenu}}
                classes={{select: classes.select}}
                {...selectProps}
                value={value ? value : ''}
                onChange={props.onChange}
                inputProps={{name: id, id: id,}}>

                <MenuItem disabled classes={{root: classes.selectMenuItem}}> {label} </MenuItem>
                {
                    data.map((item, index) =>
                        <MenuItem
                            key={'k_' + item.value + '_' + index}
                            value={item.value}
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}>
                            {item.label}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    );
}

CustomSelect.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
    data: PropTypes.array,
    onChange: PropTypes.func,
    selectProps: PropTypes.object,
    formControl: PropTypes.object,
};
CustomSelect.defaultProps = {
    onChange: () => {
    },
    value: '',
    data: [],
    selectProps: {},
    formControl: {}
};
export default CustomSelect;
// export default withStyles(customSelectStyle)(CustomSelect);
