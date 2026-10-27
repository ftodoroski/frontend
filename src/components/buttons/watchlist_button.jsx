import React, { useState, useEffect } from "react";
import plusIcon from '../../../assets/images/browse_icons/plus_icon.svg'
import checkmarkIcon from '../../../assets/images/browse_icons/checkmark_icon.svg'
import { useTooltipOverlay } from "../../features/ui/useTooltipOverlay";
import '../../../assets/stylesheets/overlays.scss'


const WatchlistButton = () => {
    const { openTooltip, closeTooltip } = useTooltipOverlay()

    const [inWatchlist, setInWatchlist] = useState(false)

    useEffect(() => {
        return () => {
            closeTooltip();
        };
    }, []);

    const toggleWatchlist = () => {
        
        setInWatchlist(prev => !prev)
        closeTooltip()
    }

    return (
        <div>
            <button
                className={`controls-button-base secondary-button ${!inWatchlist ? 'add-to-my-list' : 'remove-from-my-list'}`}
                onClick={toggleWatchlist}
                onMouseEnter={(e) => { openTooltip(e, inWatchlist ? 'Remove from My List' : 'Add to My List'); }}
                onMouseLeave={closeTooltip}
            >
                <img
                    src={!inWatchlist ? plusIcon : checkmarkIcon}
                    alt={!inWatchlist ? "Add to My List" : "Remove from My List"}
                />
            </button>
        </div>
    )
}

export default WatchlistButton



