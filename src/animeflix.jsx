import React from "react";
import ReactDOM from 'react-dom/client';
import Root from "./components/root";
import store from "./store/store"

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <Root store={store}/>
        </React.StrictMode>
    );
});
