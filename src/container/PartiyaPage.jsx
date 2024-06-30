import React from "react";
import Partiya from '../components/partiya/Partiya';
import PageWrapper from "./PageWrapper";

function PartiyaPage(props) {
    return (
        <PageWrapper component={<Partiya/>} {...props}/>
    );

}
export default PartiyaPage;
