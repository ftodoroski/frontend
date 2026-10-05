import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";
import { selectIsAuthenticated, selectIsLoading } from "../features/auth/auth_slice";

const PrivateRoutes = () => {
    const userIsAuthenticated = useSelector(selectIsAuthenticated);
    const userIsLoading = useSelector(selectIsLoading);

    if (userIsLoading) {
        return null; // Or <LoadingSpinner />
    }

    return (
        userIsAuthenticated ? <Outlet /> : <Navigate to="/login"/>
    )
}
export default PrivateRoutes
