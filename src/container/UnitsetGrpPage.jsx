import React from "react";
import PageWrapper from "./PageWrapper";
import UnitsetGrp from "../components/unitsetgrp/UnitsetGrp";

function UnitsetGrpPage(props) {
    return (
        <PageWrapper component={<UnitsetGrp/>} {...props}/>
    );
}
export default UnitsetGrpPage;
