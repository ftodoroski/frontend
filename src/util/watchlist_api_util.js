import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TEMP_CONFIG } from '../util/credentials_api_testing'


export const fetchWatchlistPrograms = createAsyncThunk('programs/receiveWatchlistPrograms', async (profileId) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/watchlist?profile_id=${profileId}`, TEMP_CONFIG)
    return response.data
})

export const addProgramToWatchlist = createAsyncThunk('watchlist/createWatchlistProgram', async (programProfileIds) => {
    const response = await axios.post(`http://127.0.0.1:8000/api/watchlist/create`, programProfileIds, TEMP_CONFIG)
    return response.data
})

export const deleteProgramFromWatchlist = createAsyncThunk('watchlist/deleteWatchlistProgram', async (watchlistId) => {
    const response = await axios.delete(`http://127.0.0.1:8000/api/watchlist/delete/${watchlistId}`, TEMP_CONFIG)
    return response.status
})

