// import Home from './Home';
import Home from './Home.tsx'
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import About from './About';
import {Route, Routes, useNavigate} from "react-router-dom";
import Layout from "../components/Layout.tsx";
import Tickets from "./Tickets.tsx";
import Backoffice from './Backoffice.tsx';
import User from './User.tsx';
import { ModalProvider } from "../contexts/ModalContext.tsx";
import { fetchSensorsInfo, setByLocation } from '../redux/reducers/sensorInfoSlice.ts';
import { fetchInitialMetricUpdate, setData, setLastUpdateDate } from '../redux/reducers/sensorMetricsSlice.ts';
import { setTimestampFin, setTimestampInicio } from '../redux/reducers/querySlice.ts';
import { fetchTickets } from '../redux/reducers/ticketSlice.ts';
import { getCurrentUser, getUsersList } from '../redux/reducers/usersSlice.ts';
import { useAuth0 } from '@auth0/auth0-react';


const DIFFERENCE_HOURS_UPDATE = 6
const HOURS_TO_FETCH_DATA = 24

const AuthenticatedApp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuth0();
    const navigate = useNavigate();
    console.log(user)

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const redirectPath = params.get('redirect');

        if (redirectPath) {
            // Removes the "/hst_web_ui" prefix from the path if present
            // hst_web_ui is the GitHub repository name
            const sanitizedPath = redirectPath.replace("/^/hst_web_ui/", '');
            navigate(sanitizedPath, { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        const id = user?.sub?.split('|')[1]
        dispatch(getCurrentUser(id))
        dispatch(getUsersList());
    }, [dispatch, user]);

    useEffect(() => {
        const getStoredNetworkMetrics = () => {
            const networkMetrics = localStorage.getItem("networkMetrics");
            return networkMetrics ? JSON.parse(networkMetrics) : null;
        };
    
        const calculateHoursDifference = (lastUpdateDate: Date | null) => {
            const currentDate = new Date();
            return lastUpdateDate ? (currentDate.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60) : DIFFERENCE_HOURS_UPDATE + 1;
        };
    
        const updateTimestamps = (lastUpdateDate: Date) => {
            dispatch(setTimestampFin(lastUpdateDate.toISOString()));
    
            const timestampInicio = new Date(lastUpdateDate.getTime() - (HOURS_TO_FETCH_DATA * 60 * 60 * 1000))
            dispatch(setTimestampInicio(timestampInicio.toISOString()));
        };
    
        const fetchMetricsData = (from: Date, to: Date) => {
            dispatch(fetchInitialMetricUpdate({ from, to }));
        };
    
        const parsedNetworkMetrics = getStoredNetworkMetrics();
        const lastUpdateDate = parsedNetworkMetrics?.last_update_date ? new Date(parsedNetworkMetrics.last_update_date) : null;
        const differenceHours = calculateHoursDifference(lastUpdateDate);

        if (differenceHours < DIFFERENCE_HOURS_UPDATE && lastUpdateDate && parsedNetworkMetrics.data) {
            dispatch(setData(parsedNetworkMetrics.data));
            dispatch(setLastUpdateDate(lastUpdateDate.toISOString()));
            updateTimestamps(lastUpdateDate);
        } else {
            const currentDate = new Date();
            const fromDate = new Date(currentDate.getTime() - (HOURS_TO_FETCH_DATA * 60 * 60 * 1000))
            updateTimestamps(currentDate);
            fetchMetricsData(fromDate, currentDate);
        }

    }, [dispatch]);
    
     useEffect(() => {

        const networkMetadata = localStorage.getItem("networkMetadata");
        const parsedNetworkMetadata = networkMetadata ? JSON.parse(networkMetadata) : null;

        const lastUpdateDate = parsedNetworkMetadata?.last_update_date ? new Date(parsedNetworkMetadata?.last_update_date) : null;

        const currentDate = new Date();
        const differenceHours = lastUpdateDate ? (currentDate.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60) : DIFFERENCE_HOURS_UPDATE + 1;
        if (differenceHours < DIFFERENCE_HOURS_UPDATE && parsedNetworkMetadata.data) {
            dispatch(setByLocation(parsedNetworkMetadata.data))
        } else {
            dispatch(fetchSensorsInfo())
        }

    }, [dispatch]);
    
    return (
        <ModalProvider>
            <Layout >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/backoffice" element={<Backoffice />} />
                    <Route path="/users/:id" element={<User />} />
                </Routes>
            </Layout >
        </ModalProvider >
    )
}

export default AuthenticatedApp;