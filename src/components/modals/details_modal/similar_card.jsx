import React, { useState } from "react";
import TitleCardPlayIcon from '../../../../assets/images/browse_icons/title_card_play_icon.svg'
import { renderDuration } from "../../../util/ui/render_media_time";
import PlusIcon from '../../../../assets/images/browse_icons/plus_icon.svg'
import CheckmarkIcon from '../../../../assets/images/browse_icons/checkmark_icon.svg'
import truncateByWords from "../../../util/ui/truncate_by_words";
import WatchlistButton from "../../buttons/watchlist_button";

const SimilarCard = ( { program } ) => {
    const MAX_WORDS_SYNOPSIS = 25

    const [isCardHovered, setIsCardHovered] = useState(false);
    const [isAddedToMyList, setIsAddedToMyList] = useState(false)

    const playIconStyle = {
        opacity: !isCardHovered ? 0 : 1,
    }

    return (
        <div 
            className="title-card-container"
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
        >
            <div className="title-card-image-wrapper">
                <img className="title-card-image" src={program.thumbnail} alt={program.title} />
                <div className="title-card-play-icon" style={playIconStyle}>
                    <img className="title-card-play-svg" src={TitleCardPlayIcon} alt="Play" />
                </div>
                <span className="title-card-duration">{renderDuration(program.runtime, program.program_type, program.seasons)}</span>
            </div>
            <div className="title-card-metadata-wrapper">
                <div className="title-card-video-metadata-wrapper">
                    <div className="title-card-video-metadata-container">
                        <div className="title-card-video-metadata-line">
                            <div className="title-card-video-metadata-maturity-rating">
                                <span className="title-card-video-metadata-maturity-number">{program.rating}</span>
                            </div>

                            <span className="title-card-player-feature-badge">HD</span>

                            <div className="title-card-year">{program.yr}</div>
                        </div>
                    </div>

                    {<WatchlistButton />}
                </div>
                <p className="title-card-synopsis">{truncateByWords(program.description, MAX_WORDS_SYNOPSIS)}</p>
            </div>
        </div>
    )
}

export default SimilarCard
