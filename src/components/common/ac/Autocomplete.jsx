import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';

// const styles = theme => ({
//
//     input: {
//         display: 'flex',
//         padding: 0,
//     },
//     valueContainer: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         flex: 1,
//         alignItems: 'center',
//         overflow: 'hidden',
//     },
//     chip: {
//         margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
//     },
//     chipFocused: {
//         backgroundColor: emphasize(
//             theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
//             0.08,
//         ),
//     },
//     noOptionsMessage: {
//         padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
//     },
//     singleValue: {
//         fontSize: 16,
//     },
//     placeholder: {
//         position: 'absolute',
//         left: 2,
//         fontSize: 16,
//     },
//     paper: {
//         position: 'absolute',
//         zIndex: 1,
//         marginTop: theme.spacing(1),
//         left: 0,
//         right: 0,
//     },
//     divider: {
//         height: theme.spacing(2),
//     },
// });

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 250,
        minWidth: 290,
    },
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing(2),
    },
}));

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}
function inputComponent({inputRef, ...props}) {
    return <div ref={inputRef} {...props} />;
}
function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}
function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}
function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}
function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}
function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}
function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}
function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}
const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

function Autocomplete(props) {
    // const {classes, theme} = props;
    const classes = useStyles();
    const theme = useTheme();
    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
    };

    return (
        <NoSsr>
            {
                !props.muiltiSelect ? (
                    <Select
                        id={props.name}
                        name={props.name}
                        value={props.value ? props.value : null}
                        classes={classes}
                        options={props.source}
                        components={components}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        textFieldProps={props.textFieldProps}
                        menuPortalTarget={document.body}
                        isClearable = {false}
                        isDisabled={props.disabled}
                        styles={{
                            menuPortal: styles => ({ ...styles, zIndex: 10000 }),
                            selectStyles,
                        }}
                    />
                ) : (
                    <Select
                        id={props.name}
                        name={props.name}
                        value={props.value ? props.value : null}
                        classes={classes}
                        textFieldProps={props.textFieldProps}
                        options={props.source}
                        components={components}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        isMulti
                        isClearable = {true}
                        isDisabled={props.disabled}
                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: styles => ({ ...styles, zIndex: 10000 }),
                            selectStyles,
                        }}
                    />
                )
            }
        </NoSsr>

    );
}

Autocomplete.propTypes = {
  //  classes: PropTypes.object.isRequired,
  //  theme: PropTypes.object.isRequired,
    muiltiSelect: PropTypes.bool,
    disabled: PropTypes.bool,
    source: PropTypes.array,
    textFieldProps: PropTypes.object,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
};
Autocomplete.defaultProps = {
    muiltiSelect: false,
    disabled: false,
    source: [],
    textFieldProps: {},
    placeholder: '',
    value: {},
    onChange: () => {
    },
};

export default Autocomplete;
// export default withStyles(styles, {withTheme: true})(Autocomplete);
