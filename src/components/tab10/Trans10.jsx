import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import {
    columns,
    CompData,
    createData,
    createErrorObj,
    createFilterObj,
    DELETE_URL,
    Errors,
    FilterData,
    INSERT_URL,
    LOAD_BY_ID_URL,
    LOAD_COMP_DATA_URL,
    LOAD_DATA_URL,
    MODULE_NAME,
    ValueData
} from "./Trans10Helper";
import connect from "react-redux/es/connect/connect";
import {avrFetch, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import ValueLabel from "../../utils/ValueLabel";
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
import ItemCardAmountForm from "./Trans10Form";
import * as moment from "moment";
import Loading from "../common/Loading";
import CoreComponent from "../common/CoreComponent";
import {BACKEND_URL} from "../../utils/Constants";

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class Trans10 extends CoreComponent {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            dataLoaded: false,
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
                <Card style={{marginTop: "0px"}}>
                    <CardHeader color="primary"
                                title={MODULE_NAME}
                                action={
                                    <Button
                                        justIcon
                                        round
                                        color="primary"
                                        className={classes.marginRight}
                                        onClick={() => this.handleTableAction(0, 'add')}>
                                        <Add/>
                                    </Button>
                                }>
                        <CardIcon color="primary">
                            <Assignment/>
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>{MODULE_NAME}</h4>
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
                <ItemCardAmountForm
                    open={this.state.dialogAddEdit.open}
                    dialogAction={this.handleDialogAction('addedit')}
                    data={this.state.formData}
                    onChange={this.handleOnChange}/>
                {this.addConfirmDialog()}
                {this.addSnackBar()}
            </Fragment>
        );
    }


    // formdaki datalari (combo box ve s. datalari doldurur)
    loadFormData = () => {
        this.getMethod(LOAD_COMP_DATA_URL, this.processing, this.error, data => {
            this.setState(Object.assign({}, this.state, {
                dataLoaded: true,
                formData: Object.assign({}, this.state.formData, {compData: data})
            }));
        });
        // avrFetch(LOAD_COMP_DATA_URL)
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
        console.log("load data isledi");
        const filterData = createFilterObj(this.state.filterData);
        this.postMethod(LOAD_DATA_URL, filterData, this.processing, this.error, data => {
            const rows = data.map(item => createData(item, this.handleTableAction));
            this.setState(Object.assign({}, this.state, {
                dataLoaded: true,
                tableData: rows
            }));
        });
        // avrFetch(LOAD_DATA_URL, {
        //     method: "POST",
        //     body: JSON.stringify(filterData),
        // })
        //     .then(validateResponse)
        //     .then(readResponseAsJSON)
        //     .then(
        //         (value) => {
        //             console.log('value: ', value);
        //             if (!isEmpty(value) && value.success === true) {
        //                 const rows = value.data.map(item => createData(item, this.handleTableAction));
        //                 this.setState(Object.assign({}, this.state, {
        //                     dataLoaded: true,
        //                     tableData: rows
        //                 }));
        //             }
        //         }
        //     ).catch(reason => {
        //     this.showHideSnackbar(reason.message, 'error', true);
        // });
    };

    loadDataById(id) {
        this.getMethod(LOAD_BY_ID_URL.replace("{id}", id.toString()), this.processing, this.error, data => {
            this.setState(Object.assign({}, this.state, {
                dataLoaded: true,
                dialogAddEdit: this.dialogAddEditState(true),
                formData: Object.assign({}, this.state.formData, {valueData: data})
            }));
        });
        // avrFetch(LOAD_BY_ID_URL.replace("{id}", id.toString()))
        //     .then(validateResponse)
        //     .then(readResponseAsJSON)
        //     .then(
        //         (value) => {
        //             if (!isEmpty(value) && value.success === true) {
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


    insertUpdate() {
        const valueData = this.state.formData.valueData;
        if (this.checkIsNull(valueData))
            return;

        this.postMethod(INSERT_URL, valueData, this.processing, this.error, data => {


            const rows = this.updateTableRows(valueData.id, data);
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
        });



    }

    delete() {
        const id = this.state.dialogConfirm.data.id;
        this.deleteMethod(DELETE_URL.replace("{id}", id), this.processing, this.error, data => {
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
                dataLoaded: true,
            }));
        });

        // this.showHideLoading(false);
        // avrFetch(DELETE_URL.replace("{id}", id), {method: "DELETE",})
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


    handleOnChange = name => event => {
        let val;
        let yekundeger = 0;
        let qazanc = 0;
        if (name === 'fakturaType' || name === 'item' || name === 'unitsetGrp' || name === 'client' || name === 'client2' || name === 'branch' || name === 'currency')
            val = event;

        else if (name === 'isActive')
            val = event.target.checked ? 1 : 0;


        else if (name === 'begdate' || name === 'enddate')
            val = moment(event).unix();
        else val = event.target.value;


        // if (name === 'mebleg') {
        //     yekundeger = parseFloat(ifNull(val, 0)) + ((parseFloat(ifNull(val, 0)) / 100) * parseFloat(ifNull(this.state.formData.valueData.faiz, 0)));
        //     qazanc=(parseFloat(ifNull(val, 0)).toFixed(2) / 100)* parseFloat(ifNull(this.state.formData.valueData.faiz, 0));
        // }
        // if (name === 'faiz') {
        //     yekundeger = parseFloat(ifNull(this.state.formData.valueData.mebleg, 0)) + ((parseFloat(ifNull(this.state.formData.valueData.mebleg, 0)) / 100) * parseFloat(ifNull(val, 0)));
        //     qazanc=(parseFloat(ifNull(this.state.formData.valueData.mebleg, 0)) / 100) * parseFloat(ifNull(val, 0));
        // }
        // this.setState({
        //     formdata:{valueData: { yekun:90} }
        //
        // });

        this.setState(Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, {
                //valueData: Object.assign({}, this.state.formData.valueData, {[name]: val,'yekun':yekundeger.toFixed(2),'qazanc':qazanc.toFixed(2)})
                valueData: Object.assign({}, this.state.formData.valueData, {[name]: val})
            })
        }));


    };
    handleOnChangeFilterData = type => event => {
        let val = (event.target.name === 'cardType' || event.target.name === 'currency') ?
            new ValueLabel(event.target.value, '') :
            event.target.value;
        this.setState(Object.assign({}, this.state, {
            filterData: Object.assign({}, this.state.filterData, {[event.target.name]: val})
        }));
    };
    handleClearButtonClick = () => {
        const filterData = new FilterData();
        this.setState(Object.assign({}, this.state, {filterData: filterData}));

    };


    // Dialoglar uzerindeki actionlarin handle oldugu  function
    handleDialogAction = type => action => {

        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        console.log(type, action);
        if (type === 'addedit') {
            if (action === 'agree') {
                this.insertUpdate();
                sleep(1500).then(() => {
                    this.loadData();
                })


            } else
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
            } else {
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
            this.getMethod(BACKEND_URL + '/api/itemcardamount/generatecode', this.processing, this.error, data => {
                const errors = new Errors();
                const valueData = new ValueData();
                valueData.code = data;
                this.setState(Object.assign({}, this.state, {
                    dialogAddEdit: this.dialogAddEditState(true),
                    formData: Object.assign({}, this.state.formData, {valueData, errors})
                }));
            });
        } else if (action === 'edit') {
            this.loadDataById(id);
        } else if (action === 'delete') {
            this.setState(Object.assign({}, this.state, {dialogConfirm: this.dialogConfirmState(true, {id})}
            ));
        }
    };
    // confirmation dialogu rendere elave eden function
    addConfirmDialog = () => <SweetAlertConfirm
        show={this.state.dialogConfirm.open}
        variant={this.state.dialogConfirm.variant}
        title='SİL'
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
    // update zamani update edilen rowun melumatini deyisdirir
    updateTableRows = (id, item) => {
        const newRows = createData(item, this.handleTableAction);
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
    dialogConfirmState = (open, data, variant) => Object.assign({}, this.state.dialogConfirm, {
        open: open,
        data: data,
        variant: variant
    });
    dialogAddEditState = open => Object.assign({}, this.state.dialogAddEdit, {open: open});

    checkIsNull(valueData) {
        const errors = createErrorObj(valueData);
        //
        // if (errors === null)
        //     return false;
        //
        // this.setState(Object.assign({}, this.state, {
        //     formData: Object.assign({}, this.state.formData, {
        //         errors: Object.assign({}, this.state.formData.errors, {errors})
        //     }),
        //
        //     snackBar: Object.assign({}, this.state.snackBar, {
        //         show: true,
        //         message: 'Пожалуйста, заполните обязательные поля',
        //         variant: 'warning',
        //     }),
        // }));
        // return true;

        if (!valueData.mebleg || valueData.mebleg.value === 0

            || !valueData.currency || valueData.currency.value === 0) {
            this.setState(Object.assign({}, this.state, {
                formData: Object.assign({}, this.state.formData, {
                    errors: Object.assign({}, this.state.formData.errors, {
                        meblegIsNull: !valueData.mebleg || valueData.mebleg.value === 0,
                        currencyIsNull: !valueData.currency || valueData.currency.value === 0,
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

export default withStyles(styles)(connect(null, null)(Trans10));
