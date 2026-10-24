import { useDispatch } from "react-redux"
import { closed, triggeredPreview, triggeredDetails, preparedDetails } from "./media_overlay_slice"


export const useMediaOverlay = () => {
    const dispatch = useDispatch()

    const openPreview = ({ anchorRect, targetProgram, suggestedPrograms }) => {
        dispatch(triggeredPreview({
            isOpen: true,
            modalType: 'preview',
            anchorRect,
            targetProgram,
            suggestedPrograms
        }))
    }

    const triggerDetails = () => {
        dispatch(triggeredDetails())
    }

    const openDetails = () => {
        dispatch(preparedDetails())
    }

    // Need to write function for preparedDetails when its all done

    const closeOverlay = () => {
        dispatch(closed())
    }

    return { 
        openPreview,
        triggerDetails,
        openDetails,
        closeOverlay,
      }
}


