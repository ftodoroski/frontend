import React, { useEffect, useState } from "react";
import '../../../assets/stylesheets/overlays.scss'
import Billboard from "./details_modal/billboard";
import CloseIcon from '../../../assets/images/browse_icons/close_icon.svg'
import DetailsContent from "./details_modal/details_content";
import { useEntityFocus } from "../../hooks/useEntityFocus";
import { useSelector } from "react-redux";
import { selectScrollY } from "../../features/ui/scroll_slice";
import { selectPreviewAnchor } from "../../features/ui/media_overlay_slice";
import computePreviewPosition from "../../util/layout/compute_preview_position";


const DetailsModal = () => {
    const { closeDetailsView } = useEntityFocus()

    const scrollY = useSelector(selectScrollY)
    const previewAnchor = useSelector(selectPreviewAnchor)

    const [showState, setShowState] = useState(false)

    useEffect(() => {
        const rafId = requestAnimationFrame(() => {
            setShowState(true);
        });
        return () => cancelAnimationFrame(rafId);
        
    }, [])

    // 314.5 is the width of the details modal when its scale is .37
    const modalStyle = {
        transformOrigin: '50% 0%',
        opacity: !showState ? 0 : 1,
        // transform: !showState ? 
        //     `translateX(${previewAnchor.clientLeft - ((document.documentElement.clientWidth - 314.5) / 2)}px) translateY(0px) scale(.37) translateZ(0px)` :
        //     `translateX(0px) translateY(-${(previewAnchor.clientTop) - 32}px) scale(1) translateZ(0px)`,
        // transition: 'transform 400ms linear, opacity 25ms ease-out',
        // transition: 'transform 500ms linear',
        pointerEvents: 'auto',
        // top: `${previewAnchor.clientTop}px`,
        // willChange: 'transform, opacity',
        willChange: 'opacity',
    }

    return (
        <div className="details-modal-container" style={modalStyle}>
            <Billboard />

            <div 
                className="details-modal-close-container" 
                title="close" 
                onClick={() => closeDetailsView({ scrollY })}
            >
                <img src={CloseIcon} alt="Close modal" />
            </div>

            <DetailsContent />
        </div>
    )
}

export default DetailsModal