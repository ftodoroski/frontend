import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isOpen: false,
    text: '',
}

const tooltipOverlaySlice = createSlice({
    name: 'tooltipOverlay',
    initialState,
    reducers: {
        triggered: (state, action) => {
            return { ...state, ...action.payload }
        }, 
        closed: () => {
            return initialState
        }
    },
})

export const { triggered, closed } = tooltipOverlaySlice.actions
export default tooltipOverlaySlice.reducer

export const selectTooltipOverlay = state => state.ui.tooltipOverlay;
export const selectIsTooltipOverlayOpen = state => state.ui.tooltipOverlay.isOpen;
export const selectTooltipOverlayText = state => state.ui.tooltipOverlay.text;
export const selectTooltipOverlayAnchorRect = state => state.ui.tooltipOverlay.anchorRect;