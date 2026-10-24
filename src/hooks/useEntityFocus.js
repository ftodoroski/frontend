import React, { useCallback, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { useMediaOverlay } from "../features/ui/useMediaOverlay";
import { selectMediaOverlay } from "../features/ui/media_overlay_slice";
import { useDispatch, useSelector } from "react-redux";
import { scrollReset, scrollUpdated } from "../features/ui/scroll_slice";

export function useEntityFocus() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { triggerDetails } = useMediaOverlay()
    const dispatch = useDispatch()

    const triggerDetailsView = (id) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('jbv', id);

        setSearchParams(newParams, {
            replace: false,              
            preventScrollReset: true
        });

        
        dispatch(scrollUpdated({x: window.scrollX, y: window.scrollY}))

        triggerDetails()        

    }

    // const closeDetailsView = useCallback(() => {

        // scrollReset

    // }, [])

    return {
        triggerDetailsView, 
        // closeDetailsView
    }
}

