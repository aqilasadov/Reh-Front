import React from "react";
import PageWrapper from "./PageWrapper";
import Trans15 from "../components/tab15/Trans15";

function MaasPage(props) {
    return (
        <PageWrapper component={<Trans15/>} {...props}/>
    );

}
export default MaasPage;