import React, {Component, Fragment} from 'react';
import IlkinQaliqlarTitle from "./IlkinQaliqlarTitle";
import IlkinQaliqlarLines from "./IlkinQaliqlarLines";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {avrFetch, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import {ifNull, isEmpty} from "../../utils/Validator";
import PropTypes from 'prop-types';
import {Add} from "@material-ui/icons";
import CardIcon from "../../components-tim/Card/CardIcon";
import Assignment from "@material-ui/core/SvgIcon";
import CardBody from "../../components-tim/Card/CardBody";
import ReactTable from "react-table";
import Loading from "../common/Loading";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import {withStyles} from "@material-ui/core";
import {
    columns,
    columnsTitle,
    createDataTitle,
    createFilterObj,
    crtErrTitle,
    GENERATE_FAKTURA_URL,
    ILKIN_QALIQLAR,
    INSERT_URL,
    LOAD_DATA_URL,
    MODULE_NAME,
    DELETE_URL, LOAD_BY_ID_URL
} from './IlkinQaliqlarHelper';
import Button from "@material-ui/core/Button";
import Undo from "@material-ui/icons/Undo";
import ValueLabel from "../../utils/ValueLabel";
import * as moment from "moment";
import CustomSnackbar from "../common/snackbar/CustomSnackbar";
// import {DELETE_URL, LOAD_BY_ID_URL} from "../faktura/FakturaHelper";
import SweetAlertConfirm from "../common/dialogs/SweetAlertConfirm";


class IlkinQaliqlar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fakturaList: [],
            faktura: {
                id: 0,
                tarix: 0,
                fakturaNo: '',
                fakturaType: ILKIN_QALIQLAR,
                sourceWarehouse: new ValueLabel(),
                fakturaItemList: [
                    {
                        id: 0,
                        amount: 0,
                        fakturaId: 0,
                        item: new ValueLabel(),
                        op: 0,
                        price: 0.00,
                        unitsetLine: new ValueLabel()
                    }
                ],
            },

            errors: {},
            snackBar: {show: false, message: '', variant: 'info'},
            dialogConfirm: {open: false, data: {}, variant: 'warning'},
            processing: false,
            showList: true,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>

                {this.state.processing && <Loading/>}

                {
                    this.state.showList ? this.listUi(classes) : this.addeditUi(classes)
                }
                {
                    this.addSnackBar()
                }
                {
                    this.addConfirmDialog()
                }
            </Fragment>
        );
    }

    listUi = classes => <Card style={{marginTop: "0px"}}>
        <CardHeader color="primary"
                    title={MODULE_NAME}
                    action={
                        <Button
                            justIcon
                            round
                            color="primary"
                            className={classes.marginRight}

                            onClick={() => this.handleOnClick({
                                clickFor: 'TITLE_MAIN_TABLE_CLICK',
                                action: 'NEW_FAKTURA'
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
                data={this.state.fakturaList}
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
    </Card>;
    addeditUi = classes => <Fragment>
        <IlkinQaliqlarTitle valueData={this.state.faktura} onChange={this.handleOnChange} errors={this.state.errors}/>
        <Grid container>
            <Grid item xs={12}>
                <IlkinQaliqlarLines
                    errors={this.state.errors}
                    faktura={this.state.faktura}
                    columns={columns}
                    onChange={this.handleOnChange}
                    onClick={this.handleOnClick}/>
            </Grid>

            <Grid item xs={12}>
                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <Button
                        disabled={this.state.processing}
                        style={{margin: 10}}
                        onClick={() => this.handleOnClick({
                            action: 'CLICK_UNDO'
                        })}
                        variant="contained"
                        color="secondary"
                        className={classes.button}>
                        Geri Qayıt
                        <Undo className={classes.rightIcon}/>
                    </Button>

                    <Button
                        disabled={this.state.processing}
                        style={{margin: 10}}
                        onClick={() => this.handleOnClick({
                            action: 'CLICK_SAVE'
                        })}
                        variant="contained"
                        color="secondary">
                        Yaddaşa al
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Fragment>;

    loadDataByFakturaId = id => {
        this.setState(Object.assign({}, this.state, {
            processing: true,
        }));

        avrFetch(LOAD_BY_ID_URL.replace("{id}", id.toString()))
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (response) => {
                    if (response && response.success) {
                        console.log('loadDataByFakturaId:::: ', response);
                        this.setState(Object.assign({}, this.state, {
                            faktura: response.data,
                            errors: {},
                            showList: false,
                        }));
                    } else {
                        this.showHideSnackbar(response.message, 'error', true);
                    }
                }
            ).catch(reason => {
            this.showHideSnackbar(reason.message, 'error', true);
        }).finally(() => {
            this.setState(Object.assign({}, this.state, {
                processing: false,
            }));
        });

    };
    loadData = () => {
        console.log('loadData: ', LOAD_DATA_URL);
        const filterData = createFilterObj({});
        this.setState(Object.assign({}, this.state, {
            processing: true,
        }));

        avrFetch(LOAD_DATA_URL, {
            method: "POST",
            body: JSON.stringify(filterData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (value) => {
                    console.log('fakturaLoadData: ', value);
                    if (value && value.success) {
                        const rows = value.data.map(item => createDataTitle(item, this.handleOnClick));
                        this.setState(Object.assign({}, this.state, {
                            fakturaList: rows
                        }));
                    } else {
                        this.showHideSnackbar(value.message, 'error', true);
                    }
                }
            ).catch(reason => {
            this.showHideSnackbar(reason.message, 'error', true);
        }).finally(() => {
            this.setState(Object.assign({}, this.state, {
                processing: false,
            }));
        });
    };

    insUpdIlkinQaliqlar() {
        const valueData = this.state.faktura;
        console.log('insUpdIlkinQaliqlar: ', valueData);
        if (this.checkIsNull(valueData)) {

            return;
        }

        this.setState(Object.assign({}, this.state, {
            processing: true,
        }));


        avrFetch(INSERT_URL, {
            method: "POST",
            body: JSON.stringify(valueData),
        })
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                response => {
                    if (response && response.success) {
                        console.log('InsUpdIlkinQaliqlar->response: ', response);

                        const rows = this.updateTableRows(valueData.id, response.data, this.state.fakturaList);

                        this.setState(Object.assign({}, this.state, {
                            fakturaList: rows,
                            showList: true,
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: ifNull(valueData, 0).id === 0 ? 'Операция успешно завершена' : 'Информация успешно изменена',
                                variant: 'success'
                            }),
                        }));
                        this.loadData();
                    }
                }
            ).catch(err => {
            this.showHideSnackbar(err.message, 'error', true);
        }).finally(() => {
            this.setState(Object.assign({}, this.state, {
                processing: false,
            }));
        });
    }

    delete() {
        const id = this.state.dialogConfirm.data.id;

        this.setState(Object.assign({}, this.state, {
            processing: true,
        }));
        avrFetch(DELETE_URL.replace("{id}", id), {method: "DELETE",})
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (response) => {
                    if (response && response.success) {
                        const rows = this.state.fakturaList.slice().filter(item => item.id !== id);
                        this.setState(Object.assign({}, this.state, {
                            fakturaList: rows,
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: 'Информация успешно удалена',
                                variant: 'success'
                            }),
                            //dialogConfirm: Object.assign({}, this.state.dialogConfirm, {open: false}),
                            dialogConfirm: this.dialogConfirmState(true, {}, 'success'),
                        }));
                    }
                    else {
                        this.setState(Object.assign({}, this.state, {
                            snackBar: Object.assign({}, this.state.snackBar, {
                                show: true,
                                message: response.message,
                                variant: 'error'
                            }),
                            // dialogConfirm: Object.assign({}, this.state.dialogConfirm, {open: false}),
                            dialogConfirm: this.dialogConfirmState(true, {}, 'danger'),
                        }));
                    }
                }
            )
            .catch(err => this.showHideSnackbar(err.message, 'error', true))
            .finally(() => {
                this.setState(Object.assign({}, this.state, {
                    processing: false,
                }));
            });
    }


    handleOnChange = event => {
        console.log('handleOnChange: ', event);
        const {component, name, value, row, isTitle} = event;
        let val = value;
        if (isTitle) {

            if (component === 'dt') {
                val = !value || value === null ? 0 : moment(value).unix();
            }

            this.setState(Object.assign({}, this.state, {
                faktura: Object.assign({}, this.state.faktura, {
                    [name]: val
                })
            }));
        }
        else {
            if (component === 'ac' && name === 'item') {
                //event.value.unitSetline burdaki unitsetline mal secerken onun uzerinde gelen unitsetitemlistdir
                //row.unitsetLine ise rowda secilen olcu vahididir

                row.unitsetLineList = event.value ? event.value.unitSetline : [];
                if (!event.value)
                    row.unitsetLine = null;
            }

            row[name] = val;

            // db-den gelen recordu update edirik.
            if (row.op === 0)
                row.op = 2;
            this.forceUpdate();
        }
    };
    handleOnClick = event => {
        const {clickFor, action, row, index} = event;

        if (clickFor === "ITEMS_TABLE_CLICK") {
            // Faktura item actions
            if (action === "DELETE_ROW") {
                if (row.id === 0) {
                    this.state.faktura.fakturaItemList.splice(index, 1);
                    this.forceUpdate();
                } else if (row.id > 0) {
                    row.op = 3; // delete flag
                    this.forceUpdate();
                }
            }
            else if (action === 'ADD_ROW') {
                this.state.faktura.fakturaItemList.push(row);
                this.forceUpdate();
            }

        }
        else if (clickFor === 'TITLE_MAIN_TABLE_CLICK') {
            // faktura actions
            if (action === 'NEW_FAKTURA') {
                this.addNewFaktura();
            }
            else if (action === 'EDIT_ROW') {
                this.loadDataByFakturaId(event.id);
            }
            else if (action === 'DELETE_ROW') {
                this.setState(Object.assign({}, this.state, {
                    dialogConfirm: this.dialogConfirmState(true, {id: event.id})
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

        else {
            if (action === 'CLICK_SAVE') {
                this.insUpdIlkinQaliqlar();
            } else if (action === 'CLICK_UNDO') {
                this.setState(Object.assign({}, this.state, {
                    faktura: {},
                    showList: true,
                }));
            }
        }
    };
    addNewFaktura = () => {
        this.setState({processing: true});
        avrFetch(GENERATE_FAKTURA_URL)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                response => {
                    console.log('response: ', response);
                    if (response && response.success) {
                        this.setState(Object.assign({}, this.state, {
                            faktura: Object.assign({}, this.state.faktura, {
                                id: 0,
                                fakturaNo: response.data,
                                tarix: moment(new Date()).unix(),
                                sourceWarehouse: {},
                                fakturaItemList: [],
                            }),
                            showList: false,
                            errors: {},
                        }));
                    } else {
                        this.showHideSnackbar(response.message, 'info', true);
                    }
                }
            ).catch(reason => {
            this.showHideSnackbar(reason.message, 'error', true);
        }).finally(() => this.setState({processing: false}));
    };
    updateTableRows = (id, item, updateRows) => {
        const newRows = createDataTitle(item, this.handleOnClick);
        const rows = updateRows.slice();
        const insertIndex = id === 0 ? 0 : rows.findIndex(item => item.id === id);
        const removeCount = id === 0 ? 0 : 1;
        rows.splice(insertIndex, removeCount, newRows); // birinci elem-> insert edilen index, ikinci elem, silinen index
        return rows;
    };
    checkIsNull = faktura => {
        const err = {};
        const {tarix, fakturaNo, sourceWarehouse, fakturaItemList} = faktura;

        if (!tarix || tarix <= 0)
            err.tarix = true;

        if (!fakturaNo || fakturaNo === '')
            err.fakturaNo = true;

        if (!sourceWarehouse || !sourceWarehouse.value)
            err.sourceWarehouse = true;

        (fakturaItemList ? fakturaItemList : []).forEach((item, index) => {
            if (!item.amount || item.amount <= 0)
                err[crtErrTitle('amount', index)] = true;

            if (!item.item || item.item.value <= 0)
                err[crtErrTitle('item', index)] = true;

            if (!item.price || item.price <= 0)
                err[crtErrTitle('price', index)] = true;

            if (!item.unitsetLine || item.unitsetLine.value <= 0)
                err[crtErrTitle('unitsetLine', index)] = true;
        });

        this.setState(Object.assign({}, this.state, {
            snackBar: Object.assign({}, this.state.snackBar, {
                show: true,
                message: 'Məcburi xanaları doldurun',
                variant: 'error'
            }),
            errors: err
        }));


        console.log('err: ', err, !isEmpty(err), sourceWarehouse);
        return !isEmpty(err) || (fakturaItemList && fakturaItemList.length === 0);
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
    addSnackBar = () => {
        const {show, message, variant} = this.state.snackBar;
        return (<CustomSnackbar message={message} variant={variant} open={show}
                                handleOnClose={() => this.showHideSnackbar()}/>);

    };
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

IlkinQaliqlar.propTypes = {
    fakturaId: PropTypes.number.isRequired,
};

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

export default withStyles(styles)(IlkinQaliqlar);
