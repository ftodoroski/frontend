import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TEMP_CONFIG } from '../util/credentials_api_testing'
import api from "../api/client";


export const fetchAllProfiles = createAsyncThunk('profiles/receiveAllProfiles', async () => {
    const response = await api.get('/api/profiles/')
    return response.data
})

export const createProfile = createAsyncThunk('profiles/createProfile', async (payload) => {
    const response = await api.post('/api/profiles/', payload)
    return response.data
})

export const modifyProfile = createAsyncThunk('profiles/modifyProfile', async (payload) => {
    const { profileId } = payload
    delete payload.profileId

    const response = await api.patch(`/api/profiles/update/${profileId}/`, payload)
    return response.data
})

export const deleteProfile = createAsyncThunk('profiles/removeProfile', async (profileId) => {
    const response = await api.delete(`/api/profiles/delete/${profileId}/`)
    return profileId
})