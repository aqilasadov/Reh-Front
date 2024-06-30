import React from "react";
import KassaToKassa from '../components/kassa-to-kassa/KassaToKassa';
import PageWrapper from "./PageWrapper";

function KassaToKassaPage(props) {
    return (
        <PageWrapper component={<KassaToKassa/>} {...props}/>
    );

}
export default KassaToKassaPage;
