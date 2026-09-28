import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAnchorRect, selectIsMediaOverlayOpen, selectMediaOverlay } from "../../features/ui/media_overlay_slice";
import { useMediaOverlay } from "../../features/ui/useMediaOverlay";
import computePreviewPosition from "../../util/layout/compute_preview_position";
import '../../../assets/stylesheets/overlays.scss'
import PlayerContainer from "./preview_modal/player_container";
import InfoContainer from "./preview_modal/info_container";


const PreviewModal = () => {
    const anchorRect = useSelector(selectAnchorRect)
    const { closeOverlay } = useMediaOverlay()
    const { top, left, alignment } = computePreviewPosition(anchorRect)
    const [showState, setShowState] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    // Testing
    const mediaOverlayState = useSelector(selectMediaOverlay)
    // console.log(mediaOverlayState);
    

    const getTransformOriginX = { center: 50, left: 0, right: 100 }

    useEffect(() => {
        const rafId = requestAnimationFrame(() => {
            setShowState(true);
        });
        return () => cancelAnimationFrame(rafId);
        
    }, [])
    
    const modalStyle = {
        position: 'absolute',
        top,
        left,
        opacity: !showState ? 0 : 1,
        borderRadius: '6px',
        backgroundColor: 'transparent',
        boxShadow: 'rgba(0, 0, 0, 0.75) 0px 3px 10px',
        width: (anchorRect.width * 1.45),
        // height: 334,
        fontSize: '16px',
        color: '#fff',
        transform: !showState ? `scale(${(anchorRect.width / ((anchorRect.width * 1.45)))})` : 'scale(1)',
        transition: 'opacity 117ms linear, transform 117ms linear',
        transformOrigin: `${getTransformOriginX[alignment]}% 50%`,   
        willChange: 'transform',
        overflow: 'hidden',
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
            <PlayerContainer />
            <InfoContainer />
        </div>
    )
}

export default PreviewModal



















