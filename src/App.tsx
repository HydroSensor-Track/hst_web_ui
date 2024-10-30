// src/App.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthenticatedApp from "./containers/AuthenticatedApp.tsx";
import Login from "./containers/Login.tsx";
import Loading from "./components/Loading.tsx";

function App() {
    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
        useAuth0();

    if (isLoading) {
        return <Loading/>;
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