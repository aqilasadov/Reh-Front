import React from "react";
import PageWrapper from "./PageWrapper";
import FFFaktura from "../components/ff-faktura/FFFaktura";

function FFakturaPage(props) {
    return (
        <PageWrapper component={<FFFaktura fakturaId={196}/>} {...props}/>
    );

}
export default FFakturaPage;
