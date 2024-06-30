import React from "react";
import Kassa from '../components/kassa/Kassa';
import PageWrapper from "./PageWrapper";

function KassaPage(props) {
    return (
        <PageWrapper component={<Kassa/>} {...props}/>
    );

}
export default KassaPage;
