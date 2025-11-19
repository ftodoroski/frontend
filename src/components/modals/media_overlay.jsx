import React from "react";
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

    return (
        <div className="media-overlay">
            {renderComponentType(modalType)}
        </div>
    )
}

export default MediaOverlay