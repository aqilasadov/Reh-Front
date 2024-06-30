import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {LinearProgress} from "@material-ui/core/index";

const styles = theme => ({
    progress: {
        margin: theme.spacing(2),
    },
});

function Loading(props) {
    const { classes, ...others } = props;
    return (<LinearProgress variant={"indeterminate"} className={classes.progress} {...others} />);
    // return (<CircularProgress className={classes.progress} {...others} />);
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Loading);
