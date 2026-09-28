import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectTargetProgram, selectAnchorRect } from "../../../features/ui/media_overlay_slice";
import "../../../../assets/stylesheets/overlays.scss"
import muteVolumeIcon from '../../../../assets/images/browse_icons/mute_volume_icon.svg'
import volumeIcon from '../../../../assets/images/browse_icons/volume_icon.svg'


const PlayerContainer = () => {
    const program = useSelector(selectTargetProgram)
    const anchorRect = useSelector(selectAnchorRect)

    const [isClipReadyToPlay, setIsClipReadyToPlay] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [playerSectionHidden, setPlayerSectionHidden] = useState(false);

    const videoRef = useRef(null);
    const playerSectionTimer = useRef(null)
    
    useEffect(() => {
        playerSectionTimer.current = setTimeout(() => {
            setPlayerSectionHidden(true)
            
        }, 6000)

        return () => {
            if (playerSectionTimer.current) {
                clearTimeout(playerSectionTimer.current);
            }
        };
    }, [])

    useEffect(() => {
        setIsClipReadyToPlay(false);

        const delayTimer = setTimeout(() => {    
            setIsClipReadyToPlay(true)

            if (videoRef.current) {
                videoRef.current.play().catch(error => {
                    console.log("Autoplay failed or was blocked:", error);
                });
            }
            
        }, 500)

        return () => {
            clearTimeout(delayTimer)

            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
    }, [])
    
    const renderThumbnail = (
        <img 
            src={program.thumbnail} 
            alt={program.title}
            style={isClipReadyToPlay ? {opacity: 0} : {}}
        />
    )

    const toggleSound = () => {
        if (isMuted) {
            setIsMuted(false)
        } else if (!isMuted) {
            setIsMuted(true)
        }
    }

    const renderTitleTreatment = (
        <div
            className="title-treatment-container"
            style={{ 
                opacity: playerSectionHidden ? 0 : null, 
                pointerEvents: playerSectionHidden ? 'none' : null,
                zIndex: isClipReadyToPlay && !playerSectionHidden ? 30 : 20  
            }}
        >
            <img 
                src={program.logo} 
                alt={program.title}
                style={{width: "35%", opacity: 1}}
            />

            <div 
                className="title-treatment-volume-toggle-container">
                <button 
                    className="controls-button-base volume-toggle"
                    onClick={toggleSound}
                    on
                >

                    <img 
                        src={isMuted ? muteVolumeIcon : volumeIcon} 
                        alt="toggle volume" 
                        className="title-treatment-volume-toggle"
                    />
                </button>
            </div>
        </div>
    )

    const handleThumbclipEnded = () => {
        setIsClipReadyToPlay(false)
    }

    const renderThumbclip = (
        <video 
            ref={videoRef}
            src={`${program.thumbclip}`}
            width={(anchorRect.width * 1.45)} 
            height="220"
            preload="auto"
            muted={isMuted}
            playsInline
            onEnded={handleThumbclipEnded}
        ></video>
    )

    const handleMouseMove = () => {
        if (playerSectionTimer.current) {
            clearTimeout(playerSectionTimer.current)
        }

        setPlayerSectionHidden(false)

        playerSectionTimer.current = setTimeout(() => {
            setPlayerSectionHidden(true)
        }, 3500)
    }

    return (
        <div 
            className="preview-modal-player-container"
            onMouseMove={handleMouseMove}
        >
            {renderThumbnail}
            {renderTitleTreatment}
            {renderThumbclip}
        </div>
    )
}

export default PlayerContainer