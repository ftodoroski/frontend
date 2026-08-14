import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAnchorRect, selectIsMediaOverlayOpen } from "../../features/ui/media_overlay_slice";
import { useMediaOverlay } from "../../features/ui/useMediaOverlay";
import computePreviewPosition from "../../util/layout/compute_preview_position";
import '../../../assets/stylesheets/overlays.scss'


const PreviewModal = () => {
    const anchorRect = useSelector(selectAnchorRect)
    const { closeOverlay } = useMediaOverlay()
    const { top, left, alignment } = computePreviewPosition(anchorRect)
    const [showState, setShowState] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const getTransformOriginX = { center: 50, left: 0, right: 100 }

    useEffect(() => {
        const rafId = requestAnimationFrame(() => {
            setShowState(true);
        });
        return () => cancelAnimationFrame(rafId);
        
    }, [])
    
    const modalStyle = {
        opacity: !showState ? 0 : 1,
        transform: !showState ? `scale(${(anchorRect.width / ((anchorRect.width * 1.45)))})` : 'scale(1)',

        backgroundColor: 'blue',
        // backgroundColor: 'transparent',
        boxShadow: 'rgba(0, 0, 0, 0.75) 0px 3px 10px',
        top,
        left,
        width: (anchorRect.width * 1.45),
        height: 334,

        borderRadius: '6px',
        color: '#fff',
        fontSize: '16px',
        overflow: 'hidden',
        position: 'absolute',
        willChange: 'transform',

        transition: 'opacity 117ms linear, transform 117ms linear',

        transformOrigin: `${getTransformOriginX[alignment]}% 50%`,
    }
    
    const handleMouseLeave = () => {        
        setIsClosing(true)
        setShowState(false)
    }

    const handleTransitionEnd = () => {
        if (isClosing) closeOverlay()
    }

    return (
        <div 
            className="preview-modal-container" 
            style={modalStyle} 
            onMouseLeave={handleMouseLeave}
            onTransitionEnd={handleTransitionEnd}
        >
            <div>Hello from PreviewModal</div>
        </div>
    )
}

export default PreviewModal








