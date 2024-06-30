import React from "react";
import Partiya from '../components/partiya/Partiya';
import PageWrapper from "./PageWrapper";
import Stgrpother from "../components/digerrasxodtype/Stgrpother";

function ExpenceTypePage(props) {
    return (
        <PageWrapper component={<Stgrpother/>} {...props}/>
    );

}
export default ExpenceTypePage;
