import {BACKEND_URL} from "../../utils/Constants";
import {avrFetch, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import CustomSnackbar from "../common/snackbar/CustomSnackbar";
import React, {Component} from "react";
import SweetAlertConfirm from "../common/dialogs/SweetAlertConfirm";
import ValueLabel from "../../utils/ValueLabel";

export const LOAD_MAL_XID_DATA_URL = BACKEND_URL + '/api/fakturaitem/fakturaitemload';
const LOAD_COMP_DATA_URL = BACKEND_URL + '/api/faktura/compData?ft=';
const LOAD_DATA_URL = BACKEND_URL + '/api/faktura/filterData';
const LOAD_BY_ID_URL = BACKEND_URL + '/api/faktura/{id}';
const INSERT_URL = BACKEND_URL + '/api/faktura/insupd';
const DELETE_URL = BACKEND_URL + '/api/faktura/delete/{id}';
const GENERATE_FAKTURA_URL = BACKEND_URL + '/api/faktura/generatecode';

export default class AbstractFakutra extends Component {
    constructor(props) {
        super(props);
    }


    fakturaModuleObject = fakturaType => ({
        kassaItem: {},
        fakturaList: [],
        faktura: {
            id: 0,
            tarix: 0,
            fakturaNo: '',
            showNagdOdenis: 0,
            fakturaType: new ValueLabel(fakturaType, ''),
            sourceWarehouse: new ValueLabel(),
            fakturaItemList: [],
        },
        compData: {},
        errors: {},
        snackBar: {show: false, message: '', variant: 'info'},
        dialogConfirm: {open: false, data: {}, variant: 'warning'},
        processing: false,
        showList: true,
    });

    handleOnChange = event => {
        throw new Error('You have to implement the method handleOnChange!');
    };

    handleOnClick = event => {
        throw new Error('You have to implement the method handleOnClick!');
    };

    checkIsNull(valueData) {
        throw new Error('You have to implement the method checkIsNull!');
    }

    insert(valueData, processingCallback, errorCallback, successCallback) {
        this.postMethod(INSERT_URL, valueData, processingCallback, errorCallback, successCallback);
    }

    delete(id, processingCallback, errorCallback, successCallback) {
        processingCallback(true);
        avrFetch(DELETE_URL.replace("{id}", id), {method: "DELETE",})
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (response) => {
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

    new(processingCallback, errorCallback, successCallback) {
        this.getMethod(GENERATE_FAKTURA_URL, processingCallback, errorCallback, successCallback);
    }

    loadData(filterData, processingCallback, errorCallback, successCallback) {
        this.postMethod(LOAD_DATA_URL, filterData, processingCallback, errorCallback, successCallback);
    };

    loadDataByFakturaId(id, processingCallback, errorCallback, successCallback) {
        this.getMethod(LOAD_BY_ID_URL.replace("{id}", id.toString()), processingCallback, errorCallback, successCallback);
    }

    loadFormData(fakturaType, processingCallback, errorCallback, successCallback) {
        this.getMethod(LOAD_COMP_DATA_URL + fakturaType, processingCallback, errorCallback, successCallback);
    }

    loadItemData(body, processingCallback, errorCallback, successCallback) {
        this.postMethod(LOAD_MAL_XID_DATA_URL, body, processingCallback, errorCallback, successCallback);
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
        // const newRows = createDataTitle(item, this.handleOnClick);
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

    addConfirmDialog = (dialogConfirm, onDialogAction) => <SweetAlertConfirm
        show={dialogConfirm.open}
        variant={dialogConfirm.variant}
        title='Məlumatın silinməsi'
        onDialogAction={onDialogAction}
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        dialogContent={'Вы уверены, что хотите это удалить? ?'}
        successContent={'Məlumat müməffəqiyyətlə silindi'}
        unSuccessContent={'Произошла ошибка'}/>;

    dialogConfirmState = (dialogConfirm, open, data, variant) => Object.assign({}, dialogConfirm, {
        open: open,
        data: data,
        variant: variant
    });
}

export const crtErrTitle = (name, ind) => name + '_' + ind;
