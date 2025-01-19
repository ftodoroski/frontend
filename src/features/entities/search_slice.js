import { createSlice } from '@reduxjs/toolkit'
import { fetchSearchedPrograms } from '../../util/programs_api_util'


const initialState = []

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSearchedPrograms.fulfilled, (_, action) => {
                return action.payload.searchlist
            })
    }
})

export default searchSlice.reducer