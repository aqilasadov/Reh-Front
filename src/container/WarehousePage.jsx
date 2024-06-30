import React from "react";
import PageWrapper from "./PageWrapper";
import Warehouse from "../components/warehouse/Warehouse";

function WarehousePage(props) {
    return (
        <PageWrapper component={<Warehouse/>} {...props}/>
    );
}
export default WarehousePage;
