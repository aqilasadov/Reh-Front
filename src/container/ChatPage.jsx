import React from "react";
import PageWrapper from "./PageWrapper";
import Warehouse from "../components/warehouse/Warehouse";
import Chat_v2 from "../components/chat/Chat_v2"
function ChatPage(props) {
    return (
        <PageWrapper component={<Chat_v2/>} {...props}/>
    );
}
export default ChatPage;
