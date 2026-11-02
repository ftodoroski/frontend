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

    const transitionPreviewToDetails = (programId, currentScrollY, anchorPreview) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('jbv', programId);

        setSearchParams(newParams, {
            replace: false,              
            preventScrollReset: true
        });

        dispatch(scrollUpdated({ x: 0, y: currentScrollY }))

        transitionToDetials(anchorPreview)
    }

    const loadDetailsOnPageMount = (programId) => {
        // This needs to be dynamic for 2 cases when coming from deep link and billboard more info
        // also handle the alignment because sometimes i pass it and sometimes i don't
        const anchorPreview = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }

        const targetProgram = findProgram(Number(programId), programs)
        const suggestedPrograms = generateSuggestedPrograms(targetProgram, programs)
        
        triggerDetailsDirectly({ anchorPreview, targetProgram, suggestedPrograms})
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

