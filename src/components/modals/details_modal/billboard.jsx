import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import '../../../../assets/stylesheets/overlays.scss'
import { selectIsTransitionFinished, selectTargetProgram } from "../../../features/ui/media_overlay_slice";
import PlayIcon from '../../../../assets/images/browse_icons/play_icon.svg'
import MuteSoundIcon from '../../../../assets/images/browse_icons/mute_volume_icon.svg'
import VolumeIcon from '../../../../assets/images/browse_icons/volume_icon.svg'
import ThumbsRating from "../../buttons/thumbs_rating";
import WatchlistButton from "../../buttons/watchlist_button";
import { usePixelScrollTrigger } from "../../../util/dom/hooks/usePixelScrollTrigger";

const Billboard = () => {
    const program = useSelector(selectTargetProgram)
    const isTransitionFinished = useSelector(selectIsTransitionFinished)

    const [_, isPastBoundary ] = usePixelScrollTrigger(200)

    const videoRef = useRef(null)
    const isPlayingRef = useRef(isPlaying);
    const hasFinishedRef = useRef(hasFinished);

    const [isMuted, setIsMuted] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)


    isPlayingRef.current = isPlaying;
    hasFinishedRef.current = hasFinished;

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || hasFinishedRef.current) return;

        const isScrollingAway = isPastBoundary && isPlayingRef.current;
        const isScrollingBack = !isPastBoundary && !isPlayingRef.current;

        if (isScrollingAway) {
            setIsPlaying(false);
            videoElement.pause();
        } else if (isScrollingBack) {
            setIsPlaying(true);
            videoElement.play().catch((error) => {
                console.warn("Playback was prevented or interrupted:", error);
                setIsPlaying(false);
            });
        }
    }, [isPastBoundary]);

    useEffect(() => {
        let timerRef = null;
        const videoElement = videoRef.current;

        if (isTransitionFinished && videoElement) {
            timerRef = setTimeout(() => {
                videoElement.play()
                .then(() => {
                    setIsPlaying(true)
                })
                .catch((error) => {
                    console.log("Autoplay blocked or interrupted:", error)
                });
            }, 1000)
        }

        return () => {
            if (timerRef) clearTimeout(timerRef);

            if (videoElement) {
                videoElement.pause();
                videoElement.currentTime = 0; 
            }
        }

    }, [isTransitionFinished])

    return (
        <div className="details-modal-billboard-container">
            {/* Billboard video */}
            <div className="billboard-video-wrapper">
                <div className="billboard-video-container">
                    <video
                        ref={videoRef}
                        className="billboard-video" 
                        src={`${program.thumbclip}`}
                        muted={isMuted}
                        preload="metadata"
                        onEnded={() => {
                            setHasFinished(true)
                            hasFinishedRef.current = true
                            setIsPlaying(false)
                        }}
                        style={{ opacity: isPlaying ? 1 : 0 }}
                    ></video>
                </div>
            </div>

            {/* Backgrond image */}
            <div className="background-container">
                <img
                    className="background" 
                    src={program.background} 
                    alt={`${program.title} background`}
                    style={{ opacity: isPlaying ? 0 : 1 }}
                />
            </div>

            {/* Title treatment */}
            <div className="title-treatment-container">
                <div className="title-treatment">
                    <img
                        className="title-treatment-logo" 
                        src={program.logo} 
                        alt={`${program.title} logo`} 
                    />
                    <div className="button-controls-container">
                        <a href="" className="details-play-button-container">
                            <button className="details-play-button">
                                <img 
                                    className="default-icon-contain"
                                    src={PlayIcon} 
                                    alt="Play program" 
                                />
                                <div className="details-play-button-space"></div>
                                <span>Play</span>
                            </button>
                        </a>
                        {<WatchlistButton />}
                        {<ThumbsRating />}
                    </div>
                    <div className="h-divider-offset"></div>
                </div>
                <div className="audio-toggle-container">
                    <button className="details-base-button" onClick={() => setIsMuted(prev => !prev)}>
                        <img
                            className="default-icon-contain"
                            src={isMuted ? MuteSoundIcon : VolumeIcon}
                            alt="Toggle sound"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Billboard