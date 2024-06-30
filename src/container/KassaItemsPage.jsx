import React from "react";
import KassaItems from '../components/kassa-items/KassaItems';
import PageWrapper from "./PageWrapper";

function KassaItemsPage(props) {
    return (
        <PageWrapper component={<KassaItems/>} {...props}/>
    );

}
export default KassaItemsPage;
