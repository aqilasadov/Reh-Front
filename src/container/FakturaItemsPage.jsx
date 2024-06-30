import React from "react";
import PageWrapper from "./PageWrapper";
import FakturaItems from "../components/faktura-items/FakturaItems";

function FakturaItemsPage(props) {
    return (
        <PageWrapper component={<FakturaItems/>} {...props}/>
    );
}
export default FakturaItemsPage;
