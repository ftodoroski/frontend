import { createSlice } from '@reduxjs/toolkit'


const initialState = null

const profileManagerOverlaySlice = createSlice({
    name: 'profileManagerOverlay',
    initialState,
    reducers: {
        openModal:(_, action) => {
            return action.payload
        }, 
        closeModal: (_, __) => {
            return initialState
        }
    },
})

export const { openModal, closeModal } = profileManagerOverlaySlice.actions
export default profileManagerOverlaySlice.reducer

export const selectProfileManagerOverlay = state => state.ui.profileManagerOverlay;