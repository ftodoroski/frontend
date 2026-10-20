import React from "react";


export const renderRuntime = (programRuntime) => {
    const MINUTES_IN_HOUR = 60
    const isHourOrLess = programRuntime <= MINUTES_IN_HOUR
    const isFullHours = (programRuntime % MINUTES_IN_HOUR) === 0

    if (isHourOrLess) {
        return `${programRuntime}m`
        
    } else if (isFullHours) {
        const hours = programRuntime / MINUTES_IN_HOUR;

        return `${hours}h`
        
    } else {
        const hours = Math.trunc(programRuntime / MINUTES_IN_HOUR)
        const minutes = programRuntime % MINUTES_IN_HOUR

        return `${hours}h ${minutes}m`
    }
}


export const renderDuration = (programRuntime, programType, programSeasons) => {
    if (programType === 'TvShow') {
        return `${programSeasons} Seasons`
        
    } else if (programType === 'Movie') {
        return renderRuntime(programRuntime)
    }
}