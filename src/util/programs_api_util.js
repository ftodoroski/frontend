import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/client";


export const fetchAllPrograms = createAsyncThunk('programs/receiveAllPrograms', async () => {
    const response = await api.get('/api/programs/')
    return response.data
})

export const fetchProgram = createAsyncThunk('programs/receiveProgram', async (program) => {
    const response = await api.get(`/api/programs/${program}`)
    return response.data
})

export const fetchSearchedPrograms = createAsyncThunk('programs/receiveSearchedPrograms', async (search_query) => {
    const response = await api.get(`/api/programs/search?search_query=${search_query}`)
    return response.data
})
