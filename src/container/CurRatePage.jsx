import React from "react";
import PageWrapper from "./PageWrapper";
import CurRate from "../components/cur-rate/CurRate";


function CurRatePage(props) {
    return (
        <PageWrapper component={<CurRate/>} {...props}/>
    );
}
export default CurRatePage;
