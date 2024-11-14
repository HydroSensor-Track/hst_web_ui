import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import { Provider } from 'react-redux';
import store from "./redux/store.ts";
import theme from "./config/Theme.tsx";
import {ThemeProvider} from "styled-components";
import './config/i18n'; // Import i18n configuration
import './index.css'

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <Auth0Provider
              domain={domain}
              clientId={clientId}
              authorizationParams={{ 
                redirect_uri: window.location.origin,
                audience: 'https://dev-2r6j2ic26utqxp02.us.auth0.com/api/v2/'
              }}
          >

            <ThemeProvider theme={theme}>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
            </ThemeProvider>
          </Auth0Provider>
      </Provider>

  </React.StrictMode>,
)
