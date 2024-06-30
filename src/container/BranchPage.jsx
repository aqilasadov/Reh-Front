import React from "react";
import PageWrapper from "./PageWrapper";
import Branch from "../components/branch/Branch";

function BranchPage(props) {
    return (
        <PageWrapper component={<Branch/>} {...props}/>
    );
}
export default BranchPage;
