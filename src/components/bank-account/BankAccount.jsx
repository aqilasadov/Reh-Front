import React, {Fragment} from "react";
import BankAccountFilter from "./BankAccountFilter";
import {withStyles} from "@material-ui/core";
import {columns, CompData, createData, Errors, FilterData, ValueData} from "./BankAccountHelper";
import connect from "react-redux/es/connect/connect";
import {avrFetch, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import {BACKEND_URL} from "../../utils/Constants";
import {ifNull, isEmpty} from "../../utils/Validator";
import Snackbar from "../../components-tim/Snackbar/Snackbar";
import SweetAlertConfirm from "../common/dialogs/SweetAlertConfirm";
import Card from "../../components-tim/Card/Card";
import CardIcon from "../../components-tim/Card/CardIcon";
import CardBody from "../../components-tim/Card/CardBody";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";

import Assignment from "@material-ui/icons/Assignment";
import {Add, AddAlert} from "@material-ui/icons";

import ReactTable from "react-table";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Button from "../../components-tim/CustomButtons/Button"
import BankAccountForm from "./BankAccountForm";
import CoreComponent from "../common/CoreComponent";
import Loading from "../common/Loading";

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class BankAccount extends CoreComponent {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            tableData: [],
            filterData: new FilterData(),
            formData: {
                compData: new CompData(),
                valueData: new ValueData(),
                errors: new Errors(),
            },
            dialogAddEdit: {open: false},
            dialogConfirm: {open: false, data: {}, variant: 'warning'},
            snackBar: {show: false, message: '', variant: 'info'},
            personSelector: {isOpen: false,},
        };
    }

    componentDidMount() {
        this.loadFormData();
        this.loadData();
    }


    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                {this.state.processing && <Loading/>}
                <BankAccountFilter data={this.state.filterData} compData={this.state.formData.compData}
                              onChange={this.handleOnChangeFilterData}
                              onFilterButtonClick={this.handleFilterButtonClick}
                              onFilterClearButtonClick={this.handleClearButtonClick}
                />

                <Card style={{marginTop: "0px"}}>
                    <CardHeader color="primary"
                                title="Bank hesabları"
                                action={
                                    <Button
                                        justIcon
                                        round
                                        color="primary"
                                        className={classes.marginRight}
                                        onClick={() => this.handleTableAction(0, 'add')}
                                    >
                                        <Add/>
                                    </Button>
                                }>
                        <CardIcon color="primary">
                            <Assignment/>
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Bank hesabları</h4>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            rowsText={'Sətir'}
                            ofText={'dən'}
                            pageText={'Səhifə'}
                            previousText={'Əvvəlki'}
                            nextText={'Növbəti'}
                            noDataText={'Məlumat yoxdur'}
                            onFetchData={(s, i) => console.log('onFetchData', s)}
                            data={this.state.tableData}
                            filterable
                            columns={columns}
                            defaultPageSize={10}
                            showPaginationBottom={true}
                            className="-striped -highlight"
                            style={{
                                height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                        />
                    </CardBody>
                </Card>
                <BankAccountForm
                    open={this.state.dialogAddEdit.open}
                    dialogAction={this.handleDialogAction('addedit')}
                    data={this.state.formData}
                    onChange={this.handleOnChange}/>
                {this.addConfirmDialog()}
                {this.addSnackBar()}
            </Fragment>
        );
    }

    /*



                    <RegularButton onClick={() =>
                        this.setState(Object.assign({}, this.state, {
                            dialogConfirm: this.dialogConfirmState(true, {}, 'warning')
                        }))
                    }> Click me</RegularButton>
     */

    handleOnChangeFilterData = name => event => {
        let val = (name === 'cardType' || name === 'currency') ? event : event.target.value;

        this.setState(Object.assign({}, this.state, {
            filterData: Object.assign({}, this.state.filterData, {[name]: val})
        }));
    };

    handleOnChange = name => event => {
        console.log(name, event);

        let val = null;

        if (name === 'bankBranch')
            val = event;
        else if (name === 'cardType' || name === 'currency')
            val = event.target;
        else
            val = event.target.value;

        if (name === 'isActive')
            val = event.target.checked ? 1 : 0;

        this.setState(Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, {
                valueData: Object.assign({}, this.state.formData.valueData, {[name]: val})
            })
        }));
    };


    // formdaki datalari (combo box ve s. datalari doldurur)
    loadFormData = () => {
        this.getMethod(BACKEND_URL + '/api/bank/compData', this.processing, this.error, data => {
            this.setState(Object.assign({}, this.state, {
                formData: Object.assign({}, this.state.formData, {compData: data})
            }));
        });
        // avrFetch(BACKEND_URL + '/api/bank/compData')
        //     .then(validateResponse)
        //     .then(readResponseAsJSON)
        //     .then(
        //         (value) => {
        //             console.log('value: ', value);
        //             if (!isEmpty(value) && value.success === true) {
        //                 this.setState(Object.assign({}, this.state, {
        //                     dataLoaded: true,
        //                     formData: Object.assign({}, this.state.formData, {compData: value.data})
        //                 }));
        //             } else {
        //                 this.showHideSnackbar(value.message, 'info', true);
        //             }
        //         }
        //     ).catch(reason => {
        //     this.showHideSnackbar(reason.message, 'error', true);
        // });
    };

    loadData = () => {
        const filterData = {
            name: this.state.filterData.name,
            code: this.state.filterData.code,
            accountNo: this.state.filterData.accountNo,
        };

        this.postMethod(BACKEND_URL + '/api/bank/filterData', filterData, this.processing, this.error, data => {
            const rows = data.map(
                item => createData
                (
                    item.id,
                    item.name,
                    item.code,
                    item.accountNo,
                    item.cardType,
                    item.currency,
                    item.bankBranch,
                    item.isActive,
                    this.handleTableAction
                )
            );
            this.setState(Object.assign({}, this.state, {
                tableData: rows
            }));
        });
        // avrFetch(BACKEND_URL + '/api/bank/filterData', {
        //     method: "POST",
        //     body: JSON.stringify(filterData),
        // })
        //     .then(validateResponse)
        //     .then(readResponseAsJSON)
        //     .then(
        //         (value) => {
        //             console.log('value: ', value);
        //             if (!isEmpty(value) && value.success === true) {
        //                 const rows = value.data.map(
        //                     item => createData
        //                     (
        //                         item.id,
        //                         item.name,
        //                         item.code,
        //                         item.accountNo,
        //                         item.cardType,
        //                         item.currency,
        //                         item.bankBranch,
        //                         item.isActive,
        //                         this.handleTableAction
        //                     )
        //                 );
        //                 this.setState(Object.assign({}, this.state, {
        //                     tableData: rows
        //                 }));
        //             }
        //         }
        //     ).catch(reason => {
        //     this.showHideSnackbar(reason.message, 'error', true);
        // });
    };

    // filter button-a click handle
    handleFilterButtonClick = () => {
         this.loadData();
    };

    handleClearButtonClick = () => {
        const filterData = new FilterData();
        this.setState(Object.assign({}, this.state, {filterData: filterData}));
    };


    loadDataById(id) {
        this.getMethod(BACKEND_URL + '/api/bank/' + id, this.processing, this.error, data => {
            this.setState(Object.assign({}, this.state, {
                dialogAddEdit: this.dialogAddEditState(true),
                formData: Object.assign({}, this.state.formData, {valueData: data})
            }));
        });
        // avrFetch(BACKEND_URL + '/api/bank/' + id)
        //     .then(validateResponse)
        //     .then(readResponseAsJSON)
        //     .then(
        //         (value) => {
        //             if (!isEmpty(value) && value.success === true) {
        //                 console.log('loadDataById:', value);
        //                 this.setState(Object.assign({}, this.state, {
        //                     dataLoaded: true,
        //                     dialogAddEdit: this.dialogAddEditState(true),
        //                     formData: Object.assign({}, this.state.formData, {valueData: value.data})
        //                 }));
        //             } else {
        //                 this.showHideSnackbar(value.message, 'error', true);
        //             }
        //         }
        //     ).catch(err => {
        //     this.showHideSnackbar(err.message, 'error', true);
        // });
    }

    // Dialoglar uzerindeki actionlarin handle oldugu  function
    handleDialogAction = type => action => {
        console.log(type, action);
        if (type === 'addedit') {
            if (action === 'agree')
                this.insertUpdate();
            else
                this.setState(Object.assign({}, this.state, {
                    dialogAddEdit: this.dialogAddEditState(false),
                }));

        } else if (type === 'confirm') {
            if (action === 'yes') {
                this.delete();
            } else if (action === 'ok') {
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
    };

    // React-Table uzerindeki button-larin handle oldugu function
    handleTableAction = (id, action) => {
        console.log(id, action);
        if (action === 'add') {
            this.getMethod(BACKEND_URL + '/api/bank/generatecode', this.processing, this.error, data => {
                const errors = new Errors();
                const valueData = new ValueData();
                valueData.code = data;

                this.setState(Object.assign({}, this.state, {
                    dialogAddEdit: this.dialogAddEditState(true), //Object.assign({}, this.state.dialogAddEdit, {open: true}),
                    formData: Object.assign({}, this.state.formData, {valueData, errors})
                }));
            });
        } else if (action === 'edit') {
            this.loadDataById(id);
        } else if (action === 'delete') {
            this.setState(Object.assign({}, this.state, {dialogConfirm: this.dialogConfirmState(true, {id})}));
        }
    };

    // confirmation dialogu rendere elave eden function
    addConfirmDialog = () => <SweetAlertConfirm
        show={this.state.dialogConfirm.open}
        variant={this.state.dialogConfirm.variant}
        title='Sil'
        onDialogAction={this.handleDialogAction('confirm')}
        confirmBtnText="Да"
        cancelBtnText="Отмена"
        dialogContent={'Вы уверены, что хотите это удалить? ?'}
        successContent={'Информация успешно удалена'}
        unSuccessContent={'Произошла ошибка'}/>;

    // snackbar-i (notification) rendere elave eden function
    addSnackBar = () => {
        const {show, message, variant} = this.state.snackBar;
        return (
            <Snackbar
                place="tc"
                color={variant}
                icon={AddAlert}
                message={message}
                open={show}
                closeNotification={
                    () =>
                        this.setState(
                            Object.assign({}, this.state, {
                                snackBar: Object.assign({}, this.state.snackBar, {show: false})
                            })
                        )
                }
                close
            />
        );

    };

    insertUpdate() {
        const valueData = this.state.formData.valueData;
        if (this.checkIsNull(valueData))
            return;

        this.postMethod(BACKEND_URL + '/api/bank/insupd', valueData, this.processing, this.error, data => {
            const rows = this.updateTableRows(valueData.id, data);
            this.setState(Object.assign({}, this.state, {
                tableData: rows,
                snackBar: Object.assign({}, this.state.snackBar, {
                    show: true,
                    message: ifNull(valueData, 0).id === 0 ? 'Операция успешно завершена' : 'Информация успешно изменена',
                    variant: 'success'
                }),
                dialogAddEdit: this.dialogAddEditState(false), //Object.assign({}, this.state.dialogAddEdit, {open: false}),
            }));
        });

        // this.showHideLoading(false);
        // avrFetch(BACKEND_URL + '/api/bank/insupd', {
        //     method: "POST",
        //     body: JSON.stringify(valueData),
        // })
        //     .then(validateResponse)
        //     .then(readResponseAsJSON)
        //     .then(
        //         (value) => {
        //             if (!isEmpty(value) && value.success === true) {
        //                 console.log('insertUpdate: ', value);
        //                 const rows = this.updateTableRows(valueData.id, value.data);
        //                 this.setState(Object.assign({}, this.state, {
        //                     tableData: rows,
        //                     snackBar: Object.assign({}, this.state.snackBar, {
        //                         show: true,
        //                         message: ifNull(valueData, 0).id === 0 ? 'Операция успешно завершена' : 'Информация успешно изменена',
        //                         variant: 'success'
        //                     }),
        //                     dialogAddEdit: this.dialogAddEditState(false), //Object.assign({}, this.state.dialogAddEdit, {open: false}),
        //                     dataLoaded: true,
        //                 }));
        //             }
        //             else {
        //                 this.setState(Object.assign({}, this.state, {
        //                     snackBar: Object.assign({}, this.state.snackBar, {
        //                         show: true,
        //                         message: value.message,
        //                         variant: 'error'
        //                     }),
        //                     dataLoaded: true,
        //                 }));
        //             }
        //         }
        //     ).catch(err => {
        //     this.showHideSnackbar(err.message, 'error', true);
        // });
    }

    // update zamani update edilen rowun melumatini deyisdirir
    updateTableRows = (id, item) => {
        const newRows = createData
        (
            item.id,
            item.name,
            item.code,
            item.accountNo,
            item.cardType,
            item.currency,
            item.bankBranch,
            item.isActive,
            this.handleTableAction
        );
        const rows = this.state.tableData.slice();
        const insertIndex = id === 0 ? 0 : rows.findIndex(item => item.id === id);
        const removeCount = id === 0 ? 0 : 1;
        rows.splice(insertIndex, removeCount, newRows); // birinci elem-> insert edilen index, ikinci elem, silinen index
        return rows;
    };

    showHideSnackbar = (message, variant, show) => {
        if (show === undefined)
            show = true;
        if (variant === undefined)
            variant = 'error';
        this.setState(
            Object.assign({}, this.state, {
                snackBar: Object.assign({}, this.state.snackBar, {show, message, variant})
            })
        );
    };



    checkIsNull(valueData) {
        if (valueData.name === null || valueData.name === ''
            || valueData.code === null || valueData.code === '' || valueData.code.length !== 6
            || valueData.accountNo === null || valueData.accountNo === '' || valueData.accountNo.length !== 18
            || !valueData.cardType || valueData.cardType.value === 0
            || !valueData.currency || valueData.currency.value === 0
            || !valueData.bankBranch || valueData.bankBranch.value === 0) {
            this.setState(Object.assign({}, this.state, {
                formData: Object.assign({}, this.state.formData, {
                    errors: Object.assign({}, this.state.formData.errors, {
                        nameIsNull: valueData.name === null || valueData.name === '',
                        codeIsNull: valueData.code === null || valueData.code === '' || valueData.code.length !== 6,
                        accountNoIsNull: valueData.accountNo === null || valueData.accountNo === '' || valueData.accountNo.length !== 18,
                        cardTypeNoIsNull: !valueData.cardType || valueData.cardType.value === 0,
                        currencyNoIsNull: !valueData.currency || valueData.currency.value === 0,
                        bankBranchNoIsNull: !valueData.bankBranch || valueData.bankBranch.value === 0,
                    })
                }),

                snackBar: Object.assign({}, this.state.snackBar, {
                    show: true,
                    message: 'Пожалуйста, заполните обязательные поля',
                    variant: 'warning',
                }),

            }));

            return true;
        }
        return false;
    }

    delete() {
        const id = this.state.dialogConfirm.data.id;
        this.deleteMethod(BACKEND_URL + '/api/bank/delete/' + id, this.processing, this.error, data => {
            const rows = this.state.tableData.slice().filter(item => item.id !== id);
            this.setState(Object.assign({}, this.state, {
                tableData: rows,
                snackBar: Object.assign({}, this.state.snackBar, {
                    show: true,
                    message: 'Информация успешно удалена',
                    variant: 'success'
                }),
                //dialogConfirm: Object.assign({}, this.state.dialogConfirm, {open: false}),
                dialogConfirm: this.dialogConfirmState(true, {}, 'success'),
            }));
        });
        // this.showHideLoading(false);
        // avrFetch(BACKEND_URL + '/api/bank/delete/' + id, {method: "DELETE",})
        //     .then(validateResponse)
        //     .then(readResponseAsJSON)
        //     .then(
        //         (value) => {
        //             if (!isEmpty(value) && value.success === true) {
        //                 const rows = this.state.tableData.slice().filter(item => item.id !== id);
        //                 this.setState(Object.assign({}, this.state, {
        //                     tableData: rows,
        //                     snackBar: Object.assign({}, this.state.snackBar, {
        //                         show: true,
        //                         message: 'Информация успешно удалена',
        //                         variant: 'success'
        //                     }),
        //                     //dialogConfirm: Object.assign({}, this.state.dialogConfirm, {open: false}),
        //                     dialogConfirm: this.dialogConfirmState(true, {}, 'success'),
        //                     dataLoaded: true,
        //                 }));
        //             }
        //             else {
        //                 this.setState(Object.assign({}, this.state, {
        //                     snackBar: Object.assign({}, this.state.snackBar, {
        //                         show: true,
        //                         message: value.message,
        //                         variant: 'error'
        //                     }),
        //                     // dialogConfirm: Object.assign({}, this.state.dialogConfirm, {open: false}),
        //                     dialogConfirm: this.dialogConfirmState(true, {}, 'danger'),
        //                     dataLoaded: true,
        //                 }));
        //             }
        //         }
        //     ).catch(err => this.showHideSnackbar(err.message, 'error', true));
    }

    dialogConfirmState = (open, data, variant) => Object.assign({}, this.state.dialogConfirm, {
        open: open,
        data: data,
        variant: variant
    });

    dialogAddEditState = open => Object.assign({}, this.state.dialogAddEdit, {open: open});
    processing = processing => this.setState(Object.assign({}, this.state, {processing}));
    error = error => {
        this.setState(Object.assign({}, this.state, {
            snackBar: Object.assign({}, this.state.snackBar, {
                show: true,
                message: error,
                variant: 'error'
            }),
        }))
    };
}

export default withStyles(styles)(connect(null, null)(BankAccount));
