import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMediaOverlay } from "../features/ui/useMediaOverlay";
import { selectMediaOverlay } from "../features/ui/media_overlay_slice";
import { useDispatch, useSelector } from "react-redux";
import { scrollReset, scrollUpdated } from "../features/ui/scroll_slice";


export function useEntityFocus() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { transitionToDetials, closeOverlay } = useMediaOverlay()
    const dispatch = useDispatch()

    const transitionPreviewToDetails = (programId) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('jbv', programId);

        setSearchParams(newParams, {
            replace: false,              
            preventScrollReset: true
        });

        dispatch(scrollUpdated({x: window.scrollX, y: window.scrollY}))

        transitionToDetials()
    }

    const loadDetailsOnPageMount = (programId) => {
        console.log(programId, 'from loadDetailsOnPageMount');
        
    }
    
    const closeDetailsView = () => {
        
        closeOverlay()

        // scrollReset
    }

    return {
        transitionPreviewToDetails, 
        loadDetailsOnPageMount,
        closeDetailsView
    }
}

