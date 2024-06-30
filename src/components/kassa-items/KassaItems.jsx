import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import {
    columns,
    CompData,
    createData,
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
} from "./KassaItemsHelper";
import connect from "react-redux/es/connect/connect";
import ValueLabel from "../../utils/ValueLabel";
import {ifNull} from "../../utils/Validator";
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
import KassaItemsForm from "./KassaItemsForm";
import moment from "moment";
import Loading from "../common/Loading";
import CoreComponent from "../common/CoreComponent";
import {BACKEND_URL} from "../../utils/Constants";
import ReportUtils from "../../container/Reports/ReportUtils";

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};
const KASSA_MEDAXIL_REPORT_ID = 40;
const KASSA_MEXARIC_REPORT_ID = 41;
const BANK_MEDAXIL_REPORT_ID = 42;
const BANK_MEXARIC_REPORT_ID = 43;

const KB_TYPE_KASSA = 1;
const KB_TYPE_BANK = 2;

const MEDAXIL = 1;
const MEXARIC = 2;

class KassaItems extends CoreComponent {
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
                <Card style={{marginTop: "0px"}}>
                    <CardHeader color="primary"
                                title={MODULE_NAME}
                                action={
                                    <Button
                                        justIcon
                                        round
                                        color="primary"
                                        className={classes.marginRight}
                                        onClick={() => this.handleTableAction({action: 'add', id: 0})}>
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
                <KassaItemsForm
                    open={this.state.dialogAddEdit.open}
                    dialogAction={this.handleDialogAction('addedit')}
                    data={this.state.formData}
                    onChange={this.handleChange}/>
                {this.addConfirmDialog()}
                {this.addSnackBar()}
            </Fragment>
        );
    }


    handleChange = event => {
        console.log('handleChange: ', event);
        const {c, name, value} = event;
        let val = value;
        if (c === 'dt') {
            val = !value || value === null ? 0 : moment(value).unix();
        }
        this.setState(Object.assign({}, this.state, {
            formData: Object.assign({}, this.state.formData, {
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

    // formdaki datalari (combo box ve s. datalari doldurur)
    loadFormData = () => {
        this.getMethod(LOAD_COMP_DATA_URL, this.processing, this.error, data => {
            this.setState(Object.assign({}, this.state, {
                dataLoaded: true,
                formData: Object.assign({}, this.state.formData, {compData: data})
            }));
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
        this.getMethod(LOAD_BY_ID_URL.replace("{id}", id.toString()), this.processing, this.error, data => {
            this.setState(Object.assign({}, this.state, {
                dataLoaded: true,
                dialogAddEdit: this.dialogAddEditState(true),
                formData: Object.assign({}, this.state.formData, {valueData: data})
            }));
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
    handleTableAction = event => {
        const {action, id, kbTypeId, kassaTypeId} = event;
        // console.log(id, action);
        if (action === 'add') {
            this.getMethod(BACKEND_URL + '/api/kassaitems/generatecode', this.processing, this.error, data => {
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
        } else if (action === 'print') {

            let reportId = -1;

            if (kbTypeId === KB_TYPE_KASSA) {
                if (kassaTypeId === MEDAXIL)
                    reportId = KASSA_MEDAXIL_REPORT_ID;
                else if (kassaTypeId === MEXARIC)
                    reportId = KASSA_MEXARIC_REPORT_ID;
            }
            else if (kbTypeId === KB_TYPE_BANK) {
                if (kassaTypeId === MEDAXIL)
                    reportId = BANK_MEDAXIL_REPORT_ID;
                else if (kassaTypeId === MEXARIC)
                    reportId = BANK_MEXARIC_REPORT_ID;
            }


            if (!id) {
                alert('Düzgün məlumat seçilməyib!');
                return;
            }

            if (reportId === -1) {
                alert('Hesabat növü düzgün seçilməyib!');
                return;
            }

            const params = {
                reportId: reportId,
                fileType: "PDF",
                requestParams: [
                    {name: "kassa_items", isSet: 1, value: id},
                ]
            };


            ReportUtils.getDownloadToken(params, this.processing, this.error, response => {
                ReportUtils.openReport(response);
            });
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
            const rows = this.updateTableRows(valueData.id, data);
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
    }

    dialogConfirmState = (open, data, variant) => Object.assign({}, this.state.dialogConfirm, {
        open: open,
        data: data,
        variant: variant
    });

    dialogAddEditState = open => Object.assign({}, this.state.dialogAddEdit, {open: open});

    checkIsNull(valueData) {
        if (valueData.code === null || valueData.code === ''
            || valueData.price === null || valueData.price === ''
            || !valueData.kassaType || valueData.kassaType.value === 0)
            {
            this.setState(Object.assign({}, this.state, {
                formData: Object.assign({}, this.state.formData, {
                    errors: Object.assign({}, this.state.formData.errors, {
                        codeIsNull: valueData.code === null || valueData.code === '',
                        priceIsNull: valueData.price === null || valueData.price === '',
                        kassaTypeIsNull: !valueData.kassaType || valueData.kassaType.value === 0,

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

export default withStyles(styles)(connect(null, null)(KassaItems));
