import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import {
    columns,
    createData,
    createErrorObj,
    createFilterObj,
    DELETE_URL,
    Errors,
    FilterData,
    INSERT_URL,
    LOAD_BY_ID_URL,
    LOAD_DATA_URL,
    MODULE_NAME,
    ValueData
} from "./UserRegistrationHelper";
import connect from "react-redux/es/connect/connect";
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import WrappedVirtualizedTable from "../common/custom-virualized-table/MuiVirtualizedTable";
import CardContent from "@material-ui/core/CardContent/CardContent";
import UserRegistrationForm from "./UserRegistrationForm";
import {avrFetch, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import {ifNull, isEmpty} from "../../utils/Validator";
import SweetAlertConfirm from "../common/dialogs/SweetAlertConfirm";
import CustomSnackbar from "../common/snackbar/CustomSnackbar";

const styles = {
    cardIconTitle: {
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class UserRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            tableData: [],
            filterData: new FilterData(),
            formData: {
                // compData: new CompData(),
                valueData: new ValueData(),
                errors: new Errors(),
            },
            dialogAddEdit: {open: false},
            dialogConfirm: {open: false, data: {}, variant: 'warning'},
            snackBar: {show: false, message: '', variant: 'info'},
        };
    }

    componentDidMount() {
     //   this.props.setAppTitle(MODULE_NAME);
        // this.loadFormData();
        this.loadData();
    }

    render() {
        const rows = Object.assign([], this.state.tableData);
        console.log(rows);
        const {classes} = this.props;
        return (
            <Fragment>
                <Card style={{marginTop: "0px"}}>
                    <CardHeader color="primary"
                                title={MODULE_NAME}
                                action={
                                    <Button
                                        justIcon
                                        round
                                        color="primary"
                                        className={classes.marginRight}
                                        onClick={() => this.handleDialogAction2({
                                            clickFor: 'TABLE_CLICK',
                                            action: 'ADD_ROW',
                                            id: 0
                                        })}>
                                        <Add/>
                                    </Button>
                                }>

                        <h4 className={classes.cardIconTitle}>{MODULE_NAME}</h4>
                    </CardHeader>
                    <CardContent style={{height: 500, width: '100%', margin: 0}}>
                        <WrappedVirtualizedTable
                            rowCount={rows.length}
                            rowGetter={({index}) => rows[index]}
                            onRowClick={(event) => {
                                console.log(event.rowData)
                            }}
                            columns={columns}
                        />
                    </CardContent>
                </Card>
                <UserRegistrationForm
                    open={this.state.dialogAddEdit.open}
                    data={this.state.formData}
                    onChange={this.handleOnChange}
                    onClick={this.handleDialogAction2}
                />

                {this.addConfirmDialog()}
                {this.addSnackBar()}
            </Fragment>
        );
    }

    handleOnChange = event => {
        const {component, name, value} = event;
        let val = value;

        let obj = {[name]: val};


        if (name === 'country' || name === 'addressLine' || name === 'zipCode') {
            obj = {
                address: Object.assign({}, this.state.formData.valueData.address, {
                    [name]: val
                })
            };
        }


        this.setState(Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, {
                valueData: Object.assign({}, this.state.formData.valueData, obj)
            })
        }));
    };

    loadData = () => {
        const filterData = createFilterObj(this.state.filterData);
        avrFetch(LOAD_DATA_URL, {
            method: "POST",
            headers: new Headers({
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }),
            body: JSON.stringify(filterData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    console.log('value: ', value);
                    if (!isEmpty(value) && value.success === true) {
                        const rows = value.data.map(item => createData(item, this.handleDialogAction2));
                        this.setState(Object.assign({}, this.state, {
                            dataLoaded: true,
                            tableData: rows
                        }));
                    }
                }
            ).catch(reason => {
            this.showHideSnackbar(reason.message, 'error', true);
        });
    };
    // filter button-a click handle
    handleFilterButtonClick = () => {
        // this.loadData();
    };

    handleClearButtonClick = () => {
        const filterData = new FilterData();
        this.setState(Object.assign({}, this.state, {filterData: filterData}));
    };

    loadDataById(id) {
        avrFetch(LOAD_BY_ID_URL.replace("{id}", id.toString()))
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        this.setState(Object.assign({}, this.state, {
                            dataLoaded: true,
                            dialogAddEdit: this.dialogAddEditState(true),
                            formData: Object.assign({}, this.state.formData, {valueData: value.data})
                        }));
                    } else {
                        this.showHideSnackbar(value.message, 'error', true);
                    }
                }
            ).catch(err => {
            this.showHideSnackbar(err.message, 'error', true);
        });
    }


    handleDialogAction2 = event => {
        console.log('data: ', event);
        const {clickFor, action} = event;
        if (clickFor === 'ADD_EDIT_DIALOG') {
            if (action === 'AGREE') {
                this.insertUpdate();
            }
            else if (action === 'DISAGREE') {
                this.setState(Object.assign({}, this.state, {
                    dialogAddEdit: this.dialogAddEditState(false),
                }));
            }

        } else if (clickFor === 'TABLE_CLICK') {
            if (action === 'ADD_ROW') {
                const valueData = new ValueData();
                const errors = new Errors();

                this.setState(Object.assign({}, this.state, {
                    dialogAddEdit: this.dialogAddEditState(true),
                    formData: Object.assign({}, this.state.formData, {valueData, errors})
                }));
            } else if (action === 'EDIT_ROW') {
                this.showHideLoading(false);
                this.loadDataById(event.id);
            } else if (action === 'DELETE_ROW') {
                this.setState(Object.assign({}, this.state, {dialogConfirm: this.dialogConfirmState(true, event.id)}));
            }
        }

        else if (clickFor === 'DIALOG_CONFIRM') {
            if (action === 'yes') {
                this.delete(event.id);
            } else if (action === 'ok') {
                // this.delete();
                this.setState(Object.assign({}, this.state, {
                    dialogConfirm: this.dialogConfirmState(false, {}),
                }))
            }
            else {
                this.setState(Object.assign({}, this.state, {
                    dialogConfirm: this.dialogConfirmState(false, {}),
                }))
            }
        }

        // else if (clickFor === 'CONFIRM_DIALOG'){
        //     if (action === 'CONFIRM_DELETE') {
        //         if (event.yesno === 'ok'){
        //             this.delete();
        //         } else if (event.yesno === 'cancel'){
        //             this.setState(Object.assign({}, this.state, {
        //                 dialogConfirm: this.dialogConfirmState(false, -1),
        //             }))
        //         }
        //     }
        // }
        console.log(action);
    };

    // confirmation dialogu rendere elave eden function

    // addConfirmDialog = () => <ConfirmDialog
    //     dialogProps={{
    //         disableBackdropClick: true,
    //         disableEscapeKeyDown: true,
    //         maxWidth: 'xs'
    //     }}
    //     open={this.state.dialogConfirm.open}
    //     contentText={"Вы уверены, что хотите это удалить? ?"}
    //     title={'SİL'}
    //     onClick={yesno => this.handleDialogAction2({clickFor: 'CONFIRM_DIALOG', action: 'CONFIRM_DELETE', yesno: yesno})}/>;


    // snackbar-i (notification) rendere elave eden function
    addSnackBar = () => {
        const {show, message, variant} = this.state.snackBar;
        return (<CustomSnackbar message={message} variant={variant} open={show} handleOnClose={()=>this.showHideSnackbar()}/>);

    };

    insertUpdate() {
        const valueData = this.state.formData.valueData;
        if (this.checkIsNull(valueData))
            return;

        this.showHideLoading(false);
        avrFetch(INSERT_URL, {
            method: "POST",
            body: JSON.stringify(valueData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        console.log('insertUpdate: ', value);
                        const rows = this.updateTableRows(valueData.id, value.data);
                        // console.log('rows: ', rows);
                        this.setState(Object.assign({}, this.state, {
                            tableData: rows,
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: ifNull(valueData, 0).id === 0 ? 'Операция успешно завершена' : 'Информация успешно изменена',
                                variant: 'success'
                            }),
                            dialogAddEdit: this.dialogAddEditState(false), //Object.assign({}, this.state.dialogAddEdit, {open: false}),
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
                            dataLoaded: true,
                        }));
                    }
                }
            ).catch(err => {
            this.showHideSnackbar(err.message, 'error', true);
        });
    }

    delete(id) {
        // const id = this.state.dialogConfirm.data.id;
        this.showHideLoading(false);
        avrFetch(DELETE_URL.replace("{id}", id), {method: "DELETE",})
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        console.log('value: ', value);
                        const rows = this.state.tableData.slice().filter(item => item.id !== id);
                        this.setState(Object.assign({}, this.state, {
                            tableData: rows,
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: 'Информация успешно удалена',
                                variant: 'success'
                            }),
                            // dialogConfirm: this.dialogConfirmState(false, -1),
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
                            // dialogConfirm: this.dialogConfirmState(false, -1),
                            dialogConfirm: this.dialogConfirmState(true, {}, 'danger'),
                            dataLoaded: true,
                        }));
                    }
                }
            ).catch(err => this.showHideSnackbar(err.message, 'error', true));
    }


    // update zamani update edilen rowun melumatini deyisdirir
    updateTableRows = (id, item) => {
        const newRows = createData(item, this.handleDialogAction2);
        const rows = this.state.tableData.slice();
        const insertIndex = id === 0 ? 0 : rows.findIndex(item => item.id === id);
        const removeCount = id === 0 ? 0 : 1;
        rows.splice(insertIndex, removeCount, newRows); // birinci elem-> insert edilen index, ikinci elem, silinen index
        return rows;
    };


    showHideSnackbar = (message, variant, show) => {
        if (show === undefined)
            show = false;
        if (variant === undefined)
            variant = this.state.snackBar.variant;

        if (message === undefined)
            message = this.state.snackBar.message;

        this.setState(
            Object.assign({}, this.state, {
                snackBar: Object.assign({}, this.state.snackBar, {show, message, variant})
            })
        );
    };

    showHideLoading(show) {
        //this.setState(Object.assign({}, this.state, {dataLoaded: show}));
    }


    // dialogConfirmState = (open, id) => Object.assign({}, this.state.dialogConfirm, {open, id});

    dialogConfirmState = (open, data, variant) => Object.assign({}, this.state.dialogConfirm, {
        open: open,
        data: data,
        variant: variant
    });

    dialogAddEditState = open => Object.assign({}, this.state.dialogAddEdit, {open: open});

    checkIsNull(valueData) {
        const err = createErrorObj(valueData);
        if (!err)
            return false;

        this.setState(Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, {
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

    addConfirmDialog = () => <SweetAlertConfirm
        show={this.state.dialogConfirm.open}
        variant={this.state.dialogConfirm.variant}
        title='Sil'
        // onDialogAction={this.handleDialogAction2('confirm')}
        onDialogAction={yesno => this.handleDialogAction2({clickFor: 'DIALOG_CONFIRM', action: yesno, id: this.state.dialogConfirm.data})}
        confirmBtnText="Да"
        cancelBtnText="Отмена"
        dialogContent={'Вы уверены, что хотите это удалить? ?'}
        successContent={'Информация успешно удалена'}
        unSuccessContent={'Произошла ошибка'}/>;

}

export default withStyles(styles)(connect(null, null)(UserRegistration));
