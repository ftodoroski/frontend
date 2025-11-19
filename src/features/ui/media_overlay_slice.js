import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isOpen: false, 
    isMuted: true,
}

const mediaOverlaySlice = createSlice({
    name: 'mediaOverlay',
    initialState,
    reducers: {
        setOverlay: (state, action) => {
            return { ...state, ...action.payload }
        }, 
        clearOverlay: () => {
            return initialState
        }
    },
})

export const { setOverlay, clearOverlay } = mediaOverlaySlice.actions
export default mediaOverlaySlice.reducer

export const selectIsMediaOverlayOpen = state => state.ui.mediaOverlay.isOpen
export const selectModalType = state => state.ui.mediaOverlay.modalType







