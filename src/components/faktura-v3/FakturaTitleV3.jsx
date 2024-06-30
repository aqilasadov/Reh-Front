import React from "react";
import Grid from "@material-ui/core/Grid";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import {DatePicker} from "material-ui-pickers";
import * as moment from "moment";
import PropTypes from 'prop-types';
import {ifNull} from "../../utils/Validator";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "../common/ac/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {checkFakturaType} from "./FakturaHelper";

function FakturaTitleV3(props) {
    const {valueData, compData, onChange, errors} = props;

    console.log('FakturaTitleV3: ', valueData);

    const items = valueData.fakturaItemList;

    const totalEDV = (items ? items : []).reduce((accumulator, item) => accumulator +
        (item.vat && item.vat > 0 ? ((ifNull(item.amount, 0) * ifNull(item.price, 0)) * (item.vat / 100)) : 0), 0);
    const fakturaCem = (items ? items : []).reduce((accumulator, item) => accumulator +
        ifNull(item.amount, 0) * ifNull(item.price, 0), 0) - totalEDV;
    const discount = (fakturaCem + totalEDV) * (ifNull(valueData.discount, 0) / 100);

    const fakturaType = checkFakturaType(valueData.fakturaType);
    // let fakturaType = -1;
    // if (valueData.fakturaType) {
    //     if (valueData.fakturaType.value === 1 || valueData.fakturaType.value === 4)
    //         fakturaType = 1;
    //     else if (valueData.fakturaType.value === 2 || valueData.fakturaType.value === 5)
    //         fakturaType = 2;
    // }

    // console.log('fakturaType: ', valueData.fakturaType, ' - ', fakturaType);

    const sm = 2;
    return (
        <Grid container spacing={1}>
            <Grid item md={9} xs={10}>
                <Paper style={{height: 200, width: '100%', padding: '15px', marginBottom: 5}}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={sm + 1}>
                            <Autocomplete source={compData ? compData.fakturaTypeList : []}
                                          id={'fakturaType'}
                                          name={'fakturaType'}
                                          value={valueData.fakturaType}
                                          textFieldProps={{
                                              label: 'Faktura Növü',
                                              InputLabelProps: {
                                                  shrink: true
                                              },
                                              error: errors["fakturaType"]
                                          }}
                                          fullWidth
                                          onChange={event => onChange({
                                              component: 'ac',
                                              name: 'fakturaType',
                                              value: event,
                                              isTitle: true,
                                          })}/>
                        </Grid>
                        <Grid item xs={12} sm={sm + 1}>
                            <TextField
                                style={{paddingTop: 4}}
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
                        <Grid item xs={12} sm={sm + 1}>
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
                                                   isTitle: true,
                                               })}/>
                        </Grid>
                        <Grid item xs={12} sm={sm + 1}>
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
                                               onChange={event => onChange({
                                                   component: 'ac',
                                                   name: 'partiya',
                                                   value: event,
                                                   isTitle: true,
                                               })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={sm * 3}>
                            <AsyncAutocomplete url={`/api/clients/ac?typeId=${fakturaType}&label=`}
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
                                                   isTitle: true,
                                               })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={sm + 4}>
                            <AsyncAutocomplete url={'/api/warehouse/ac?label='}
                                               id={'sourceWarehouse'}
                                               name={'sourceWarehouse'}
                                               value={valueData.sourceWarehouse}
                                               textFieldProps={{
                                                   error: errors["sourceWarehouse"],
                                                   label: 'Anbar',
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
                        <Grid item xs={12} sm={sm}>
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
                        <Grid item xs={12} sm={sm}>
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
                                    isTitle: true,
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={sm}>
                            <TextField
                                style={{paddingTop: 4}}
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
                                    isTitle: true,
                                })}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id={'note'}
                                name={'note'}
                                placeholder="Qeyd"
                                multiline={true}
                                fullWidth={true}
                                rows={2}
                                rowsMax={2}
                                value={ifNull(valueData.note)}
                                onChange={event => onChange({
                                    component: 'tf',
                                    name: event.target.name,
                                    value: event.target.value,
                                    type: event.target.type,
                                    isTitle: true,
                                })}
                                style={{marginTop: 1}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={'showNagdOdenis'}
                                        name={'showNagdOdenis'}
                                        value={valueData.showNagdOdenis ? 1 : 0}
                                        checked={valueData.showNagdOdenis && valueData.showNagdOdenis === 1}
                                        onClick={event => onChange({
                                            component: 'cb',
                                            name: event.target.name,
                                            value: event.target.checked ? 1 : 0,
                                            isTitle: true,
                                        })}
                                    />
                                }
                                label="Nəğd ödəniş"
                            />
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
            <Grid item md={3} xs={2}>
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

FakturaTitleV3.propTypes = {
    valueData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};
export default FakturaTitleV3;
