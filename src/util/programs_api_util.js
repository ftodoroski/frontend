import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TEMP_CONFIG } from '../util/credentials_api_testing'


export const fetchAllPrograms = createAsyncThunk('programs/receiveAllPrograms', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/programs/', TEMP_CONFIG)
    return response.data
})

export const fetchProgram = createAsyncThunk('programs/receiveProgram', async (program) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/programs/${program}`, TEMP_CONFIG)
    return response.data
})

export const fetchSearchedPrograms = createAsyncThunk('programs/receiveSearchedPrograms', async (search_query) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/programs/search?search_query=${search_query}`, TEMP_CONFIG)
    return response.data
})
