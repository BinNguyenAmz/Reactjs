import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

const register = createAsyncThunk(
    'users/register',
    async (payload) => {
        // call API to Register
        const data = await userApi.register(payload);
        // save data local storage
        localStorage.setItem('acces_token', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));

        // return user data
        return data.user;
    }
  )

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: {},  
        setting: {},
    },
    reducers: {},
    extraReducers: {
      [register.fulfilled]: (state, action) => {
        state.current = action.payload;
      }
    }
});
  
const {reducer} = userSlice ;
export default reducer; // default export 