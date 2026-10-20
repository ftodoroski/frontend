import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isOpen: false, 
    isMuted: true,
}

const mediaOverlaySlice = createSlice({
    name: 'mediaOverlay',
    initialState,
    reducers: {
        triggeredPreview: (state, action) => {
            return { ...state, ...action.payload }
        }, 
        triggeredDetails: (state) => {
            state.modalType = 'details'
        },
        closed: () => {
            return initialState
        }, 
    },
})

export const { triggeredPreview, closed, triggeredDetails } = mediaOverlaySlice.actions
export default mediaOverlaySlice.reducer

export const selectIsMediaOverlayOpen = state => state.ui.mediaOverlay.isOpen
export const selectModalType = state => state.ui.mediaOverlay.modalType
export const selectAnchorRect = state => state.ui.mediaOverlay.anchorRect

export const selectTargetProgram = state => state.ui.mediaOverlay.targetProgram
export const selectTargetProgramID = state => state.ui.mediaOverlay.targetProgram.id
export const selectTargetProgramType = state => state.ui.mediaOverlay.targetProgram.program_type
export const selectTargetProgramRating = state => state.ui.mediaOverlay.targetProgram.rating
export const selectTargetProgramRuntime = state => state.ui.mediaOverlay.targetProgram.runtime
export const selectTargetProgramSeasons = state => state.ui.mediaOverlay.targetProgram.seasons
export const selectTargetProgramReleaseYear = state => state.ui.mediaOverlay.targetProgram.yr
export const selectTargetProgramDescription = state => state.ui.mediaOverlay.targetProgram.description
export const selectTargetProgramThumbnail = state => state.ui.mediaOverlay.targetProgram.thumbnail
export const selectTargetProgramTitle = state => state.ui.mediaOverlay.targetProgram.title

export const selectSuggestedPrograms = state => state.ui.mediaOverlay.suggestedPrograms

export const selectMediaOverlay = state => state.ui.mediaOverlay







