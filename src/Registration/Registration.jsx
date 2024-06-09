import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import "./Registration.css"


function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [existed, setExisted] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !confirmPassword || !password) {
            setExisted('All fields are required.');
            return;
        }

        const registrationData = { username, email, password };

        try {
            const response = await axios.post('http://localhost:8080/TweetForge/register', registrationData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Handle successful registration (e.g., show a success message)
                console.log('User registered successfully');

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('newData', JSON.stringify(response.data));
                localStorage.setItem('userData', JSON.stringify(response.data));
                console.log(response.data);
                const userData = JSON.parse(localStorage.getItem('newData'));

                console.log(userData.tweets);

                navigate('/home'); // Redirect to the home page path
            } else {
                // Handle registration failure (e.g., show an error message)
                console.log('Unexpected response status:', response.status);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Handle registration failure (e.g., show an error message)
                console.log(error.response);
                console.error(error.response.data);
                setExisted(error.response.data);

            } else {
                // Handle other errors
                console.error('Registration failed!', error);
                alert('Registration failed: An unexpected error occurred');
            }
        }
    };

    return (
        <div className='screen'>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <div className='kotak'>
                        <div className='logo_container'>
                            <img className='logo' src={logo} alt="Logo" />
                        </div>

                        <div className='line'>
                            <div className='info'>
                                <h2>Username:</h2>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <div className='info'>
                                <h2>Email:</h2>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className='line'>
                            <div className='info'>
                                <h2>Password:</h2>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className='info'>
                                <h2>Confirm Password:</h2>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="to-center">
                            {existed && (
                                <p>{existed}</p>
                            )}
                        </div>

                        <div className="to-center">
                            <button type='submit'>Register</button>
                        </div>

                        <div className="to-center">
                            <button type="button" onClick={() => navigate("/login")}>Login</button>
                        </div>

                        

                        
                    </div>
                </div>
            </form>
        </div>
    );


    
}

export default Registration