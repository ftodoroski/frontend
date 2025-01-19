import { createSlice } from '@reduxjs/toolkit'
import { fetchAllPrograms, fetchProgram, fetchSearchedPrograms } from '../../util/programs_api_util'
import { fetchWatchlistPrograms } from '../../util/watchlist_api_util'


const initialState = {}

const programsSlice = createSlice({
    name: 'programs', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(fetchAllPrograms.fulfilled, (_, action) => {
            return action.payload
        })
        .addCase(fetchProgram.fulfilled, (_, action) => {
            return action.payload
        })

        // **1
        // .addCase(fetchSearchedPrograms.fulfilled, (_, action) => {
        //     return action.payload.programs
        // })
        // .addCase(fetchWatchlistPrograms.fulfilled, (_, action) => {
        //     return action.payload
        // })
    }
})

export default programsSlice.reducer


// *1 I think what i was trying to here was when i was dispatching fetchWatchlistPrograms
// it was hitting programs/fetchWatchlistPrograms and not watchlist/fetchWatchlistPrograms
// my thought was when you go to the endpoints of watchlist and search on the client side
// that i was going to reassing the program array based on the watchlist or search. 

// The solution came from using the devtools and seeing what was being dispatched
// and going through the actions