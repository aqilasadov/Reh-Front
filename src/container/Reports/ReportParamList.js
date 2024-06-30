import * as React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import {Fragment} from "react";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import ReactSelect from 'react-select';
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Select from "@material-ui/core/Select/Select";
import {isEmpty} from "../../utils/common";
import * as moment from "moment";

const styles = theme => ({
    root: {
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
});

class ReportParamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestInProgress: false,
            isParamsInitialised: false,
            paramValues: {},
            paramErrors: {},
        };
    }

    componentDidMount() {
        if (typeof this.props.setRef === "function") {
            this.props.setRef(this);
        }
        let paramValues = {};

        // Initialise parameter values
        this.props.parameters.map((param) => {
            let paramKey = this.getParamKey(param.paramId);

            if (param.componentId === 1) {
                paramValues[paramKey] = param.defaultValue ? param.defaultValue : "";
            } else if (param.componentId === 2) {
                paramValues[paramKey] = param.defaultValue ? param.defaultValue : "";
            } else if (param.componentId === 4 ){
                paramValues[paramKey] =param.defaultValue && param.defaultValue != 0 ? param.defaultValue :  parseInt(new Date().getTime() / 1000 );
            } 
            else {
                paramValues[paramKey] = param.defaultValue ? param.defaultValue : "";
            }
        });

        this.setState({
            paramValues: paramValues,
            isParamsInitialised: true,
        });
    };

    handleChange = (param) => event => {

        let paramKey = this.getParamKey(param.paramId);
        if(param.componentId === 4){
            let date = new Date(event.target.value).getTime()
            let unixTimeStamp = date / 1000;
            this.setState({
                paramValues: Object.assign({}, this.state.paramValues, {[paramKey] : unixTimeStamp})
            })
            return ;
        }
        if (param.componentId === 7) {
            console.log(event)
            this.setState({
                paramValues: Object.assign({}, this.state.paramValues, {[paramKey]: event})
            });
            return;
        }
        if (param.componentId === 8) {
            console.log(event)
            this.setState({
                paramValues: Object.assign({}, this.state.paramValues, {[paramKey]: event})
            });
            return;
        }
        this.setState({
            paramValues: Object.assign({}, this.state.paramValues, {[paramKey]: event.target.value})
        });
    };

    getParamKey = (paramId) => {
        return "param" + paramId;
    };

    checkParams = (setState = true) => {
        let paramErrors = {};
        this.props.parameters.map((param) => {
            let paramKey = this.getParamKey(param.paramId);
            if (param.isRequired.toString() === "1") {
                let paramSet = this.checkIfParamSet(param);
                if (!paramSet.response) {
                    paramErrors[paramKey] = paramSet.message
                }
            }
        });

        if (setState) {
            this.setState({paramErrors: paramErrors});
        }

        return isEmpty(paramErrors);
    };

    getParameters = () => {
        let parameters = [];

        this.props.parameters.map((param) => {
            let paramData = this.getParameter(param);
            parameters.push(paramData);
        });

        console.log("parameterss222",this.props.parameters);
        return parameters;
    };

    getParameter = (param) => {
        let paramKey = this.getParamKey(param.paramId);
        let parameter = {
            name: param.paramName,
            isSet: 1,
            value: null,
        };
        console.log("parameterss333",this.props.parameters);
        // Yazı tipli komponent
        if (param.componentId === 1) {
            parameter.value = this.state.paramValues[paramKey];
        }

        // Rəqəm tipli komponent
        if (param.componentId === 2) {
            parameter.value = this.state.paramValues[paramKey];
        }

        // Sadə seçimli komponent
        if (param.componentId === 3) {
            parameter.value = this.state.paramValues[paramKey];
        }

        // Tarix seçimi komponenti
        if (param.componentId === 4) {

             parameter.value = new Date(this.state.paramValues[paramKey] *1000).toISOString().slice(0,10);
         //   parameter.value = moment(new Date()).unix();
        }

        // Saat seçimi komponenti
        if (param.componentId === 5) {
            parameter.value = this.state.paramValues[paramKey];
        }

        // Tarix-saat seçimi komponenti
        if (param.componentId === 6) {
            parameter.value = this.state.paramValues[paramKey];
        }

        // React-select tipli, autocomplete seçimli komponent
        if (param.componentId === 7) {
            if (this.state.paramValues[paramKey]) {
                parameter.value = this.state.paramValues[paramKey].value;
            } else {
                parameter.isSet = 0;
            }
        }

        // React-select tipli, multi seçimli komponent
        if (param.componentId === 8) {
            if (this.state.paramValues[paramKey]) {

                this.state.paramValues[paramKey].map((item, index) => {
                    if (index > 0) {
                        parameter.value = parameter.value + ",";
                    }
                    parameter.value = parameter.value + item.value;
                });

            } else {
                parameter.isSet = 0;
            }
        }

        return parameter;
    };

    checkIfParamSet = (param) => {
        let paramKey = this.getParamKey(param.paramId);

        if (param == null) return {response: false, message: ""};
        if (this.state.paramValues[paramKey] == null) return {response: false, message: ""};


        // Yazı tipli komponent
        if (param.componentId === 1) {
            // Check minimum symbols
            if (param.minLength > 0) {
                if (this.state.paramValues[paramKey].length < param.minLength) {
                    return {response: false, message: "Minimum " + param.minLength + " simvol daxil edilməlidir"};
                }
            }

            // Check if empty
            if (this.state.paramValues[paramKey] === "") {
                return {response: false, message: ""};
            }
        }

        // Rəqəm tipli komponent
        if (param.componentId === 2) {
            // Check minimum symbols
            if (param.minLength > 0) {
                if (this.state.paramValues[paramKey].length < param.minLength) {
                    return {response: false, message: "Minimum " + param.minLength + " simvol daxil edilməlidir"};
                }
            }

            // Check if empty
            if (this.state.paramValues[paramKey] === "") {
                return {response: false, message: ""};
            }
        }

        // Sadə seçimli komponent
        if (param.componentId === 3) {
            // Check if empty
            if (this.state.paramValues[paramKey] === "") {
                return {response: false, message: ""};
            }
        }

        // Tarix seçimi komponenti
        if (param.componentId === 4) {
            // Check if empty
            if (this.state.paramValues[paramKey] === "") {
                return {response: false, message: ""};
            }
        }

        // Saat seçimi komponenti
        if (param.componentId === 5) {
            // Check if empty
            if (this.state.paramValues[paramKey] === "") {
                return {response: false, message: ""};
            }
        }

        // Tarix-saat seçimi komponenti
        if (param.componentId === 6) {
            // Check if empty
            if (this.state.paramValues[paramKey] === "") {
                return {response: false, message: ""};
            }
        }

        // React-select tipli, autocomplete seçimli komponent
        if (param.componentId === 7) {
            // Check if empty
            if (this.state.paramValues[paramKey] === "") {
                return {response: false, message: "Seçim edin.."};
            }
        }

        // React-select tipli, multi seçimli komponent
        if (param.componentId === 8) {
            // Check if empty
            if (this.state.paramValues[paramKey] === "") {
                return {response: false, message: "Seçim edin.."};
            }
        }

        return {response: true, message: ""};
    };

    render() {
        const {classes} = this.props;

        console.log("this.state.paramValues",this.state.paramValues);


        if (!this.state.isParamsInitialised) return (<Fragment/>);

        return (
            <div>
                {this.props.parameters.map((param) => {
                    let paramKey = this.getParamKey(param.paramId);
                    let errorSet = typeof this.state.paramErrors[paramKey] !== "undefined";
                    if (param.componentId === 1) {
                        return (
                            <FormControl key={paramKey} className={classes.formControl} required={true}>
                                <TextField id={paramKey}
                                           error={errorSet}
                                           label={param.paramTitle}
                                           className={classes.textField}
                                           value={this.state.paramValues[paramKey]}
                                           InputLabelProps={{
                                               shrink: true,
                                           }}
                                           onChange={this.handleChange(param)}
                                />
                                {this.state.paramErrors &&
                                <FormHelperText error={errorSet}>{this.state.paramErrors[paramKey]}</FormHelperText>}
                            </FormControl>);
                    } else if (param.componentId === 2) {
                        return (<FormControl key={paramKey} className={classes.formControl} required={true}>
                            <TextField
                                error={errorSet}
                                id={paramKey}
                                label={param.paramTitle}
                                className={classes.textField}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.paramValues[paramKey]}
                                onChange={this.handleChange(param)}
                            />{this.state.paramErrors &&
                        <FormHelperText error={errorSet}>{this.state.paramErrors[paramKey]}</FormHelperText>}
                        </FormControl>);
                    } else if (param.componentId === 3) {
                        return (
                            <FormControl key={paramKey} className={classes.formControl}
                                         error={errorSet}>
                                <InputLabel shrink={true} htmlFor="age-simple">{param.paramTitle}</InputLabel>
                                <Select displayEmpty={false}
                                        value={this.state.paramValues[paramKey]}
                                        onChange={this.handleChange(param)}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                >
                                    {param.lookUpOptions && param.lookUpOptions.map((option) => {
                                        return (<MenuItem key={option.id} value={option.id} style={{
                                            paddingTop: 5,
                                            paddingBottom: 5
                                        }}>{option.title}</MenuItem>);
                                    })}
                                </Select>
                                {this.state.paramErrors &&
                                <FormHelperText error={errorSet}>{this.state.paramErrors[paramKey]}</FormHelperText>}
                            </FormControl>
                        );
                    } else if (param.componentId === 4) {
                        return (
                            <FormControl key={paramKey} className={classes.formControl} required={true}>
                                <TextField
                                    id={paramKey}
                                    error={errorSet}
                                    label={param.paramTitle}
                                    className={classes.textField}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    // value={this.state.paramValues[paramKey]}
                                    value={new Date(this.state.paramValues[paramKey] *1000).toISOString().slice(0,10)}
                                    onChange={this.handleChange(param)}
                                />{this.state.paramErrors &&
                            <FormHelperText error={errorSet}>{this.state.paramErrors[paramKey]}</FormHelperText>}
                            </FormControl>);
                    } else if (param.componentId === 5) {
                        return (
                            <FormControl key={paramKey} className={classes.formControl} required={true}>
                                <TextField
                                    error={errorSet}
                                    id={paramKey}
                                    label={param.paramTitle}
                                    className={classes.textField}
                                    type="time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.paramValues[paramKey]}
                                    onChange={this.handleChange(param)}
                                />{this.state.paramErrors &&
                            <FormHelperText error={errorSet}>{this.state.paramErrors[paramKey]}</FormHelperText>}
                            </FormControl>);
                    } else if (param.componentId === 6) {
                        return (
                            <FormControl key={paramKey} className={classes.formControl} required={true}>
                                <TextField
                                    error={errorSet}
                                    id={paramKey}
                                    label={param.paramTitle}
                                    className={classes.textField}
                                    type="datetime-local"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.paramValues[paramKey]}
                                    onChange={this.handleChange(param)}
                                />{this.state.paramErrors &&
                            <FormHelperText error={errorSet}>{this.state.paramErrors[paramKey]}</FormHelperText>}
                            </FormControl>);
                    } else if (param.componentId === 7) {
                        let options = [];
                        console.log(options)
                        param.lookUpOptions.forEach((item) => {
                            options.push({
                                value: item.id,
                                label: item.title,
                            });
                        });
                        return (<FormControl key={paramKey} className={classes.formControl} style={{minWidth: 300}}
                                             required={true} error={errorSet}>
                            <ReactSelect
                                className="my-react-select"
                                id={paramKey}
                                aria-label={param.paramTitle}
                                value={this.state.paramValues[paramKey]}
                                onChange={this.handleChange(param)}
                                options={options}
                                isDisabled={false}
                                isSearchable={true}
                                placeholder={param.paramTitle}
                            />{this.state.paramErrors &&
                        <FormHelperText error={errorSet}>{this.state.paramErrors[paramKey]}</FormHelperText>}
                        </FormControl>);
                    } else if (param.componentId === 8) {
                        let options = [];
                        console.log(options)
                        param.lookUpOptions.forEach((item) => {
                            options.push({
                                value: item.id,
                                label: item.title,
                            });
                        });
                        return (<FormControl key={paramKey} className={classes.formControl} style={{minWidth: 300}}
                                             required={true} error={errorSet}>
                            <ReactSelect
                                className="my-react-select"
                                id={paramKey}
                                aria-label={param.paramTitle}
                                value={this.state.paramValues[paramKey]}
                                onChange={this.handleChange(param)}
                                options={options}
                                isMulti={true}
                                isDisabled={false}
                                isSearchable={true}
                                placeholder={param.paramTitle}
                            />{this.state.paramErrors &&
                        <FormHelperText error={errorSet}>{this.state.paramErrors[paramKey]}</FormHelperText>}
                        </FormControl>);
                    } else {
                        return (<div key={paramKey}>Dəstəklənməyən komponent [{paramKey}]</div>);
                    }
                })}
            </div>
        );
    }
}

ReportParamList.propTypes = {
    classes: PropTypes.object.isRequired,
    parameters: PropTypes.arrayOf(PropTypes.shape({
        paramId: PropTypes.number,
        paramName: PropTypes.string,
        paramTitle: PropTypes.string,
        paramTypeId: PropTypes.number,
        paramSize: PropTypes.number,
        componentId: PropTypes.number,
        isRequired: PropTypes.number,
        minLength: PropTypes.number,
        defaultValue: PropTypes.string,
        lookUpOptions: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
        })),
    })),
};

ReportParamList.defaultProps = {
    parameters: [],
};


export default withStyles(styles)(ReportParamList);
