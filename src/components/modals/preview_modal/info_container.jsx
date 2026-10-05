import React, { useEffect, useRef, useState } from "react";
import '../../../../assets/stylesheets/overlays.scss'
import playIcon from '../../../../assets/images/browse_icons/play_icon.svg'
import plusIcon from '../../../../assets/images/browse_icons/plus_icon.svg'
import checkmarkIcon from '../../../../assets/images/browse_icons/checkmark_icon.svg'
import defaultLikeIcon from '../../../../assets/images/browse_icons/like_icon.svg'
import dislikeFilledIcon from '../../../../assets/images/browse_icons/dislike_filled_icon.svg'
import likeFilledIcon from '../../../../assets/images/browse_icons/like_filled_icon.svg'
import doubleLikeFilledIcon from '../../../../assets/images/browse_icons/double_like_filled_icon.svg'

import ReactionDislikeOutline from '../../../../assets/images/browse_icons/dislike_reaction_outline_icon.svg'
import ReactionLikeOutline from '../../../../assets/images/browse_icons/like_reaction_outline_icon.svg'
import ReactionDoubleLikeOutline from '../../../../assets/images/browse_icons/double_like_reaction_outline_icon.svg'
import ReactionDislikeFilled from '../../../../assets/images/browse_icons/dislike_reaction_filled_icon.svg'
import ReactionLikeFilled from '../../../../assets/images/browse_icons/like_reaction_filled_icon.svg'
import ReactionDoubleLikeFilled from '../../../../assets/images/browse_icons/double_like_reaction_filled_icon.svg'
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

const InfoContainer = () => {
    const programID = useSelector(selectTargetProgramID)
    const programType = useSelector(selectTargetProgramType)
    const programRating = useSelector(selectTargetProgramRating)
    const programRuntime = useSelector(selectTargetProgramRuntime)
    const programSeasons = useSelector(selectTargetProgramSeasons)

    const isMovie = programType === 'Movie' ? true : false

    const { openTooltip, closeTooltip } = useTooltipOverlay()
    const { triggerDetailsView, closeDetailsView } = useEntityFocus()

    const [inWatchlist, setInWatchlist] = useState(false)
    const [insideThumbsReactionZone, setInsideThumbsReactionZone] = useState(false)
    
    const [isDisliked, setIsDisliked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDoubleLiked, setIsDoubleLiked] = useState(false);
    
    const [animate, setAnimate] = useState(false)
    // Possible values: 'idle' (unmounted), 'entering' (mounted but hidden), 'visible' (mounted and visible)
    const [animationPhase, setAnimationPhase] = useState('idle');
    
    const thumbsRatingButtonRef = useRef(null)
    const hoverTimerRef = useRef(null)

    useEffect(() => {
        return () => {
            closeTooltip();
        };
    }, []);

    useEffect(() => {
        return () => {
            if (hoverTimerRef.current) {
                clearTimeout(hoverTimerRef.current);
            }
        };
    }, []);

    const handleOpenTooltip = (e, text) => {
        const Y_OFFSET = 2
        
        const targetElementRect = e.target.getBoundingClientRect()
        const anchorHeight = thumbsRatingButtonRef.current.getBoundingClientRect().height
        const anchorY = thumbsRatingButtonRef.current.getBoundingClientRect().top
        
        const anchorRect = {
            x: targetElementRect.left + window.scrollX,
            y: anchorY + window.scrollY + Y_OFFSET,
            width: targetElementRect.width,
            height: anchorHeight
        }
            
        openTooltip({ text, anchorRect })
    }

    const showTooltip = (e, text) => {
        const rect = e.currentTarget.getBoundingClientRect()

        const anchorRect = {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height
        }
    
        openTooltip({ text, anchorRect })
    }

    const hideTooltip = () => {
        closeTooltip()
    }
    
    const toggleWatchlist = () => {
        // Temp func until i connect the whole thing
        // Task: Rename function

        if (!inWatchlist) {
            setInWatchlist(true)
        } else if (inWatchlist) {
            setInWatchlist(false)
        }

        hideTooltip()
    }

    const renderWatchlistButton = () => {
        return (
            <div>
                <button 
                    className={`controls-button-base secondary-button ${!inWatchlist ? 'add-to-my-list' : 'remove-from-my-list'}`}
                    onClick={toggleWatchlist}
                    onMouseEnter={(e) => { showTooltip(e, inWatchlist ? 'Remove from My List' : 'Add to My List');}}
                    onMouseLeave={hideTooltip}
                >
                    <img 
                        src={!inWatchlist ? plusIcon : checkmarkIcon} 
                        alt={!inWatchlist ? "Add to My List" : "Remove from My List"} 
                    />
                </button>
            </div>
        )
    }

    const handleThumbsReactionHover = () => {
        if (hoverTimerRef.current) return

        hoverTimerRef.current = setTimeout(() => {
            setAnimationPhase('entering');
            setInsideThumbsReactionZone(true)
            hoverTimerRef.current = null

            requestAnimationFrame(() => {
                setAnimationPhase('visible');
            });
            
        }, 200)
    }

    const handleThumbsReactionHoverExit = () => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current)
            hoverTimerRef.current = null
        }

        setAnimationPhase('exiting');
        
        setTimeout(() => {
            setInsideThumbsReactionZone(false)
            setAnimationPhase('idle');
        }, 500); 
    }

    const thumbsSelectionOverlayStyle = {
        opacity: animationPhase === 'visible' ? 1 : 0,
        transform: animationPhase === 'visible' ? 'scale(1)' : 'scale(0.5)',
        position: 'absolute',
        fontSize: '10px',
        top: 0,
        left: '17%',
        transition: 'opacity 0.2s linear, transform 0.4s cubic-bezier(0.5, 0, 0.1, 1)'
    }

    const handleReaction = (reactionType) => {
        const reactionValues = {
            dislike: isDisliked,
            like: isLiked,
            doubleLike: isDoubleLiked
        };

        const reactionSetters = {
            dislike: setIsDisliked,
            like: setIsLiked,
            doubleLike: setIsDoubleLiked
        };

        const isCurrentActive = reactionValues[reactionType];
        const setReactionState = reactionSetters[reactionType];

        if (setReactionState) {
            Object.values(reactionSetters).forEach((resetState) => {
                resetState(false);
            });

            setAnimate(true)
            setReactionState(!isCurrentActive);
            hideTooltip()
        }
    }

    const renderThumbsReaction = () => {
        return (
            <div 
                className="thumbs-selection-overlay" 
                style={thumbsSelectionOverlayStyle}
                onMouseLeave={() => setAnimate(false)}
            >
                <div className="thumbs-selection-container">

                    <div 
                        className="reaction-container"
                        onMouseEnter={(e) => handleOpenTooltip(e, isDisliked ? 'Rated': 'Not for me')}
                        onMouseLeave={hideTooltip}
                    >
                        <div style={{ opacity: 1, transform: 'none' }}>
                            <button 
                                className="reaction-button dislike" 
                                onClick={() => handleReaction('dislike')}
                            >
                                <img
                                    src={!isDisliked ? ReactionDislikeOutline : ReactionDislikeFilled}
                                    alt="Dislike program"
                                    style={{ transform: 'scale(2)', pointerEvents: 'none' }}
                                    className={`${isDisliked && animate ? 'animate' : ''}`} 
                                />
                            </button>
                        </div>
                    </div>

                    <div 
                        className="reaction-container"
                        onMouseEnter={(e) => handleOpenTooltip(e, isLiked ? 'Rated' : 'I like this')}
                        onMouseLeave={hideTooltip}
                    >
                        <div style={{ opacity: 1, transform: 'none' }}>
                            <button 
                                className="reaction-button like" 
                                onClick={() => handleReaction('like')}
                            >
                                <img
                                    src={!isLiked ? ReactionLikeOutline : ReactionLikeFilled}
                                    alt="Like program"
                                    style={{ transform: 'scale(2)', pointerEvents: 'none' }}
                                    className={`${isLiked && animate ? 'animate' : ''}`}
                                />
                            </button>
                        </div>
                    </div>

                    <div 
                        className="reaction-container"
                        onMouseEnter={(e) => handleOpenTooltip(e, isDoubleLiked ? 'Rated' : 'Love this!')}
                        onMouseLeave={hideTooltip}
                    >
                        <div style={{ opacity: 1, transform: 'none' }}>
                            <button 
                                className="reaction-button double-like" 
                                onClick={() => handleReaction('doubleLike')}
                            >
                                <img
                                    src={!isDoubleLiked ? ReactionDoubleLikeOutline : ReactionDoubleLikeFilled}
                                    alt="Double like program"
                                    style={{ transform: 'scale(2)', pointerEvents: 'none' }}
                                    className={`${isDoubleLiked && animate ? 'animate' : ''}`}
                                />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const renderRuntime = () => {
        const MINUTES_IN_HOUR = 60
        const isHourOrLess = programRuntime <= MINUTES_IN_HOUR
        const isFullHours = (programRuntime % MINUTES_IN_HOUR) === 0

        if (isHourOrLess) {
            return (
                <span className="duration">{`${programRuntime}m`}</span>
            )
        } else if (isFullHours) {
            const hours = programRuntime / MINUTES_IN_HOUR;

            return (
                <span className="duration">{`${hours}h`}</span>
            )
        } else {
            const hours = Math.trunc(programRuntime / MINUTES_IN_HOUR)
            const minutes = programRuntime % MINUTES_IN_HOUR

            return (
                <span className="duration">{`${hours}h ${minutes}m`}</span>
            ) 
        }
    }

    const renderDuration = () => {
        if (programType === 'TvShow') {
            return (
                <span className="duration">{`${programSeasons} Seasons`}</span>
            )
        } else if (programType === 'Movie') {
            return renderRuntime()
        }
    }

    const renderProgramType = () => {
        return programType === 'TvShow' ? <span>Show</span> : <span>Movie</span>
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
                    {renderWatchlistButton()}

                    {/* Thumbs rating section */}
                    <div 
                        className="thumbs-rating-container" 
                        onMouseLeave={handleThumbsReactionHoverExit}
                    >
                        <button
                            ref={thumbsRatingButtonRef}
                            className="controls-button-base supplementary-button"
                            onMouseEnter={handleThumbsReactionHover}
                        >
                            <img 
                                src={
                                    isLiked ? likeFilledIcon :
                                        isDisliked ? dislikeFilledIcon :
                                            isDoubleLiked ? doubleLikeFilledIcon :
                                                defaultLikeIcon
                                } 
                                alt="Thumbs rating button" 
                            />
                        </button>

                        {insideThumbsReactionZone && renderThumbsReaction()}
                    </div>

                    {/* # More info / Episodes & info button */}
                    <div style={{ marginLeft: 'auto' }}>
                        <button 
                            className="controls-button-base secondary-button"
                            onMouseEnter={(e) => showTooltip(e, isMovie ? 'More info' : 'Episodes & info')}
                            onMouseLeave={hideTooltip}
                            onClick={() => triggerDetailsView(programID)}
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
                        {renderDuration()}
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


















