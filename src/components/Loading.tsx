import React from "react";
import {StyledLoading} from "../styled-components/common.tsx";
const loadingImg =
    "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
    <StyledLoading>
        <img src={loadingImg} alt="Loading..." />
    </StyledLoading>

);

export default Loading;