import React, { useEffect, useState } from "react";
import '../../../assets/stylesheets/overlays.scss'
import Billboard from "./details_modal/billboard";
import CloseIcon from '../../../assets/images/browse_icons/close_icon.svg'
import DetailsContent from "./details_modal/details_content";
import { useEntityFocus } from "../../hooks/useEntityFocus";
import { useSelector } from "react-redux";
import { selectScrollY } from "../../features/ui/scroll_slice";
import { useLocation, useSearchParams } from "react-router-dom";
import { selectCardAnchor, selectIsMediaOverlayOpen, selectModalType } from "../../features/ui/media_overlay_slice";


const DetailsModal = () => {
    const location = useLocation();
    const [ searchParams, _ ] = useSearchParams()

    const { closeDetailsView } = useEntityFocus()

    const scrollY = useSelector(selectScrollY)
    const modalType = useSelector(selectModalType)
    const isModalOverlayOpen = useSelector(selectIsMediaOverlayOpen)
    const anchorCard = useSelector(selectCardAnchor)
    
    const isDeepLink = location.pathname.includes("/title/")
    const [showState, setShowState] = useState(isDeepLink)

    const isBrowseRoute = location.pathname === '/browse';
    const hasJbvParam = searchParams.has('jbv');
    const isDetailsOpen = modalType === 'details' && isModalOverlayOpen
    const hasNoAnchorOnBrowse = isBrowseRoute && !anchorCard && (hasJbvParam || isDetailsOpen)
    const isStandalone = isDeepLink || hasNoAnchorOnBrowse

    useEffect(() => {
        if (isDeepLink) return

        const rafId = requestAnimationFrame(() => {
            setShowState(true);
        });
        return () => cancelAnimationFrame(rafId);
        
    }, [isDeepLink])

    const modalStyle = {
        transformOrigin: '50% 0%',
        opacity: !showState ? 0 : 1,
        pointerEvents: 'auto',
        willChange: 'opacity',
    }

    return (
        <div 
            className={`details-modal-container ${isStandalone ? 'is-standalone' : ''}`} 
            style={modalStyle}
        >
            <Billboard />

            <div 
                className="details-modal-close-container" 
                title="close" 
                onClick={() => closeDetailsView({ scrollY, isDeepLink })}
            >
                <img src={CloseIcon} alt="Close modal" />
            </div>

            <DetailsContent />
        </div>
    )
}

export default DetailsModal