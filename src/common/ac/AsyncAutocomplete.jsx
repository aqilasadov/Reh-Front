import React from 'react';
import AsyncSelect from "react-select/async";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {emphasize, makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import {ShamoFetch, readResponseAsJSON, validateResponse} from "../../../utils/fetch/ShamoFetch";
import {BACKEND_URL} from "../../../constants/AppConstants";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 250,
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

// let defaultOptions = [];

function filterRemote(inputValue = '', url, minLength, callback) {
      if (inputValue && inputValue.length >= minLength) {

(BACKEND_URL + url + inputValue)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (response) => {
                    console.log('filterRemote: ', response);
                    if (response && response.success === true) {
                        callback(response.data);
                    } else {
                        console.log(response.responseMessage);
                    }
                }
            ).catch(reason => {
            console.log('filterRemote: ',reason.message);
        });
    }
}


const promiseOptions = obj => inputValue =>
    new Promise(resolve => {
        filterRemote(inputValue, obj.url, obj.minLength, (data) => resolve(data));
    });

function AsyncAutocomplete(props) {
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
                    <AsyncSelect
                        {...props}
                        isDisabled={props.disabled}
                        id={props.name}
                        name={props.name}
                        value={props.value}
                        classes={classes}
                        isClearable={true}
                        // styles={selectStyles}
                        // options={props.source}
                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: styles => ({...styles, zIndex: 10000}),
                            selectStyles,
                        }}
                        components={components}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        textFieldProps={props.textFieldProps}
                        cacheOptions={props.cacheOptions}
                        loadOptions={promiseOptions({url: props.url, minLength: props.minLength})}
                        // defaultOptions={defaultOptions[btoa(props.url)]}
                        // onInputChange={(value: string) => {
                        //     console.log(value);
                        //     return value;
                        // }}
                    />

                ) : (
                    <AsyncSelect
                        {...props}
                        isDisabled={props.disabled}
                        id={props.name}
                        name={props.name}
                        value={props.value}
                        classes={classes}
                        isClearable={true}
                        // styles={selectStyles}
                        textFieldProps={props.textFieldProps}
                        // options={props.source}
                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: styles => ({...styles, zIndex: 10000}),
                            selectStyles,
                        }}
                        cacheOptions={props.cacheOptions}
                        loadOptions={promiseOptions({url: props.url, minLength: props.minLength})}
                        components={components}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        isMulti
                    />
                )
            }
        </NoSsr>

    );
}

AsyncAutocomplete.propTypes = {
    url: PropTypes.string.isRequired,
    muiltiSelect: PropTypes.bool,
    textFieldProps: PropTypes.object,
    name: PropTypes.string.isRequired,
    minLength: PropTypes.number,
    placeholder: PropTypes.string,
    cacheOptions: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    onChange: PropTypes.func,
};
AsyncAutocomplete.defaultProps = {
    muiltiSelect: false,
    textFieldProps: {},
    placeholder: '',
    cacheOptions: true,
    minLength: 0,
    value: [],
    onChange: () => {
    },
};

// export default withStyles(styles, {withTheme: true})(AsyncAutocomplete);
export default AsyncAutocomplete;
