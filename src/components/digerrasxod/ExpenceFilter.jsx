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
import {DatePicker} from "material-ui-pickers";
import * as moment from "moment";
import Print from "@material-ui/icons/Print";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import classNames from "classnames";
import Autocomplete from "../common/ac/Autocomplete";


function TransferFilter(props) {
    const {data, compData, onChange, onFilterButtonClick, onFilterClearButtonClick,onFilterClearButtonClick2,onFilterClearButtonClick22,onFilterClearButtonClick3,onFilterClearButtonClick4} = props;
    const xs = 3;
    console.log("combdata22",compData);
    return (
        <ExpansionPanel defaultExpanded>
            {/*<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>*/}
            {/*    <Typography variant="title">Şəxslər üzrə axtarış</Typography>*/}
            {/*</ExpansionPanelSummary>*/}
            <ExpansionPanelDetails>

                <Grid container spacing={3}>


                    <Grid item xs={xs}>
                        {/*<CustomSelect id={'client'} value={data.client.value}*/}
                        {/*              formControl={{fullWidth: true, style:{margin: 0}}}*/}
                        {/*              label={'Клиент'}*/}
                        {/*              data={compData.clientList}*/}
                        {/*              onChange={onChange('client')}/>*/}

                        <Autocomplete source={compData.etList}
                                      id={'client'}
                                      name={'client'}
                                      value={data.client}
                                      textFieldProps={{
                                          label:'Расходы',
                                          InputLabelProps: {
                                              shrink: true,
                                          }
                                      }}
                                      onChange={onChange('client')}/>

                    </Grid>
                    <Grid item xs={xs}>
                    <DatePicker
                        style={{margin:0, paddingTop: '0px'}}
                        fullWith={true}
                        margin="normal"
                        label="От даты"
                        clearable
                        fullWidth={true}
                        keyboard
                        value={!data.begdate || data.begdate === 0 ? null : new Date(0).setUTCSeconds(data.begdate)}

                        format="DD/MM/YYYY"
                        onChange={onChange('begdate')}
                    />
                    </Grid>

                    <Grid item xs={xs}>
                        <DatePicker
                            style={{margin:0, paddingTop: '0px'}}
                            fullWith={true}
                            margin="normal"
                            label="До даты"
                            clearable
                            fullWidth={true}
                            keyboard
                            value={!data.enddate || data.enddate === 0 ? null : new Date(0).setUTCSeconds(data.enddate)}
                            format="DD/MM/YYYY"
                            onChange={onChange('enddate')}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button justIconThin round simple
                                onClick={onFilterClearButtonClick2}
                                color="primary">
                            <Print/>
                            Эмин отчет
                        </Button>
                    </Grid>
                </Grid>


                {/*<Button justIconThin round simple*/}
                {/*        onClick={onFilterClearButtonClick}*/}
                {/*        color="primary">*/}
                {/*    <Print/>*/}
                {/*    Касса*/}
                {/*</Button>*/}

                {/*<Button justIconThin round simple*/}
                {/*        onClick={onFilterClearButtonClick22}*/}
                {/*        color="primary">*/}
                {/*    <Print/>*/}
                {/*    КО-excel*/}
                {/*</Button>*/}
                {/*<Button justIconThin round simple*/}
                {/*        onClick={onFilterClearButtonClick4}*/}
                {/*        color="primary">*/}
                {/*    <Print/>*/}
                {/*    Отчет клиента*/}
                {/*</Button>*/}
                {/*<Button justIconThin round simple*/}
                {/*        onClick={onFilterClearButtonClick3}*/}
                {/*        color="primary">*/}
                {/*    <Print/>*/}
                {/*    Экстра для касса*/}
                {/*</Button>*/}
            </ExpansionPanelDetails>
            <Divider/>
            <ExpansionPanelActions>

                <Button
                    size="small"
                    color="primary"
                    onClick={onFilterButtonClick}> Поиск </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>);
}

TransferFilter.propTypes = {
    data: PropTypes.object.isRequired,
    compData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onFilterButtonClick: PropTypes.func.isRequired,
    onFilterClearButtonClick: PropTypes.func.isRequired,
};
export default TransferFilter;

