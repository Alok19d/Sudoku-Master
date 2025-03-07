import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialBoard: Array(9).fill(null).map(() => Array(9).fill("")),
  board: Array(9).fill(null).map(() => Array(9).fill("")),
  undoStack: [],
  timer: 0,
  mode: 'easy',
  isGameStarted: false,
  isGameFinished: false,
  isTimerPaused: false,
  isCustomLocked: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameStarted = true;
      state.isGameFinished = false;
    },
    endGame: (state) => {
      state.isGameStarted = false;
      state.isGameFinished = true;
      state.isTimerPaused = false;
    },
    setMode: (state, action) => {
      state.isTimerPaused = false;
      state.isGameFinished = false;
      state.mode = action.payload;
    },
    incrementTimer: (state) => {
      state.timer += 1;
    },
    resetTimer: (state) => {
      state.timer = 0;
    },
    toggleTimer: (state, action) => {
      state.isTimerPaused = action.payload;
    },
    toggleCustomLock: (state) => {
      state.isCustomLocked = !state.isCustomLocked;
    },
    setInitialBoard: (state, action) => {
      state.initialBoard = action.payload;
      state.board = action.payload;
    },
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    updateCell: (state, action) => {
      const { row, col, value } = action.payload;
      if (state.initialBoard[row][col] === "") {
        state.undoStack.push({
          row,
          col,
          prevValue: state.board[row][col]
        });
        state.board[row][col] = value;
      }
    }, 
    undo: (state) => {
      if(state.undoStack.length > 0){
        const lastMove = state.undoStack.pop();
        state.board[lastMove.row][lastMove.col] = lastMove.prevValue; 
      }
    },
    setCustomCell: (state, action) => {
      const { row, col, value } = action.payload;
      if (!state.isCustomLocked) {
        state.board[row][col] = value;
        state.initialBoard[row][col] = value;
      }
    },
    clearBoards: (state) => {
      state.board = Array(9).fill(null).map(()=> Array(9).fill(""));
      state.initialBoard = Array(9).fill(null).map(()=> Array(9).fill(""));
      state.undoStack = [];
    },
    resetBoard: (state) => {
      state.board = JSON.parse(JSON.stringify(state.initialBoard));
      state.undoStack = [];
    }
  }
});

export const { 
  startGame,
  endGame,
  setMode,
  incrementTimer,
  resetTimer,
  toggleTimer,
  toggleCustomLock,
  setInitialBoard, 
  setBoard,
  updateCell,
  undo,
  setCustomCell,
  clearBoards,
  resetBoard,
} = boardSlice.actions;

export default boardSlice.reducer; 