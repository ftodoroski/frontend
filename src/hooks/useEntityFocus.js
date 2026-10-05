import React, { useCallback, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { useMediaOverlay } from "../features/ui/useMediaOverlay";
import { selectMediaOverlay } from "../features/ui/media_overlay_slice";
import { useSelector } from "react-redux";

export function useEntityFocus() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { openDetails } = useMediaOverlay()
    
    // const mediaOverlayState = useSelector(selectMediaOverlay)

    const triggerDetailsView = (id) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('jbv', id);

        setSearchParams(newParams, {
            replace: false,              
            preventScrollReset: true
        });

        openDetails()
        
    }

    // const closeDetailsView = useCallback(() => {

    // }, [])

    return {
        triggerDetailsView, 
        // closeDetailsView
    }
}

