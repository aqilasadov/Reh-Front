import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {lighten} from '@material-ui/core/styles/colorManipulator';

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 50%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
});

function EnhancedTableToolbar(props) {
    const {title, actionComp, classes} = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
              //  [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                <Typography variant="title" id="tableTitle"> {title} </Typography>

            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                <div className={classes.row}>
                    {actionComp}
                </div>
            </div>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number,
    title: PropTypes.string.isRequired,
    actionComp: PropTypes.node,
};
EnhancedTableToolbar.defaultProps = {
    numSelected: 0
}
export default withStyles(toolbarStyles)(EnhancedTableToolbar);
