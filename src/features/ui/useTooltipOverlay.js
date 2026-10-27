import { useDispatch } from "react-redux"
import { triggered, closed } from './tooltip_overlay_slice'

export const useTooltipOverlay = () => {
    const dispatch = useDispatch()

    const openTooltip = (target, text) => {
        let anchorRect;

        if (target && 'currentTarget' in target) {
            const rect = target.currentTarget.getBoundingClientRect()
    
            anchorRect = {
                x: rect.left + window.scrollX,
                y: rect.top + window.scrollY,
                width: rect.width,
                height: rect.height
            }

        } else {
            anchorRect = target
        }

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