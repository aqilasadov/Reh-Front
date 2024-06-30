import React, {Fragment} from "react";
import {Switch} from "react-router-dom";
import PageWrapper from "../PageWrapper";
import Route from "react-router-dom/es/Route";
import ReportList from "./ReportList";
import ReportView from "./ReportView";
import {
    avrFetch,
    checkIfResponseUnAuthorized,
    logError,
    readResponseAsJSON,
    validateResponse
} from "../../utils/avrFetch";
import {BACKEND_URL} from "../../utils/Constants";
import {setModuleTitle} from "../../actions/AppStateActions";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import connect from "react-redux/es/connect/connect";

class ReportsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportList: null,
            requestInProgress: false,
            dataLoaded: false,
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(setModuleTitle("Hesabatlar"));

        this.loadReportsData();
    };

    loadReportsData = (data) => {
        this.setState({
            requestInProgress: true,
        });

        avrFetch(BACKEND_URL + '/api/report/list/allk', {
                method: 'GET',
            }
        ).then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (result) => {
                    if (result.success) {
                        console.log("geldi");
                        console.log(result.data);
                        this.setState({
                            requestInProgress: false,
                            dataLoaded: true,
                            reportList: result.data,
                        });

                    }
                    else {
                        console.log("basqa xeta", result)
                    }
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

    render() {
        console.log(this.props.match.url)

        if (this.state.requestInProgress) return (<PageWrapper path={`${this.props.match.url}`}
                                                               component={<LinearProgress variant={"indeterminate"}
                                                                                          color={"secondary"}/>}/>);
        if (!this.state.dataLoaded) {
            return (<Fragment/>);
        }

        return (
            <Switch>
                <Route exact={true} path={`${this.props.match.url}/`} render={(props) =>
                    <PageWrapper path={`${this.props.match.url}`} component={
                        <ReportList multiExpansion={false} reportList={this.state.reportList}
                                    history={this.props.history} match={this.props.match}/>
                    }/>}/>
                <Route path={`${this.props.match.url}/:reportId`} render={(props) =>
                    <PageWrapper path={`${this.props.match.url}`}
                                 component={<ReportView reportId={parseInt(props.match.params.reportId, 10)}
                                                        history={this.props.history} match={this.props.match}/>}/>}/>
            </Switch>
        );

    }
}

export default connect()(ReportsPage);
