import React, { useEffect, useState } from "react";
import '../../../assets/stylesheets/overlays.scss'
import Billboard from "./details_modal/billboard";
import CloseIcon from '../../../assets/images/browse_icons/close_icon.svg'
import DetailsContent from "./details_modal/details_content";
import { useEntityFocus } from "../../hooks/useEntityFocus";
import { useSelector } from "react-redux";
import { selectScrollY } from "../../features/ui/scroll_slice";


const DetailsModal = () => {
    const { closeDetailsView } = useEntityFocus()

    const scrollY = useSelector(selectScrollY)

    const [showState, setShowState] = useState(false)

    useEffect(() => {
        const rafId = requestAnimationFrame(() => {
            setShowState(true);
        });
        return () => cancelAnimationFrame(rafId);
        
    }, [])

    const modalStyle = {
        transformOrigin: '50% 0%',
        transform: !showState ? `scale(.3)` : 'scale(1)',
        transition: 'transform 3s linear',
        pointerEvents: 'auto', 
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