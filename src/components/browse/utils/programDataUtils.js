import shuffle from '../../../util/shuffle_array';


const MAX_CROP_AMOUNT = 30


export const truncateProgramsByGenre = programsByGenre => {
    const truncatedProgramsByGenre = {}
    for (const [genre, programs] of Object.entries(programsByGenre)) {
        truncatedProgramsByGenre[genre] = programs.slice(0, MAX_CROP_AMOUNT)
    }

    return truncatedProgramsByGenre
}


const matchProgramsToGenre = (genre, programs) => {
    const genrePrograms = []

    for (let program of genre.programs) {
        for (let pg of programs) {
            if (program.id === pg.id) genrePrograms.push(pg)
        }
    }

    return genrePrograms
}


export const groupProgramsByGenre = (genres, programs) => {
    const programsByGenre = {}

    for (let genre of genres) {
        programsByGenre[genre.name] = matchProgramsToGenre(genre, programs)
    }

    return programsByGenre
}


export const matchProgramsToWatchlist = (watchlist, programs) => {
    const watchlistPrograms = []

    for (let item of watchlist) {
        for (let program of programs) {
            if (item.program_id === program.id) watchlistPrograms.push(program)
        }
    }

    return watchlistPrograms
}


export const shuffleProgramsByGenre = programsByGenre => {
    for (let [_, programs] of Object.entries(programsByGenre)) {
        shuffle(programs)
    }
}


export const selectInitialProgramsWindow = (startingIndex, itemsInRow, programs) => {
    // Not doing any checks just seeing if it works
    return programs.slice(startingIndex, itemsInRow + 3)
}











