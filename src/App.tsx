import { useState, useEffect } from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import './App.css';

// Import your components here
import Home from './containers/Home';
import About from './containers/About';
import TopBar from "./components/TopBar.tsx";
import LeftDrawer from "./components/LeftDrawer.tsx";
import Login from "./containers/Login.tsx";

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

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
        <>
            {location.pathname !== '/login' && <TopBar toggleDrawer={toggleDrawer} handleLogout={handleLogout}/>}
            <LeftDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}/>
            <Routes>
                <Route path="/" element={<Home userIsLoggedIn={userIsLoggedIn}/>}/>
                <Route path="/login" element={<Login setUserIsLoggedIn={setUserIsLoggedIn}/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </>
    );
}

export default App;