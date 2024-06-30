import React from "react";
import PageWrapper from "./PageWrapper";
import Trans7 from "../components/tab7/Trans7";

function ExchangePage(props) {
    return (
        <PageWrapper component={<Trans7/>} {...props}/>
    );

}
export default ExchangePage;