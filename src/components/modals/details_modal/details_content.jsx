import React, { useState } from "react";
import '../../../../assets/stylesheets/overlays.scss'
import { useSelector } from "react-redux";
import { selectSuggestedPrograms, selectTargetProgramDescription, selectTargetProgramDirector, selectTargetProgramGenreIds, selectTargetProgramProductionCompany, selectTargetProgramRating, selectTargetProgramReleaseYear, selectTargetProgramRuntime, selectTargetProgramScore, selectTargetProgramSeasons, selectTargetProgramTitle, selectTargetProgramType } from "../../../features/ui/media_overlay_slice";
import { renderDuration } from '../../../util/ui/render_media_time'
import ClosedCaptionsIcon from '../../../../assets/images/browse_icons/closed_captions_icon.svg'
import SimilarCard from "./similar_card";
import DownChevron from '../../../../assets/images/browse_icons/down_chevron.svg'
import extractGenreNames from "../../../util/mappers/extract_genre_names";
import { selectAllGenres } from "../../../features/entities/genres_slice";
import UpChevron from '../../../../assets/images/browse_icons/up_chevron.svg'


const DetailsContent = () => {
    const releaseYear = useSelector(selectTargetProgramReleaseYear)
    const programRuntime = useSelector(selectTargetProgramRuntime)
    const programType = useSelector(selectTargetProgramType)
    const programSeasons = useSelector(selectTargetProgramSeasons)
    const maturityRating =  useSelector(selectTargetProgramRating)
    const synopsis = useSelector(selectTargetProgramDescription)
    const similarPrograms = useSelector(selectSuggestedPrograms)
    const programTitle = useSelector(selectTargetProgramTitle)
    const director = useSelector(selectTargetProgramDirector)
    const productionCompany = useSelector(selectTargetProgramProductionCompany)
    const programScore = useSelector(selectTargetProgramScore)
    const programGenreIds = useSelector(selectTargetProgramGenreIds)
    const genres = useSelector(selectAllGenres)

    const [isMoreLikeThisExpanded, setIsMoreLikeThisExpanded] = useState(false)

    const moreLikeThisSectionContainerStyle = {
        maxHeight: isMoreLikeThisExpanded ? undefined : '42em', 
        overflow: isMoreLikeThisExpanded ? undefined : 'hidden', 
    }

    const moreLikeThisDividerStyle = {
        margin: isMoreLikeThisExpanded ? undefined : '-6em auto auto',
    }

    return (
        <div className="details-modal-info-wrapper">
            <div className="details-modal-info-container">
                <div className="details-metadata">
                    <div className="details-metadata-info">
                        <div className="video-metadata-container">
                            <div className="video-metadata-line">
                                <div>{releaseYear}</div>
                                <span className="duration">{renderDuration(programRuntime, programType, programSeasons)}</span>
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
                    <div className="section-container" style={moreLikeThisSectionContainerStyle}>
                        <div className="more-like-this-container">
                            {similarPrograms.map((program) => (
                                <SimilarCard key={program.id} program={program} />
                            ))}
                        </div>
                    </div>

                    <div className="section-divider" style={moreLikeThisDividerStyle}>
                        <button 
                            className="section-divider-button"
                            onClick={() => setIsMoreLikeThisExpanded(prev => !prev)}
                        >
                            <img 
                                className="section-divider-icon" 
                                src={isMoreLikeThisExpanded ? UpChevron : DownChevron} 
                                alt="Expand" 
                            />
                        </button>
                    </div>
                </div>

                <div className="about-wrapper">
                    <p className="about-header">About <strong>{programTitle}</strong></p>
                    
                    <div className="about-container">
                        <div className="about-tags">
                            <span className="about-tags-label">Director: </span>
                            <span className="about-tags-item">{director}</span>
                        </div>

                        <div className="about-tags">
                            <span className="about-tags-label">Production Company: </span>
                            <span className="about-tags-item">{productionCompany}</span>
                        </div>

                        <div className="about-tags">
                            <span className="about-tags-label">Genres: </span>
                            {extractGenreNames(programGenreIds, genres).map((genre, idx, array) => (
                                idx !== (array.length - 1) ? (
                                    <span className = "about-tags-item">{genre}, </span>
                                ) : (
                                    <span className="about-tags-item">{genre}</span>
                                )
                            ))}
                        </div>

                        <div className="about-tags">
                            <span className="about-tags-label">Score: </span>
                            <span className="about-tags-item">{programScore}</span>
                        </div>

                        <div className="about-tags">
                            <span className="about-tags-label">This {programType === 'Movie' ? 'Movie' : 'Tv Show'} Is: </span>
                            <span className="about-tags-item">Understated</span>
                        </div>

                        <div className="about-maturity-rating-container">
                            <span className="about-maturity-rating-label">Maturity Rating: </span>
                            <div className="about-maturity-rating">
                                <span className="about-maturity-number">{maturityRating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsContent