import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    programsLoading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        startLoadingPrograms: (state, _) => {
            state.programsLoading = true
        },
        endLoadingPrograms: (state, _) => {
            state = initialState
        }
    },
})

export const { startLoadingPrograms, endLoadingPrograms } = loadingSlice.actions
export default loadingSlice.reducer
