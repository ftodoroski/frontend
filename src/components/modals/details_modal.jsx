import React from "react";
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

    return (
        <div className="details-modal-container" style={{ pointerEvents: 'auto' }}>
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