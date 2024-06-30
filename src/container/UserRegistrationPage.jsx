import React from "react";
import PageWrapper from "./PageWrapper";
import UserRegistration from "../components/users/UserRegistration";


function UserRegistrationPage(props) {
    return (
        <PageWrapper component={<UserRegistration/>} {...props}/>
    );
}
export default UserRegistrationPage;
