import React from "react";
import '../../../assets/stylesheets/overlays.scss'
import Billboard from "./details_modal/billboard";
import CloseIcon from '../../../assets/images/browse_icons/close_icon.svg'
import DetailsContent from "./details_modal/details_content";


const DetailsModal = () => {

    return (
        <div className="details-modal-container">
            <Billboard />

            <div className="details-modal-close-container" title="close">
                <img src={CloseIcon} alt="Close modal" />
            </div>

            <DetailsContent />
        </div>
    )
}

export default DetailsModal