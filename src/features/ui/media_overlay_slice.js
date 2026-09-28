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
export const selectAnchorRect = state => state.ui.mediaOverlay.anchorRect
export const selectTargetProgram = state => state.ui.mediaOverlay.targetProgram
export const selectTargetProgramType = state => state.ui.mediaOverlay.targetProgram.program_type
export const selectTargetProgramRating = state => state.ui.mediaOverlay.targetProgram.rating
export const selectTargetProgramRuntime = state => state.ui.mediaOverlay.targetProgram.runtime
export const selectTargetProgramSeasons = state => state.ui.mediaOverlay.targetProgram.seasons

export const selectMediaOverlay = state => state.ui.mediaOverlay







