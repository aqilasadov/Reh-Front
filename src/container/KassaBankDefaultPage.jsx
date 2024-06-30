import React from "react";
import KassaBankDefault from '../components/kassabank-default/KassaBankDefault';
import PageWrapper from "./PageWrapper";

function KassaBankDefaultPage(props) {
    return (
        <PageWrapper component={<KassaBankDefault/>} {...props}/>
    );

}
export default KassaBankDefaultPage;
