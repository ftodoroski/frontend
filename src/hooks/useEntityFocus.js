import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMediaOverlay } from "../features/ui/useMediaOverlay";
import { detailsTransitionCompleted, selectMediaOverlay, selectTargetElement } from "../features/ui/media_overlay_slice";
import { useDispatch, useSelector } from "react-redux";
import { scrollReset, scrollUpdated } from "../features/ui/scroll_slice";
import { selectAllPrograms } from "../features/entities/programs_slice";
import { generateSuggestedPrograms } from "../util/recommendations/recommendation_engine";
import findProgram from "../util/search/find_program";
import { lockScreenView, unlockScreenView } from "../util/dom/screen_lock";
import { flushSync } from "react-dom";


export function useEntityFocus() {
    const [searchParams, setSearchParams] = useSearchParams()
    const cardTargetElement = useSelector(selectTargetElement)

    const { transitionToDetails, triggerDetailsDirectly, closeOverlay } = useMediaOverlay()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const programs = useSelector(selectAllPrograms)

    const transitionPreviewToDetails = (programId, currentScrollY, anchorPreview) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('jbv', programId);
        setSearchParams(newParams, { replace: false, preventScrollReset: true });

        // Yield the thread for one micro-tick to reduce lag
        setTimeout(() => {
            // Fallback for older browsers
            if (!document.startViewTransition) {
                lockScreenView(currentScrollY);
                dispatch(scrollUpdated({ x: 0, y: currentScrollY }));
                transitionToDetails(anchorPreview);
                dispatch(detailsTransitionCompleted());
                return;
            }
    
            const transition = document.startViewTransition(() => {
                flushSync(() => {
                    lockScreenView(currentScrollY);    
                    dispatch(scrollUpdated({ x: 0, y: currentScrollY }));
                    transitionToDetails(anchorPreview);
                })
            });
    
            transition.finished.then(() => {
                dispatch(detailsTransitionCompleted());
            }).catch((err) => {
                console.log("Transition was skipped or interrupted", err);
                dispatch(detailsTransitionCompleted()); // Defensive backup
            });
        }, 0)
    }

    const loadDetailsOnPageMount = (programId, scrollY) => {
        const targetProgram = findProgram(Number(programId), programs)
        const suggestedPrograms = generateSuggestedPrograms(targetProgram, programs)

        // Yield the thread for one micro-tick to reduce lag
        setTimeout(() => {
            // Fallback for older browsers
            if (!document.startViewTransition) {
                lockScreenView(scrollY)
                triggerDetailsDirectly({ targetProgram, suggestedPrograms })
                return 
            }

            const transition = document.startViewTransition(() => {
                flushSync(() => {
                    lockScreenView(scrollY)
                    triggerDetailsDirectly({ targetProgram, suggestedPrograms })
                });
            });

            transition.finished.then(() => {
                dispatch(detailsTransitionCompleted());
            }).catch((err) => {
                console.log("Transition was skipped or interrupted", err);
                dispatch(detailsTransitionCompleted()); // Defensive backup
            });
        }, 0);        
    }
    
    const closeDetailsView = ({ targetPath = '/browse', scrollY = 0, isDeepLink = false } = {}) => {
        const finalScrollY = isDeepLink ? 0 : scrollY;

        const performClose = () => {
            closeOverlay();

            const isAlreadyAtTarget =
                window.location.pathname === targetPath &&
                !new URLSearchParams(window.location.search).has('jbv');

            if (!isAlreadyAtTarget) {
                navigate(targetPath);
            }

            unlockScreenView(finalScrollY);
            dispatch(scrollReset());
        }

        // Fallback for older browsers
        if (!document.startViewTransition) {
            performClose()
            return;
        }
    
        const transition = document.startViewTransition(() => {
            if (cardTargetElement) {
                cardTargetElement.classList.add('view-transition-exit-target');
            }

            flushSync(() => {
                performClose();
            })
        });

        transition.finished.then(() => {
            if (cardTargetElement) {
                cardTargetElement.classList.remove('view-transition-exit-target');
            }
        });
    }


    return {
        transitionPreviewToDetails, 
        loadDetailsOnPageMount,
        closeDetailsView
    }
}

