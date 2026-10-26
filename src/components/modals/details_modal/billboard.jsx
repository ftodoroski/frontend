import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../../../../assets/stylesheets/overlays.scss'
import { selectTargetProgram } from "../../../features/ui/media_overlay_slice";
import PlayIcon from '../../../../assets/images/browse_icons/play_icon.svg'
import PlusIcon from '../../../../assets/images/browse_icons/plus_icon.svg'
import defaultLikeIcon from  '../../../../assets/images/browse_icons/like_icon.svg'
import MuteSoundIcon from '../../../../assets/images/browse_icons/mute_volume_icon.svg'
import VolumeIcon from '../../../../assets/images/browse_icons/volume_icon.svg'
import CheckmarkIcon from '../../../../assets/images/browse_icons/checkmark_icon.svg'
import ThumbsRating from "../../buttons/thumbs_rating";

const Billboard = () => {
    const program = useSelector(selectTargetProgram)
    const [isMuted, setIsMuted] = useState(true)
    const [isAddedToMyList, setIsAddedToMyList] = useState(false)

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
                        <div className="default-details-supplementary-buttons">
                            <button 
                                className="details-base-button details-secondary"
                                onClick={() => setIsAddedToMyList(!isAddedToMyList)}
                            >
                                <img 
                                    className="default-icon-contain" 
                                    src={isAddedToMyList ? CheckmarkIcon : PlusIcon} 
                                    alt="Add to My List" 
                                />
                            </button>
                        </div>
                        {/* <div className="default-details-supplementary-buttons">
                            <button className="details-base-button details-secondary">
                                <img
                                    className="default-icon-contain"
                                    src={defaultLikeIcon}
                                    alt="Thumbs rating button"
                                />
                            </button>
                        </div> */}
                        {<ThumbsRating />}
                    </div>
                    <div className="h-divider-offset"></div>
                </div>
                <div className="audio-toggle-container">
                    <button className="details-base-button" onClick={() => setIsMuted(!isMuted)}>
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