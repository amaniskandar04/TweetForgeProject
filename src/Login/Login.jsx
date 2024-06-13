import "./Login.css"
import anwarImage from './anwar.jpg';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [existed, setExisted] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setExisted('All fields are required.');
            return;
        }

        const loginData = { username, password };

        try {
            const response = await axios.post('http://localhost:8080/TweetForge/login', loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },  
            });

            if (response.status === 200) {
                // Handle successful registration (e.g., show a success message)
                console.log('login successful level 10 gayat');
                
                localStorage.setItem('token', response.data.token);

                localStorage.setItem('userData', JSON.stringify(response.data));

                console.log(response.data.id);

                console.log(localStorage.getItem('userData'));
                console.log(response.data.username);
                navigate('/home'); // Redirect to the home page path
            } else {
                // Handle registration failure (e.g., show an error message)
                console.log('???');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    

    return (
        <>
            <div className='screen'>
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="kotak">
                            <div className = 'logo_container'>
                                <img className = 'logo' src = {logo}></img>
                            </div>

                            <div className = 'info'>
                                <h2>Username:</h2>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <br></br>

                            <div className ='info'>
                                <h2>Password:</h2>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            

                            <div className="to-center">
                                {existed && (
                                    <p>{existed}</p>
                                )}
                            </div>
                            
                            <div className="to-center">
                                <button type="submit">Login</button>
                            </div>

                            <div className="to-center">
                                <button onClick={() => navigate("/register")}>Register</button>
                            </div>

                            
                        </div>

                    </div>


                </form>

            </div>

        </>


    );
}

export default Login