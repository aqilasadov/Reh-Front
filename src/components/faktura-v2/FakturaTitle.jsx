import Grid from "@material-ui/core/Grid";
import {ifNull} from "../../utils/Validator";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import {DatePicker} from "material-ui-pickers";
import * as moment from "moment";
import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "../common/ac/Autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

function FakturaTitle(props) {
    const [isLoading, setLoading] = useState(false);

    const {open, data, onChange, valueData} = props;
    const {compData, errors} = data;
    const SM = 2;
    console.log('FakturaTitle: ', valueData);

    let {fakturaCem, totalEDV, discount} = valueData;
    fakturaCem = ifNull(fakturaCem, 0);
    totalEDV = ifNull(totalEDV, 0);
    discount = (fakturaCem + totalEDV) * (ifNull(discount, 0) / 100);

    return (
        <Grid container spacing={1}>
            <Grid item md={10} xs={12}>
                <Paper style={{height: 200, width: '100%', padding: '15px', marginBottom: 5}}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={SM}>
                            <Autocomplete source={compData.fakturaTypeList}
                                          id={'fakturaType'}
                                          name={'fakturaType'}
                                          value={valueData.fakturaType}
                                          textFieldProps={{
                                              label: 'Faktura Növü',
                                              InputLabelProps: {
                                                  shrink: true
                                              },
                                              error: errors.fakturaTypeIsNull,
                                          }}
                                          fullWidth
                                          onChange={event => onChange({
                                              component: 'ac',
                                              name: 'fakturaType',
                                              value: event,
                                              isItems: false
                                          })}/>
                        </Grid>

                        <Grid item xs={12} sm={SM}>
                            <TextField
                                required
                                id="fakturaNo"
                                name="fakturaNo"
                                label="Faktura No"
                                fullWidth
                                error={errors.fakturaNoIsNull}
                                value={ifNull(valueData.fakturaNo)}
                                onChange={event => onChange({
                                    component: 'tf',
                                    name: event.target.name,
                                    value: event.target.value,
                                    isItems: false
                                })}
                            />
                        </Grid>

                        <Grid item xs={12} sm={SM * 2}>
                            <AsyncAutocomplete url={'/api/branch/ac?label='}
                                               id={'branch'}
                                               name={'branch'}
                                               value={valueData.branch}
                                               textFieldProps={{
                                                   label: 'Filial',
                                                   InputLabelProps: {
                                                       shrink: true
                                                   }
                                               }}
                                               onChange={event => onChange({
                                                   component: 'ac',
                                                   name: 'branch',
                                                   value: event,
                                                   isItems: false
                                               })}/>
                        </Grid>
                        <Grid item xs={12} sm={SM * 2}>
                            <AsyncAutocomplete url={'/api/clients/ac?label='}
                                               id={'client'}
                                               name={'client'}
                                               value={valueData.client}
                                               textFieldProps={{
                                                   label: 'Müştəri',
                                                   InputLabelProps: {
                                                       shrink: true
                                                   },
                                                   error: errors.clientIsNull,
                                               }}
                                               onChange={event => onChange({
                                                   component: 'ac',
                                                   name: 'client',
                                                   value: event,
                                                   isItems: false
                                               })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={SM * 2}>
                            <AsyncAutocomplete url={'/api/partiya/ac?label='}
                                               id={'partiya'}
                                               name={'partiya'}
                                               value={valueData.partiya}
                                               textFieldProps={{
                                                   label: 'Partiya',
                                                   InputLabelProps: {
                                                       shrink: true
                                                   }
                                               }}
                                // onCreateOption={
                                //     (val) => {
                                //         setLoading(true);
                                //         console.group('Option created');
                                //         console.log('Input value: ', val);
                                //         console.groupEnd();
                                //         setTimeout(() => setLoading(false), 3000);
                                //     }
                                // }
                                               isLoading={isLoading}
                                               isDisabled={isLoading}
                                               onChange={event => onChange({
                                                   component: 'ac',
                                                   name: 'partiya',
                                                   value: event,
                                                   isItems: false
                                               })}
                            />
                        </Grid>

                        <Grid item xs={12} sm={SM * 2}>
                            <AsyncAutocomplete url={'/api/warehouse/ac?label='}
                                               id={'warehouse'}
                                               name={'warehouse'}
                                               value={valueData.warehouse}
                                               textFieldProps={{
                                                   label: 'Anbar',
                                                   InputLabelProps: {
                                                       shrink: true
                                                   }
                                               }}
                                               isLoading={isLoading}
                                               isDisabled={isLoading}
                                               onChange={event => onChange({
                                                   component: 'ac',
                                                   name: 'warehouse',
                                                   value: event,
                                                   isItems: false
                                               })}

                            />
                        </Grid>
                        <Grid item xs={12} sm={SM}>
                            <DatePicker
                                style={{margin: 0, paddingTop: '5px'}}
                                fullWith={true}
                                margin="normal"
                                label="Дата"
                                clearable
                                fullWidth={true}
                                keyboar
                                value={!valueData.tarix || valueData.tarix === 0 ? new Date() : moment.unix(valueData.tarix).format("MM/DD/YYYY")}
                                format="DD/MM/YYYY"
                                onChange={event => onChange({
                                    component: 'dt',
                                    name: 'tarix',
                                    value: event,
                                    isItems: false
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={SM}>
                            <DatePicker
                                style={{margin: 0, paddingTop: '5px'}}
                                fullWith={true}
                                margin="normal"
                                label="Son ödəmə tarixi"
                                clearable
                                fullWidth={true}
                                keyboard
                                value={!valueData.payDate || valueData.payDate === 0 ? null : moment.unix(valueData.payDate).format("MM/DD/YYYY")}
                                format="DD/MM/YYYY"
                                onChange={event => onChange({
                                    component: 'dt',
                                    name: 'payDate',
                                    value: event,
                                    isItems: false
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={SM}>
                            <TextField
                                required
                                id="discount"
                                name="discount"
                                label="Endirim"
                                fullWidth
                                type={'number'}
                                value={ifNull(valueData.discount)}
                                onChange={event => onChange({
                                    component: 'tf',
                                    name: event.target.name,
                                    value: event.target.value,
                                    type: event.target.type,
                                    isItems: false,
                                })}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item md={2} xs={12}>
                <Paper style={{height: 200, width: '100%', padding: '5px', marginBottom: 5}}>
                    <Table padding={"none"}>
                        <TableBody>
                            {addRow('Faktura cəm:', fakturaCem.toFixed(2) + ' AZN')}
                            {addRow('ƏDV:', totalEDV.toFixed(2) + ' AZN')}
                            {addRow('Yekun:', (fakturaCem + totalEDV).toFixed(2) + ' AZN')}
                            {addRow('Endirim:', discount.toFixed(2) + ' AZN')}
                            {addRow('Ödənməli məbləğ:', (fakturaCem + totalEDV - discount).toFixed(2) + ' AZN')}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );

    function addRow(label, value) {
        return (
            <TableRow style={{height: 30}}>
                <TableCell align="left" style={{paddingLeft: 10}}>{label}</TableCell>
                <TableCell align="left">{value}</TableCell>
            </TableRow>);
    }
}

export default FakturaTitle;
