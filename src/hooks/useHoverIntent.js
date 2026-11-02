import { useCallback, useEffect, useRef } from "react";
import { selectAllPrograms } from "../features/entities/programs_slice";
import { generateSuggestedPrograms } from "../util/recommendations/recommendation_engine";
import { useMediaOverlay } from "../features/ui/useMediaOverlay";
import { useSelector } from "react-redux";

export function useHoverIntent(delay = 500) {
    const programs = useSelector(selectAllPrograms)
    const { openPreview } = useMediaOverlay()
    const timerRef = useRef(null)

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const triggerPreviewOverlay = useCallback((persistentEvent, targetProgram) => {
        const rect = persistentEvent.getBoundingClientRect();

        const anchorCard = {
            pageX: rect.left + window.scrollX, 
            pageY: rect.top + window.scrollY,

            clientLeft: rect.left, 
            clientTop: rect.top, 

            width: rect.width, 
            height: rect.height
        }
        const suggestedPrograms = generateSuggestedPrograms(targetProgram, programs)
        
        openPreview({ anchorCard, targetProgram, suggestedPrograms })


    }, [programs, openPreview])

    const handleMouseEnter = useCallback((e, program) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        const currentTarget = e.currentTarget
        const persistentEvent = {
            getBoundingClientRect: () => currentTarget.getBoundingClientRect()
        }

        timerRef.current = setTimeout(() => {
            triggerPreviewOverlay(persistentEvent, program)
        }, delay)

    }, [triggerPreviewOverlay, delay])

    const handleMouseLeave = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    return { handleMouseEnter, handleMouseLeave }
}