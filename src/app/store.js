import counterReducer from '../features/Counter/counterSlice.js';
import useReducer   from '../features/Auth/userSlice.js';
import { configureStore } from '@reduxjs/toolkit'

const rootReducer  = {
    counter: counterReducer,
    user: useReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;