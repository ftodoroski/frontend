import { createSlice } from '@reduxjs/toolkit'
import { fetchAllProfiles, createProfile, modifyProfile, deleteProfile } from '../../util/profiles_api_util'


const initialState = []

const profilesSlice = createSlice({
    name: 'profiles', 
    initialState, 
    reducer: {
        logoutUserProfiles: (state) => state = initialState
    }, 
    extraReducers: (builder) => {
        builder.addCase(fetchAllProfiles.fulfilled, (_, action) => {
            return action.payload
        })
        .addCase(createProfile.fulfilled, (state, action) => {
          state.push(action.payload)  
        })
        .addCase(modifyProfile.fulfilled, (state, action) => {
            console.log(action.payload);
            return state.map(profile => {
                if (profile.id == action.payload.id) return action.payload
                else return profile   
            })
        })
        .addCase(deleteProfile.fulfilled, (state, action) => {
            const profileId = action.payload
            return state.filter(profile => profile.id != profileId)
        })
    }
})

export default profilesSlice.reducer