import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

function ConfirmDialog(props) {
    return (
        <Dialog
            {...props.dialogProps}
            open={props.open}
            onClose={() => props.onClick('cancel')}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent {...props.dialogContentProps}>
                <DialogContentText {...props.dialogContentTextProps}
                                   id="alert-dialog-description"> {props.contentText} </DialogContentText>
            </DialogContent>
            <DialogActions {...props.dialogActionsProps} >
                <Button onClick={() => props.onClick('cancel')} color="primary"> {props.cancelButtonTitle} </Button>
                <Button onClick={() => props.onClick('ok')} color="primary" autoFocus> {props.okButtonTitle} </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmDialog.propTypes = {
    open: PropTypes.bool,
    contentText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,

    okButtonTitle: PropTypes.string,
    cancelButtonTitle: PropTypes.string,
    dialogProps: PropTypes.object,
    dialogContentProps: PropTypes.object,
    dialogContentTextProps: PropTypes.object,
    dialogActionsProps: PropTypes.object,
};
ConfirmDialog.defaultProps = {
    open: false,
    okButtonTitle: 'Yes',
    cancelButtonTitle: 'Cancel',
    dialogProps: {},
    dialogContentProps: {},
    dialogContentTextProps: {},
    dialogActionsProps: {},
};

export default ConfirmDialog;

