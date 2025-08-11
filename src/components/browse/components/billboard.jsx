import React, { useState, useEffect, useReducer, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../../../../assets/stylesheets/browse.scss'
import playIcon from '../../../../assets/images/browse_icons/play_icon.svg'
import infoIcon from '../../../../assets/images/browse_icons/info_icon.svg'
import muteVolumeIcon from '../../../../assets/images/browse_icons/mute_volume_icon.svg'
import volumeOnIcon from '../../../../assets/images/browse_icons/volume_icon.svg'
import replayIcon from '../../../../assets/images/browse_icons/replay_icon.svg'
import findProgram from '../../../util/search/find_program'
import { selectAllPrograms } from '../../../features/entities/programs_slice';
import { selectProfile } from '../../../features/session/session_slice';


const Billboard = () => {
    const programs = useSelector(selectAllPrograms)
    const profile = useSelector(selectProfile)

    const [opacity, setOpacity] = useState(1)
    const [autoPlay, setAutoPlay] = useState(true)
    // Instead of muted you can refactor to toggleAudio
    const [muted, setMuted] = useState(true)
    const [defaultWrapperSize, setDefaultWrapperSize] = useState(true)
    // Need better names just writing so the functionality is there
    const [videoDonePlaying, setVideoDonePlaying] = useState(false)

    const showcaseProgram = findProgram(profile.showcase_id, programs)

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

    useEffect(() => {
        const startVideoTimer = setTimeout(() => {
            setOpacity(0)
        }, 2000)
        return () => clearTimeout(startVideoTimer)
    }, [])

    useEffect(() => {
        if (!videoDonePlaying) {
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
    }, [videoDonePlaying])

    const handleEndOfVideo = () => {
        setVideoDonePlaying(true)
        setOpacity(1)
        setAutoPlay(false)
    }

    const handleRestartVideo = () => {
        setVideoDonePlaying(false)
        setOpacity(0)
        setAutoPlay(true)
    }

    const handleHeroVideoVolume = () => {
        setMuted(!muted)
    }

    const videoPlayerContainer = () => {
        return (
            <div className='video-player-container'>
                <div className='video-player-section'>
                    <video
                        autoPlay={autoPlay}
                        muted={muted}
                        onEnded={handleEndOfVideo}
                    >
                        <source
                            src={showcaseProgram.thumbclip}
                            type='video/mp4'
                        />
                    </video>
                </div>

                {/* dimmer container dynamic*/}
            </div>
        )
    }

    return (
        <div className='volatile-billboard-animations-container'>
            <div className='billboard-row'>
                <div className='billboard'>
                    <div className='billboard-motion'>
                        {!videoDonePlaying && videoPlayerContainer()}

                        <div className='motion-background-component'>
                            <div className='hero-image-wrapper'>
                                <img
                                    className='static-hero-image'
                                    src={showcaseProgram.background}
                                    alt={showcaseProgram.title}
                                    style={{ opacity: opacity }}
                                />
                                <div className='side-vignette-layer'></div>
                                <div className='bottom-vignette-layer'></div>
                            </div>

                            <div className='embedded-button-layer'>
                                {!opacity &&
                                    <span className='action-button'>
                                        <button
                                            className='audio-button'
                                            onClick={handleHeroVideoVolume}
                                        >
                                            {/* ternary for toggling audio */}
                                            <img
                                                className='volume'
                                                src={muted ? muteVolumeIcon : volumeOnIcon}
                                                alt="mute volume"
                                            />
                                        </button>
                                    </span>
                                }
                                {!autoPlay &&
                                    <span className='action-button'>
                                        <button
                                            className='audio-button'
                                            onClick={handleRestartVideo}
                                        >
                                            {/* volume class needs to be changed or the one above to reflect that this style is used for volume and replay - a more general name */}
                                            <img
                                                className='volume'
                                                src={replayIcon} alt="replay"
                                            />
                                        </button>
                                    </span>
                                }
                                <span className='maturity-rating'>
                                    <span className='maturity-number'>{showcaseProgram.rating}</span>
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
                                            src={showcaseProgram.logo}
                                            alt={showcaseProgram.title}
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
                                        {showcaseProgram.description}
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

                                    <button className='more-info'>
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
















































