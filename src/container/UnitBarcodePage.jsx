import React from "react";
import PageWrapper from "./PageWrapper";
import Warehouse from "../components/warehouse/Warehouse";
import UnitBarcode from "../components/unitbarcode/UnitBarcode";

function UnitBarcodePage(props) {
    return (
        <PageWrapper component={<UnitBarcode/>} {...props}/>
    );
}
export default UnitBarcodePage;
