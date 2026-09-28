import { useDispatch } from "react-redux"
import { triggered, closed } from './tooltip_overlay_slice'

export const useTooltipOverlay = () => {
    const dispatch = useDispatch()

    const openTooltip = ({ anchorRect, text }) => {
        dispatch(triggered({
            isOpen: true,
            text,
            anchorRect, 
        }))
    }

    const closeTooltip = () => {
        dispatch(closed())
    }
    
    return {
        openTooltip, 
        closeTooltip
    }
}