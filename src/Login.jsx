import "./Login.css"
import anwarImage from './anwar.jpg';

function Login(){
    return(
        <div className = "login">
            <p>Login</p>
            <p>Username</p>
            <input type="text" placeholder="Type your tweet here:"/>
            <p>Password</p>
            <input type="password" placeholder="Type your tweet here:"/>
        </div>
    );
}

export default Login