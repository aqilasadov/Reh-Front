import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import {isEmpty} from "../../../utils/Validator";



function desc(a, b, orderBy) {
    if (b[orderBy + 1] < a[orderBy + 1]) {
        return -1;
    }
    if (b[orderBy + 1] > a[orderBy + 1]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    table: {
        minWidth: 400,
       // minHeight: 250,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 0,
            selected: [],
            filterCols: [],
            data: this.props.data,
            page: 0,
            rowsPerPage: 5,
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };
    handleSelectAllClick = event => {
        if (!this.props.multipleSelect)
            return;
        if (event.target.checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };
    handleClick = (event, id) => {
        const {selected} = this.state;
        let newSelected = [];
        if (!this.props.multipleSelect) {
            newSelected[0] = id;
        } else {
            const selectedIndex = selected.indexOf(id);
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }
        }
        this.setState({selected: newSelected});

        if (this.props.onSelected !== undefined) {
            this.props.onSelected(this.props.data.rows.filter(row => newSelected.indexOf(row[0]) !== -1));
        }
    };
    handleChangePage = (event, page) => {
        this.setState({page});
    };
    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };
    isSelected = id => this.state.selected.indexOf(id) !== -1;

    filterOnChange = colIndex => event => {
        const value = event.target.value;
        const newRows = this.props.data.rows.slice();
        const filterCols = {["filterCol_" + colIndex]: value};
        this.setState(Object.assign({}, this.state, {
                data: Object.assign({}, this.state.data, {
                    rows: isEmpty(value) ? newRows : newRows.filter(item => item[colIndex + 1].indexOf(value) > -1)
                }),
                filterCols: Object.assign({}, this.state.filterCols, filterCols)
            })
        );
    };
    isFiltered = () => {
        let f = false;
        this.state.data.cols.forEach((item, index) => {
            if (this.state.filterCols['filterCol_'+index] !== undefined && !isEmpty(this.state.filterCols['filterCol_'+index]))
                f = true;
        });
        return f;
    };

    render() {

        if (!this.isFiltered()){
            this.state.data.rows = this.props.data.rows;
        }

        const {classes, headTitle, actionComp, onSelected, disableFilterColumns, hideToolbar, ...rootProps} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const {cols, rows, rowStyle} = data;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <Paper className={classes.root} {...rootProps}>
                {
                    !hideToolbar &&
                    <EnhancedTableToolbar numSelected={selected.length} title={headTitle}
                                          actionComp={actionComp}/>
                }

                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={rows.length}
                            cols={cols}
                            disableFilterColumns={disableFilterColumns}
                            onFilterChange={this.filterOnChange}
                            filterCols={this.state.filterCols}/>
                        <TableBody>
                            {
                                stableSort(rows, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(row => {
                                        const id = row[0];
                                        const isSelected = this.isSelected(id);
                                        const rowSlice = row.slice(1);
                                        let i = 0;
                                        return (
                                            <TableRow
                                                style={{height: '36px'}}
                                                hover
                                                onClick={event => this.handleClick(event, id)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={id}
                                                selected={isSelected}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isSelected}/>
                                                </TableCell>
                                                {
                                                    rowSlice.map(item =>
                                                        <TableCell
                                                        key={id + '' + i} {...rowStyle[i++]}>{item}</TableCell>)
                                                }
                                            </TableRow>
                                        );
                                    })}
                            {
                                emptyRows > 0 &&
                                (
                                    <TableRow style={{height: 49 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }


}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    headTitle: PropTypes.string.isRequired,
    actionComp: PropTypes.node,
    multipleSelect: PropTypes.bool,
    onSelected: PropTypes.func,
    disableFilterColumns: PropTypes.array,
    hideToolbar: PropTypes.bool,
};
EnhancedTable.defaultTypes = {
    multipleSelect: false,
    disableFilterColumns: [],
    hideToolbar: false,
};
export default withStyles(styles)(EnhancedTable);
