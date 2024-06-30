import * as React from "react";
import {Fragment} from "react";
import FakturaTitle from "./FakturaTitle";
import MuiDialog from "../common/dialogs/MuiDialog";
import Button from "../../components-tim/CustomButtons/Button";
import FakturaItems from "./FakturaItems";
import {
    columnsTitle,
    CompData,
    createDataTitle,
    createFilterObj,
    createErrorObj,
    Errors,
    FilterData,
    DELETE_URL, LOAD_BY_ID_URL, MODULE_NAME,
    INSERT_URL,
    LOAD_COMP_DATA_URL,
    LOAD_DATA_URL,
    ValueData, GENERATE_FAKTURA_URL, LOAD_MAL_XID_DATA_URL
} from "./Fakturav2Helper";
import {avrFetch, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import {ifNull, isEmpty, verifyNumber} from "../../utils/Validator";
import * as moment from "moment";
import CustomSnackbar from "../common/snackbar/CustomSnackbar";
import Loading from "../common/Loading";
import Card from "../../components-tim/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
// import {DELETE_URL, LOAD_BY_ID_URL, MODULE_NAME} from "../faktura-v2/Fakturav2Helper";
import {Add} from "@material-ui/icons";
import CardIcon from "../../components-tim/Card/CardIcon";
import Assignment from "@material-ui/core/SvgIcon/SvgIcon";
import CardBody from "../../components-tim/Card/CardBody";
import ReactTable from "react-table";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import {withStyles} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
import ValueLabel from "../../utils/ValueLabel";
import SweetAlertConfirm from "../common/dialogs/SweetAlertConfirm";

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class FakturaV2 extends React.Component {

    constructor(props) {
        super(props);
        console.log('fakturaType: ', props);
        this.state = {


            fakturaTableRows: [],

            faktura: {
                title: {},
                items: [],
                editableIndex: 0,
                editableItemRow: {
                    mxType: new ValueLabel(1, 'Mal')
                },
                isOpen: false,

            },

            fakturaSaveProcessing: false,
            dataLoaded: false,
            tableData: [],
            filterData: new FilterData(),
            formData: {
                compData: new CompData(),
                errors: new Errors(),
            },
            dialogAddEdit: {open: false},
            dialogConfirm: {open: false, data: {}, variant: 'warning'},
            snackBar: {show: false, message: '', variant: 'info'},
        };

    }

    componentDidMount() {
        this.loadFormData();
        this.loadData();
    }

    handleOnChange = event => {
        const {component, name, value, isItems, type} = event;
        console.log('handleOnChange: ', type);
        let val = value;

        if (type === 'number') {
            if (!verifyNumber(val))
                return;
        }

        if (component === 'dt') {
            val = !event || event === null ? 0 : moment(event.value).unix();
            console.log('handleOnChange: val: ', val);
        }


        const fakturaObj = isItems
            ?
            {editableItemRow: Object.assign({}, this.state.faktura.editableItemRow, {[name]: val})}
            :
            {title: Object.assign({}, this.state.faktura.title, {[name]: val})}
        ;

        if (isItems && (name === 'serviceCard' || name === 'item')) {
            this.loadItemData(fakturaObj.editableItemRow, name);
        }


        this.setState(Object.assign({}, this.state, {
            faktura: Object.assign({}, this.state.faktura, fakturaObj)
        }));

        // const obj = isItems
        //     ? {editableItemRow: Object.assign({}, this.state.formData.editableItemRow, {[name]: val})}
        //     : {valueData: Object.assign({}, this.state.formData.valueData, {[name]: val})};
        //
        //
        // this.setState(Object.assign({}, this.state, {
        //     formData: Object.assign({}, this.state.formData, obj)
        // }));
    };

    handleOnClick = event => {
        // demeli bele bir mentiq, cedvele save olunmamis datalari yigib sonra update edirem. buna gore de id=0 olur,
        // unique qorumaq ucun index elave eledim helperde. indi yoxlayiram id >0 olanlarin db idlerin istifade edirem
        // id === 0 olanlarda ise (Новый Новый insert edilenlerde ise) indexe baxiram. deletede asandir edit ucun index lazimdir anca
        // buna gore de id > 0 olanlarda find index edeceyem digerlerinde ise index var zaten

        const {clickFor, action} = event;
        console.log('handleOnClick: ', event);
        if (clickFor === 'ITEMS_TABLE_CLICK') {
            let fakturaItemList = Object.assign([], this.state.faktura.items);
            let editableIndex = this.state.faktura.editableIndex;
            let editableItemRow = {
                mxType: new ValueLabel(1, 'Mal')
            };
            if (action === 'ADD_ROW') {
                editableItemRow = Object.assign({}, this.state.faktura.editableItemRow);

                if (this.checkIsNull(editableItemRow, true))
                    return;

                fakturaItemList.unshift(editableItemRow);
                editableItemRow = {
                    mxType: new ValueLabel(1, 'Mal'),
                    op: 1,
                };
            }
            else if (action === 'EDIT_ROW') {
                if (event.index - 1 >= 0) {
                    editableIndex = event.index;
                    editableItemRow = fakturaItemList[editableIndex - 1];
                }
            }
            else if (action === 'SAVE_ROW') {
                if (this.checkIsNull(this.state.faktura.editableItemRow, true))
                    return;
                fakturaItemList.splice(editableIndex - 1, 1, this.state.faktura.editableItemRow);
                editableIndex = 0;
            }
            else if (action === 'CANCEL_ROW') {

                editableIndex = 0;
                editableItemRow = {
                    mxType: new ValueLabel(1, 'Mal')
                };

            }
            else if (action === 'DELETE_ROW') {
                const index = event.index;
                fakturaItemList = fakturaItemList.filter(item => {
                    return (item.index !== index);
                });
            }
            this.setState(Object.assign({}, this.state, {
                faktura: Object.assign({}, this.state.faktura, {
                    editableItemRow: editableItemRow,
                    editableIndex: editableIndex,
                    items: fakturaItemList
                })
            }));
        }
        else if (clickFor === 'TITLE_TABLE_CLICK') {
            if (action === 'ADD_ROW') {
                this.addNewFaktura();
            } else if (action === 'EDIT_ROW') {
                this.loadDataById(event.id);
            } else if (action === 'DELETE_ROW') {
                this.setState(Object.assign({}, this.state, {
                    dialogConfirm: this.dialogConfirmState(true, {id: event.id})
                }));

            } else if (action === 'FF_FAKTURA') {

                console.log('event', event);
                //  this.props.history.push(this.props.match.url + '/fffaktura/' + event.id);
                this.props.history.push({
                    pathname: this.props.match.url + '/fffaktura/' + event.data.id,
                    // search: '?fakturaId=' + event.id,
                    state: {fakturaNo: event.data.fakturaNo, client: event.data.client}
                })
            }
        }
        else if (clickFor === 'MUI_DIALOG_CLICK') {
            if (action === 'CLOSE_DIALOG') {
                this.setState(Object.assign({}, this.state, {
                    faktura: Object.assign({}, this.state.faktura, {
                        isOpen: false,
                        id: 0,
                        items: [],
                        title: {}
                    })
                }));
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
        }

    };

    render() {
        const {classes} = this.props;

        const items = this.state.faktura.items;

        const totalEDV = (items ? items : []).reduce((accumulator, item) => accumulator +
            (item.vat && item.vat > 0 ? ((item.amount * item.price) * (item.vat / 100)) : 0)
            , 0);

        const fakturaCem = (items ? items : []).reduce((accumulator, item) => accumulator + item.amount * item.price, 0) - totalEDV;

        const titleValueData = {
            fakturaCem,
            totalEDV,
            ...this.state.faktura.title,
        };

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

                                        onClick={() => this.handleOnClick({
                                            clickFor: 'TITLE_TABLE_CLICK',
                                            action: 'ADD_ROW'
                                        })}>
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
                            ofText={''}
                            pageText={'Səhifə'}
                            previousText={'Əvvəlki'}
                            nextText={'Növbəti'}
                            noDataText={'Məlumat yoxdur'}
                            onFetchData={(s, i) => console.log('onFetchData', s)}
                            data={this.state.fakturaTableRows}
                            filterable
                            columns={columnsTitle}
                            defaultPageSize={10}
                            showPaginationBottom={true}
                            className="-striped -highlight"
                            style={{
                                height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                        />
                    </CardBody>
                </Card>
                <MuiDialog
                    maxWidth={'xl'}
                    fullWidth={true}
                    dialogContent={
                        <Fragment>
                            {!this.state.dataLoaded && <Loading/>}
                            <FakturaTitle onChange={this.handleOnChange}
                                          valueData={titleValueData}
                                          data={this.state.formData}/>
                            <FakturaItems onChange={this.handleOnChange}
                                          onClick={this.handleOnClick}
                                          data={this.state.formData}
                                          items={this.state.faktura.items}
                                          editableItemRow={this.state.faktura.editableItemRow}
                                          editableIndex={this.state.faktura.editableIndex}/>
                        </Fragment>
                    }
                    dialogAction={<Button onClick={() => this.insertUpdate()} color={"primary"}
                                          disabled={this.state.fakturaSaveProcessing}> Yadda saxla</Button>}
                    onClose={() => this.handleOnClick({clickFor: 'MUI_DIALOG_CLICK', action: 'CLOSE_DIALOG'})}
                    open={this.state.faktura.isOpen}
                    title={'Fakutra'}
                />
                {this.addSnackBar()}
                {this.addConfirmDialog()}
            </Fragment>);
    }

    addNewFaktura = () => {
        avrFetch(GENERATE_FAKTURA_URL)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    console.log('value: ', value);
                    if (!isEmpty(value) && value.success === true) {
                        this.setState(Object.assign({}, this.state, {
                            dataLoaded: true,
                            formData: Object.assign({}, this.state.formData, {
                                errors: new Errors(),
                            }),
                            faktura: Object.assign({}, this.state.faktura, {
                                title: {
                                    fakturaNo: value.data,
                                    tarix: moment(new Date()).unix()
                                },
                                isOpen: true,
                                id: 0,
                                items: [],
                            }),

                        }));
                    } else {
                        this.showHideSnackbar(value.message, 'info', true);
                    }
                }
            ).catch(reason => {
            this.showHideSnackbar(reason.message, 'error', true);
        });
    };

    loadFormData = () => {
        avrFetch(LOAD_COMP_DATA_URL + this.props.fakturaType)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    console.log('value: ', value);
                    if (!isEmpty(value) && value.success === true) {
                        this.setState(Object.assign({}, this.state, {
                            dataLoaded: true,
                            faktura: Object.assign({}, this.state.faktura, {
                                title: Object.assign({}, this.state.faktura.title, {
                                    fakturaNo: this.state.faktura.title.fakturaNo === '' ? value.data.fakturaNo : this.state.faktura.title.fakturaNo
                                })
                            }),
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
        const filterData = createFilterObj({fakturaType: this.props.fakturaType});
        avrFetch(LOAD_DATA_URL, {
            method: "POST",
            body: JSON.stringify(filterData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    console.log('fakturaLoadData: ', value);
                    if (value && value.success === true) {
                        const rows = value.data.map(item => createDataTitle(item, this.handleOnClick));
                        this.setState(Object.assign({}, this.state, {
                            fakturaTableRows: rows
                        }));
                    } else {
                        this.showHideSnackbar(value.message, 'error', true);
                    }
                }
            ).catch(reason => {
            this.showHideSnackbar(reason.message, 'error', true);
        }).finally(() => {
            this.setState(Object.assign({}, this.state, {
                dataLoaded: true,
            }));
        });
    };

    loadDataById(id) {
        avrFetch(LOAD_BY_ID_URL.replace("{id}", id.toString()))
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        const {fakturaItemList, ...title} = value.data;

                        this.setState(Object.assign({}, this.state, {
                            faktura: Object.assign({}, this.state, {
                                items: fakturaItemList,
                                title: title,
                                editableIndex: 0,
                                editableItemRow: {},
                                isOpen: true,
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

    insertUpdate() {
        const faktura = Object.assign({}, this.state.faktura);

        if (this.checkIsNull(faktura, false))
            return;

        const valueData = {
            ...faktura.title,
            fakturaItemList: faktura.items
        };

        //this.showHideLoading(false);
        this.setState(Object.assign({}, this.state, {
            dataLoaded: false,
            fakturaSaveProcessing: true,
        }));

        avrFetch(INSERT_URL, {
            method: "POST",
            body: JSON.stringify(valueData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    if (!isEmpty(value) && value.success === true) {
                        const rows = this.updateTableRows(valueData.id, value.data);
                        this.setState(Object.assign({}, this.state, {
                            fakturaTableRows: rows,
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: ifNull(valueData, 0).id === 0 ? 'Операция успешно завершена' : 'Информация успешно изменена',
                                variant: 'success'
                            }),
                            faktura: Object.assign({}, this.state.faktura, {isOpen: false}),
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
        }).finally(() => {
            this.setState(Object.assign({}, this.state, {
                fakturaSaveProcessing: true,
            }));
        });
    }

    loadItemData(editableItemRow, malXidName) {
        console.log('faktura: ', this.state.faktura);
        const fakturaTitle = this.state.faktura.title;
        const body = {
            tarix: fakturaTitle.tarix ? fakturaTitle.tarix : null,
            clientId: fakturaTitle.client ? fakturaTitle.client.value : null,
            type: editableItemRow.mxType ? editableItemRow.mxType.value : null,
            malxid: editableItemRow[malXidName] ? editableItemRow[malXidName].value : null,
            branchId: fakturaTitle.branch ? fakturaTitle.branch.value : null,
            fakturaType: fakturaTitle.fakturaType ? fakturaTitle.fakturaType.value : null,
        };
        console.log('loadItemData: ', body);
        avrFetch(LOAD_MAL_XID_DATA_URL, {
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    console.log('value: ', value);
                    if (!isEmpty(value) && value.success === true) {
                        const {price, vat, unitsetLine} = value.data;
                        editableItemRow.price = price;
                        editableItemRow.vat = vat;
                        editableItemRow.unitsetLine = unitsetLine;
                        this.setState(Object.assign({}, this.state, {
                            faktura: Object.assign({}, this.state.faktura, {
                                editableItemRow: editableItemRow
                            })
                        }));

                    } else {
                        // this.showHideSnackbar(value.message, 'info', true);
                    }
                }
            ).catch(reason => {
            this.showHideSnackbar(reason.message, 'error', true);
        });
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


    updateTableRows = (id, item) => {
        const newRows = createDataTitle(item, this.handleOnClick);
        const rows = this.state.fakturaTableRows.slice();
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
                snackBar: Object.assign({}, this.state.snackBar, {show, message, variant})
            })
        );
    };
    addSnackBar = () => {
        const {show, message, variant} = this.state.snackBar;
        return (<CustomSnackbar message={message} variant={variant} open={show}
                                handleOnClose={() => this.showHideSnackbar()}/>);

    };

    checkIsNull(valueData, isItem) {
        const err = createErrorObj(valueData, isItem);
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

    // confirmation dialogu rendere elave eden function
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


}

export default withStyles(styles)(connect(null, null)(FakturaV2));
