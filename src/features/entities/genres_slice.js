import { createSlice } from '@reduxjs/toolkit'
import { fetchGenres } from '../../util/genres_api_util'

const initialState = {}

const genresSlice = createSlice({
    name: 'genres', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(fetchGenres.fulfilled, (_, action) => {
            return action.payload
        })
    }
})

export default genresSlice.reducer