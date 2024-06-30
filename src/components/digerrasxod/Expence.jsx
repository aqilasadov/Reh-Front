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
} from "./ExpenceHelper";
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
import PartiyaForm from "./ExpenceForm";
import * as moment from "moment";
import CoreComponent from "../common/CoreComponent";
import Loading from "../common/Loading";
import {BACKEND_URL} from "../../utils/Constants";
import TransferFilter from "../tabdiger/TransferFilter";
import ExpenceFilter from "./ExpenceFilter";
import ReportUtils from "../../container/Reports/ReportUtils";

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class Partiya extends CoreComponent {
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
                <ExpenceFilter
                    data={this.state.filterData} compData={this.state.formData.compData}
                    onChange={this.handleOnChangeFilterData}
                    onFilterButtonClick={this.handleFilterButtonClick}
                    onFilterClearButtonClick={this.handleClearButtonClick}
                    onFilterClearButtonClick2={this.handleClearButtonClick2}
                    onFilterClearButtonClick22={this.handleClearButtonClick22}
                    onFilterClearButtonClick3={this.handleClearButtonClick3}
                    onFilterClearButtonClick4={this.handleClearButtonClick4}

                />

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
                            defaultPageSize={100}
                            showPaginationBottom={true}
                            className="-striped -highlight"
                            style={{
                                height: "750px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                        />
                    </CardBody>
                </Card>
                <PartiyaForm
                    open={this.state.dialogAddEdit.open}
                    dialogAction={this.handleDialogAction('addedit')}
                    data={this.state.formData}
                    onChange={this.handleOnChange}/>
                {this.addConfirmDialog()}
                {this.addSnackBar()}
            </Fragment>
        );
    }

    handleOnChange = name => data => {
        let val;
        if (name === 'etId' || name === 'currency')
            val = data;

        else if (name === 'tarix')
            val = moment(data).unix();
        else val = data.target.value;


        this.setState(Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, {
                valueData: Object.assign({}, this.state.formData.valueData, {[name]: val})
            })
        }));
    };


    handleClearButtonClick2 = () => {

        if (this.state.filterData.client.value === -1) {

            this.setState(Object.assign({}, this.state, {
                snackBar: Object.assign({}, this.state.snackBar, {
                    show: true,
                    message: 'Пожалуйста, выберите клиента',
                    variant: 'warning'
                }),
            }));


        } else {
            const params = {
                reportId: 55,
                fileType: "PDF",
                requestParams: [
                    {name: "client_id", isSet: 1, value: this.state.filterData.client.value},
                    {
                        name: "begin_date",
                        isSet: 1,
                        value: moment.unix(this.state.filterData.begdate).format("YYYY/MM/DD")
                    },
                    {
                        name: "end_date",
                        isSet: 1,
                        value: moment.unix(this.state.filterData.enddate).format("YYYY/MM/DD")
                    },
                ]
            };

            ReportUtils.getDownloadToken(params, this.processing, this.error, response => {
                ReportUtils.openReport(response);
            });
        }
    };



    // handleOnChangeFilterData = type => event => {
    //     let val = (event.target.name === 'cardType' || event.target.name === 'currency') ?
    //         new ValueLabel(event.target.value, '') :
    //         event.target.value;
    //     this.setState(Object.assign({}, this.state, {
    //         filterData: Object.assign({}, this.state.filterData, {[event.target.name]: val})
    //     }));
    // };

    handleOnChangeFilterData = name => event => {
        let val;
        console.log("nese",event,name);

        if (name === 'client')
            //  val = event.value;
            //    val = new ValueLabel(event.value, event.label);
            val = event;

        else if (name === 'begdate' || name === 'enddate')

            val = moment(event).unix();
        else
            val = event.target.value;


        this.setState(Object.assign({}, this.state, {
            filterData: Object.assign({}, this.state.filterData, {[name]: val})
        }));


        // this.loadData();
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
        //     ).catch(reason => {this.showHideSnackbar(reason.message, 'error', true);});
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
             this.getMethod(BACKEND_URL + '/api/partiya/generatecode', this.processing, this.error, data => {
                 const errors = new Errors();
                 const valueData = new ValueData();
            //     valueData.siranomresi = data;
                this.setState(Object.assign({}, this.state, {
                    dialogAddEdit: this.dialogAddEditState(true),
                    formData: Object.assign({}, this.state.formData,{valueData, errors} )
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

    insertUpdate() {
        const valueData = this.state.formData.valueData;
        if (this.checkIsNull(valueData))
            return;
        this.postMethod(INSERT_URL, valueData, this.processing, this.error, data => {
            const rows = this.updateTableRows(valueData.expId, data);
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

        // this.showHideLoading(false);
        // avrFetch(INSERT_URL, {
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
        //                 // console.log('rows: ', rows);
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
        const newRows = createData(item, this.handleTableAction);
        const rows = this.state.tableData.slice();
        const insertIndex = id === 0 ? 0 : rows.findIndex(item => item.expId === id);
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

    delete() {
        const id = this.state.dialogConfirm.data.id;
        this.deleteMethod(DELETE_URL.replace("{id}", id), this.processing, this.error, data => {
            const rows = this.state.tableData.slice().filter(item => item.expId !== id);
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

    dialogConfirmState = (open, data, variant) => Object.assign({}, this.state.dialogConfirm, {
        open: open,
        data: data,
        variant: variant
    });

    dialogAddEditState = open => Object.assign({}, this.state.dialogAddEdit, {open: open});

    checkIsNull(valueData) {
        const errors = createErrorObj(valueData);

        if (errors === null)
            return false;

        this.setState(Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, {
                errors: Object.assign({}, this.state.formData.errors, {errors})
            }),

            snackBar: Object.assign({}, this.state.snackBar, {
                show: true,
                message: 'Пожалуйста, заполните обязательные поля',
                variant: 'warning',
            }),
        }));
        return true;

        // if (valueData.name === null || valueData.name === ''
        //     || valueData.nr === null || valueData.nr === '') {
        //     this.setState(Object.assign({}, this.state, {
        //         formData: Object.assign({}, this.state.formData, {
        //             errors: Object.assign({}, this.state.formData.errors, {
        //                 nameIsNull: valueData.name === null || valueData.name === '',
        //                 nrIsNull: valueData.nr === null || valueData.nr === '',
        //             })
        //         }),
        //
        //         snackBar: Object.assign({}, this.state.snackBar, {
        //             show: true,
        //             message: 'Пожалуйста, заполните обязательные поля',
        //             variant: 'warning',
        //         }),
        //     }));
        //     return true;
        // }
        // return false;
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

export default withStyles(styles)(connect(null, null)(Partiya));
