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
} from "./Kassa2DigerV3Helper";
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
import ItemCardAmountForm from "./Kassa2DigerV3Form";
import * as moment from "moment";
import 'moment-timezone';
import Loading from "../common/Loading";
import CoreComponent from "../common/CoreComponent";
import {BACKEND_URL, BEGDATE, CLIENT_ID, ENDDATE} from "../../utils/Constants";


import ExcelJS from 'exceljs/dist/exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid } from 'devextreme/excel_exporter';
import {Export} from "devextreme-react/bar-gauge";
import DataGrid, {
    Column, ColumnChooser, ColumnFixing, Editing, FilterRow,
    Grouping, GroupItem,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel, Summary
} from 'devextreme-react/data-grid';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import TransferFilter from "./Kassa2FilterV3";
import ReportUtils from "../../container/Reports/ReportUtils";



export function gridAddEditButton(data) {

    const {id, onClick,updateId} = data;

    console.log('updateIdddddd',id,updateId);
    return (
        <div style={{display: 'flex', justifyContent: 'center',}}>

            {/*{ <Tooltip title="Redaktə et" style={{paddingTop: 0, paddingBottom: 0}}>*/}
            {/*    <IconButton ariagridAddEditButton-label="Redaktə et" onClick={() => onClick(id,'edit')}>*/}
            {/*        <Icon>edit</Icon>*/}
            {/*    </IconButton>*/}
            {/*</Tooltip>}*/}

            {/*{*/}
            {/*    <Tooltip title="Məlumatln silinməsi" style={{paddingTop: 0, paddingBottom: 0}}>*/}
            {/*        <IconButton aria-label="Məlumatln silinməsi" onClick={() => onClick(id, 'delete')}>*/}
            {/*            <Icon>delete</Icon>*/}
            {/*        </IconButton>*/}
            {/*    </Tooltip>}*/}

        </div>);
}

const dataGridRef = React.createRef();
const pageSizes = [50, 100,200];

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class Trans1 extends CoreComponent {
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

    onCellPrepared(e) {
        if (e.rowType === "data") {
            // if (e.data.OrderDate < new Date(2014, 2, 3)) {
            //     e.cellElement.classList.add("oldOrder");
            // }
            console.log("POL",e.data.fakturaTypeValue);
            if (e.data.fakturaTypeValue === 1) {
                if ((e.column.dataField === "mebleg") || (e.column.dataField === "yekun")){
                    e.cellElement.classList.add("highAmountOrder_employee");
                }
                // if (e.column.dataField === "mebleg") {
                //     e.cellElement.classList.add("highAmountOrder_saleAmount");
                // }
            }
        }
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>

                <TransferFilter
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
                    {/*<CardHeader color="primary"*/}
                    {/*            title={MODULE_NAME}*/}
                    {/*            action={*/}
                    {/*                <Button*/}
                    {/*                    justIcon*/}
                    {/*                    round*/}
                    {/*                    color="primary"*/}
                    {/*                    className={classes.marginRight}*/}
                    {/*                    onClick={() => this.handleTableAction(0, 'add')}>*/}
                    {/*                    <Add/>*/}
                    {/*                </Button>*/}
                    {/*            }>*/}
                    {/*    <CardIcon color="primary">*/}
                    {/*        <Assignment/>*/}
                    {/*    </CardIcon>*/}
                    {/*    <h4 className={classes.cardIconTitle}>{MODULE_NAME}</h4>*/}
                    {/*</CardHeader>*/}
                    <CardBody>
                        {/*<ReactTable*/}
                        {/*    rowsText={'Sətir'}*/}
                        {/*    ofText={'dən'}*/}
                        {/*    pageText={'Səhifə'}*/}
                        {/*    previousText={'Əvvəlki'}*/}
                        {/*    nextText={'Növbəti'}*/}
                        {/*    noDataText={'Məlumat yoxdur'}*/}
                        {/*    onFetchData={(s, i) => console.log('onFetchData', s)}*/}
                        {/*    data={this.state.tableData}*/}
                        {/*    filterable*/}
                        {/*    columns={columns}*/}
                        {/*    defaultPageSize={10}*/}
                        {/*    showPaginationBottom={true}*/}
                        {/*    className="-striped -highlight"*/}
                        {/*    style={{*/}
                        {/*        height: "500px" // This will force the table body to overflow and scroll, since there is not enough room*/}
                        {/*    }}*/}
                        {/*/>*/}

                        <DataGrid
                            ref={dataGridRef}
                            dataSource={this.state.tableData}
                            allowColumnReordering={true}
                            // new
                            keyExpr="id"
                            allowColumnResizing={true}
                            rowAlternationEnabled={true}
                            showRowLines={true}
                            focusedRowEnabled={true}
                            headerFilter={{visible: true}}
                            columnAutoWidth={true}
                            ///
                            // columns={columns}
                            showBorders={true}
                            onContentReady={this.onContentReady}
                            onExporting={this.onExporting}
                            onCellPrepared={this.onCellPrepared}>
                            <GroupPanel visible={true} emptyPanelText="Группа" />
                            <SearchPanel visible={true} highlightCaseSensitive={true} />
                            <Grouping autoExpandAll={true} />
                            <FilterRow visible={true}  />
                            <SearchPanel visible={true} />
                            <ColumnChooser enabled={true} />
                            <ColumnFixing enabled={true} />
                            <Column dataField={'begdate'} caption={'Дата'}/>
                            {/*<Column dataField={'fakturaType2'} caption={'Тип операции'} width={'70'}/>*/}
                            {/*<Column dataField={'client'} caption={'Клиент1'}/>*/}

                            <Column dataField={'mebleg'} caption={'Сумма'}/>
                            <Column dataField={'currencyKassa'} caption={'Валюта'}/>


                            <Column dataField={'begdate_turk'} caption={'Дата подтвержденные'}/>
                            <Column dataField={'alan'} caption={'Имя и фамилия'}/>
                            <Column dataField={'qeyd'} caption={'Заметка'}/>
                            <Column dataField={'qeyd_turk'} caption={'Подтвержденные Заметка'}/>
                            {/*<Column dataField={'currency'} caption={'Валюта'}/>*/}
                            {/*<Column dataField={'faiznew1'} caption={'Курс'}/>*/}

                            {/*<Column dataField={'client2'} caption={'Клиент2'}/>*/}
                            {/*<Column dataField={'currency'} caption={'Счет 2'}/>*/}
                            {/*<Column dataField={'qeydyekunCurrentKassa'} caption={'Сумма2'}/>*/}

                            {/*<Column dataField={'qazanc'} caption={'Доход'}/>*/}
                            {/*<Column dataField={'create_user'} caption={'Создатель'}/>*/}
                            {/*<Column dataField={'update_user'} caption={'Редактор'}/>*/}
                            <Column dataField={'id'} caption={''}
                                    cellRender={row => {

                                        return gridAddEditButton({
                                            id: row.data.id,
                                            updateId:row.data.updateId,
                                            // deleteAccess: PRIV_EC_CREATE_APPLICANT,
                                            // editAccess: PRIV_EC_CREATE_APPLICANT,
                                            onClick: this.handleTableAction
                                        });

                                    }}
                                    allowFiltering={true}
                                    fixedPosition={'right'}
                                    fixed={true}
                                    allowSorting={false}/>





                            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true}  showInfo={true} />
                            <Paging defaultPageSize={25} />
                            <Summary>
                                <GroupItem
                                    summaryType="count"
                                />
                            </Summary>
                            <Export enabled={true}  fileName={'Applicants'}  allowExportSelectedData={true}/>
                        </DataGrid>






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

    onExporting(e) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');

        exportDataGrid({
            component: e.component,
            worksheet: worksheet,
            autoFilterEnabled: true
        }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExportList.xlsx');
            });
        });
        e.cancel = true;
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
    getCurPrice = ({
        currency = this.state.formData.valueData.currency.value,
        currencyKassa = this.state.formData.valueData.currencyKassa.value,
        date = this.state.formData.valueData.begdate
    }={}) =>{
        this.getMethod(BACKEND_URL + "/api/currency/getcurpricewithparam/" + currency + "/" + currencyKassa + "/" + date, this.processing , this.error , data=>{
            const valueData = this.state.formData.valueData;
            valueData.faiznew2 = data;
            this.setState(Object.assign({}, this.state.formData , {valueData}))
        })
    }

    handleOnChange = name => event => {
        let val;
        let yekundeger = 0;
        let qazanc = 0;
        if(name === "currency" || name === "currencyKassa"){
            val = event;
            this.getCurPrice({[name]: event.value})
        }
        else if (name === 'fakturaType2' || name === 'item' || name === 'unitsetGrp' || name === 'client' || name === 'client2' || name === 'branch')
            val = event;
        // else if(name === 'currency') {
        //     const errors = new Errors();
        //     let valueData = new ValueData();
        //     valueData = this.state.formData.valueData;
        //     if(ifNull(this.state.formData.valueData.currencyKassa.value, 0) === event.value){
        //         valueData.faiznew2 = 0;
        //     }else {
        //         if( event.value===3)
        //             valueData.faiznew2 = this.state.formData.compData.currateDefEuro;
        //             else
        //             valueData.faiznew2 = this.state.formData.compData.currateDef;

        //     }
        //     this.setState(Object.assign({}, this.state, {
        //         dialogAddEdit: this.dialogAddEditState(true),
        //         formData: Object.assign({}, this.state.formData, {valueData, errors})
        //     }));
        //     val = event;
        // }

        // else if(name === 'currencyKassa')
        // {
        //     const errors = new Errors();
        //     let valueData = new ValueData();
        //     valueData = this.state.formData.valueData;

        //     if(ifNull(this.state.formData.valueData.currency.value, 0) === event.value){
        //         valueData.faiznew2 = 0;
        //     }else {
        //         if(this.state.formData.valueData.currency.value===3)
        //             valueData.faiznew2 = this.state.formData.compData.currateDefEuro;
        //         else
        //             valueData.faiznew2 = this.state.formData.compData.currateDef;

        //     }

        //     this.setState(Object.assign({}, this.state, {
        //         dialogAddEdit: this.dialogAddEditState(true),
        //         formData: Object.assign({}, this.state.formData, {valueData, errors})
        //     }));
        //     val = event;
        // }

        else if (name === 'isActive')
            val = event.target.checked ? 1 : 0;


        else if (name === 'begdate' || name === 'begdate_turk')
            //moment(new Date()).unix();
            // val = moment(event).unix();
         // val = new Date(event).getTime() / 1000{
        {
         //   new Date(0).setUTCSeconds(valueData.startDate)
           // val =moment(event).unix().utc();
         //   val =moment.utc(new Date(event)).unix();
         //  val=new Date(0).setUTCSeconds(event);
          //  val=moment(new Date(event.dateFormat())).unix();
            val = moment(event).unix();
            this.getCurPrice({date:val})
            console.log("moment", val);
        }
        else val = event.target.value;


        // if (name === 'mebleg') {
        //     yekundeger = parseFloat(ifNull(val, 0)) + ((parseFloat(ifNull(val, 0)) / 100) * parseFloat(ifNull(this.state.formData.valueData.faiz, 0)));
        //     qazanc=(parseFloat(ifNull(val, 0)).toFixed(2) / 100)* parseFloat(ifNull(this.state.formData.valueData.faiz, 0));
        // }
        // if (name === 'faiz') {
        //     yekundeger = parseFloat(ifNull(this.state.formData.valueData.mebleg, 0)) + ((parseFloat(ifNull(this.state.formData.valueData.mebleg, 0)) / 100) * parseFloat(ifNull(val, 0)));
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
    // handleOnChangeFilterData = type => event => {
    //     let val = (event.target.name === 'cardType' || event.target.name === 'currency') ?
    //         new ValueLabel(event.target.value, '') :
    //         event.target.value;
    //     this.setState(Object.assign({}, this.state, {
    //         filterData: Object.assign({}, this.state.filterData, {[event.target.name]: val})
    //     }));
    // };
    // handleClearButtonClick = () => {
    //     const filterData = new FilterData();
    //     this.setState(Object.assign({}, this.state, {filterData: filterData}));
    //
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
    // handleClearButtonClick = () => {
    //     // const filterData = new FilterData();
    //     // this.setState(Object.assign({}, this.state, {filterData: filterData}));
    //
    // };
    handleFilterButtonClick = () => {
        this.loadData();
        // let a=this.state.valuetab;
        // console.log("aa",a)
        // this.setState(Object.assign({}, this.state, {valuetab: 2}));


        //    this.setState(Object.assign({}, this.state, {valuetab: 0}));


        localStorage.setItem(CLIENT_ID, this.state.filterData.client.value);
        localStorage.setItem(BEGDATE, this.state.filterData.begdate);
        localStorage.setItem(ENDDATE, this.state.filterData.enddate);

    };



    handleClearButtonClick = () => {
        const params = {
            reportId: 51,
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
                reportId: 53,
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




    handleClearButtonClick22 = () => {

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
                reportId: 53,
                fileType: "XLS",
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
    handleClearButtonClick4 = () => {
        console.log('nese2',this.state.filterData.client.value);
        const params = {
            reportId: 46,
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


    // Dialoglar uzerindeki actionlarin handle oldugu  function
    handleDialogAction = type => action => {

        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        console.log(type, action);
        if (type === 'addedit') {
            if (action === 'agree') {
                this.insertUpdate();
                sleep(2000).then(() => {
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



        if (action === 'add') {
            this.getMethod(BACKEND_URL + '/api/itemcardamount/generatecode', this.processing, this.error, data => {
                const errors = new Errors();
                const valueData = new ValueData();
                valueData.code = data;
                valueData.faiznew2 = null;
                this.setState(Object.assign({}, this.state, {
                    dialogAddEdit: this.dialogAddEditState(true),
                    formData: Object.assign({}, this.state.formData, {valueData, errors})
                }));
            });
        } else if (action === 'edit') {
            console.log("handleTableAction555",id, action)
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

        if (!valueData.qeyd_turk

         ) {
            this.setState(Object.assign({}, this.state, {
                formData: Object.assign({}, this.state.formData, {
                    errors: Object.assign({}, this.state.formData.errors, {
                        qeyd_turkIsNull: !valueData.qeyd_turk || valueData.mebleg.value === '',
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

export default withStyles(styles)(connect(null, null)(Trans1));
