import { useDispatch } from "react-redux"
import { closed, previewOpened, detailsTriggered, detailsOpened } from "./media_overlay_slice"


export const useMediaOverlay = () => {
    const dispatch = useDispatch()

    const openPreview = ({ anchorCard, targetProgram, suggestedPrograms, targetElement }) => {
        dispatch(previewOpened({
            isOpen: true,
            modalType: 'preview',
            anchorCard,
            targetProgram,
            suggestedPrograms, 
            targetElement
        }))
    }

    const transitionToDetails = (anchorPreview) => {        
        dispatch(detailsTriggered({ anchorPreview }))
    }

    // Need to add default or zero preview achor coordinates
    // Need to also add maybe another anchor point for when a user clicks on the more info button on browse billboard
    const triggerDetailsDirectly = ({ targetProgram, suggestedPrograms }) => {
        const anchorPreview = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }

        dispatch(detailsTriggered({
            isOpen: true,
            anchorPreview,
            targetProgram,
            suggestedPrograms,
        }))
    }

    const completeDetailsOpen = () => {
        dispatch(detailsOpened())
    }

    const closeOverlay = () => {
        dispatch(closed())
    }

    return { 
        closeOverlay,
        openPreview, 
        transitionToDetails, 
        triggerDetailsDirectly, 
        completeDetailsOpen
      }
}


