import React from "react";
import PageWrapper from "./PageWrapper";
import ItemCardAmount from "../components/itemcardamount/ItemCardAmount";

function ItemCardAmountPage(props) {
    return (
        <PageWrapper component={<ItemCardAmount/>} {...props}/>
    );
}
export default ItemCardAmountPage;
