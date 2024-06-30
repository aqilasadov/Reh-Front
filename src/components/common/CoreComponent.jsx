import * as React from "react";
import {avrFetch, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import ConfirmDialog from "./dialogs/ConfirmDialog";
import CustomSnackbar from "./snackbar/CustomSnackbar";

export default class CoreComponent extends React.Component {
    constructor(props){
        super(props);
    }
    deleteMethod(url, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(url, {method: "DELETE",})
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (response) => {
                    console.group("DELETE_METHOD");
                    console.log('URL: ', url);
                    console.log('Response: ', response);
                    console.groupEnd();

                    if (response && response.success) {
                        successCallback(response.data);
                    }
                    else {
                        errorCallback(response.message);
                    }
                }
            )
            .catch(err => errorCallback(err.message))
            .finally(() => processingCallback(false));
    }
    getMethod(url, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(url)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                response => {
                    console.group("GET_METHOD");
                    console.log('URL: ', url);
                    console.log('Response: ', response);
                    console.groupEnd();

                    if (response && response.success) {
                        successCallback(response.data);
                    } else {
                        errorCallback(response.message);
                    }
                }
            ).catch(err => errorCallback(err.message))
            .finally(() => processingCallback(false));
    }
    postMethod(url, body, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(response => {
                    console.group("POST_METHOD");
                    console.log('URL: ', url);
                    console.log('Response: ', response);
                    console.groupEnd();

                    if (response && response.success) {
                        successCallback(response.data);
                    } else {
                        errorCallback(response.message);
                    }
                }
            ).catch(err => errorCallback(err.message))
            .finally(() => processingCallback(false));
    }

    updateTableRows = (id, newRows, updateRows) => {
        const rows = updateRows.slice();
        const insertIndex = id === 0 ? 0 : rows.findIndex(item => item.id === id);
        const removeCount = id === 0 ? 0 : 1;
        rows.splice(insertIndex, removeCount, newRows); // birinci elem-> insert edilen index, ikinci elem, silinen index
        return rows;
    };


    addSnackBar = (snackBar, handleOnClose) => {
        const {show, message, variant} = snackBar;
        return (<CustomSnackbar message={message} variant={variant} open={show} handleOnClose={handleOnClose}/>);
    };

    showConfirmDialog = (dialog, onClick) => <ConfirmDialog
        dialogProps={{
            disableBackdropClick: true,
            disableEscapeKeyDown: true,
            maxWidth: 'xs'
        }}
        open={dialog.open}
        contentText={dialog.contentText}
        title={dialog.title}
        onClick={onClick}/>;
}

