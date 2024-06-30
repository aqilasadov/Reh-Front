import {withStyles} from "@material-ui/core";
import {cardTitle} from "../../../assets/jss/core/material-dashboard-pro-react";
import MuiDialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from "@material-ui/core/DialogContent/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions/DialogActions";
import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import PropTypes from 'prop-types';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing(2),
    },
    cardIconTitle: {
        ...cardTitle,
        marginTop: "5px",
        marginBottom: "0px"
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}))(props => {
    const {children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            {/*<Typography variant="h6">{children}</Typography>*/}
            <h4 className={classes.cardIconTitle}>{children}</h4>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <IconButton>
                        <CloseIcon/>
                    </IconButton>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);



function MuiDialog(props)
{
    const {onClose, dialogAction, dialogContent, title, open} = props;
    return (
        <Dialog

            {...props}
            aria-labelledby="customized-dialog-title"
            disableBackdropClick
            open={open}
            onClose={onClose}
            aria-describedby="alert-dialog-description">
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                {title}
            </DialogTitle>
            <DialogContent>
                {dialogContent}
            </DialogContent>
            <DialogActions>
                {dialogAction}
            </DialogActions>
        </Dialog>
    );
}
MuiDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    dialogContent: PropTypes.node.isRequired,
    dialogAction: PropTypes.node.isRequired,
    open:PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

export default MuiDialog;
