import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    x: 0, 
    y: 0,
}

const scrollSlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        scrollUpdated: (state, action) => {
            state.x = action.payload.x, 
            state.y = action.payload.y
        },
        scrollReset: (state) => {
            state.x = 0, 
            state.y = 0
        }
    },
})

export const { scrollUpdated, scrollReset } = scrollSlice.actions
export default scrollSlice.reducer

export const selectScroll = state => state.ui.scroll;
export const selectScrollX = state => state.ui.scroll.x;
export const selectScrollY = state => state.ui.scroll.y;