import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMediaOverlay } from "../features/ui/useMediaOverlay";
import { selectMediaOverlay } from "../features/ui/media_overlay_slice";
import { useDispatch, useSelector } from "react-redux";
import { scrollReset, scrollUpdated } from "../features/ui/scroll_slice";
import { selectAllPrograms } from "../features/entities/programs_slice";
import { generateSuggestedPrograms } from "../util/recommendations/recommendation_engine";
import findProgram from "../util/search/find_program";
import { unlockScreenView } from "../util/dom/screen_lock";


export function useEntityFocus() {
    const [searchParams, setSearchParams] = useSearchParams()

    const { transitionToDetials, triggerDetailsDirectly, closeOverlay } = useMediaOverlay()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const programs = useSelector(selectAllPrograms)

    const transitionPreviewToDetails = (programId, currentScrollY) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('jbv', programId);

        setSearchParams(newParams, {
            replace: false,              
            preventScrollReset: true
        });

        dispatch(scrollUpdated({ x: 0, y: currentScrollY }))

        transitionToDetials()
    }

    const loadDetailsOnPageMount = (programId) => {
        const anchorRect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }

        const targetProgram = findProgram(Number(programId), programs)
        const suggestedPrograms = generateSuggestedPrograms(targetProgram, programs)
        
        triggerDetailsDirectly({ anchorRect, targetProgram, suggestedPrograms})
    }
    
    const closeDetailsView = ({ targetPath = '/browse', scrollY}) => {

        closeOverlay()
        navigate(targetPath)
        unlockScreenView(scrollY)
        dispatch(scrollReset())
    }

    return {
        transitionPreviewToDetails, 
        loadDetailsOnPageMount,
        closeDetailsView
    }
}

