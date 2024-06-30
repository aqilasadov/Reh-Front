import React from "react";

import PageWrapper from "./PageWrapper";

import Transfer2 from "../components/Transfer2/Transfer2";

function ClientPage(props) {
    return (
        <PageWrapper component={<Transfer2/>} {...props}/>
    );

}
export default ClientPage;
