import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from './navbar/navbar';


const Layout = ({ search, setSearch }) => {
    return (
        <Route>
            {/* {renderMultiRoutes({ paths: ['/browse', '/search', '/watchlist', '/tv', '/movie'], element: <NavBar />, })} */}
            {renderMultiRoutes({ paths: ['/', '/login', '/signup', '/browse', '/search', '/watchlist', '/tv', '/movie', '/search/:searchQuery'], element: <Feature />, })}
        </Route>
    )
}

export default Layout