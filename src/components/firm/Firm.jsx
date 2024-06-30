import React, {Fragment} from "react";
// import BankAccountFilter from "./BankAccountFilter";
import {withStyles} from "@material-ui/core";
import {columns, CompData, createData, Errors, FilterData, ValueData} from "./FirmHelper";
import connect from "react-redux/es/connect/connect";
import {avrFetch, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import ValueLabel from "../../utils/ValueLabel";
import {BACKEND_URL} from "../../utils/Constants";
import {ifNull, isEmpty} from "../../utils/Validator";
import Snackbar from "../../components-tim/Snackbar/Snackbar";
import SweetAlertConfirm from "../common/dialogs/SweetAlertConfirm";

import GridContainer from "../../components-tim/Grid/GridContainer";
import GridItem from "../../components-tim/Grid/GridItem";
import Card from "../../components-tim/Card/Card";
import CardIcon from "../../components-tim/Card/CardIcon";
import CardBody from "../../components-tim/Card/CardBody";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";

import Assignment from "@material-ui/icons/Assignment";
import {Add, AddAlert} from "@material-ui/icons";

import ReactTable from "react-table";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Button from "../../components-tim/CustomButtons/Button"
import FirmForm from "./FirmForm";
import Accordion from "../../components-tim/Accordion/Accordion";
import FirmFilter from "./FirmFilter";


const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class Firm extends React.Component {
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
                {/*<FirmFilter*/}
                    {/*compData={this.state.formData.compData}*/}
                    {/*data={this.state.filterData}*/}
                    {/*onFilterClearButtonClick={this.handleClearButtonClick}*/}
                    {/*onFilterButtonClick={this.handleFilterButtonClick}*/}
                    {/*onChange={this.handleOnChangeFilterData}/>*/}
                        <Card style={{marginTop: 0}}>
                            <CardHeader color="primary"
                                        title="Firmalar"
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
                                        }
                            >
                                <CardIcon color="primary">
                                    <Assignment/>
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>Firmalar</h4>
                            </CardHeader>
                            <CardBody>
                                <ReactTable
                                    rowsText={'Sətir'}
                                    ofText={'dən'}
                                    pageText={'Səhifə'}
                                    previousText={'Əvvəlki'}
                                    nextText={'Növbəti'}
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
                <FirmForm
                    open={this.state.dialogAddEdit.open}
                    dialogAction={this.handleDialogAction('addedit')}
                    data={this.state.formData}
                    onChange={this.handleOnChange}/>
                {this.addConfirmDialog()}
                {this.addSnackBar()}
            </Fragment>
        );
    }


    handleOnChangeFilterData = type => event => {
        let val = (event.target.name === 'currency'  || event.target.name === 'fealiyyet' ) ?
            new ValueLabel(event.target.value, '') :
            event.target.value;
        console.log(event.target.name, val);
        this.setState(Object.assign({}, this.state, {
            filterData: Object.assign({}, this.state.filterData, {[event.target.name]: val})
        }));
    };

    handleOnChange = type => event => {
        let val = (event.target.name === 'currency' || event.target.name === 'fealiyyet' ) ? new ValueLabel(event.target.value, '') : event.target.value;
        if (event.target.name  === 'isEdv')
            val = event.target.checked ? 1 : 0;
        if (event.target.name  === 'isPartiya')
            val = event.target.checked ? 1 : 0;
        this.setState(Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, {
                valueData: Object.assign({}, this.state.formData.valueData, {[event.target.name]: val})
            })
        }));
    };

    // formdaki datalari (combo box ve s. datalari doldurur)
    loadFormData = () => {
        avrFetch(BACKEND_URL + '/api/firm/compData')
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
        const filterData = {
            name: this.state.filterData.name,
            voen: this.state.filterData.voen,

        };
        avrFetch(BACKEND_URL + '/api/firm/filterData', {
            method: "POST",
            body: JSON.stringify(filterData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    console.log('value: ', value);
                    if (!isEmpty(value) && value.success === true) {
                        const rows = value.data.map(
                            item => createData
                            (
                                item.id,
                                item.name,
                                item.logo,
                                item.voen,
                                item.pin,
                                item.country,
                                item.city,
                                item.region,
                                item.zipCode,
                                item.telefon,
                                item.email,
                                item.whatsup,
                                item.currency,
                                item.fealiyyet,
                                item.isEdv,
                                item.isPartiya,
                                this.handleTableAction
                            )

                        );
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
        avrFetch(BACKEND_URL + '/api/firm/' + id)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        console.log('loadDataById:', value);
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
                dialogAddEdit: this.dialogAddEditState(true), //Object.assign({}, this.state.dialogAddEdit, {open: true}),
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
        const valueData = this.state.formData.valueData;
        if (this.checkIsNull(valueData))
            return;

        this.showHideLoading(false);
        avrFetch(BACKEND_URL + '/api/firm/insupd', {
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

    // update zamani update edilen rowun melumatini deyisdirir
    updateTableRows = (id, item) => {
        const newRows = createData
        (
            item.id,
            item.name,
            item.logo,
            item.voen,
            item.pin,
            item.country,
            item.city,
            item.region,
            item.zipCode,
            item.telefon,
            item.email,
            item.whatsup,
            item.currency,
            item.fealiyyet,
            item.isEdv,
            item.isPartiya,
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

    showHideLoading(show) {
        //this.setState(Object.assign({}, this.state, {dataLoaded: show}));
    }

    checkIsNull(valueData) {
        if (valueData.name === null || valueData.name === ''
            || !valueData.currency || valueData.currency.value === 0
            || !valueData.fealiyyet || valueData.fealiyyet.value === 0) {
            this.setState(Object.assign({}, this.state, {
                formData: Object.assign({}, this.state.formData, {
                    errors: Object.assign({}, this.state.formData.errors, {
                        NameIsNull: valueData.name === null || valueData.name === '',
                        currencyIsNull:  !valueData.currency || valueData.currency.value === 0,
                        fealiyyetIsNull:  !valueData.fealiyyet || valueData.fealiyyet.value === 0,
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


        this.showHideLoading(false);
        avrFetch(BACKEND_URL + '/api/firm/delete/' + id, {method: "DELETE",})
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
}

export default withStyles(styles)(connect(null, null)(Firm));
