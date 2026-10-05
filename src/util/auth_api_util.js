import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "../api/client";


export const checkAuthStatus = createAsyncThunk('auth/checkStatus', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/api/user/auth/status/');    
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Session expired or invalid');
    }
});

export const loginSuccess = createAsyncThunk('auth/loginUser', async (credentials) => {
    const response = await api.post('/api/user/login/', credentials)
    return response.data
})

export const logoutSuccess = createAsyncThunk('auth/logoutUser', async () => {
    const response = await api.get('/api/user/logout/')
    return response.data
})