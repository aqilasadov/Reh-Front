import React from "react";
import PageWrapper from "./PageWrapper";
import Stgrpcode from "../components/stgrpcode/Stgrpcode";


function StgrpcodePage(props) {
    return (
        <PageWrapper component={<Stgrpcode/>} {...props}/>
    );
}
export default StgrpcodePage;
