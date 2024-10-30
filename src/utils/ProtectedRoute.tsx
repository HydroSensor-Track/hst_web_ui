import React, { ComponentType } from "react";
import { Route, RouteProps } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

type ProtectedRouteProps = RouteProps & {
    component: ComponentType<any>;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        element={
            React.createElement(
                withAuthenticationRequired(Component, {
                    onRedirecting: () => <Loading />,
                })
            )
        }
    />
);

export default ProtectedRoute;