import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TEMP_CONFIG } from '../util/credentials_api_testing'


export const fetchAllProfiles = createAsyncThunk('profiles/receiveAllProfiles', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/profiles/', TEMP_CONFIG)
    return response.data
})

export const createProfile = createAsyncThunk('profiles/createProfile', async (payload) => {
    const response = await axios.post('http://127.0.0.1:8000/api/profiles/', payload, TEMP_CONFIG, )
    return response.data
})

export const modifyProfile = createAsyncThunk('profiles/modifyProfile', async (payload) => {
    const { profileId } = payload
    delete payload.profileId

    const response = await axios.patch(`http://127.0.0.1:8000/api/profiles/update/${profileId}/`, payload, TEMP_CONFIG )
    return response.data
})

export const deleteProfile = createAsyncThunk('profiles/removeProfile', async (profileId) => {
    const response = await axios.delete(`http://127.0.0.1:8000/api/profiles/delete/${profileId}/`, TEMP_CONFIG)
    return profileId
})