import React from "react";
import PageWrapper from "./PageWrapper";
import FakturaV2 from "../components/faktura-v2/FakturaV2";
import {Route, Switch} from "react-router-dom";
import FFFaktura from "../components/ff-faktura/FFFaktura";
import PropTypes from 'prop-types';
import Faktura from "../components/faktura-v3/Faktura";

function FakturaPageV2(props) {
    console.log('props', props);
    const fakturaType = props.fakturaType;
    const {fakturaNo, client} = props.location.state ? props.location.state : {};
    return (
        <PageWrapper {...props} component={
            <Switch>
                <Route exact path={`${props.match.url}`} component={
                    // (props) => <FakturaV2 fakturaType={fakturaType} {...props}/>
                    (props) => <Faktura fakturaType={fakturaType} {...props}/>
                }/>

                <Route exact={false} path={`${props.match.url}/fffaktura/:fakturaId`}
                       component={
                           (props) => <FFFaktura {...props} fakturaId={props.match.params.fakturaId}
                                                 data={{fakturaNo, client}}/>}
                />

            </Switch>}
        />
    )
}

FakturaPageV2.propTypes = {
    fakturaType: PropTypes.number.isRequired,
};
export default FakturaPageV2;
