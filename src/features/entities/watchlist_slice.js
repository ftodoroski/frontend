import { createSlice } from '@reduxjs/toolkit'
import { fetchWatchlistPrograms, addProgramToWatchlist, deleteProgramFromWatchlist  } from '../../util/watchlist_api_util'


const initialState = []

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWatchlistPrograms.fulfilled, (_, action) => {
            return action.payload
        })
        .addCase(addProgramToWatchlist.fulfilled, (state, action) => {
            state.push(action.payload)
        })
        .addCase(deleteProgramFromWatchlist.fulfilled, (state, action) => {
            console.log(action);
            state = state.filter((watchlist) => watchlist.id !== action.meta.arg)
            return state
        })
    }
})

export default watchlistSlice.reducer
