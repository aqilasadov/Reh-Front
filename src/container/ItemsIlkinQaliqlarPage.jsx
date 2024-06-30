import React from "react";
import PageWrapper from "./PageWrapper";
import IlkinQaliqlar from "../components/ilkin-qaliqlar/IlkinQaliqlar";

function ItemsIlkinQaliqlarPage(props) {
    return (
        <PageWrapper component={<IlkinQaliqlar/>} {...props}/>
    );

}
export default ItemsIlkinQaliqlarPage;
