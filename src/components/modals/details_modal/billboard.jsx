import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../../../../assets/stylesheets/overlays.scss'
import { selectTargetProgram } from "../../../features/ui/media_overlay_slice";
import PlayIcon from '../../../../assets/images/browse_icons/play_icon.svg'
import MuteSoundIcon from '../../../../assets/images/browse_icons/mute_volume_icon.svg'
import VolumeIcon from '../../../../assets/images/browse_icons/volume_icon.svg'
import ThumbsRating from "../../buttons/thumbs_rating";
import WatchlistButton from "../../buttons/watchlist_button";

const Billboard = () => {
    const program = useSelector(selectTargetProgram)
    const [isMuted, setIsMuted] = useState(true)

    return (
        <div className="details-modal-billboard-container">
            <div className="billboard-video-wrapper">
                <div className="billboard-video-container">
                    <video 
                        className="billboard-video" 
                        src={`${program.thumbclip}`}
                        autoPlay
                        muted
                    ></video>
                </div>
            </div>
            <div className="background-container">
                <img
                    className="background" 
                    src={program.background} 
                    alt={`${program.title} background`} 
                />
            </div>
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