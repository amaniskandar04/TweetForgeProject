import "./Login.css"
import anwarImage from './anwar.jpg';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { username, password };

        try {
            const response = await axios.post('http://localhost:8080/AmanLover/login', loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Handle successful registration (e.g., show a success message)
                console.log('login successful level 10 gayat');

                navigate('/home'); // Redirect to the home page path
            } else {
                // Handle registration failure (e.g., show an error message)
                console.log('fucking retard');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div>
                        <label>Password:</label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                    <div className="to-register">
                        <button onClick={() => navigate("/register")}>Register</button>
                    </div>
                </div>


            </form>


        </>


    );
}

export default Login