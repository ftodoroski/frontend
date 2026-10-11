import React from "react";
import '../../../assets/stylesheets/overlays.scss'
import { useSelector } from "react-redux";
import PreviewModal from "./preview_modal";
import DetailsModal from "./details_modal";
import { selectModalType } from "../../features/ui/media_overlay_slice";


const MediaOverlay = () => {
    const modalType = useSelector(selectModalType)
    
    const renderComponentType = (modalType) => {
        switch (modalType) {
            case 'preview': return <PreviewModal />;
            case 'details': return <DetailsModal />;
            default: return null;
        }
    }

    const detailsOpenStyles = modalType === 'details' ? {
        height: '100%', 
        width: '100%', 
        boxSizing: 'border-box', 
        display: 'flex', 
        justifyContent: 'center', 
        willChange: 'scroll-position'
    } : {}

    return (
        <div className="media-overlay-container" style={detailsOpenStyles}>
            {renderComponentType(modalType)}
        </div>
    )
}

export default MediaOverlay