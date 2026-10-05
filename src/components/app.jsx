import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import WatchPage from './video/watch_page';
import NavBar from './navbar/navbar'
import Footer from './footer'
import HomePage from './homepage/homepage'
import HomePageHeader from "./homepage/homepage_header"
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoutes from '../util/private_routes';
import Browse from './browse/browse'
import SessionForm from './session_form/session_form';
import '../../assets/stylesheets/main.scss'
import ProfilePage from './profile/profile_page';
import { selectIsMediaOverlayOpen } from '../features/ui/media_overlay_slice';
import MediaOverlay from './modals/media_overlay';
import { selectIsTooltipOverlayOpen } from '../features/ui/tooltip_overlay_slice';
import TooltipOverlay from './modals/tooltip_modal';
import { checkAuthStatus } from '../util/auth_api_util';
import { selectIsAuthenticated, selectIsLoading } from '../features/auth/auth_slice';


const App = (props) => {
    const store = useSelector(state => state)
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const isLoading = useSelector(selectIsLoading)

    const isMediaOverlayOpen = useSelector(selectIsMediaOverlayOpen)
    const isTooltipOverlayOpen = useSelector(selectIsTooltipOverlayOpen)

    const renderMultiRoutes = ({ element: Element, paths, ...rest }) => 
        paths.map((path) => <Route path={path} {...rest} element={Element} />);

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);
    
    return (
        <>
            {isTooltipOverlayOpen && <TooltipOverlay />}

            {/* Watch page for a single vid */} {/* Needs to be protected / Not Implemented */}
            {console.log(store)}
            <Routes> 
                <Route path='/watch/:profileID' element={<WatchPage />} />
            </Routes>

            {/* Navbar */}
            <Routes> 
                {renderMultiRoutes({ paths: ['/', '/login', '/signup'], element: <HomePageHeader />, })}
                <Route element={<PrivateRoutes />}>
                    {renderMultiRoutes({ paths: ['browse', 'tv-shows', 'movies', 'latest', 'watchlist', 'search/:searchQuery', 'title/:id'], element: <NavBar />, })}
                </Route>    
            </Routes>

            {/* Content Area */}
            <Routes>
                <Route path='/' element={<HomePage />} exact/>
                <Route path='login' element={<SessionForm />} exact/>
                <Route path='signup' element={<SessionForm />} exact />

                {/* Testing the browse Component */}
                <Route element={<PrivateRoutes />}>
                    <Route path='profiles' element={<ProfilePage />} exact/>
                    <Route path='manage-profiles' element={<ProfilePage />} exact/>
                    <Route path='browse' element={<Browse />} exact/>
                    {/* {renderMultiRoutes({ paths: ['browse', 'tv-shows', 'movies', 'latest', 'watchlist'], element: <Component />})} */}
                    <Route path='search/:searchQuery' exact/>
                    <Route path='title/:id' element={<Browse />} />
                </Route>
                {/* Add the proper component for this route */}
            </Routes>

            {/* Testing endpoint and don't need the auth */}
            {/* <Routes>
                <Route path='title/:id' element={<Browse />} />
            </Routes> */}

            {/* Footer */}
            <Routes> 
                {renderMultiRoutes({ paths: ['browse', 'search/:searchQuery', 'watchlist', 'tv', 'movie', 'title/:id'], element: <Footer />, })}
            </Routes>


            {isMediaOverlayOpen && <MediaOverlay />}    


            {/* 

                Need to make a routes for all other urls routes like a 404 section
            
            */}
        </>
    )
}

export default App;