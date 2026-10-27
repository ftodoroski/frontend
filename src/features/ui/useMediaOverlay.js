import { useDispatch } from "react-redux"
import { closed, previewOpened, detailsTriggered, detailsOpened } from "./media_overlay_slice"


export const useMediaOverlay = () => {
    const dispatch = useDispatch()

    const openPreview = ({ anchorRect, targetProgram, suggestedPrograms }) => {
        dispatch(previewOpened({
            isOpen: true,
            modalType: 'preview',
            anchorRect,
            targetProgram,
            suggestedPrograms
        }))
    }

    const transitionToDetials = () => {
        dispatch(detailsTriggered())
    }

    const triggerDetailsDirectly = ({  }) => {
        dispatch(detailsTriggered({
            // Need to pass in data
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
        transitionToDetials, 
        triggerDetailsDirectly, 
        completeDetailsOpen
      }
}


