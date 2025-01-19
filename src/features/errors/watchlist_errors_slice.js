import { createSlice } from '@reduxjs/toolkit'
import { fetchWatchlistPrograms, addProgramToWatchlist, deleteProgramFromWatchlist } from '../../util/watchlist_api_util'


const initialState = ''

const watchlistErrorsSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWatchlistPrograms.rejected, (_, action) => {
            return 'Unable to fetch watchlist'
        })
        .addCase(addProgramToWatchlist.rejected, (state, action) => {
            return 'Item already added'
        })
        .addCase(deleteProgramFromWatchlist.rejected, (state, action) => {
            return 'No item with that id exists'
        })
    }
})

export default watchlistErrorsSlice.reducer
