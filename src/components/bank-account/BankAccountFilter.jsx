import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";
import CustomSelect from "../common/select/CustomSelect";
import TextField from "@material-ui/core/TextField";


function BankAccountFilter(props) {
    const {data, compData, onChange, onFilterButtonClick, onFilterClearButtonClick} = props;
    const xs = 3;
    return (
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography variant="title">Şəxslər üzrə axtarış</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

                <Grid container spacing={3}>
                    <Grid item xs={xs}>
                        <TextField
                            fullWidth={true}
                            id="code"
                            name={'code'}
                            label="Kodu"
                            value={data.code}
                            onChange={onChange('code')}
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </Grid>
                    <Grid item xs={xs}>
                        <TextField
                            fullWidth={true}
                            id="name"
                            name={'name'}
                            label="Adı"
                            value={data.name}
                            onChange={onChange('name')}
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </Grid>
                    <Grid item xs={xs}>
                        <TextField
                            fullWidth={true}
                            id="accountNo"
                            name={'accountNo'}
                            label="Hesab nömrəsi"
                            value={data.accountNo}
                            onChange={onChange('accountNo')}
                            InputLabelProps={{
                                shrink: true,
                            }}/>
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

BankAccountFilter.propTypes = {
    data: PropTypes.object.isRequired,
    compData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onFilterButtonClick: PropTypes.func.isRequired,
    onFilterClearButtonClick: PropTypes.func.isRequired,
};
export default BankAccountFilter;

