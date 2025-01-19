import { createSlice } from '@reduxjs/toolkit'
import { fetchSearchedPrograms } from '../../util/programs_api_util'


const initialState = ''

const searchErrorsSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSearchedPrograms.rejected, (state, action) => {
            return 'No movies / shows found'
        })
    }
})

export default searchErrorsSlice.reducer
