import React from "react";
import PageWrapper from "./PageWrapper";
import Faktura from "../components/faktura/Faktura";

function FakturaPage(props) {
    return (
                <PageWrapper component={<Faktura/>} {...props}/>

    )
}
export default FakturaPage;
