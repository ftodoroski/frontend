import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './app'
import { Provider } from 'react-redux'


const Root = ({ store }) => {
    return (
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/*' element={<App />}/>
                    </Routes>  
                </BrowserRouter>
            </Provider>
    )
};

export default Root;

