import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    const session = useSelector(state => state.session)

    useEffect(() => {

    }, [session])

    return (
        session.token ? <Outlet /> : <Navigate to="/login"/>
    )
}
export default PrivateRoutes