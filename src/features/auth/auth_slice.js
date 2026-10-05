import { createSlice } from '@reduxjs/toolkit';
import { checkAuthStatus, loginSuccess, logoutSuccess } from '../../util/auth_api_util';


const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        currentProfile: (state, action) => {
            if (state.user) {
                state.user.profile = action.payload
                localStorage.setItem('activeProfile', JSON.stringify(action.payload));
            }
        },
        logoutProfile: (state) => {
            state.user.profile = {}
            localStorage.removeItem('activeProfile');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginSuccess.fulfilled, (state, action) => {
                const { user_id, email } = action.payload

                state.user = {
                    userId: user_id,
                    email,
                    profile: {}
                }

                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(logoutSuccess.fulfilled, (state, action) => {
                const { msg } = action.payload
                console.log(msg);
                
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                localStorage.removeItem('activeProfile');
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                const { user_id, email } = action.payload
                const savedProfile = JSON.parse(localStorage.getItem('activeProfile')) || {};

                state.user = {
                    userId: user_id, 
                    email, 
                    profile: savedProfile
                }
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                console.log('Rejected');
                

                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                localStorage.removeItem('activeProfile');
            });
    }
});

export const { currentProfile, logoutProfile } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserId = state => state.auth.user?.userId
export const selectUser = state => state.auth.user
export const selectCurrentProfile = state => state.auth.user?.profile
export const selectIsAuthenticated = state => state.auth.isAuthenticated
export const selectIsLoading = state => state.auth.isLoading

export const selectAuth = state => state.auth


