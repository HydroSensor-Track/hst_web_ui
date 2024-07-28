import Home from './Home';
import About from './About';
import {Route, Routes} from "react-router-dom";
import Layout from "../components/Layout.tsx";

const AuthenticatedApp = () => {

    return (
        <Layout >
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </Layout>
    )
}

export default AuthenticatedApp;