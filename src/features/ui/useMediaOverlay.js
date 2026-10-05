import { useDispatch } from "react-redux"
import { closed, triggeredDetails, triggeredPreview } from "./media_overlay_slice"


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

    const openDetails = () => {
        dispatch(triggeredDetails())
    }

    const closeOverlay = () => {
        dispatch(closed())
    }

    return { 
        openPreview,
        openDetails,
        closeOverlay,
      }
}


