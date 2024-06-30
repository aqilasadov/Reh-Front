import React from "react";
import KassaBankClientDefault from '../components/kassabankclient-default/KassaBankClientDefault';
import PageWrapper from "./PageWrapper";

function KassaBankClientDefaultPage(props) {
    return (
        <PageWrapper component={<KassaBankClientDefault/>} {...props}/>
    );

}
export default KassaBankClientDefaultPage;
