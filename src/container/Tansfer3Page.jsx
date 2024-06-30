import React from "react";

import PageWrapper from "./PageWrapper";


import Transfer3 from "../components/Transfer3/Transfer3";

function ClientPage(props) {
    return (
        <PageWrapper component={<Transfer3/>} {...props}/>
    );

}
export default ClientPage;
