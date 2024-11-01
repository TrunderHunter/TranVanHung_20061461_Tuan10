// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://66ff37f82b9aac9c997e8e03.mockapi.io/User';

// Thunks cho các thao tác CRUD
export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async(newUser) => {
    const response = await axios.post(API_URL, newUser);
    return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async(id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

export const editUser = createAsyncThunk('users/editUser', async(updatedUser) => {
    const response = await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
    return response.data;
});

// Slice
const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Fetch users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Add user
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            // Delete user
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            // Edit user
            .addCase(editUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            });
    },
});

export default userSlice.reducer;