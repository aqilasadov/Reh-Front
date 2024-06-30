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
} from "./ReportCurRateHelper";
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
import CurRateForm from "./ReportCurRateForm";
import moment from "moment";
import Print from "@material-ui/icons/Print";
import ReportUtils from "../../container/Reports/ReportUtils";

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class CurRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                <Card style={{marginTop: "0px"}}>
                    <CardHeader color="primary"
                                title={MODULE_NAME}
                                action={
                                    <Button

                                        round
                                        color="primary"
                                        className={classes.marginRight}
                                        onClick={this.insertUpdate}>
                                        Рассчитать Баланс
                                    </Button>
                                }
                               >
                        <CardIcon color="primary">
                            <Assignment/>
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>{MODULE_NAME}</h4>
                    </CardHeader>
                    <CardBody>
                        {/*<Button justIconThin round simple*/}
                        {/*        onClick={this.handleClearButtonClick3}*/}
                        {/*        color="primary">*/}
                        {/*    <Print/>*/}
                        {/*    Рассчитать Баланс*/}
                        {/*</Button>*/}
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
                            defaultPageSize={20}
                            showPaginationBottom={true}
                            className="-striped -highlight"
                            style={{
                                height: "750px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                        />
                    </CardBody>
                </Card>
                <CurRateForm
                    open={this.state.dialogAddEdit.open}
                    dialogAction={this.handleDialogAction('addedit')}
                    data={this.state.formData}
                    onChange={this.handleOnChange}/>
                {this.addConfirmDialog()}
                {this.addSnackBar()}
            </Fragment>
        );
    }


    handleClearButtonClick3 = () => {
        console.log('nese2',this.state.filterData.client.value);
        const params = {
            reportId: 52,
            fileType: "PDF",
            requestParams: [
                {name: "client_id", isSet: 1, value: this.state.filterData.client.value},
                {name: "begin_date", isSet: 1, value: moment.unix(this.state.filterData.begdate).format("YYYY/MM/DD")},
                {name: "end_date", isSet: 1, value: moment.unix(this.state.filterData.enddate).format("YYYY/MM/DD")},
            ]
        };

        ReportUtils.getDownloadToken(params, this.processing, this.error, response => {
            ReportUtils.openReport(response);
        });

    };



    handleOnChange = name => data => {
        let val;

        if (name === 'currency')
            val = data;
        else if (name === 'createDate') {
            val = moment(data).unix();
        }
        else val = data.target.value;

        this.setState(Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, {
                valueData: Object.assign({}, this.state.formData.valueData, {[name]: val})
            })
        }));
    };

    handleOnChangeFilterData = type => event => {
        let val = (event.target.name === '') ?
            new ValueLabel(event.target.value, '') :
            event.target.value;
        this.setState(Object.assign({}, this.state, {
            filterData: Object.assign({}, this.state.filterData, {[event.target.name]: val})
        }));
    };
    // formdaki datalari (combo box ve s. datalari doldurur)
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
                            formData: Object.assign({}, this.state.formData, {compData: value.data})
                        }));
                    } else {
                        this.showHideSnackbar(value.message, 'info', true);
                    }
                }
            ).catch(reason => {
            this.showHideSnackbar(reason.message, 'error', true);
        });
    };
    loadData = () => {
        const filterData = createFilterObj(this.state.filterData);
        avrFetch(LOAD_DATA_URL, {
            method: "POST",
            body: JSON.stringify(filterData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    console.log('value: ', value);
                    if (!isEmpty(value) && value.success === true) {
                        const rows = value.data.map(item => createData(item, this.handleTableAction));
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
            const valueData = new ValueData();
            const errors = new Errors();

            this.setState(Object.assign({}, this.state, {
                dialogAddEdit: this.dialogAddEditState(true),
                formData: Object.assign({}, this.state.formData, {valueData, errors})
            }));
        } else if (action === 'edit') {
            this.showHideLoading(false);
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

    insertUpdate() {
      //  const valueData = this.state.formData.valueData;
      //   if (this.checkIsNull(valueData))
      //       return;

        // this.showHideLoading(false);
        avrFetch(INSERT_URL, {
            method: "POST",
          //  body: JSON.stringify(valueData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {

                        this.setState(Object.assign({}, this.state, {

                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: 'Операция  завершена' ,
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
            // this.showHideSnackbar(err.message, 'error', true);
        });
    }

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

    showHideLoading(show) {
        //this.setState(Object.assign({}, this.state, {dataLoaded: show}));
    }

    delete() {
        const id = this.state.dialogConfirm.data.id;
        this.showHideLoading(false);
        avrFetch(DELETE_URL.replace("{id}", id), {method: "DELETE",})
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
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

    dialogConfirmState = (open, data, variant) => Object.assign({}, this.state.dialogConfirm, {
        open: open,
        data: data,
        variant: variant
    });

    dialogAddEditState = open => Object.assign({}, this.state.dialogAddEdit, {open: open});

    checkIsNull(valueData) {
        // const errors = createErrorObj(valueData);
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

        if (valueData.name === null || valueData.name === ''
            || valueData.price === null || valueData.price === ''
            || !valueData.currency || valueData.currency.value === 0) {
            this.setState(Object.assign({}, this.state, {
                formData: Object.assign({}, this.state.formData, {
                    errors: Object.assign({}, this.state.formData.errors, {
                        priceIsNull: valueData.price === null || valueData.price === '',
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
}

export default withStyles(styles)(connect(null, null)(CurRate));
