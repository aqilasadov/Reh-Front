import React from "react";
import Transfer from '../components/transfer/Transfer';
import PageWrapper from "./PageWrapper";
import Transfer2 from "../components/Transfer2/Transfer2";

function ClientPage(props) {
    return (
        <PageWrapper component={<Transfer/>} {...props}/>
    );

}
export default ClientPage;
