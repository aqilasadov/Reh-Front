import React from "react";
import PageWrapper from "./PageWrapper";
import ReportCurRate from "../components/report_currate/ReportCurRate";



function ReportCurRatePage(props) {
    return (
        <PageWrapper component={<ReportCurRate/>} {...props}/>
    );
}
export default ReportCurRatePage;
