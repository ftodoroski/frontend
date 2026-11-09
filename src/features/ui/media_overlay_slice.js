import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isOpen: false, 
    isMuted: true,
    status: 'idle', // 'idle' | 'preparing' | 'open'
    isTransitionFinished: false,
    layoutAnchors: {
        card: null,
        preview: null,
        details: null,
    }
}

const mediaOverlaySlice = createSlice({
    name: 'mediaOverlay',
    initialState,

    // Naming Conv: Noun + Past Verb (previewOpened) to group alphabetically in autocomplete
    reducers: {
        previewOpened: (state, action) => {
            const { anchorCard, ...restOfPayload } = action.payload;

            return { 
                ...state, 
                ...restOfPayload, 
                layoutAnchors: {
                    ...state.layoutAnchors, 
                    card: anchorCard
                },
            }
        },
        detailsTriggered: (state, action) => {
            const { anchorPreview, ...restOfPayload } = action.payload;

            return {
                ...state,
                ...restOfPayload,
                modalType: 'details',
                status: 'preparing',
                isTransitionFinished: false,
                layoutAnchors: {
                    ...state.layoutAnchors, 
                    preview: anchorPreview
                },
            }
        },
        detailsOpened: (state) => {
            state.status = 'open'
        },
        detailsTransitionCompleted: (state) => {
            state.isTransitionFinished = true;
        },
        closed: () => {
            return initialState
        }, 
    },
})

export const { closed, previewOpened, detailsTriggered, detailsOpened, detailsTransitionCompleted } = mediaOverlaySlice.actions
export default mediaOverlaySlice.reducer

export const selectIsMediaOverlayOpen = state => state.ui.mediaOverlay.isOpen
export const selectModalType = state => state.ui.mediaOverlay.modalType
export const selectDetailsModalStatus = state => state.ui.mediaOverlay.status
export const selectIsTransitionFinished = state => state.ui.mediaOverlay.isTransitionFinished

const selectLayoutAnchors = (state) => state.ui.mediaOverlay.layoutAnchors

export const selectCardAnchor = (state) => selectLayoutAnchors(state).card
export const selectPreviewAnchor = (state) => selectLayoutAnchors(state).preview
export const selectDetailsAnchor = (state) => selectLayoutAnchors(state).details

export const selectTargetProgram = state => state.ui.mediaOverlay.targetProgram

export const selectTargetProgramID = state => selectTargetProgram(state).id
export const selectTargetProgramType = state => selectTargetProgram(state).program_type
export const selectTargetProgramRating = state => selectTargetProgram(state).rating
export const selectTargetProgramRuntime = state => selectTargetProgram(state).runtime
export const selectTargetProgramSeasons = state => selectTargetProgram(state).seasons
export const selectTargetProgramReleaseYear = state => selectTargetProgram(state).yr
export const selectTargetProgramDescription = state => selectTargetProgram(state).description
export const selectTargetProgramThumbnail = state => selectTargetProgram(state).thumbnail
export const selectTargetProgramTitle = state => selectTargetProgram(state).title
export const selectTargetProgramDirector = state => selectTargetProgram(state).director
export const selectTargetProgramProductionCompany = state => selectTargetProgram(state).production_company
export const selectTargetProgramScore = state => selectTargetProgram(state).score
export const selectTargetProgramGenreIds = state => selectTargetProgram(state).genres

export const selectSuggestedPrograms = state => state.ui.mediaOverlay.suggestedPrograms

export const selectTargetElement = state => state.ui.mediaOverlay.targetElement

export const selectMediaOverlay = state => state.ui.mediaOverlay






