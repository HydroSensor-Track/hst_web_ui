// src/App.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthenticatedApp from "./containers/AuthenticatedApp.tsx";
import Login from "./containers/Login.tsx";

function App() {
    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
        useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated) {
        return (
            <AuthenticatedApp/>
        );
    } else {
        return <Login/>;
    }
}

export default App;