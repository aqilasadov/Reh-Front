import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Button from "../../components-tim/CustomButtons/Button";
import {Add} from "@material-ui/icons";
import CardIcon from "../../components-tim/Card/CardIcon";
import Assignment from "@material-ui/core/SvgIcon/SvgIcon";
import CardBody from "../../components-tim/Card/CardBody";
import ReactTable from "react-table";
import Card from "../../components-tim/Card/Card";
import * as React from "react";
import PropTypes from "prop-types";
import {cardTitle} from "../../assets/jss/core/material-dashboard-pro-react";
import {withStyles} from "@material-ui/core";

const columnsTitle = [
    {
        Header: "Faktura no",
        accessor: "fakturaNo"
    },
    {
        Header: "Faktura növü",
        accessor: "fakturaType"
    },
    {
        Header: "Filial",
        accessor: "branch"
    },
    {
        Header: "Müştəri",
        accessor: "client"
    },
    {
        Header: "Partiya",
        accessor: "partiya"
    },
    {
        Header: "Endirim",
        accessor: "discount"
    },
    // {
    //     Header: "Son ödə. tarixi",
    //     accessor: "payDate"
    // },
    {
        Header: "Tarix",
        accessor: "tarix",
    },
    {
        Header: "Операция",
        accessor: "action",
        sortable: false,
        filterable: false,
        style: {height: 50},
    }
];

function FakturaList(props) {
    const {handleOnClick, moduleName, rows, classes} = props;
    return (
        <Card style={{marginTop: "0px"}}>
            <CardHeader color="primary"
                        title={moduleName}
                        action={
                            <Button
                                justIcon
                                round
                                color="primary"
                                className={classes.marginRight}x
                                onClick={() => handleOnClick({
                                    clickFor: 'TITLE_MAIN_TABLE_CLICK',
                                    action: 'NEW_FAKTURA'
                                })}>
                                <Add/>
                            </Button>
                        }>
                <CardIcon color="primary">
                    <Assignment/>
                </CardIcon>
                <h4 className={classes.cardIconTitle}>{moduleName}</h4>
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
                    data={rows}
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
    );
}

FakturaList.propTypes = {
    handleOnClick: PropTypes.func.isRequired,
    moduleName: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
};

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

export default withStyles(styles)(FakturaList);
