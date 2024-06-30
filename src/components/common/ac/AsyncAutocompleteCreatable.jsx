import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import {avrFetch, readResponseAsJSON, validateResponse} from "../../../utils/avrFetch";
import {BACKEND_URL} from "../../../utils/Constants";
import {isEmpty} from "../../../utils/Validator";
import {components, styles} from "./AutoCompleteHelper";
import ValueLabel from "../../../utils/ValueLabel";

// let defaultOptions = [];

function filterRemote(inputValue, data, callback) {

    if (inputValue && inputValue.length >= data.minLength) {
        avrFetch(BACKEND_URL + data.url + inputValue).then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        callback(value.data);
                    }
                }
            ).catch(reason => {
            console.log(reason.message);
        });
    }
}


const promiseOptions = data => inputValue => new Promise(resolve => {
    filterRemote(inputValue, data,
        (data) => {
            const options = data.map(item => new ValueLabel(item.value.toString(), item.label));
            resolve(options);
        }
    );
});

function AsyncAutocompleteCreatable(props) {
    const {classes, theme} = props;

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
                    <AsyncCreatableSelect
                        id={props.name}
                        name={props.name}
                        // value={props.value}
                        classes={classes}
                        styles={selectStyles}
                        menuPortalTarget={document.body}
                        components={components}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        textFieldProps={props.textFieldProps}
                        loadOptions={promiseOptions({url: props.url, minLength: props.minLength})}
                        cacheOptions={true}

                        isClearable={props.isClearable}
                        isDisabled={props.isDisabled}
                        isLoading={props.isLoading}
                        onCreateOption={props.onCreateOption}

                    />

                ) : (
                    <AsyncCreatableSelect
                        id={props.name}
                        name={props.name}
                        value={props.value}
                        menuPortalTarget={document.body}
                        classes={classes}
                        styles={selectStyles}
                        textFieldProps={props.textFieldProps}
                        // options={props.source}
                        cacheOptions={true}
                        loadOptions={promiseOptions({url: props.url, minLength: props.minLength})}
                        components={components}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        isMulti

                        isClearable={props.isClearable}
                        isDisabled={props.isDisabled}
                        isLoading={props.isLoading}
                        onCreateOption={props.onCreateOption}
                    />
                )
            }
        </NoSsr>

    );
}

AsyncAutocompleteCreatable.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
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

    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onCreateOption: PropTypes.func,
};
AsyncAutocompleteCreatable.defaultProps = {
    minLength: 1,
    muiltiSelect: false,
    textFieldProps: {},
    placeholder: '',
    value: [],
    onChange: () => {
    },

    isClearable: true,
    isDisabled: false,
    isLoading: false,
    onCreateOption: () => {
    }
};

export default withStyles(styles, {withTheme: true})(AsyncAutocompleteCreatable);
