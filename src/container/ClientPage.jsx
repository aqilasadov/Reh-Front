import React from "react";
import Clients from '../components/clients/Clients';
import PageWrapper from "./PageWrapper";

function ClientPage(props) {
    return (
        <PageWrapper component={<Clients/>} {...props}/>
    );

}
export default ClientPage;
