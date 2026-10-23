
const extractGenreNames = (targetProgramGenres, genres) => {
    const genreNames = []
    const mappedGenres = {}

    for (const [_, genreObj] of Object.entries(genres)) {
        mappedGenres[Number(genreObj.id)] = genreObj.name
    }

    targetProgramGenres.map((genreId) => {
        genreNames.push(mappedGenres[genreId])
    })

    return genreNames
}

export default extractGenreNames