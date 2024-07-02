import { useState, useEffect } from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import './App.css';

// Import your components here
import Login from "./containers/Login.tsx";
import AuthenticatedApp from "./containers/AuthenticatedApp.tsx";
import {ThemeProvider} from "styled-components";
import theme from "./config/Theme.tsx";


function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    useEffect(() => {

        if (!userIsLoggedIn && location.pathname !== '/login') {
            navigate('/login');
        }
        console.log("something changed")
    }, [location, navigate,userIsLoggedIn]);

    const handleLogout = () => {
        setUserIsLoggedIn(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/login" element={<Login setUserIsLoggedIn={setUserIsLoggedIn}/>}/>
                {userIsLoggedIn && <Route path="/*" element={<AuthenticatedApp handleLogout={handleLogout} userIsLoggedIn={userIsLoggedIn}/>}/>}
            </Routes>
        </ThemeProvider>
    );
}

export default App;