import * as React from "react";
import {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {setModuleTitle} from "../../actions/AppStateActions";
import PropTypes from "prop-types";
import classNames from 'classnames';
import Button from "@material-ui/core/Button";
import {
    avrFetch,
    checkIfResponseUnAuthorized,
    logError,
    readResponseAsJSON,
    validateResponse
} from "../../utils/avrFetch";
import {BACKEND_URL} from "../../utils/Constants";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ReportParamList from "./ReportParamList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Icon from "@material-ui/core/Icon/Icon";
import Loading from "../../components/common/Loading";
import ReportCore from "./ReportCore";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
});

class ReportView extends ReportCore {
    constructor(props) {
        super(props);
        this.paramList = React.createRef();
        this.state = {
            reportInfo: {},
            requestInProgress: false,
            anchorEl: null,
            processing: false,
            snackBar: {show: false, message: '', variant: 'info'},
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(setModuleTitle("Hesabatlar"));
       // this.loadState();

        this.loadReportInfo({reportId: this.props.reportId});
        console.log(this.paramList)
    };

    handleDownloadMenuClick = event => {
        let parameters = this.paramList.current !== null ? this.paramList.getParameters() : [] ;
        console.log("Got parameters: ", parameters);

            this.setState({anchorEl: event.currentTarget});
        
    };

    handleDownloadMenuClose = () => {
        this.setState({anchorEl: null});
    };

    loadReportInfo = (data) => {
        this.loadReportInfoCore(data.reportId, this.processing, this.error, data => {
            console.log("loaded",data);
            console.log(data);
            this.setState({reportInfo: data});
        });

        // this.setState({
        //     requestInProgress: true,
        // });
        //
        // avrFetch(BACKEND_URL + '/api/report/all/' + data.reportId, {
        //         method: 'GET',
        //     }
        // ).then(validateResponse)
        //     .then(readResponseAsJSON)
        //     .then(
        //         (result) => {
        //             if (result.success) {
        //                 console.log(result.data);
        //                 this.setState({
        //                     requestInProgress: false,
        //                     reportInfo: result.data,
        //                 });
        //
        //             }
        //             else {
        //                 console.log("basqa xeta", result)
        //             }
        //         },
        //         (error) => {
        //             if (checkIfResponseUnAuthorized(error)) return;
        //             this.setState({
        //                 requestInProgress: false,
        //                 error
        //             });
        //         }
        //     ).catch(logError);
    };

    handleDownloadClick = (downloadType) => () => {
        this.handleDownloadMenuClose();
        let parameters = this.paramList.current !== null ? this.paramList.getParameters() : [] ;
        if(parameters.length !== 0 && !this.paramList.checkParams()){
              return ;
        }
        console.log("Got parameters: ", parameters);

        this.getDownloadToken(this.props.reportId, downloadType, parameters, (response) => {
            this.openReport(response);
        });
    };


    getDownloadToken = (reportId, fileType, requestParams, callbackFunction) => {
        this.setState({
            requestInProgress: true,
        });

        avrFetch(BACKEND_URL + '/api/report/request/download', {
            method: 'POST',
            body: JSON.stringify({
                reportId: reportId,
                fileType: fileType,
                requestParams: requestParams,
            })
        }).then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (result) => {
                    if (result.success === true) {

                        console.log(result)
                        if (typeof callbackFunction === "function") {
                            callbackFunction(result.data);
                        }
                    }
                    else {
                        console.log("basqa xeta", result);
                    }
                    this.setState({
                        requestInProgress: false,
                    });
                },
                (error) => {
                    if (checkIfResponseUnAuthorized(error)) return;
                    this.setState({
                        requestInProgress: false,
                        error
                    });
                }
            ).catch(logError);
    };
    openReport = (response) => {
        let url = BACKEND_URL + '/api/report/download/' + encodeURIComponent(response.token);
        let win = window.open(url, '_blank');
        win.focus();
    };

    render() {
        const {classes} = this.props;


        // if (!this.state.reportInfo) return (<Fragment/>);
        // console.log(this.state)
         console.log(this.paramList)
        return (
            <Fragment>
                {
                    this.addSnackBar(this.state.snackBar,
                        () => this.setState(
                            Object.assign({}, this.state, {
                                snackBar: Object.assign({}, this.state.snackBar, {
                                    show: false,
                                    message: '',
                                    variant: 'error'
                                })
                            })
                        )
                    )
                }

                {
                    this.state.processing && <Loading/>
                }
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h6">
                        {this.state.reportInfo.queryTitle ? this.state.reportInfo.queryTitle : ''}
                    </Typography>
                    <Paper style={{marginTop: 6, marginBottom: 6}} elevation={1}>
                        { this.state.reportInfo.parameters && Object.keys(this.state.reportInfo.parameters).length !== 0  && <ReportParamList parameters={this.state.reportInfo.parameters}
                                         ref={childHoc => this.childHoc = childHoc}
                                         setRef={paramList => this.paramList = paramList}/> }
                    </Paper>
                    <div style={{marginTop: 15}}>
                        <Button variant="contained" color={"primary"} size="small" className={classes.button}
                                style={{marginLeft: 30}}
                                onClick={this.props.history.goBack}>
                            Назад
                            <Icon className={classes.leftIcon}>chevron_left</Icon>
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleDownloadMenuClick}
                            style={{marginLeft: 30}}>
                            Скачать
                            <CloudDownloadIcon className={classNames(classes.rightIcon, classes.iconSmall)}/>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleDownloadMenuClose}
                        >
                            <MenuItem onClick={this.handleDownloadClick("PDF")}
                                      style={{paddingTop: 5, paddingBottom: 5, minWidth: 100}}>PDF</MenuItem>
                            <MenuItem onClick={this.handleDownloadClick("XLS")}
                                      style={{paddingTop: 5, paddingBottom: 5, minWidth: 100}}>XLS</MenuItem>
                            <MenuItem onClick={this.handleDownloadClick("HTML")}
                                      style={{paddingTop: 5, paddingBottom: 5}}>HTML</MenuItem>
                        </Menu>
                    </div>
                </Paper>

            </Fragment>
        );
    }

    processing = processing => this.setState(Object.assign({}, this.state, {processing}));
    error = error => {
        this.setState(Object.assign({}, this.state, {
            snackBar: Object.assign({}, this.state.snackBar, {
                show: true,
                message: error,
                variant: 'error'
            }),
        }))
    };

}

ReportView.propTypes = {
    classes: PropTypes.object.isRequired,
    reportId: PropTypes.number.isRequired,
};

ReportView.defaultProps = {
    multiExpansion: true,
};


export default withStyles(styles)(connect()(ReportView));
