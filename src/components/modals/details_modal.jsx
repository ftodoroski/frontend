import React from "react";
import '../../../assets/stylesheets/overlays.scss'
import Billboard from "./details_modal/billboard";
import CloseIcon from '../../../assets/images/browse_icons/close_icon.svg'


const DetailsModal = () => {

    return (
        <div className="details-modal-container">
            <Billboard />

            <div className="details-modal-close-container" title="close">
                <img src={CloseIcon} alt="Close modal" />
            </div>

            <div className="details-modal-info-container"></div>
        </div>
    )
}

export default DetailsModal