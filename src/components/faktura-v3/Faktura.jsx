import AbstractFakutra from "./AbstractFakutra";
import React, {Fragment} from "react";
import FakturaList from "./FakturaList";
import {
    ALIS_FAKTURA,
    SATIS_FAKTURA,
    checkFakturaType,
    createDataTitle,
    createFilterObj,
    getFakturaTitle
} from "./FakturaHelper";
import Loading from "../common/Loading";
import {withStyles} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import FakturaForm from "./FakturaForm";
import * as moment from "moment";
import {ifNull, isEmpty} from "../../utils/Validator";
import {crtErrTitle} from "../ilkin-qaliqlar/IlkinQaliqlarHelper";
import ReportUtils from "../../container/Reports/ReportUtils";
import KassaItemsForm from "../kassa-items/KassaItemsForm";
import {BACKEND_URL} from "../../utils/Constants";

// const ALIS_FAKTURA = 1;
// const SATIS_FAKTURA = 2;

const kassaTypeList = [{value: 1, label: "Mədaxil"}, {value: 2, label: "Məxaric"}];
const kbTypeList = [{value: 1, label: "Kassa"}, {value: 2, label: "Bank Hesabları"}];

class Faktura extends AbstractFakutra {
    constructor(props) {
        super(props);
        this.state = this.fakturaModuleObject(props.fakturaType);
    }

    componentDidMount() {
        const fakturaType = this.props.fakturaType;
        this.loadFormData(fakturaType, this.processing, this.error, data => {
            this.setState(Object.assign({}, this.state, {compData: data}))
        });
        const filter = createFilterObj({fakturaType: fakturaType});
        this.loadData(filter, this.processing, this.error, data => {
            const rows = data.map(item => createDataTitle(item, this.handleOnClick));
            this.setState(Object.assign({}, this.state, {fakturaList: rows}));
        });
    }

    render() {

        return (
            <Fragment>
                {this.state.processing && <Loading/>}
                {this.state.showList ?
                    <FakturaList rows={this.state.fakturaList} handleOnClick={this.handleOnClick}
                                 moduleName={getFakturaTitle(this.state.faktura.fakturaType)}/>
                    :
                    <FakturaForm compData={this.state.compData} faktura={this.state.faktura}
                                 onClick={this.handleOnClick} onChange={this.handleOnChange}
                                 errors={this.state.errors}/>
                }
                {
                    this.addConfirmDialog(this.state.dialogConfirm, data => this.handleOnClick(
                        {
                            clickFor: 'CONFIRM_DIALOG_CLICK',
                            action: data
                        }))
                }
                {
                    this.addSnackBar(this.state.snackBar,
                        () => this.setState(
                            Object.assign({}, this.state, {
                                snackBar: Object.assign({}, this.state.snackBar, {
                                    show: false,
                                    message: '',
                                    variant: 'info'
                                })
                            })
                        )
                    )
                }
                {
                    this.addKassaItemComponent()
                }
            </Fragment>
        );
    }


    showKassaItem = faktura => {

        // kassaTypeList = [{value: 1, label: "Mədaxil"}, {value: 2, label: "Məxaric"}];
        const fakturaType = checkFakturaType(this.state.faktura.fakturaType) ;
        if (fakturaType !== ALIS_FAKTURA && fakturaType !== SATIS_FAKTURA) {
            this.error('Faktura növü düzgün seçilməyib');
            return;
        }
        // ALIS_FAKTURA -> MƏXARİC
        // SATIS_FAKTURA -> MEDAXİL
        const kassaType = kassaTypeList[fakturaType === ALIS_FAKTURA ? 1 : 0];

        this.getMethod(BACKEND_URL + '/api/kassaitems/generatecode', this.processing, this.error, data => {
            this.setState(Object.assign({}, this.state, {
                kassaItem: Object.assign({}, this.state.kassaItem, {
                    code: data
                })
            }));
        });

        const {open, data} = faktura;
        const {fakturaNo, id, client, tarix} = data;
        return Object.assign({}, this.state.kassaItem, {
            id: 0,
            open: open,
            kbType: {value: 1, label: "Kassa"},
            kassaType: kassaType,
            faktura: {value: id, label: fakturaNo},
            client: client,
            tarix: tarix,
            status: 1,
        });
    };

    addKassaItemComponent = () => {
        return (
            <KassaItemsForm open={!!this.state.kassaItem.open}
                            isNagdOdenis={true}
                            data={
                                {
                                    valueData: this.state.kassaItem,
                                    compData: {
                                        kassaTypeList: kassaTypeList,
                                        kbTypeList: kbTypeList,
                                    },
                                    errors: {}
                                }
                            }
                            onChange={
                                event => {
                                    const {c, name, value} = event;
                                    let val = value;
                                    if (c === 'dt') {
                                        val = moment(event).unix();
                                    }
                                    this.setState(Object.assign({}, this.state, {
                                        kassaItem: Object.assign({}, this.state.kassaItem, {
                                            [name]: val
                                        })
                                    }));
                                }
                            }
                            dialogAction={
                                action => {
                                    if (action === 'close') {
                                        this.setState(Object.assign({}, this.state, {
                                            kassaItem: Object.assign({}, this.state.kassaItem, {
                                                open: false
                                            })
                                        }));
                                    } else if (action === 'agree') {
                                        const kassaItem = this.state.kassaItem;
                                        this.postMethod(BACKEND_URL + '/api/kassaitems/insupd', kassaItem, this.processing, this.error, data => {
                                            console.log('kassaitemsPostMethod: ', data);
                                            this.setState(Object.assign({}, this.state, {
                                                kassaItem: Object.assign({}, this.state.kassaItem, {
                                                    open: false
                                                }),
                                                snackBar: Object.assign({}, this.state.snackBar, {
                                                    show: true,
                                                    message: 'Операция müvəffəqiyyətlə tamamlandı',
                                                    variant: 'success'
                                                }),
                                            }));
                                        });

                                    } else if (action === 'disagree') {
                                        this.setState(Object.assign({}, this.state, {
                                            kassaItem: Object.assign({}, this.state.kassaItem, {
                                                open: false
                                            })
                                        }));
                                    }
                                }
                            }
            />
        );
    };

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
            if (component === 'ac' && (name === 'item' || name === 'serviceCard')) {
                //event.value.unitSetline burdaki unitsetline mal secerken onun uzerinde gelen unitsetitemlistdir
                //row.unitsetLine ise rowda secilen olcu vahididir

                row.unitsetLineList = event.value ? event.value.unitSetline : [];
                if (!event.value)
                    row.unitsetLine = null;

                const {faktura} = this.state;

                // mal secildiyi zaman malin uzerinde qiymet, vat, olcu vakidi varsa hemin melumatlari getirir
                this.loadItemData(
                    {
                        tarix: faktura.tarix ? faktura.tarix : null,
                        clientId: faktura.client ? faktura.client.value : null,
                        branchId: faktura.branch ? faktura.branch.value : null,
                        fakturaType: faktura.fakturaType ? faktura.fakturaType.value : null,
                        type: row.mxType ? row.mxType.value : null,
                        malxid: val ? val.value : null,
                    },
                    this.processing, error => console.log(error),
                    data => {
                        console.log('loadItemData: ', data);
                        const {price, vat, unitsetLine} = data;
                        row.price = price;
                        row.vat = vat;
                        row.unitsetLine = unitsetLine;
                    }
                );
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
                this.new(this.processing, this.error,
                    data => {

                        const obj = {
                            id: 0,
                            fakturaNo: data,
                            tarix: moment(new Date()).unix(),
                            fakturaType: this.state.faktura.fakturaType,
                            fakturaItemList: [],
                            kassaItem: {},
                        };

                        this.setState(Object.assign({}, this.state, {
                            faktura: obj,
                            showList: false,
                            errors: {},
                        }));
                    }
                );
            }
            else if (action === 'EDIT_ROW') {
                this.loadDataByFakturaId(event.id, this.processing, this.error, data => {
                    this.setState(Object.assign({}, this.state, {
                        faktura: data,
                        errors: {},
                        showList: false,
                        kassaItem: {},
                    }));
                });
            }
            else if (action === 'DELETE_ROW') {
                this.setState(Object.assign({}, this.state, {
                    dialogConfirm: this.dialogConfirmState(this.state.dialogConfirm, true, {id: event.id})
                }));
            }
            else if (action === 'FF_FAKTURA') {
                this.props.history.push({
                    pathname: this.props.match.url + '/fffaktura/' + event.data.id,
                    state: {fakturaNo: event.data.fakturaNo, client: event.data.client}
                })
            }
            else if (action === 'FAKTURA_PRINT') {
                const fakturaId = event.id;
                let reportId = -1;
                if (this.props.fakturaType === ALIS_FAKTURA) {
                    reportId = 38;
                } else if (this.props.fakturaType === SATIS_FAKTURA) {
                    reportId = 39;
                }

                if (!fakturaId) {
                    alert('Faktura seçilməyib!');
                    return;
                }

                if (reportId === -1) {
                    alert('Faktura növü düzgün seçilməyib!');
                    return;
                }

                const params = {
                    reportId: reportId,
                    fileType: "PDF",
                    requestParams: [
                        {name: "FAKID", isSet: 1, value: fakturaId},
                    ]
                };


                ReportUtils.getDownloadToken(params, this.processing, this.error, response => {
                    ReportUtils.openReport(response);
                });
            }
        }
        else if (clickFor === 'CONFIRM_DIALOG_CLICK') {
            if (action === 'yes') {
                const id = this.state.dialogConfirm.data.id;
                this.delete(id, this.processing, this.error, data => {
                    const rows = this.state.fakturaList.slice().filter(item => item.id !== id);
                    this.setState(Object.assign({}, this.state, {
                        fakturaList: rows,
                        snackBar: Object.assign({}, this.state.snackBar, {
                            show: true,
                            message: 'Информация успешно удалена',
                            variant: 'success'
                        }),
                        dialogConfirm: this.dialogConfirmState(this.state.dialogConfirm, true, {}, 'success'),
                    }));
                });

            } else {
                this.setState(Object.assign({}, this.state, {
                    dialogConfirm: this.dialogConfirmState(this.state.dialogConfirm, false, {}),
                }))
            }
        }

        else {
            if (action === 'CLICK_SAVE') {
                const {faktura} = this.state;
                if (this.checkIsNull(faktura))
                    return;

                this.insert(faktura, this.processing, this.error, data => {
                    const newRows = createDataTitle(data, this.handleOnClick);
                    const rows = this.updateTableRows(faktura.id, newRows, this.state.fakturaList);

                    const _kassaItem = faktura.showNagdOdenis && faktura.showNagdOdenis === 1 ? this.showKassaItem({
                        data: data,
                        open: true
                    }) : {};

                    this.setState(Object.assign({}, this.state, {
                        kassaItem: _kassaItem,
                        fakturaList: rows,
                        showList: true,
                        snackBar: Object.assign({}, this.state.snackBar, {
                            show: true,
                            message: ifNull(faktura.id, 0) === 0 ? 'Операция успешно завершена' : 'Информация успешно изменена',
                            variant: 'success'
                        }),
                    }));
                });

            } else if (action === 'CLICK_UNDO') {
                this.setState(Object.assign({}, this.state, {
                    faktura: {},
                    showList: true,
                }));
            }
        }
    };
    checkIsNull = faktura => {
        const err = {};
        const {tarix, fakturaNo, sourceWarehouse, fakturaType, client, fakturaItemList} = faktura;

        if (!tarix || tarix <= 0)
            err.tarix = true;

        if (!fakturaNo || fakturaNo === '')
            err.fakturaNo = true;

        if (!client || !client.value)
            err.client = true;

        if (!fakturaType || !fakturaType.value)
            err.fakturaType = true;

        if (!sourceWarehouse || !sourceWarehouse.value)
            err.sourceWarehouse = true;

        (fakturaItemList ? fakturaItemList : []).forEach((item, index) => {
            if (!item.amount || item.amount <= 0)
                err[crtErrTitle('amount', index)] = true;

            if ((item.mxType && item.mxType.value === 1) && (!item.item || item.item.value <= 0))
                err[crtErrTitle('item', index)] = true;

            if ((item.mxType && item.mxType.value === 2) && (!item.serviceCard || item.serviceCard.value <= 0))
                err[crtErrTitle('serviceCard', index)] = true;

            if (!item.price || item.price <= 0)
                err[crtErrTitle('price', index)] = true;

            if (!item.unitsetLine || item.unitsetLine.value <= 0)
                err[crtErrTitle('unitsetLine', index)] = true;

            if (!item.mxType || item.mxType.value <= 0)
                err[crtErrTitle('mxType', index)] = true;
        });

        this.setState(Object.assign({}, this.state, {
            snackBar: Object.assign({}, this.state.snackBar, {
                show: true,
                message: 'Məcburi xanaları doldurun',
                variant: 'error'
            }),
            errors: err
        }));
        console.log('checkIsNull: err: ', err);
        console.log('checkIsNull: fakturaItemList: ', fakturaItemList);
        return !isEmpty(err) || (fakturaItemList && fakturaItemList.length === 0);
    };
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

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

export default withStyles(styles)(connect(null, null)(Faktura));
