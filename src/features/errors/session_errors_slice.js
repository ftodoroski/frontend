import { createSlice } from '@reduxjs/toolkit'
import { loginSuccess } from '../../util/auth_api_util'


const initialState = ''

const sessionErrorsSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        removeErrors: (state) => { 
            return initialState 
        }, 
        signUpIntentionalError: () => {
            return 'Signing up is not available at this moment'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginSuccess.rejected, (state, action) => {
            return 'Please enter a valid email or password'
        })
    }
})

export const { removeErrors, signUpIntentionalError } = sessionErrorsSlice.actions
export default sessionErrorsSlice.reducer
