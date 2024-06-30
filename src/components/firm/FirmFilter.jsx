import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import {ifNull} from "../../utils/Validator";
import CustomSelect from "../common/select/CustomSelect";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import accordionStyle from "../../assets/jss/components/accordionStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

function FirmFilter(props) {
    const {data, compData, onChange, onFilterButtonClick, onFilterClearButtonClick, classes} = props;
    const xs = 3;
    return (
        <ExpansionPanel defaultExpanded
                        classes={{
                            root: classes.expansionPanel,
                            expanded: classes.expansionPanelExpanded
                        }}
                        style={{
                            marginTop: 0,
                            marginLeft: 10,
                            padding: 10,
                        }}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                classes={{
                    root: classes.expansionPanelSummary,
                    expanded: classes.expansionPanelSummaryExpaned,
                    content: classes.expansionPanelSummaryContent,
                    expandIcon: classes.expansionPanelSummaryExpandIcon
                }}
            >
                <h4 className={classes.title}>Firmalar üzrə axtarış</h4>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                <Grid container spacing={3}>
                    <Grid item xs={xs}>
                        <CustomInput
                            id="name"
                            labelText={'Firmanın adı'}
                            formControlProps={{fullWidth: true}}
                            inputProps={{
                                onChange: onChange('name'),
                                name: 'name',
                                value: ifNull(data.name)
                            }}
                        />
                    </Grid>

                    <Grid item xs={xs}>
                        <CustomInput
                            id="voen"
                            labelText={'Vöen'}
                            formControlProps={{fullWidth: true}}
                            inputProps={{
                                onChange: onChange('voen'),
                                name: 'voen',
                                value: ifNull(data.voen)
                            }}
                        />
                    </Grid>




                </Grid>

            </ExpansionPanelDetails>
            <Divider/>
            <ExpansionPanelActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={onFilterClearButtonClick}> Təmizlə </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={onFilterButtonClick}> Axtar </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>);

}

FirmFilter.propTypes = {
    data: PropTypes.object.isRequired,
    compData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onFilterButtonClick: PropTypes.func.isRequired,
    onFilterClearButtonClick: PropTypes.func.isRequired,
};
export default withStyles(accordionStyle)(FirmFilter);

