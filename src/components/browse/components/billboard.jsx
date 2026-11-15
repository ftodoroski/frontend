import React, { useState, useEffect, useReducer, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link, useSearchParams } from 'react-router-dom';
import '../../../../assets/stylesheets/browse.scss'
import playIcon from '../../../../assets/images/browse_icons/play_icon.svg'
import infoIcon from '../../../../assets/images/browse_icons/info_icon.svg'
import muteVolumeIcon from '../../../../assets/images/browse_icons/mute_volume_icon.svg'
import volumeOnIcon from '../../../../assets/images/browse_icons/volume_icon.svg'
import replayIcon from '../../../../assets/images/browse_icons/replay_icon.svg'
import findProgram from '../../../util/search/find_program'
import { selectAllPrograms } from '../../../features/entities/programs_slice';
import { selectCurrentProfile, selectShowcaseId } from '../../../features/auth/auth_slice';
import { usePixelScrollTrigger } from '../../../util/dom/hooks/usePixelScrollTrigger';
import { selectIsMediaOverlayOpen } from '../../../features/ui/media_overlay_slice';


const Billboard = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [_, isPastBoundary ] = usePixelScrollTrigger(450)

    const programs = useSelector(selectAllPrograms)
    const currentProfile = useSelector(selectCurrentProfile)
    const showcaseId = useSelector(selectShowcaseId)
    const isMediaOverlayOpen = useSelector(selectIsMediaOverlayOpen)

    const [defaultWrapperSize, setDefaultWrapperSize] = useState(true)

    const [showcaseProgram, setShowcaseProgram] = useState({})

    const isNotEmpty = (obj) => {
        return obj && Object.keys(obj).length > 0;
    };

    const [isMuted, setIsMuted] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    
    const videoRef = useRef(null)
    const isPlayingRef = useRef(isPlaying);
    const hasFinishedRef = useRef(hasFinished);

    isPlayingRef.current = isPlaying;
    hasFinishedRef.current = hasFinished;
    
    // scrolling away and/or modal is opened
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || hasFinishedRef.current) return;
        let timerRef = null

        const isScrollingAway = isPastBoundary && isPlayingRef.current;
        const isScrollingBack = !isPastBoundary && !isPlayingRef.current && !isMediaOverlayOpen;

        if (isScrollingAway || isMediaOverlayOpen) {
            setIsPlaying(false);
            videoElement.pause();
        } else if (isScrollingBack) {

            timerRef = setTimeout(() => {
                setIsPlaying(true);
                videoElement.play().catch((error) => {
                    console.warn("Playback was prevented or interrupted:", error);
                    setIsPlaying(false);
                });
            }, 1200)
        }

        return () => {
            if (timerRef) clearTimeout(timerRef);
        }

    }, [isPastBoundary, isMediaOverlayOpen]);

    // Start of video timer
    useEffect(() => {
        let timerRef = null;
        const videoElement = videoRef.current;

        if (videoElement && !isPastBoundary && !isMediaOverlayOpen) {
            timerRef = setTimeout(() => {
                videoElement.play()
                    .then(() => {
                        setIsPlaying(true)
                    })
                    .catch((error) => {
                        console.log("Autoplay blocked or interrupted:", error)
                    });
            }, 2000)
        }

        return () => {
            if (timerRef) clearTimeout(timerRef);

            if (videoElement) {
                videoElement.pause();
            }
        }
    }, [showcaseProgram, isMediaOverlayOpen])

    useEffect(() => {
        if (!programs?.length || !currentProfile || !showcaseId) return;

        setShowcaseProgram((findProgram(showcaseId, programs)))
    }, [programs, currentProfile, showcaseId])

    // Put these 3 in their own file
    const defaultWrapperStyle = {
        titleWrapper: {
            'transform-origin': 'left bottom',
            'transform': 'scale(1) translate3d(0px, 0px, 0px)',
            'transition-duration': '1300ms',
            'transition-delay': '0ms',
        },
        infoWrapper: {
            'transform': 'translate3d(0px, 0px, 0px)',
            'transition-duration': '1300ms',
            'transition-delay': '0ms',
            'opacity': '1',
        }
    }

    const smallScaleWrapperStyle = {
        titleWrapper: {
            ' transform-origin': 'left bottom',
            'transform': 'scale(0.6) translate3d(-190px, 202.5px, 0px)',
            'transition-duration': '1300ms',
            'transition-delay': '5000ms',
        },
        infoWrapper: {
            'transform': 'translate3d(0px, 61.5px, 0px)',
            'transition-duration': '1300ms',
            'transition-delay': '5000ms',
        }
    }

    const infoSynopsisStyle = {
        'opacity': '0',
        'transition-duration': '500ms',
        'transition-delay': '5000ms',
    }

    // Resize logo and text
    useEffect(() => {
        if (!hasFinished) {
            const logoAndTextTimer = setTimeout(() => {
                setDefaultWrapperSize(false)
            }, 4000)
            return () => clearTimeout(logoAndTextTimer)
        } else {
            const resizeLogoAndTextTimer = setTimeout(() => {
                setDefaultWrapperSize(true)
            }, 1000)
            return () => clearTimeout(resizeLogoAndTextTimer)
        }
    }, [hasFinished])

    const handleEndOfVideo = () => {
        setHasFinished(true)
        setIsPlaying(false)
    }

    // Rename to handleReplay
    const handleReplay = () => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = 0;
        video.play();
        setHasFinished(false)
        setIsPlaying(true)
    }

    const handleHeroVideoVolume = () => {
        setIsMuted(prev => !prev)
    }

    const handleMoreInfo = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('jbv', showcaseId);
        setSearchParams(newParams, { replace: false, preventScrollReset: true });
    }

    const renderPlayerContainer = () => {
        return (
            <div className='video-player-container'>
                <div className='video-player-section'>
                    { isNotEmpty(showcaseProgram) &&
                        <video
                            ref={videoRef}
                            // autoPlay={autoPlay}
                            muted={isMuted}
                            onEnded={handleEndOfVideo}
                            style={{opacity: isPlaying ? 1 : 0}}
                        >
                            <source
                                src={showcaseProgram?.thumbclip}
                                type='video/mp4'
                            />
                        </video>
                    }
                </div>

                {/* dimmer container dynamic*/}
            </div>
        )
    }

    const renderAudioButton = () => {
        return (
            <span className='action-button'>
                <button
                    className='audio-button'
                    onClick={handleHeroVideoVolume}
                >
                    <img
                        className='volume'
                        src={isMuted ? muteVolumeIcon : volumeOnIcon}
                        alt="mute volume"
                    />
                </button>
            </span>
        )
    }

    const renderReplayButton = () => {
        return (
            <span className='action-button'>
                <button
                    className='audio-button'
                    onClick={handleReplay}
                >
                    {/* volume class needs to be changed or the one above to reflect that this style is used for volume and replay - a more general name */}
                    <img
                        className='volume'
                        src={replayIcon} alt="replay"
                    />
                </button>
            </span>
        )
    }

    return (
        <div className='volatile-billboard-animations-container'>
            <div className='billboard-row'>
                <div className='billboard'>
                    <div className='billboard-motion'>
                        {renderPlayerContainer()}

                        <div className='motion-background-component'>
                            <div className='hero-image-wrapper'>


                                
                                {showcaseProgram?.background && <img
                                    className='static-hero-image'
                                    src={showcaseProgram.background}
                                    alt={showcaseProgram.title}
                                    style={{ opacity: isPlaying ? 0 : 1 }}
                                />}



                                <div className='side-vignette-layer'></div>
                                <div className='bottom-vignette-layer'></div>
                            </div>

                            <div className='embedded-button-layer'>
                                {hasFinished ? renderReplayButton() : renderAudioButton()}

                                <span className='maturity-rating'>
                                    <span className='maturity-number'>{isNotEmpty(showcaseProgram) ? showcaseProgram.rating : ''}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='fill-container'>
                        <div className='info'>
                            <div className='logo-text-container'>
                                <div
                                    className='title-wrapper'
                                    style={defaultWrapperSize ? (
                                        defaultWrapperStyle.titleWrapper
                                    ) : (
                                        smallScaleWrapperStyle.titleWrapper
                                    )}
                                >
                                    <div className='billboard-title'>
                                        <img
                                            className='title-logo'
                                            src={isNotEmpty(showcaseProgram) ? showcaseProgram.logo : ''}
                                            alt={isNotEmpty(showcaseProgram) ? showcaseProgram.title : ''}
                                        />
                                    </div>
                                </div>

                                <div
                                    className='info-wrapper'
                                    style={defaultWrapperSize ? (
                                        defaultWrapperStyle.infoWrapper
                                    ) : (
                                        smallScaleWrapperStyle.infoWrapper
                                    )}
                                >
                                    <div
                                        className='synopsis'
                                        style={defaultWrapperSize ? {} : infoSynopsisStyle}
                                    >
                                        {isNotEmpty(showcaseProgram) ? showcaseProgram.description : ''}
                                    </div>
                                </div>

                                <div className='billboard-buttons'>
                                    <button className='playlink'>
                                        <img
                                            className='billboard-button-icon'
                                            src={playIcon} alt="Play"
                                        />
                                        <div className='billboard-button-space'></div>
                                        <div className='billboard-button-text'>Play</div>
                                    </button>

                                    <button 
                                        className='more-info'
                                        onClick={handleMoreInfo}
                                    >
                                        <img
                                            className='billboard-button-icon'
                                            src={infoIcon}
                                            alt="Information"
                                        />
                                        <div className='billboard-button-space'></div>
                                        <div className='billboard-button-text'>More Info</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )  
}

export default Billboard
