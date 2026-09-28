import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import '../../../assets/stylesheets/overlays.scss'
import { useSelector } from "react-redux";
import { selectTooltipOverlayAnchorRect, selectTooltipOverlayText } from "../../features/ui/tooltip_overlay_slice";


const TooltipOverlay = () => {
    const ANCHOR_HEIGHT_OFFSET_FACTOR = 1.33

    const tooltipText = useSelector(selectTooltipOverlayText)
    const tooltipAnchorRect = useSelector(selectTooltipOverlayAnchorRect)
    
    const containerRef = useRef(null);

    const [containerWidth, setContainerWidth] = useState(0);
    const [showState, setShowState] = useState(false)

    useEffect(() => {
        const rafId = requestAnimationFrame(() => {
            setShowState(true);
        });
        return () => cancelAnimationFrame(rafId);
    }, [])
    
    useLayoutEffect(() => {
        if (containerRef.current) {
            const width = containerRef.current.getBoundingClientRect().width;
            setContainerWidth(width);
        }
    }, [tooltipText, tooltipAnchorRect]);

    const calculateLeftOffset = () => {
        const anchorLeft = tooltipAnchorRect.x
        const anchorWidth = tooltipAnchorRect.width

        return (anchorLeft + (anchorWidth / 2)) - (containerWidth / 2)
    }

    const calculateTopOffset = () => {
        const anchorTop = tooltipAnchorRect.y
        const anchorHeight = tooltipAnchorRect.height        

        return (anchorTop - (anchorHeight * ANCHOR_HEIGHT_OFFSET_FACTOR))
    }

    const overlayStyle = {
        position: 'absolute', 
        left: calculateLeftOffset(),
        top: calculateTopOffset(),
        zIndex: 100,
        opacity: !showState ? 0 : 1
    }

    return (
        <div 
            ref={containerRef} 
            className="tooltip-overlay-container" 
            style={overlayStyle}
        >
            <div className="tooltip-overlay-inner-container">
                <div className="tooltip">
                    {tooltipText}
                </div>
            </div>
        </div>
    )
}

export default TooltipOverlay