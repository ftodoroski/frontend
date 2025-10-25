import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";
import { selectSession } from "../features/session/session_slice";

const PrivateRoutes = () => {
    const currentSession = useSelector(selectSession)

    useEffect(() => {

    }, [currentSession])

    return (
        currentSession.token ? <Outlet /> : <Navigate to="/login"/>
    )
}
export default PrivateRoutes