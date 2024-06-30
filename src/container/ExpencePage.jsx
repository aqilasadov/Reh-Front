import React from "react";

import PageWrapper from "./PageWrapper";
import Expence from "../components/digerrasxod/Expence";

function ExpencePage(props) {
    return (
        <PageWrapper component={<Expence/>} {...props}/>
    );

}
export default ExpencePage;
