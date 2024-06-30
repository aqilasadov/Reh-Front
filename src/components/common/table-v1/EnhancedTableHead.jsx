import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from "@material-ui/core/es/TextField/TextField";
import {isEmpty} from "../../../utils/Validator";

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };
    render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, cols, disableFilterColumns, onFilterChange, filterCols} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {cols.map((row, index) => {
                        return (
                            <TableCell
                                key={row.id}
                                // numeric={row.numeric}
                                padding={row.disablePadding ? 'checkbox' : 'default'}
                                {...row.style}
                                sortDirection={orderBy === index ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === index}
                                        direction={order}
                                        onClick={this.createSortHandler(index)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
                {
                    this.props.showFilter &&
                    <TableRow>
                        <TableCell/>
                        {
                            cols.map((item, index) => {
                                if (!isEmpty(disableFilterColumns) && disableFilterColumns.find(item => item === index + 1)) {
                                    return (<TableCell key={'tcd_' + (index + 1)}/>);
                                }

                                return (<TableCell padding={"none"} key={'tc_' + index}>
                                    <TextField
                                        key={'fc_' + index}
                                        required
                                        id={"filterCol_" + index}
                                        name={"filterCol_" + index}
                                        style={{with: '80%', paddingRight: 5}}
                                        value={isEmpty(filterCols["filterCol_" + index]) ? '' : filterCols["filterCol_" + index]}
                                        onChange={onFilterChange(index)}
                                    />
                                </TableCell>);
                            })
                        }
                    </TableRow>
                }
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
    cols: PropTypes.array.isRequired,
    disableFilterColumns: PropTypes.array.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    filterCols: PropTypes.array.isRequired,
    showFilter: PropTypes.bool
};
EnhancedTableHead.defaultProps ={
    showFilter: false
};


export default EnhancedTableHead;
