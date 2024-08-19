import Home from './Home';
import About from './About';
import {Route, Routes} from "react-router-dom";
import Layout from "../components/Layout.tsx";
import Tickets from "./Tickets.tsx";

const AuthenticatedApp = () => {

    return (
        <Layout >
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/tickets" element={<Tickets/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </Layout>
    )
}

export default AuthenticatedApp;