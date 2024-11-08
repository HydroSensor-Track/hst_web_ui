// import Home from './Home';
import Home from './Home.tsx'
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import About from './About';
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.tsx";
import Tickets from "./Tickets.tsx";
import Backoffice from './Backoffice.tsx';
import User from './User.tsx';
import HstWebUi from './HstWebUi.tsx';
import { ModalProvider } from "../contexts/ModalContext.tsx";
import { fetchSensorsInfo, setByLocation } from '../redux/reducers/sensorInfoSlice.ts';

const DIFFERENCE_DAYS_SEVEN = 7

const AuthenticatedApp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    useEffect(() => {
        let networkMetadata = undefined
        try {
            networkMetadata = localStorage.getItem("networkMetadata");
            const parsedNetworkMetadata = networkMetadata ? JSON.parse(networkMetadata) : null;

            // We only make a forced update if we haven't updated the localStorage for more than one week
            const lastUpdateDate = parsedNetworkMetadata.last_update_date ? new Date(parsedNetworkMetadata.last_update_date) : null;
            const currentDate = new Date();
            const differenceDays = lastUpdateDate ? currentDate.getDate() - lastUpdateDate.getDate() : DIFFERENCE_DAYS_SEVEN + 1

            if (differenceDays < DIFFERENCE_DAYS_SEVEN && parsedNetworkMetadata) {

                dispatch(setByLocation(parsedNetworkMetadata.data))
            } else {
                dispatch(fetchSensorsInfo())
            }
        } catch (error) { dispatch(fetchSensorsInfo()) }


    }, [dispatch]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        console.log(params)
        const redirectPath = params.get('redirect');
        if (redirectPath) {
            // Remueve el prefijo "/repo_name" de la ruta en caso de que esté presente
            console.log(redirectPath)
            const sanitizedPath = redirectPath.replace(/^\/repo_name/, '');
            console.log(sanitizedPath)
            navigate(sanitizedPath, { replace: true });
        }
    }, [navigate]);

    return (
        <ModalProvider>
            <Layout >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/backoffice" element={<Backoffice />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path='/hst_web_ui/' element={<HstWebUi />} />
                </Routes>
            </Layout >
        </ModalProvider >
    )
}

export default AuthenticatedApp;