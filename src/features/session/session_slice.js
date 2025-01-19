import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../../util/session_api_util'


const initialState  = {
    token: '',
    userId: null,
    email: '',
    profile: {},
    error: null
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        currentProfile: (state, action) => {
            state.profile = action.payload
        }, 
        logoutProfile: (state) => {
            state.profile = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.userId = action.payload.user_id
            state.email = action.payload.email
        })
    }
})

export const { currentProfile, logoutProfile } = sessionSlice.actions
export default sessionSlice.reducer
