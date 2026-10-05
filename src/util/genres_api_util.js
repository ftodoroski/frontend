import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/client";


export const fetchGenres = createAsyncThunk('genres/receiveGenres', async () => {
    const response = await api.get('/api/genres/')
    return response.data
})