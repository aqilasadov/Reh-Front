import React from "react";
import PageWrapper from "./PageWrapper";
import UnitsetLine from "../components/unitsetline/UnitsetLine";


function UnitsetLinePage(props) {
    return (
        <PageWrapper component={<UnitsetLine/>} {...props}/>
    );
}
export default UnitsetLinePage;
