import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";


const Login = ({setUserIsLoggedIn} :{setUserIsLoggedIn:(x: boolean) => void}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
        setUserIsLoggedIn(true);
        console.log(`Logging in with username: ${username} and password: ${password}`);
        navigate('/')
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Login;