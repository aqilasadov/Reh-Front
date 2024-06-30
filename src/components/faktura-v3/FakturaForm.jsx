import * as React from "react";
import {Fragment} from "react";
import Loading from "../common/Loading";
import FakturaLines from "./FakturaLines";
import PropTypes from "prop-types";
import FakturaTitleV3 from "./FakturaTitleV3";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Undo from "@material-ui/icons/Undo";

function FakturaForm(props) {
    const {processing, errors, faktura, compData, onChange, onClick, classes} = props;
    return (
        <Fragment>
            {processing && <Loading/>}
            <FakturaTitleV3 valueData={faktura} onChange={onChange} errors={errors} compData={compData}/>

            <Grid container>
                <Grid item xs={12}>
                    <FakturaLines faktura={faktura} errors={errors} compData={compData} onChange={onChange}
                                  onClick={onClick}/>
                </Grid>

                <Grid item xs={12}>
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button
                            disabled={processing}
                            style={{margin: 10}}
                            onClick={() => onClick({action: 'CLICK_UNDO'})}
                            variant="contained"
                            color="secondary">
                            Geri Qayıt
                            <Undo/>
                        </Button>

                        <Button
                            disabled={processing}
                            style={{margin: 10}}
                            onClick={() => onClick({action: 'CLICK_SAVE'})}
                            variant="contained"
                            color="secondary">
                            Yaddaşa al
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

        </Fragment>
    );
}

FakturaForm.propTypes = {
    faktura: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    compData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default FakturaForm;
