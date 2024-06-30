import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import AsyncSelect from "react-select/lib/Async";
import {avrFetch, readResponseAsJSON, validateResponse} from "../../../utils/avrFetch";
import {BACKEND_URL} from "../../../utils/Constants";
import {isEmpty} from "../../../utils/Validator";
import {emphasize, makeStyles, useTheme} from '@material-ui/core/styles';
import clsx from 'clsx';

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
let defaultOptions = [];


// function NoOptionsMessage(props) {
//     return (
//         <Typography
//             color="textSecondary"
//             className={props.selectProps.classes.noOptionsMessage}
//             {...props.innerProps}
//         >
//             {props.children}
//         </Typography>
//     );
// }
// NoOptionsMessage.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.node,
//     /**
//      * Props to be passed on to the wrapper.
//      */
//     innerProps: PropTypes.object.isRequired,
//     selectProps: PropTypes.object.isRequired,
// };
// function inputComponent({ inputRef, ...props }) {
//     return <div ref={inputRef} {...props} />;
// }
// inputComponent.propTypes = {
//     inputRef: PropTypes.oneOfType([
//         PropTypes.func,
//         PropTypes.shape({
//             current: PropTypes.any.isRequired,
//         }),
//     ]),
// };
// function Control(props) {
//     const {
//         children,
//         innerProps,
//         innerRef,
//         selectProps: { classes, TextFieldProps },
//     } = props;
//
//     return (
//         <TextField
//             fullWidth
//             InputProps={{
//                 inputComponent,
//                 inputProps: {
//                     className: classes.input,
//                     ref: innerRef,
//                     children,
//                     ...innerProps,
//                 },
//             }}
//             {...TextFieldProps}
//         />
//     );
// }
// Control.propTypes = {
//     /**
//      * Children to render.
//      */
//     children: PropTypes.node,
//     /**
//      * The mouse down event and the innerRef to pass down to the controller element.
//      */
//     innerProps: PropTypes.shape({
//         onMouseDown: PropTypes.func.isRequired,
//     }).isRequired,
//     innerRef: PropTypes.oneOfType([
//         PropTypes.oneOf([null]),
//         PropTypes.func,
//         PropTypes.shape({
//             current: PropTypes.any.isRequired,
//         }),
//     ]).isRequired,
//     selectProps: PropTypes.object.isRequired,
// };
// function Option(props) {
//     return (
//         <MenuItem
//             ref={props.innerRef}
//             selected={props.isFocused}
//             component="div"
//             style={{
//                 fontWeight: props.isSelected ? 500 : 400,
//             }}
//             {...props.innerProps}
//         >
//             {props.children}
//         </MenuItem>
//     );
// }
// Option.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.node,
//     /**
//      * props passed to the wrapping element for the group.
//      */
//     innerProps: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         key: PropTypes.string.isRequired,
//         onClick: PropTypes.func.isRequired,
//         onMouseMove: PropTypes.func.isRequired,
//         onMouseOver: PropTypes.func.isRequired,
//         tabIndex: PropTypes.number.isRequired,
//     }).isRequired,
//     /**
//      * Inner ref to DOM Node
//      */
//     innerRef: PropTypes.oneOfType([
//         PropTypes.oneOf([null]),
//         PropTypes.func,
//         PropTypes.shape({
//             current: PropTypes.any.isRequired,
//         }),
//     ]).isRequired,
//     /**
//      * Whether the option is focused.
//      */
//     isFocused: PropTypes.bool.isRequired,
//     /**
//      * Whether the option is selected.
//      */
//     isSelected: PropTypes.bool.isRequired,
// };
// function Placeholder(props) {
//     const { selectProps, innerProps = {}, children } = props;
//     return (
//         <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
//             {children}
//         </Typography>
//     );
// }
// Placeholder.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.node,
//     /**
//      * props passed to the wrapping element for the group.
//      */
//     innerProps: PropTypes.object,
//     selectProps: PropTypes.object.isRequired,
// };
// function SingleValue(props) {
//     return (
//         <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
//             {props.children}
//         </Typography>
//     );
// }
// SingleValue.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.node,
//     /**
//      * Props passed to the wrapping element for the group.
//      */
//     innerProps: PropTypes.any.isRequired,
//     selectProps: PropTypes.object.isRequired,
// };
// function ValueContainer(props) {
//     return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
// }
// ValueContainer.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.node,
//     selectProps: PropTypes.object.isRequired,
// };
// function MultiValue(props) {
//     return (
//         <Chip
//             tabIndex={-1}
//             label={props.children}
//             className={clsx(props.selectProps.classes.chip, {
//                 [props.selectProps.classes.chipFocused]: props.isFocused,
//             })}
//             onDelete={props.removeProps.onClick}
//             deleteIcon={<CancelIcon {...props.removeProps} />}
//         />
//     );
// }
// MultiValue.propTypes = {
//     children: PropTypes.node,
//     isFocused: PropTypes.bool.isRequired,
//     removeProps: PropTypes.shape({
//         onClick: PropTypes.func.isRequired,
//         onMouseDown: PropTypes.func.isRequired,
//         onTouchEnd: PropTypes.func.isRequired,
//     }).isRequired,
//     selectProps: PropTypes.object.isRequired,
// };
// function Menu(props) {
//     return (
//         <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
//             {props.children}
//         </Paper>
//     );
// }
// Menu.propTypes = {
//     /**
//      * The children to be rendered.
//      */
//     children: PropTypes.element.isRequired,
//     /**
//      * Props to be passed to the menu wrapper.
//      */
//     innerProps: PropTypes.object.isRequired,
//     selectProps: PropTypes.object.isRequired,
// };
// const components = {
//     Control,
//     Menu,
//     MultiValue,
//     NoOptionsMessage,
//     Option,
//     Placeholder,
//     SingleValue,
//     ValueContainer,
// };


function filterRemote(inputValue, data, callback) {
    if (inputValue && inputValue.length >= data.minLength) {
        avrFetch(BACKEND_URL + data.url + inputValue).then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        // const key = btoa(url);
                        // defaultOptions[key] = defaultOptions[key].concat(value.data);
                        callback(value.data);
                    }
                }
            ).catch(reason => {
            console.log(reason.message);
        });
    }
}


const promiseOptions = data => inputValue => new Promise(resolve => {
    filterRemote(inputValue, data, (data) => resolve(data));
});

function AsyncAutocomplete(props) {
    const classes = useStyles();
    const theme = useTheme();
    // const {classes, theme} = props;
    // if (defaultOptions[btoa(props.url)] === undefined)
    //     defaultOptions[btoa(props.url)] = [];

    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
        menuPortal: base => {
            const {zIndex, ...rest} = base;  // remove zIndex from base by destructuring
            return {...rest, zIndex: 9999};
        }
    };

    return (
        <NoSsr>
            {
                !props.muiltiSelect ? (
                    <AsyncSelect
                        id={props.name}
                        name={props.name}
                        value={props.value ? props.value : null}
                        classes={classes}
                        styles={selectStyles}
                        menuPortalTarget={document.body}
                        // options={props.source}
                        components={components}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        textFieldProps={props.textFieldProps}
                        cacheOptions={props.cache}
                        isClearable={true}
                        isDisabled={props.disabled}
                        loadOptions={promiseOptions({url: props.url, minLength: props.minLength})}
                        // defaultOptions={defaultOptions[btoa(props.url)]}
                        // onInputChange={(value: string) => {
                        //     console.log(value);
                        //     return value;
                        // }}
                    />

                ) : (
                    <AsyncSelect
                        id={props.name}
                        name={props.name}
                        value={props.value ? props.value : null}
                        menuPortalTarget={document.body}
                        classes={classes}
                        styles={selectStyles}
                        textFieldProps={props.textFieldProps}
                        // options={props.source}
                        cacheOptions={props.cache}
                        loadOptions={promiseOptions({url: props.url, minLength: props.minLength})}
                        components={components}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        isMulti
                        isClearable={true}
                        isDisabled={props.disabled}
                    />
                )
            }
        </NoSsr>

    );
}

AsyncAutocomplete.propTypes = {
    // classes: PropTypes.object.isRequired,
    // theme: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    minLength: PropTypes.number,
    muiltiSelect: PropTypes.bool,
    textFieldProps: PropTypes.object,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    onChange: PropTypes.func,
    cache: PropTypes.bool,
    disabled: PropTypes.bool,
};
AsyncAutocomplete.defaultProps = {
    minLength: 1,
    muiltiSelect: false,
    textFieldProps: {},
    placeholder: '',
    value: [],
    cache: true,
    onChange: () => {
    },
};

// export default withStyles(styles, {withTheme: true})(AsyncAutocomplete);
export default AsyncAutocomplete;
