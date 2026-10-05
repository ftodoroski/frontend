import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/client";


export const fetchWatchlistPrograms = createAsyncThunk('programs/receiveWatchlistPrograms', async (profileId) => {
    const response = await api.get(`/api/watchlist?profile_id=${profileId}`)
    return response.data
})

export const addProgramToWatchlist = createAsyncThunk('watchlist/createWatchlistProgram', async (programProfileIds) => {
    const response = await api.post(`/api/watchlist/create`, programProfileIds)
    return response.data
})

export const deleteProgramFromWatchlist = createAsyncThunk('watchlist/deleteWatchlistProgram', async (watchlistId) => {
    const response = await api.delete(`/api/watchlist/delete/${watchlistId}`)
    return response.status
})

