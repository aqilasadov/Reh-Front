import React from "react";
import PageWrapper from "./PageWrapper";
import Warehouse from "../components/warehouse/Warehouse";
import Items from "../components/items/Items";

function ItemsPage(props) {
    return (
        <PageWrapper component={<Items/>} {...props}/>
    );
}
export default ItemsPage;
