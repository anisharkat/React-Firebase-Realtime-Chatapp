import { useEffect, useState } from "react"
import "./Chat.css"
import { addDoc, collection ,serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const Chat = (props)=> {
    const {room} = props;

    const [newMessage,setNewMessage] = useState("");
    const [messages,setMessages]= useState([])
    const messagesRef = collection(db,"messages ");
    useEffect(()=>{
        const queryMessages = query(messagesRef,where("room","==",room),orderBy("createdAt"));
        const unsucsrbe =  onSnapshot(queryMessages,(snapshot)=>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.id})
            })
            setMessages(messages);
        })

        return ()=> unsucsrbe();
    },[])
    const handleSubmitForm = async(e)=>{
        e.preventDefault()
        if (!newMessage === "") return;
        try {
            await addDoc(messagesRef,{
                text : newMessage, 
                createdAt : serverTimestamp(),
                user : auth.currentUser.displayName,
                room,
            })
        }catch (error){
            console.error(error)
        }
        setNewMessage("");
    }
    return <div className="chat-app">
        <div className="header">
            <h1>Welcome to {room}</h1>
        </div>
        <div className="messages">
            {messages.map((message)=>
            <div className="message" key={message.id}>
                <span className="user">{message.user} :  </span>
                {message.text}
            </div>
        )}
        </div>
        <form onSubmit={handleSubmitForm} className="new-message-form">
            <input value={newMessage} className="new-message-input" placeholder="Type your message here" onChange={(e)=>setNewMessage(e.target.value)}/>
            <button type="submit" className="send-button">Send Message</button>
        </form>
    </div>
}