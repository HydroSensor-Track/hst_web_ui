import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HstWebUi = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [])

    return null;
};

export default HstWebUi;