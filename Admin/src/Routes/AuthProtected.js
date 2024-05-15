import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useProfile } from "../Hooks/UserHooks";

const AuthProtected = (props) => {
  const { userProfile, loading } = useProfile();

  if (!userProfile || loading || userProfile.role !== "restaurateur") {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AuthAdminProtected = (props) => {
  const { userProfile, loading } = useProfile();

  if (!userProfile || loading || userProfile.role !== "admin") {
    // Redirect user to login if not logged in, still loading profile, or not an admin
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AuthManagerProtected = (props) => {
  const { userProfile, loading } = useProfile();

  if (!userProfile || loading || userProfile.role !== "manager") {
    // Redirect user to login if not logged in, still loading profile, or not an admin
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};


const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return <Component {...props} />;
      }}
    />
  );
};

export { AuthProtected, AuthAdminProtected, AuthManagerProtected,AccessRoute };
