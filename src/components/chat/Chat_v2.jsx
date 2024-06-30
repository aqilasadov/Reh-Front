import React , {useState , useEffect , useRef} from 'react'
import {BACKEND_URL} from "../../utils/Constants";
import { avrFetch , validateResponse , readResponseAsJSON} from '../../utils/avrFetch';
import { AUTH_USERINFO_KEY } from '../../utils/Constants';
import Snackbar from '../../components-tim/Snackbar/Snackbar';
import {AddAlert} from "@material-ui/icons";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
 
import "./chat.css" 

const LOAD_CHAT_GROUPS = BACKEND_URL + '/api/chatgroup/filterDataByUser/';
const LOAD_MESSAGES =   BACKEND_URL +  "/api/chatgroup/messagelist?cgId="
var stompClient = null;

const Chat_v2 = () => {
 
  const [chatStatus , setChatStatus] = useState(false);
  const [chatGroups , setChatGroups] = useState([]);
  const [message , setMessage] = useState("");
  const [messagesList , setMessagesList] = useState([]);
  const [currentChannel , setCurrentChannel] = useState(null)
  const [snackbarInfo , setSnackbarInfo] = useState({ "message":"" ,  "open" : false })
  const lastMessagePosition = useRef(null);

  const user = JSON.parse(window.localStorage.getItem(AUTH_USERINFO_KEY))
  
 

  useEffect(()=>{
    avrFetch(LOAD_CHAT_GROUPS + user.userId, {
      method: "POST",
      body: JSON.stringify({}),
  })
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(async value => {
         const groupsData = await  value.data;
         setChatGroups(groupsData)
      })
      .catch(err => setSnackbarInfo({"message": err.message ,   "open":true  }))
   }, [])


   useEffect(() =>{

    scrollToBottom()
    
  } , [messagesList])



  const connect = (channel) => {
    
    if(currentChannel !== channel){
      if(stompClient){
        stompClient.disconnect();
      setCurrentChannel(null)
      }

      loadMessagesList(channel);
      setSocket();
      setChatStatus(true)
      setCurrentChannel(channel)
    }
  }


  
  const loadMessagesList = (channel) =>{
    
    avrFetch(LOAD_MESSAGES + channel, {
      method: "GET",
  })
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(async value => {
         const messagesData = await  value.data;
         setMessagesList(messagesData)
      })
      .catch(err => setSnackbarInfo({"message": err.message ,   "open":true  }))
  }

  
  const setSocket = () =>{

    let socket = new SockJS(BACKEND_URL + "/chat")
    stompClient = Stomp.over(socket);
   
    stompClient.connect({}, function(frame){
     console.log('Connected:' + frame);
     stompClient.subscribe("/topic" , function(message){
        const newMessage = JSON.parse(message.body)
        console.log(newMessage)
       setMessagesList(prevMsg => [...prevMsg , newMessage])
     })
   })

   socket.onclose = function(evt) {
     if (evt.code == 3001) {
       console.log('ws closed');
       socket = null;
     } else {
       socket = null;
       console.log('ws connection error');
     }
   };

   socket.onerror = function(evt) {
     if (socket.readyState == 1) {
       console.log('ws normal error: ' + evt.type);
     }
   };
   
  }

  const sendMessage = (currentChannel) => {

    stompClient.send("/chat", {},
        JSON.stringify({'msjId':0,'cgId':currentChannel,'cgTitle':"nese",'userId': user.userId,'fullname':user.username, 'message':message,'createDate':0}));
        setMessage("")
}


  const messageHandler = (event) =>{
    const message = event.target.value ;    
    setMessage(message);
  }

  const scrollToBottom = () => {
    if(chatStatus){
    lastMessagePosition.current.scrollIntoView();
    console.log(lastMessagePosition.current)
    }
  };

 const messageDate = (date) =>{
  const messageDate = new Date(date * 1000 )
  const messageDay = messageDate.getDate();
  let messageHour = messageDate.getHours();
  let messageMinute = messageDate.getMinutes();
  const messageMonth = messageDate.getMonth();
  const months = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr"];

  if(messageHour < 10){
    messageHour = "0" + messageHour ;
  }
  if(messageMinute < 10 ){
    messageMinute = "0" + messageMinute ;
  }
  
  console.log(messageDay)
  return `${messageDay} ${months[messageMonth]}  ${messageHour}:${messageMinute}` ;
 }

 

  return (
    <div  className ='chat_wrapper' >
      <Snackbar  
       {...snackbarInfo  } color="danger"    place="tc" icon={AddAlert}></Snackbar>
      <div className ={` chat_group_wrapper ${chatStatus ? 'chat_enable' : 'chat_disable'}`}>
        <div className="chat_group-list">
          {chatGroups.map(group => {
            console.log(group)
            return(
              <div className={`chat_group ${currentChannel=== group.cgId && "active" }`} key={group.cgId} onClick={() => connect(group.cgId)}>
                 {group.cgTitle}
              </div>
          )})}
        </div>
      </div>
      { chatStatus &&
      <div className="chat_dialog_wrapper">
        <div className="msg_list">
          {messagesList.map(message => (
            <div className={`msg_wrapper ${user.userId === message.userId && "me"} `}  key={message.msjId}>
            <div className="msg_sender">{message.fullname} </div>
            <p className='msg'>{message.message}</p>
            <span className='date'> {messageDate(message.createDate)} </span>
          </div>
          ))}
          <div ref={lastMessagePosition}/>
          </div>
        <div className="chat_controllers">
          <input type="text" className="msg_box" onChange={messageHandler}  value={message}/>
          <button className="send_btn" onClick={() => message &&  sendMessage(currentChannel)}>Отправить</button>
        </div>
      </div> }
    </div>
  )
}

export default Chat_v2