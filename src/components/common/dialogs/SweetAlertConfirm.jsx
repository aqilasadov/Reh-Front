import SweetAlert from "react-bootstrap-sweetalert";
import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import sweetAlertStyle from "../../../assets/jss/views/sweetAlertStyle";
import PropTypes from 'prop-types';
function SweetAlertConfirm(props) {
    const {variant, title, classes, confirmBtnText, cancelBtnText, dialogContent, successContent, unSuccessContent, show, onDialogAction} = props;
    const isSuccess = variant === 'success';
    const isDanger = variant === 'danger';
    const isWarning = variant === 'warning';
    if (!show)
        return(<Fragment/>)
    return(
        <SweetAlert
            success={isSuccess}
            danger={isDanger}
            warning={isWarning}
            style={{ display: "block", marginTop: "-100px" }}
            title={title}
            onConfirm={() => onDialogAction(isSuccess || isDanger ? 'ok' : 'yes')}
            onCancel={() => onDialogAction('cancel')}
            confirmBtnCssClass={
                classes.button + " " + classes.success
            }
            cancelBtnCssClass={
                classes.button + " " + classes.danger
            }
            confirmBtnText= {isSuccess ? 'Ok' : confirmBtnText}
            cancelBtnText= {cancelBtnText}
            showCancel={isWarning}

        >
            {isSuccess ? successContent : (variant === 'danger') ? unSuccessContent : dialogContent}
        </SweetAlert>
    );
}
SweetAlertConfirm.propTypes = {
    variant: PropTypes.oneOf(['success', 'warning', 'danger']),
    title: PropTypes.string,
    confirmBtnText: PropTypes.string,
    cancelBtnText: PropTypes.string,
    dialogContent: PropTypes.string,
    successContent: PropTypes.string,
    unSuccessContent: PropTypes.string,
    onDialogAction: PropTypes.func,
    show: PropTypes.bool,
};
SweetAlertConfirm.defaultProps = {
    variant: 'warning',
    title: '',
    confirmBtnText: '',
    cancelBtnText: '',
    dialogContent: '',
    successContent: '',
    unSuccessContent: '',
    show: false,
    onDialogAction: () => {},

};

export default withStyles(sweetAlertStyle)(SweetAlertConfirm);
