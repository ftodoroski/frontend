import { createSlice } from '@reduxjs/toolkit'


const initialState = null

const modalSlice = createSlice({
    name: 'modal',
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

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer