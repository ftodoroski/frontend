import React from "react";
import { useSelector } from "react-redux";
import { selectAnchorRect } from "../../features/ui/media_overlay_slice";
import { useMediaOverlay } from "../../features/ui/useMediaOverlay";
import computePreviewPosition from "../../util/layout/compute_preview_position";


const PreviewModal = () => {
    const anchorRect = useSelector(selectAnchorRect)
    const { closeOverlay } = useMediaOverlay()
    const { top, left } = computePreviewPosition(anchorRect)


    // Take out the height
    const tempCSS = {
        backgroundColor: 'red',
        position: 'absolute',
        top,
        left,
        width: (anchorRect.width * 1.45),
        height: 334
    }

    const handleMouseLeave = () => {
        closeOverlay()
    }

    return (
        <div className="preview-modal-container" style={tempCSS} onMouseLeave={handleMouseLeave}>
            <div>Hello from PreviewModal</div>
        </div>
    )
}

export default PreviewModal