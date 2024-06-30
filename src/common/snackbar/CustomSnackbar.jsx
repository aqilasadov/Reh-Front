import React from "react";
import PropTypes from "prop-types";
import MySnackbarContentWrapper from "./MySnackbarContentWrapper";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
function CustomSnackbar(props) {
    const {message, open, variant, handleOnClose} = props;
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={()=>handleOnClose()}
        >
            <MySnackbarContentWrapper
                onClose={()=>handleOnClose()}
                variant={variant}
                message={message}
            />
        </Snackbar>
    );
}
CustomSnackbar.propTypes = {
    message: PropTypes.node,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
    open: PropTypes.bool.isRequired,
    handleOnClose: PropTypes.func,
};
export default CustomSnackbar;
