import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TEMP_CONFIG } from './credentials_api_testing'

export const fetchGenres = createAsyncThunk('genres/receiveGenres', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/genres/', TEMP_CONFIG)
    return response.data
})