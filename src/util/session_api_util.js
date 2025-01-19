import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk('session/loginUser', async (credentials) => {
    const response = await axios.post('http://127.0.0.1:8000/api/user/login/', credentials)
    return response.data
})