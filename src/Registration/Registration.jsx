import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registrationData = { username, email, password };

        try {
            const response = await axios.post('http://localhost:8080/AmanLover/register', registrationData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Handle successful registration (e.g., show a success message)
                console.log('User registered successfully');
            } else {
                // Handle registration failure (e.g., show an error message)
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
                <div className="to-register">
                    <button onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>

        </form>
    );
}

export default Registration