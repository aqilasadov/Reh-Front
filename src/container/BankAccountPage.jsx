import React from "react";
import PageWrapper from "./PageWrapper";
import BankAccount from "../components/bank-account/BankAccount";

function BankAccountPage(props) {
    return (
        <PageWrapper component={<BankAccount/>} {...props}/>
    );

}
export default BankAccountPage;
