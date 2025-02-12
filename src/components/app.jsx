import React from 'react';
import { Route, Routes } from "react-router-dom";
import WatchPage from './video/watch_page';
import NavBar from './navbar/navbar'
import Footer from './footer'
import HomePage from './homepage/homepage'
import HomePageHeader from "./homepage/homepage_header"
import { useSelector } from 'react-redux';
import PrivateRoutes from '../util/private_routes';
import Browse from './browse/browse'
import SessionForm from './session_form/session_form';
import '../../assets/stylesheets/main.scss'
import ProfilePage from './profile/profile_page';


const App = (props) => {
    const store = useSelector(state => state)

    const renderMultiRoutes = ({ element: Element, paths, ...rest }) =>
        paths.map((path) => <Route path={path} {...rest} element={Element} />);

    return (
        <>
            {/* Watch page for a single vid */} {/* Needs to be protected / Not Implemented */}
            {console.log(store)}
            <Routes> 
                <Route path='/watch/:profileID' element={<WatchPage />} />
            </Routes>

            {/* Navbar */}
            <Routes> 
                {renderMultiRoutes({ paths: ['/', '/login', '/signup'], element: <HomePageHeader />, })}
                {renderMultiRoutes({ paths: ['browse', 'tv-shows', 'movies', 'latest', 'watchlist', 'search/:searchQuery'], element: <NavBar />, })}
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
                </Route>
                {/* Add the proper component for this route */}
            </Routes>

            {/* Footer */}
            <Routes> 
                {renderMultiRoutes({ paths: ['browse', 'search/:searchQuery', 'watchlist', 'tv', 'movie'], element: <Footer />, })}
            </Routes>


            {/* 

                Need to make a routes for all other urls routes like a 404 section
            
            */}
        </>
    )
}

export default App;