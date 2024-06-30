import * as React from "react";
import {setModuleTitle} from "../../actions/AppStateActions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";
import {userHasAccess} from "../../utils/common";


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    reportCountHeader: {
        position: "absolute",
        right: 76,
        top: "50%",
        width: 20,
    },
});

class ReportList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedCategories: [],
            requestInProgress: false,
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(setModuleTitle("Hesabatlar"));

        userHasAccess(16);
    };

    handlePanelChange = catId => (event, expanded) => {
        const {expandedCategories} = this.state;
        let newExpanded = [];
        const panelIndex = expandedCategories.indexOf(catId);


        if (this.props.multiExpansion === false) {
            // Only one expansion at a time
            if (expanded) {
                newExpanded.push(catId)
            }
        }
        else {
            if (panelIndex === -1) {
                newExpanded = newExpanded.concat(expandedCategories, catId);
            }
            else {
                newExpanded = newExpanded.concat(expandedCategories);
                newExpanded.splice(panelIndex, 1);
            }
        }

        this.setState({
            expandedCategories: newExpanded,
        });
    };

    handleReportItemClick = (id) => () => {
        this.props.history.push(this.props.match.url + '/' + id, {groups: this.props.groups});
    };

    getReportCountForCategory = (catId) => {
        let reportCount = 0;
        this.props.reportList.reports.map((item) => {
            if (item.catId === catId) reportCount++;
        });

        return reportCount;
    };

    render() {
        const {classes} = this.props;
        const {expandedCategories} = this.state;

        return (
            <div>
                {
                    this.props.reportList !== null &&
                    <div className={classes.root}>
                        {this.props.reportList.categories.map((n, index) => {
                            return (
                                <ExpansionPanel key={n.catId} expanded={expandedCategories.indexOf(n.catId) >= 0}
                                                onChange={this.handlePanelChange(n.catId)}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography className={classes.heading}>{n.title}</Typography>
                                        <Typography className={classes.secondaryHeading}></Typography>
                                        <Badge badgeContent={this.getReportCountForCategory(n.catId)}
                                               className={classes.reportCountHeader} color={"error"}><Typography/>
                                        </Badge>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <List dense style={{width: "100%"}}>
                                            {this.props.reportList.reports.map(item => {
                                                if (item.catId !== n.catId) return;
                                                return (
                                                    <ListItem key={item.queryId} button
                                                              onClick={this.handleReportItemClick(item.queryId)}>
                                                        <Icon color={"secondary"}>note</Icon>
                                                        <ListItemText primary={item.queryTitle}/>
                                                        <ListItemSecondaryAction>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                )
                                            })}
                                        </List>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            );
                        })}
                    </div>
                }
            </div>
        );
    }
}

ReportList.propTypes = {
    classes: PropTypes.object.isRequired,
    multiExpansion: PropTypes.bool,
    reportList: PropTypes.object,
};

ReportList.defaultProps = {
    multiExpansion: true,
    reportList: null,
};

export default withStyles(styles)(connect()(ReportList));
