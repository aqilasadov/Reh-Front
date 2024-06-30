import React from "react";
import PageWrapper from "./PageWrapper";

import ChatGroup from "../components/chatgroup/Jobs";

function ChatGroupPage(props) {
    return (
        <PageWrapper component={<ChatGroup/>} {...props}/>
    );
}
export default ChatGroupPage;
