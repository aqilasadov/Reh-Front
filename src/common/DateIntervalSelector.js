import * as React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ErrorBoundary from "../ErrorBoundary";
import {DatePicker} from "material-ui-pickers";
import moment from "moment";

const styles = theme => ({
    root: {
        minWidth: 200,
        padding: 15
    },
    formControl: {
        margin: theme.spacing.unit,
        marginTop: 0,
    },
});

class DateIntervalSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.open,
            title: props.title,
            startDate: null,
            endDate: null,
        };
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps, this.props)

        if (prevProps.open !== this.props.open ||
            prevProps.startDate !== this.props.startDate ||
            prevProps.endDate !== this.props.endDate) {
            this.setState({
                isOpen: this.props.open,
                startDate: this.props.startDate,
                endDate: this.props.endDate,
            })
        }
    }

    handleChange = name => event => {
        let value = (name === "startDate" || name === "endDate") ? event : event.target.value;

        if (name === "startDate") {
            this.setState({
                startDate: moment(value).unix(),
            });
            return;
        }

        if (name === "endDate") {
            this.setState({
                endDate: moment(value).unix(),
            });
            return;
        }

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
        this.props.onSelect({startDate: isNaN(this.state.startDate) ? null : this.state.startDate, endDate: isNaN(this.state.endDate) ? null : this.state.endDate});
    };

    render() {
        const {classes} = this.props;

        return (
            <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.isOpen} onClose={this.handleDialogClose}>
                <DialogTitle>{this.state.title}</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl style={{width: 160, marginRight: 6}} className={classes.formControl}
                                     required={true}>
                            <ErrorBoundary>
                                <DatePicker
                                    keyboard
                                    clearable
                                    autoOk={true}
                                    format="YYYY-MM-DD"
                                    label="Begin date"
                                    okLabel="Select"
                                    clearLabel="Clear"
                                    cancelLabel="Cancel"
                                    value={!this.state.startDate || this.state.startDate === 0 ? null : moment.unix(this.state.startDate).format("YYYY-MM-DD")}
                                    onChange={this.handleChange("startDate")}
                                    animateYearScrolling={false}
                                    onInputChange={e => console.log('Keyboard Input:', e.target.value)}
                                />
                            </ErrorBoundary>
                        </FormControl>
                        <FormControl style={{width: 160, marginRight: 6}} className={classes.formControl}
                                     required={true}>
                            <ErrorBoundary>
                                <DatePicker
                                    keyboard
                                    clearable
                                    autoOk={true}
                                    format="YYYY-MM-DD"
                                    label="End date"
                                    okLabel="Select"
                                    clearLabel="Clear"
                                    cancelLabel="Cancel"
                                    value={!this.state.endDate || this.state.endDate === 0 ? null : moment.unix(this.state.endDate).format("YYYY-MM-DD")}
                                    onChange={this.handleChange("endDate")}
                                    animateYearScrolling={false}
                                    onInputChange={e => console.log('Keyboard Input:', e.target.value)}
                                />
                            </ErrorBoundary>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSelectClick} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

DateIntervalSelector.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    title: PropTypes.string,
    startDate: PropTypes.number,
    endDate : PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func,
};

DateIntervalSelector.defaultProps = {
    open: false,
    title: "Fill the form",
};

export default withStyles(styles)(DateIntervalSelector);
