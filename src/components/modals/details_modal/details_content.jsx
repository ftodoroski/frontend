import React from "react";
import '../../../../assets/stylesheets/overlays.scss'
import { useSelector } from "react-redux";
import { selectSuggestedPrograms, selectTargetProgramDescription, selectTargetProgramRating, selectTargetProgramReleaseYear, selectTargetProgramRuntime, selectTargetProgramSeasons, selectTargetProgramType } from "../../../features/ui/media_overlay_slice";
import { renderDuration } from '../../../util/ui/render_media_time'
import ClosedCaptionsIcon from '../../../../assets/images/browse_icons/closed_captions_icon.svg'
import SimilarCard from "./similar_card";


const DetailsContent = () => {
    const releaseYear = useSelector(selectTargetProgramReleaseYear)
    const programRuntime = useSelector(selectTargetProgramRuntime)
    const programType = useSelector(selectTargetProgramType)
    const programSeasons = useSelector(selectTargetProgramSeasons)
    const maturityRating =  useSelector(selectTargetProgramRating)
    const synopsis = useSelector(selectTargetProgramDescription)
    const similarPrograms = useSelector(selectSuggestedPrograms)


    return (
        <div className="details-modal-info-wrapper">
            <div className="details-modal-info-container">
                <div className="details-metadata">
                    <div className="details-metadata-info">
                        <div className="video-metadata-container">
                            <div className="video-metadata-line">
                                <div>{releaseYear}</div>
                                {renderDuration(programRuntime, programType, programSeasons)}
                                <span className="player-feature-badge">HD</span>
                                <div className="closed-captions-icon">
                                    <img src={ClosedCaptionsIcon} alt='Closed captions available' />
                                </div>
                            </div>
                        </div>
                        <div className="maturity-rating-container">
                            <div className="program-maturity-rating">
                                <span className="program-maturity-number">{maturityRating}</span>
                            </div>
                            <span style={{ marginLeft: '8px'}}>thematic elements including language </span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '.5em', display: 'flex', alignItems: 'center'}}></div>

                    <div className="details-metadata-synopsis">
                        <p className="details-synopsis">{synopsis}</p>
                    </div>
                </div>

                <div className="more-like-this-wrapper">
                    <h3 className="more-like-this-header">More Like This</h3>

                    {/* Add inline css for both of these section-container and section-divider */}
                    <div className="section-container">
                        <div className="more-like-this-container">
                            {similarPrograms.map((program) => (
                                <SimilarCard key={program.id} program={program} />
                            ))}
                        </div>
                    </div>

                    <div className="section-divider"></div>
                </div>
            </div>
        </div>
    )
}

export default DetailsContent