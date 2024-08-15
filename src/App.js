import { useState , useRef } from 'react';
import './App.css';
import { Auth  } from './components/auth/Auth';
import Cookies from 'universal-cookie';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { Chat } from './components/chat/Chat';
const cookies = new Cookies();

function App() {
  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"));
  const [room,setRoom] = useState ("");

  const roomInputRef = useRef(null);

  const logOutUser = async ()=> {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false)
    }catch (error){
      console.error(error)
    }
  }

  if (!isAuth){
  return (
    <div className="App">
        <Auth setIsAuth ={setIsAuth}/>
    </div>
  );
}
return <div>
  {room ? <div>
    <Chat room={room}/>
  </div> : <div className='room'>
    <label>Enter Room Name : </label>
    <input ref={roomInputRef}/>
    <button onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button> 
    <button style={{backgroundColor:"red"}} onClick={logOutUser}>Logout</button>
  </div>}
</div>
}

export default App;
