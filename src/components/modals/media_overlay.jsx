import React from "react";
import '../../../assets/stylesheets/overlays.scss'
import { useSelector } from "react-redux";
import PreviewModal from "./preview_modal";
import DetailsModal from "./details_modal";
import { selectDetailsModalStatus, selectModalType } from "../../features/ui/media_overlay_slice";


const MediaOverlay = () => {
    const modalType = useSelector(selectModalType)
    const detailsModalStatus = useSelector(selectDetailsModalStatus)
    
    const renderComponentType = (modalType, detailsModalStatus) => {
        switch (true) {
            case modalType === 'preview': return <PreviewModal />;
            case modalType === 'details' && detailsModalStatus === 'open': return <DetailsModal />;
            default: return null;
        }
    }

    const detailsOpenStyles = modalType === 'details' ? {
        height: '100%', 
        width: '100%', 
        boxSizing: 'border-box', 
        display: 'flex', 
        justifyContent: 'center', 
        willChange: 'scroll-position', 
        pointerEvents: 'none',
    } : {}

    return (
        <div className="media-overlay-container" style={detailsOpenStyles}>
            {renderComponentType(modalType, detailsModalStatus)}
        </div>
    )
}

export default MediaOverlay