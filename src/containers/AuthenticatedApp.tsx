import Home from './Home';
import About from './About';
import {Route, Routes} from "react-router-dom";
import Layout from "../components/Layout.tsx";

const AuthenticatedApp = ({handleLogout, userIsLoggedIn}: {handleLogout: () => void, userIsLoggedIn: boolean}) => {

    return (
        <Layout handleLogout={handleLogout}>
            <Routes>
                <Route path="/" element={<Home userIsLoggedIn={userIsLoggedIn}/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </Layout>
    )
}

export default AuthenticatedApp;