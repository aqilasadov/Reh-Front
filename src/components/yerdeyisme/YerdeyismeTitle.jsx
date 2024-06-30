import React from "react";
import Grid from "@material-ui/core/Grid";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import {DatePicker} from "material-ui-pickers";
import * as moment from "moment";
import PropTypes from 'prop-types';
import {ifNull} from "../../utils/Validator";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";


function YerdeyismeTitle(props) {
    const {valueData, onChange, errors} = props;
    return (
        <Paper style={{height: 200, width: '100%', padding: '15px', marginBottom: 5}}>
            <Grid container spacing={1}>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        error={errors["fakturaNo"]}
                        id="fakturaNo"
                        name="fakturaNo"
                        label="Faktura No"
                        fullWidth
                        value={ifNull(valueData.fakturaNo)}
                        onChange={event => onChange({
                            isTitle: true,
                            component: 'tf',
                            name: event.target.name,
                            value: event.target.value,
                        })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AsyncAutocomplete url={'/api/warehouse/ac?label='}
                                       id={'sourceWarehouse'}
                                       name={'sourceWarehouse'}
                                       value={valueData.sourceWarehouse}
                                       textFieldProps={{
                                           error: errors["sourceWarehouse"],
                                           label: 'Mənbə anbar',
                                           InputLabelProps: {
                                               shrink: true
                                           }
                                       }}
                                       onChange={event => onChange({
                                           isTitle: true,
                                           component: 'ac',
                                           name: 'sourceWarehouse',
                                           value: event,
                                       })}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AsyncAutocomplete url={'/api/warehouse/ac?label='}
                                       id={'destWarehouse'}
                                       name={'destWarehouse'}
                                       value={valueData.destWarehouse}
                                       textFieldProps={{
                                           error: errors["destWarehouse"],
                                           label: 'Göndərilən anbar',
                                           InputLabelProps: {
                                               shrink: true
                                           }
                                       }}
                                       onChange={event => onChange({
                                           isTitle: true,
                                           component: 'ac',
                                           name: 'destWarehouse',
                                           value: event,
                                       })}

                    />
                </Grid>
                <Grid item>
                    <DatePicker
                        error={errors["tarix"]}
                        style={{margin: 0, paddingTop: '5px'}}
                        fullWith={true}
                        margin="normal"
                        label="Tarix"
                        clearable
                        fullWidth={true}
                        keyboar
                        value={!valueData.tarix || valueData.tarix === 0 ? new Date() : moment.unix(valueData.tarix).format("MM/DD/YYYY")}
                        format="DD/MM/YYYY"
                        onChange={event => onChange({
                            isTitle: true,
                            component: 'dt',
                            name: 'tarix',
                            value: event,
                        })}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

YerdeyismeTitle.propTypes = {
    valueData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};
export default YerdeyismeTitle;
