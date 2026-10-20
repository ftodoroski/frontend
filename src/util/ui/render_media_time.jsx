import React from "react";


export const renderRuntime = (programRuntime) => {
    const MINUTES_IN_HOUR = 60
    const isHourOrLess = programRuntime <= MINUTES_IN_HOUR
    const isFullHours = (programRuntime % MINUTES_IN_HOUR) === 0

    if (isHourOrLess) {
        return (
            <span className="duration">{`${programRuntime}m`}</span>
        )
    } else if (isFullHours) {
        const hours = programRuntime / MINUTES_IN_HOUR;

        return (
            <span className="duration">{`${hours}h`}</span>
        )
    } else {
        const hours = Math.trunc(programRuntime / MINUTES_IN_HOUR)
        const minutes = programRuntime % MINUTES_IN_HOUR

        return (
            <span className="duration">{`${hours}h ${minutes}m`}</span>
        )
    }
}


export const renderDuration = (programRuntime, programType, programSeasons) => {
    if (programType === 'TvShow') {
        return (
            <span className="duration">{`${programSeasons} Seasons`}</span>
        )
    } else if (programType === 'Movie') {
        return renderRuntime(programRuntime)
    }
}