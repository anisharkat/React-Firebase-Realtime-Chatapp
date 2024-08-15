import { provider } from "../../firebase"
import { auth } from "../../firebase"
import { signInWithPopup } from "firebase/auth"
import { signOut } from "firebase/auth"
import Cookies from "universal-cookie"
import "./Auth.css"
const cookies = new Cookies()

export const Auth = (props) => {
    const {setIsAuth} = props;
    const signinWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth,provider);
            cookies.set("auth-token",result.user.refreshToken);
            setIsAuth(true)
        } catch (error){
            alert(error);
        }
    }
  return (
    <div>
        <p>Sign in with google to continue : </p>
        <button onClick={signinWithGoogle}>Login Now</button>
    </div>
  )
}

