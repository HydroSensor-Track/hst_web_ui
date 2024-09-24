import Home from './Home';
import About from './About';
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout.tsx";
import Tickets from "./Tickets.tsx";
import Backoffice from './Backoffice.tsx';

const AuthenticatedApp = () => {

    return (
        <Layout >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/about" element={<About />} />
                <Route path="/backoffice" element={<Backoffice />} />
            </Routes>
        </Layout>
    )
}

export default AuthenticatedApp;