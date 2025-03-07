import { createSlice } from '@reduxjs/toolkit'
import {generateRandomNameAndUsername} from '../../utils/random-name-generation.js'

function getUserDetails(){
  const userData = localStorage.getItem('sudoku-master');
  if(userData == null){
    const newUser = {
      ...generateRandomNameAndUsername(),
      avatar: './Avatar_01.png',
      gamesPlayed: []
    }
    localStorage.setItem('sudoku-master', JSON.stringify(newUser));
    return newUser;
  }
  return JSON.parse(userData);
}

const initialState = {
  ...getUserDetails()
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeFullname: (state, action) => {
      state.fullname = action.payload;
    },
    changeUsername: (state, action) => {
      state.username = action.payload;
    },
    changeAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    saveProfile: (state) => {
      localStorage.setItem('sudoku-master',JSON.stringify(state));
    },
    addgamesPlayed: (state, action) => {
      state.gamesPlayed.unshift(action.payload);
      localStorage.setItem('sudoku-master',JSON.stringify(state));
    }
  }
})

export const { 
  changeFullname,
  changeUsername,
  changeAvatar,
  saveProfile,
  addgamesPlayed
} = userSlice.actions;

export default userSlice.reducer; 
