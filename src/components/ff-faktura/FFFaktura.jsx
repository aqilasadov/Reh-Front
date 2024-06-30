import * as React from "react";
import {Fragment} from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Undo from "@material-ui/icons/Undo";
import Add from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/core";
import FFFakturaTitle from "./FFFakturaTitle";
import FFFakturaItems from "./FFFakturaItems";
import ValueLabel from "../../utils/ValueLabel";
import {avrFetch, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import {ifNull, isEmpty} from "../../utils/Validator";
import {BACKEND_URL} from "../../utils/Constants";
import {createData, createErrorObj, createFFName, createItemsData} from "./FFFakturaHelper";
import CustomSnackbar from "../common/snackbar/CustomSnackbar";
import Loading from "../common/Loading";
import SweetAlertConfirm from "../common/dialogs/SweetAlertConfirm";
import {LOAD_COMP_DATA_URL} from "../faktura-v2/Fakturav2Helper";

class FFFaktura extends React.Component {
    constructor(props) {
        super(props);
        this.fakturaId = props.fakturaId;

        this.state = {
            ffTitle: {
                rows: [],
                valueData: {},
                compData: {
                    ffTypeList: [
                        new ValueLabel(1, 'Miqdar'),
                        new ValueLabel(2, 'Məbləğ'),
                    ],
                },
                errors: {},
                open: false,
            },
            ffItems: {
                rows: [],
            },
            ffInputValues: {},
            dataLoaded: true,
            snackBar: {show: false, message: '', variant: 'info'},
            dialogConfirm: {open: false, data: {}, variant: 'warning'},
            test: 12,
        };
    }

    componentDidMount() {
        // this.loadFormData();
        this.loadDataByFakturaId();
    }

    render() {
        const {classes, data} = this.props;
        const {ffTitle, ffItems} = this.state;
        return (
            <Fragment>
                {!this.state.dataLoaded && <Loading/>}
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <TextField
                            id="fakturaNo"
                            label="Faktura No"
                            defaultValue={data.fakturaNo}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            variant="outlined"/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Satıcı"
                            defaultValue={data.client}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            variant="outlined"/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            onClick={() => this.handleOnClick({
                                clickFor: 'FF_TITLE_TABLE_CLICK',
                                action: 'ADD_ROW'
                            })}
                            variant="contained"
                            color="secondary"
                            className={classes.button}>
                            Сохранить
                            <Add className={classes.rightIcon}/>
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            onClick={() => this.handleOnClick({
                                clickFor: 'FF_TITLE_TABLE_CLICK',
                                action: 'CLICK_UNDO'
                            })}
                            variant="contained"
                            color="secondary"
                            className={classes.button}>
                            Geri Qayıt
                            <Undo className={classes.rightIcon}/>
                        </Button>
                    </Grid>

                    <Grid item xs={12} alignItems={"stretch"}>
                        <FFFakturaTitle data={ffTitle} onClick={this.handleOnClick} onChange={this.handleOnChange}
                                        open={ffTitle.open}/>
                    </Grid>

                    <Grid item xs={12} alignItems={"stretch"}>
                        <FFFakturaItems data={ffItems} valueData={this.state.ffInputValues}

                                        onChange={obj => this.handleOnChange(obj)}
                                        onClick={obj => this.handleOnClick(obj)}/>
                    </Grid>
                </Grid>
                {this.addSnackBar()}

            </Fragment>
        );
    }

    handleOnClick = obj => {
        console.log(obj);
        const {clickFor, action, id} = obj;
        if (clickFor === 'MUI_DIALOG_CLICK') {
            if (action === 'CLICK_CLOSE_BUTTON') {
                this.setState(Object.assign({}, this.state, {
                    ffTitle: Object.assign({}, this.state.ffTitle, {
                        open: false,
                    })
                }))
            } else if (action === 'CLICK_SAVE_BUTTON') {
                this.insertUpdate();
            }
        }
        else if (clickFor === 'CONFIRM_DIALOG_CLICK') {
            if (action === 'yes') {
                this.delete()
            } else {
                this.setState(Object.assign({}, this.state, {
                    dialogConfirm: this.dialogConfirmState(false, {}),
                }))
            }
        } else if (clickFor === 'FF_TITLE_TABLE_CLICK') {
            if (action === 'ADD_ROW') {
                this.setState(Object.assign({}, this.state, {
                    ffTitle: Object.assign({}, this.state.ffTitle, {
                        open: true,
                        valueData: {
                            pid: new ValueLabel(this.props.fakturaId),
                        },
                    })
                }))
            } else if (action === 'EDIT_ROW') {
                this.loadDataById(id);
            } else if (action === 'DELETE_ROW') {
                this.setState(Object.assign({}, this.state, {
                    dialogConfirm: this.dialogConfirmState(true, {id: id})
                }));

            } else if (action === 'CLICK_UNDO') {
                this.props.history.goBack();
            }
        } else if (clickFor === 'FF_LINE_CLICK') {
            if (action === 'CLICK_SAVE') {
                const keys = Object.keys(this.state.ffInputValues);
                const ffitemlist =
                    (keys ? keys : []).map(key => {
                        return this.state.ffInputValues[key]
                    });
                console.log('ffValuesffValues', ffitemlist);
                this.saveFfValues(ffitemlist);
            }
        }

    };
    handleOnChange = obj => {
        const {component, name, value, type} = obj;
        console.log('HandleOnChange: ', name, value);
        if (type === 'FF_VALUE') {
            console.log('handleOnChange: ', name, value);
            this.setState(Object.assign({}, this.state, {
                ffInputValues: Object.assign({}, this.state.ffInputValues, {[name]: value})
            }));
        } else {
            this.setState(Object.assign({}, this.state, {
                ffTitle: Object.assign({}, this.state.ffTitle, {
                    valueData: Object.assign({}, this.state.ffTitle.valueData, {
                        [name]: value
                    })
                })
            }));
        }

    };

    loadFormData = () => {
        avrFetch(LOAD_COMP_DATA_URL)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    console.log('value: ', value);
                    if (!isEmpty(value) && value.success === true) {
                        this.setState(Object.assign({}, this.state, {
                            dataLoaded: true,
                            ffTitle: Object.assign({}, this.state.ffTitle, {compData: value.data})
                        }));
                    } else {
                        this.showHideSnackbar(value.message, 'info', true);
                    }
                }
            ).catch(reason => {
            this.showHideSnackbar(reason.message, 'error', true);
        });
    };

    loadDataByFakturaId = () => {
        const fakturaId = this.props.fakturaId;
        avrFetch(BACKEND_URL + '/api/fffaktura/fakturawithitems/' + fakturaId)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        console.log('loadDataByFakturaId: ', value);
                        const rows = value.data.ffFakturaList.map(item => createData(item, this.handleOnClick));


                        const {ffInputValues, itemRows} = this.generateFFFakturaListItem(value.data.ffFakturaItemList)
                        this.setState(Object.assign({}, this.state, {
                            dataLoaded: true,
                            ffTitle: Object.assign({}, this.state.ffTitle, {rows}),
                            ffItems: Object.assign({}, this.state.ffItems, {rows: itemRows}),
                            ffInputValues: ffInputValues
                        }));
                    }
                }
            ).catch(reason => {
            this.showHideSnackbar(reason.message, 'error', true);
        });
    };

    generateFFFakturaListItem(rows) {
        rows = rows ? rows : [];
        const ffInputValues = {};
        rows.forEach(
            (item) => {
                item.ffValues.forEach((itemVal) => {
                    const name = createFFName(itemVal.label, itemVal.fakturaItemId);
                    ffInputValues[name] = {value: itemVal.value, label: itemVal.fakturaItemId};
                });
            }
        );
        const itemRows = rows.map(item => createItemsData(item, this.handleOnClick))
        return {ffInputValues, itemRows}
    }

    insertUpdate() {

        console.log('insertupdate');
        const valueData = this.state.ffTitle.valueData;

        if (this.checkIsNull(valueData))
            return;

        this.showHideLoading(false);

        avrFetch(BACKEND_URL + "/api/fffaktura/insupd", {
            method: "POST",
            body: JSON.stringify(valueData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (value && value.success) {
                        console.log('insertUpdate: ', value);
                        const rows = this.updateTableRows(valueData.id ? valueData.id : 0, value.data);
                        // itemlarin update edilmesi ucun
                        const {ffInputValues, itemRows} = this.generateFFFakturaListItem(value.data.fakturaItemList)
                        this.setState(Object.assign({}, this.state, {
                            ffItems: Object.assign({}, this.state.ffItems, {rows: itemRows}),
                            ffInputValues: ffInputValues,

                            ffTitle: Object.assign({}, this.state.ffTitle, {
                                rows: rows,
                                open: false,
                            }),
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: ifNull(valueData.id, 0) === 0 ? 'Операция успешно завершена' : 'Информация успешно изменена',
                                variant: 'success'
                            }),
                            dataLoaded: true,
                        }));
                    }
                    else {
                        alert('error')
                        this.setState(Object.assign({}, this.state, {
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: value.message,
                                variant: 'error'
                            }),
                            dataLoaded: true,
                        }));
                    }
                }
            ).catch(err => {
            this.showHideSnackbar(err.message, 'error', true);
        });
    }

    saveFfValues(body) {
        avrFetch(BACKEND_URL + "/api/fffaktura/saveitems", {
            method: "POST",
            body: JSON.stringify(body),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (value && value.success) {
                        console.log('insertUpdate::::::::::::::::::::: ', value);
                        this.showHideSnackbar('Информация успешно изменена', 'success', true);
                    } else {
                        this.showHideSnackbar(value.message, 'error', true);
                    }
                }
            ).catch(err => {
            this.showHideSnackbar(err.message, 'error', true);
        });
    }

    delete() {
        const id = this.state.dialogConfirm.data.id;
        this.showHideLoading(false);
        avrFetch(BACKEND_URL + "/api/faktura/ff/delete" + id, {method: "DELETE",})
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        const rows = this.state.ffTitle.rows.slice().filter(item => item.id !== id);
                        this.setState(Object.assign({}, this.state, {
                            ffTitle: Object.assign({}, this.state.ffTitle, {rows: rows,}),
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: 'Информация успешно удалена',
                                variant: 'success'
                            }),
                            dialogConfirm: this.dialogConfirmState(true, {}, 'success'),
                            dataLoaded: true,
                        }));
                    }
                    else {
                        this.setState(Object.assign({}, this.state, {
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: value.message,
                                variant: 'error'
                            }),
                            // dialogConfirm: Object.assign({}, this.state.dialogConfirm, {open: false}),
                            dialogConfirm: this.dialogConfirmState(true, {}, 'danger'),
                            dataLoaded: true,
                        }));
                    }
                }
            ).catch(err => this.showHideSnackbar(err.message, 'error', true));
    }

    checkIsNull(valueData) {
        const err = createErrorObj(valueData);

        if (!err)
            return false;

        this.setState(Object.assign({}, this.state, {
            ffTitle: Object.assign({}, this.state.ffTitle, {
                errors: err
            }),

            snackBar: Object.assign({}, this.state.snackBar, {
                show: true,
                message: 'Пожалуйста, заполните обязательные поля',
                variant: 'warning',
            }),
        }));

        return true;
    }

    updateTableRows = (id, item) => {
        // console.log('insertUpdate: id - item ', id, item);
        const newRows = createData(item, this.handleOnClick);
        // console.log('insertUpdate: newRows ', newRows);
        const rows = this.state.ffTitle.rows.slice();
        // console.log('insertUpdate: rows ', rows);
        const insertIndex = id === 0 ? 0 : rows.findIndex(item => item.id === id);
        const removeCount = id === 0 ? 0 : 1;
        rows.splice(insertIndex, removeCount, newRows); // birinci elem-> insert edilen index, ikinci elem, silinen index
        return rows;
    };
    showHideLoading = isLoaded => this.setState(Object.assign({}, this.state, {dataLoaded: isLoaded}));
    showHideSnackbar = (message, variant, show) => {
        if (show === undefined)
            show = false;
        if (variant === undefined)
            variant = this.state.snackBar.variant;

        if (message === undefined)
            message = this.state.snackBar.message;

        this.setState(
            Object.assign({}, this.state, {
                snackBar: Object.assign({}, this.state.snackBar, {show, message, variant}),
                dataLoaded: true,
            })
        );
    };
    addSnackBar = () => {
        const {show, message, variant} = this.state.snackBar;
        return (<CustomSnackbar message={message} variant={variant} open={show}
                                handleOnClose={() => this.showHideSnackbar()}/>);

    };
    addConfirmDialog = () => <SweetAlertConfirm
        show={this.state.dialogConfirm.open}
        variant={this.state.dialogConfirm.variant}
        title='Məlumatın silinməsi'
        onDialogAction={data => this.handleOnClick(
            {
                clickFor: 'CONFIRM_DIALOG_CLICK',
                action: data
            })}
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        dialogContent={'Вы уверены, что хотите это удалить? ?'}
        successContent={'Məlumat müməffəqiyyətlə silindi'}
        unSuccessContent={'Произошла ошибка'}/>;
    dialogConfirmState = (open, data, variant) => Object.assign({}, this.state.dialogConfirm, {
        open: open,
        data: data,
        variant: variant
    });

    loadDataById(id) {
        avrFetch(BACKEND_URL + '/api/fffaktura/' + id)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        console.log('loadDataById:', value);
                        this.setState(Object.assign({}, this.state, {
                            dataLoaded: true,
                            ffTitle: Object.assign({}, this.state.ffTitle, {
                                valueData: value.data,
                                show: true,
                            })
                        }));
                    } else {
                        this.showHideSnackbar(value.message, 'error', true);
                    }
                }
            ).catch(err => {
            this.showHideSnackbar(err.message, 'error', true);
        });
    }
}

FFFaktura.propTypes = {
    fakturaId: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
};

const styles = theme => ({
    button: {
        marginTop: 25,
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
});
export default withStyles(styles)(FFFaktura);
