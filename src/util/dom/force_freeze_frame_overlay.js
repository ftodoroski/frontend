export const forceFreezeFrameOverlay = (previewModalElement) => {
    if (!previewModalElement) return;

    const thumbnailImg = previewModalElement.querySelector('.preview-modal-player-container img');
    const thumbClip = previewModalElement.querySelector('.preview-modal-player-container video');
    const treatmentContainer = previewModalElement.querySelector('.title-treatment-container');    
    
    if (thumbnailImg) {
        thumbnailImg.style.setProperty('opacity', '1', 'important');
        thumbnailImg.style.setProperty('pointer-events', 'auto', 'important');
        thumbnailImg.style.setProperty('transition', 'none', 'important');

        treatmentContainer.style.setProperty('opacity', '0', 'important');
        treatmentContainer.style.setProperty('pointer-events', 'none', 'important');
        treatmentContainer.style.setProperty('transition', 'none', 'important');
    }

    if (thumbClip && !thumbClip.paused) {
        thumbClip.pause();        
    }
};
