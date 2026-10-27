import React, { useEffect, useState } from "react";
import '../../../../assets/stylesheets/overlays.scss'
import playIcon from '../../../../assets/images/browse_icons/play_icon.svg'
import downChevronIcon from '../../../../assets/images/browse_icons/down_chevron.svg'
import { useSelector } from "react-redux";
import { 
    selectTargetProgramType, 
    selectTargetProgramRating, 
    selectTargetProgramRuntime, 
    selectTargetProgramSeasons,
    selectTargetProgramID,
    selectMediaOverlay,
} from "../../../features/ui/media_overlay_slice";
import { useTooltipOverlay } from "../../../features/ui/useTooltipOverlay";
import { useEntityFocus } from "../../../hooks/useEntityFocus";
import { renderDuration } from "../../../util/ui/render_media_time";
import ThumbsRating from '../../buttons/thumbs_rating.jsx'
import WatchlistButton from "../../buttons/watchlist_button.jsx";

const InfoContainer = () => {
    const programID = useSelector(selectTargetProgramID)
    const programType = useSelector(selectTargetProgramType)
    const programRating = useSelector(selectTargetProgramRating)
    const programRuntime = useSelector(selectTargetProgramRuntime)
    const programSeasons = useSelector(selectTargetProgramSeasons)

    const isMovie = programType === 'Movie' ? true : false

    const { openTooltip, closeTooltip } = useTooltipOverlay()
    const { transitionPreviewToDetails, closeDetailsView } = useEntityFocus()

    useEffect(() => {
        return () => {
            closeTooltip();
        };
    }, []);

    const renderProgramType = () => {
        return programType === 'TvShow' ? <span>Show</span> : <span>Movie</span>
    }

    // Maybe i can put this in a hook so its reusable 
    const handleMoreInfoButton = () => {
        const currentScroll = window.scrollY

        const appLayoutGroup = document.querySelector('.app-layout-group');
        
        if (appLayoutGroup) {
            appLayoutGroup.style.overflow = 'hidden';
            appLayoutGroup.style.position = 'fixed';
            appLayoutGroup.style.top = `-${currentScroll}px`;
            appLayoutGroup.style.width = '100%';
        }

        document.body.style.overflowY = 'scroll';

        transitionPreviewToDetails(programID)
    }

    return (
        <div
            className="preview-modal-info-container"
        >
            <div
                className="preview-modal-metadata-controls-container"
            >
                <div className="button-controls">
                    {/* # Play button */}
                    <a 
                        href=""
                        className="program-play-button"
                    >
                        <button 
                            className="controls-button-base play"
                        >
                            <img src={playIcon} alt="Play program" />
                        </button>
                    </a>

                    {/* # Watchlist button */}
                    {<WatchlistButton />}

                    
                    {/* Thumbs rating section */}
                    {<ThumbsRating />}

                    {/* # More info / Episodes & info button */}
                    <div style={{ marginLeft: 'auto' }}>
                        <button 
                            className="controls-button-base secondary-button"
                            onMouseEnter={(e) => openTooltip(e, isMovie ? 'More info' : 'Episodes & info')}
                            onMouseLeave={closeTooltip}
                            onClick={handleMoreInfoButton}
                        >
                            <img 
                                src={downChevronIcon} 
                                alt="More info"
                            />
                        </button>
                    </div>
                </div>
                <div className="metadata-controls-info">
                    <div className="video-metadata-container">
                        {renderProgramType()}
                        <div className="program-card-maturity-rating">
                            <span className="program-card-maturity-number">{programRating}</span>
                        </div>
                        <span className="duration">{renderDuration(programRuntime, programType, programSeasons)}</span>
                        <span className="player-quality-badge">HD</span>
                    </div>
                </div>
                <div className="tags-container">
                    <div className="tags-list">
                        <div className="tag-item">Imaginative</div>
                        <div className="tag-item">Exciting</div>
                        <div className="tag-item">Fantasy</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoContainer














