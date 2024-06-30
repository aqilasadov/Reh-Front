import React from "react";
import PageWrapper from "./PageWrapper";

import ServiceCard from "../components/service-card/ServiceCard";

function ServiceCardPage(props) {
    return (
        <PageWrapper component={<ServiceCard/>} {...props}/>
    );
}

export default ServiceCardPage;
