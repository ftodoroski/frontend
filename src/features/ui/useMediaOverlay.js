import { useDispatch } from "react-redux"
import { closed, previewOpened, detailsTriggered, detailsOpened } from "./media_overlay_slice"


export const useMediaOverlay = () => {
    const dispatch = useDispatch()

    const openPreview = ({ anchorCard, targetProgram, suggestedPrograms }) => {
        dispatch(previewOpened({
            isOpen: true,
            modalType: 'preview',
            anchorCard,
            targetProgram,
            suggestedPrograms
        }))
    }

    // Need to add preview anchor coordinates
    const transitionToDetails = (anchorPreview) => {        

        dispatch(detailsTriggered({ anchorPreview }))
    }

    // Need to add default or zero preview achor coordinates
    const triggerDetailsDirectly = ({ anchorPreview, targetProgram, suggestedPrograms }) => {
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


