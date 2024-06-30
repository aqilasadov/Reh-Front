import React from 'react';
import PageWrapper from "./PageWrapper";
import Firm from "../components/firm/Firm";

const FirmPage = props => <PageWrapper component={<Firm/>} {...props}/>;
export default FirmPage;
