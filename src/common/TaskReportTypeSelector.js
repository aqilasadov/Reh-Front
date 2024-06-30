import * as React from "react";
import moment from "./DateIntervalSelector";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import ErrorBoundary from "../ErrorBoundary";
import {DatePicker} from "material-ui-pickers";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = theme => ({
    root: {
        minWidth: 200,
        padding: 15
    },
    formControl: {
        margin: theme.spacing.unit,
        marginTop: 0,
    },
    paper: {
        height: 180,
        width: 140,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '85%',
        backgroundPosition: 'center',
    },
});

const reportTypes = [
    {
        typeId: 1,
        url: 'http://144.126.132.52:9090/images/taskreport/report_type_1.png',
        title: 'Simple report',
    },
    {
        typeId: 2,
        url: 'http://app.clintar.com/images/taskreport/report_type_2.png',
        title: 'Small options',
    },
    {
        typeId: 3,
        url: 'http://app.clintar.com/images/taskreport/report_type_3.png',
        title: 'Medium options',
    },
    {
        typeId: 4,
        url: 'http://app.clintar.com/images/taskreport/report_type_4.png',
        title: 'Extra Large options',
    },
    {
        typeId: 5,
        url: 'http://app.clintar.com/images/taskreport/report_type_5.png',
        title: 'Without Image',
    },
    {
        typeId: 6,
        url: 'http://app.clintar.com/images/taskreport/report_type_6.png',
        title: 'Task Images List',
    },
    {
        typeId: 7,
        url: 'http://app.clintar.com/images/taskreport/report_type_7.png',
        title: 'Task Messages',
    },
    {
        typeId: 8,
        url: 'http://app.clintar.com/images/taskreport/report_type_8.png',
        title: 'Task Activities',
    },
];

class TaskReportTypeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.open,
            title: props.title,
            reportTypeId: 1,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.open !== this.props.open) {
            this.setState({
                isOpen: this.props.open,
            })
        }
    }

    handleChange = name => event => {
        let value = event.target.value;

        this.setState({
            [name]: value,
        });

    };

    handleDialogClose = () => {
        this.setState({isOpen: false});

        if (typeof this.props.onClose === "function") {
            this.props.onClose();
        }
    };

    handleSelectClick = () => {
        this.handleDialogClose();
        this.props.onSelect({reportTypeId: this.state.reportTypeId});
    };

    render() {
        const {classes} = this.props;

        return (
            <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.isOpen} onClose={this.handleDialogClose}>
                <DialogTitle>{this.state.title}</DialogTitle>
                <DialogContent>
                    <Grid container className={classes.demo} justify="center" xs={24} spacing={6}>
                        {reportTypes.map(reportType => (
                            <Grid key={reportType.typeId} item xs={4}>
                                <FormControlLabel
                                    value="female"
                                    control={<Radio
                                        checked={this.state.reportTypeId == reportType.typeId}
                                        onChange={this.handleChange('reportTypeId')}
                                        value={reportType.typeId}
                                        name="radio-button-demo"
                                        aria-label={reportType.title}
                                    />}
                                    label={reportType.title}
                                    labelPlacement="end"
                                />
                                <Paper className={classes.paper} style={{backgroundImage: `url(${reportType.url})`}} />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSelectClick} color="primary">
                        Download
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

TaskReportTypeSelector.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    title: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func,
};

TaskReportTypeSelector.defaultProps = {
    open: false,
    title: "Choose Report Type",
};

export default withStyles(styles)(TaskReportTypeSelector);
