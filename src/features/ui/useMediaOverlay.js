import { useDispatch } from "react-redux"
import { clearOverlay, setOverlay } from "./media_overlay_slice"


export const useMediaOverlay = () => {
    const dispatch = useDispatch()

    // function not done - testing it still
    const openPreview = ({ anchorRect, targetProgram, suggestedPrograms }) => {
        dispatch(setOverlay({
            isOpen: true,
            modalType: 'preview',
            anchorRect,
            targetProgram,
            suggestedPrograms
        }))
    }

    const closeOverlay = () => {
        dispatch(clearOverlay)
    }

    return { 
        openPreview,
        closeOverlay,
      }
}


