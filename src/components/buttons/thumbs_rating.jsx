import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import defaultLikeIcon from '../../../assets/images/browse_icons/like_icon.svg'
import dislikeFilledIcon from '../../../assets/images/browse_icons/dislike_filled_icon.svg'
import likeFilledIcon from '../../../assets/images/browse_icons/like_filled_icon.svg'
import doubleLikeFilledIcon from '../../../assets/images/browse_icons/double_like_filled_icon.svg'

import ReactionDislikeOutline from '../../../assets/images/browse_icons/dislike_reaction_outline_icon.svg'
import ReactionLikeOutline from '../../../assets/images/browse_icons/like_reaction_outline_icon.svg'
import ReactionDoubleLikeOutline from '../../../assets/images/browse_icons/double_like_reaction_outline_icon.svg'
import ReactionDislikeFilled from '../../../assets/images/browse_icons/dislike_reaction_filled_icon.svg'
import ReactionLikeFilled from '../../../assets/images/browse_icons/like_reaction_filled_icon.svg'
import ReactionDoubleLikeFilled from '../../../assets/images/browse_icons/double_like_reaction_filled_icon.svg'
import { useTooltipOverlay } from "../../features/ui/useTooltipOverlay";

import '../../../assets/stylesheets/overlays.scss'


const ThumbsRating = () => {
    const { openTooltip, closeTooltip } = useTooltipOverlay()

    const [isDisliked, setIsDisliked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDoubleLiked, setIsDoubleLiked] = useState(false);

    const [insideThumbsReactionZone, setInsideThumbsReactionZone] = useState(false)

    // Possible values: 'idle' (unmounted), 'entering' (mounted but hidden), 'visible' (mounted and visible)
    const [animationPhase, setAnimationPhase] = useState('idle');
    const [animate, setAnimate] = useState(false)
    const [leftPosition, setLeftPosition] = useState(null)

    const thumbsRatingButtonRef = useRef(null)
    const thumbsReactionOverlayRef = useRef(null)
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

    useLayoutEffect(() => {
        const anchorButton = thumbsRatingButtonRef.current;
        const popup = thumbsReactionOverlayRef.current;


        if (anchorButton && popup) {
            const anchorWidth = anchorButton.getBoundingClientRect().width
            const popupWidth = popup.offsetWidth

            const centeredLeft = (anchorWidth / 2) - (popupWidth / 2)
            setLeftPosition(centeredLeft)
        }

        return () => {
            setLeftPosition(null)
        }

    }, [animationPhase])

    const isPopupReadyAndVisible = animationPhase === 'visible' && leftPosition !== null

    const thumbsSelectionOverlayStyle = {
        position: 'absolute',
        top: '-5px',
        fontSize: '10px',

        left: leftPosition === null ? '0px': leftPosition,
        visibility: leftPosition === null ? 'hidden' : 'visible',

        opacity: isPopupReadyAndVisible ? 1 : 0,
        transform: isPopupReadyAndVisible ? 'scale(1)' : 'scale(0.5)',
        transition: 'opacity 0.2s linear, transform 0.4s cubic-bezier(0.5, 0, 0.1, 1)'
    }

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

        openTooltip( anchorRect, text )
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
            closeTooltip()
        }
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
    
    const renderThumbsReaction = () => {
        return (
            <div
                className="thumbs-selection-overlay"
                style={thumbsSelectionOverlayStyle}
                onMouseLeave={() => setAnimate(false)}
                ref={thumbsReactionOverlayRef}
            >
                <div className="thumbs-selection-container">

                    <div
                        className="reaction-container"
                        onMouseEnter={(e) => handleOpenTooltip(e, isDisliked ? 'Rated' : 'Not for me')}
                        onMouseLeave={closeTooltip}
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
                        onMouseLeave={closeTooltip}
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
                        onMouseLeave={closeTooltip}
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

    return (
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
    )
}

export default ThumbsRating