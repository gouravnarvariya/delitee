import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";

const ProtectedRoute = ({ children }) => {
    const currentLoginUser = useSelector((state) => state.Authentication.UserAuthLogin);
    const dispatch = useDispatch()
    let location = useLocation();


    const isNotLoggedIn = !currentLoginUser.data?.accessToken;
    if (isNotLoggedIn) {
        dispatch(logout())
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
