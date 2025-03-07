import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './features/boardSlice';
import hintReducer from './features/hintSlice';
import userReducer from './features/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    hint: hintReducer
  },
}); 