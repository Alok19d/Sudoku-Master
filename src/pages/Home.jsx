import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRotateLeft, faTrash, faLightbulb, faWandMagicSparkles, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import Board from '../components/Board'
import FinishPopup from '../components/FinishPopup';
import { startGame, setMode, incrementTimer, resetTimer, toggleTimer, toggleCustomLock, undo, setInitialBoard, updateCell, setBoard, clearBoards, resetBoard} from '../redux/features/boardSlice'
import { reduceHints, resetHints } from '../redux/features/hintSlice'
import { solveBoard, suggestHint, generatePuzzle } from '../utils/sudoku-features'


const Home = () => {
  const dispatch = useDispatch();
  const [infoText, setInfoText] = useState('');
  const [finishGamePopup, setFinishGamePopup] = useState(false);
  const [status, setStatus] = useState('unsolved');

  const { timer, mode, board, initialBoard, isGameStarted, isGameFinished, isTimerPaused, isCustomLocked } = useSelector(state => state.board);
  const { hints } = useSelector(state => state.hint);

  /* Starts or Finishes Game */
  function handleGameToggle(){
    if(isGameStarted){
      dispatch(toggleTimer(true));
      setFinishGamePopup(true);
    }
    else{
      if(mode === 'custom'){
        if(!isCustomLocked){
          setInfoText('Please Lock the Board to Start Game');
          return;
        }
        
        let filledCells = 0;
        for(let i=0;i<9;i++){
          for(let j=0;j<9;j++){
            if(initialBoard[i][j] !== ''){
              filledCells++;
            }
          }
        }

        if(filledCells < 16){
          setInfoText('Please fill atleast 16 cells to start the game.');
          return;
        }
      }

      if(mode !== 'custom'){
        /* Generate Puzzle */
        const puzzle = generatePuzzle(mode);
        if(puzzle){
          const formattedBoard = puzzle.map(row => row.map(cell => cell === 0 ? "" : cell.toString()));
          dispatch(setInitialBoard(formattedBoard));
        }
      }

      setInfoText('');
      setStatus('unsolved');
      dispatch(resetBoard());
      dispatch(resetTimer());
      dispatch(resetHints());
      dispatch(startGame());
    }
  }

  function isBoardCompletelyFilled(){
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        if(board[i][j] === ''){
          return false;
        }
      }
    }
    return true;
  }
  
  /* Track if User has Completed the Game */ 
  useEffect(() => {
    if(isGameStarted){
      if(board[0][0] !== '' &&
         board[0][8] !== '' && 
         board[8][0] !== '' && 
         board[8][8] !== '' && 
         board[4][4] !== '' &&
         isBoardCompletelyFilled()
        ){
          setStatus('solved');
          dispatch(toggleTimer(true));
          setFinishGamePopup(true);
      }
    }
  },[board, isGameStarted]);

  /* Handles Mode Change */
  function handleModeChange(e){
    e.preventDefault();
    
    if(isGameStarted) return;

    const newMode = e.target.dataset.mode || e.target.value;
    setInfoText('');
    dispatch(clearBoards());
    dispatch(setMode(newMode));
  }

  /* Formats Time given in seconds */
  function formatTime(seconds){
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  /* Increment timer every second if game is started and timer is not paused */
  useEffect(() => {
    let interval = null;

    if(isGameStarted && !isTimerPaused){
      interval = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }

    return () => {
      if(interval) clearInterval(interval);
    }
  },[isGameStarted, isTimerPaused, dispatch])

  /* Pause or Resume Timer */
  function handleTimerToggle(){
    dispatch(toggleTimer(!isTimerPaused));
  }

  /* Locks and Unlocks Custom Board*/
  function handleCustomLock(){
    dispatch(toggleCustomLock());
  }
  
  /* Undo Function */
  function handleUndo(){
    dispatch(undo());
  }
  
  /* Reset Function */
  function handleReset(){
    dispatch(resetBoard());
  }

  /* Hint Function */
  function handleHints(){
    if(hints > 0 || isGameFinished){
      const hint = suggestHint(initialBoard,board);
      
      if(hint === -1){
        setInfoText('No Solution Exists');
        return;
      }
      
      if(!isGameFinished){
        dispatch(reduceHints());
      }
      dispatch(updateCell({
        row: hint.row,
        col: hint.col,
        value: String(hint.value)
      }));
    }
  }

  /* Solve Puzzle Function */
  function handleSolvePuzzle(){
    if(isGameFinished){
      /* Generate Solution */
      const solution = solveBoard(board);
      if(solution === -1){
        setInfoText('No Solution Exists');
        return;
      }
      const formattedSolution = solution.map(row => row.map(cell => cell.toString()));
      dispatch(setBoard(formattedSolution));
    }
  }
  
  return (
    <main className='landing'>
      <div className='container landing-container'>
        <div className='mode-selection'>
          <h3>Difficulty</h3>
          <button className='btn-1 game-toggle-btn' onClick={handleGameToggle}>
            {isGameStarted ? 'Finish Game' : 'Start Game'}
          </button>
          <button 
            data-mode='easy'
            className={`mode ${mode === 'easy' ? 'mode-active' :''} ${isGameStarted ? 'disabled-btn' : ''}`}
            onClick={handleModeChange}
            disabled={isGameStarted}
          >
            Easy
          </button>
          <button 
            data-mode='medium'
            className={`mode ${mode === 'medium' ? 'mode-active' :''} ${isGameStarted ? 'disabled-btn' : ''}`}
            onClick={handleModeChange}
            disabled={isGameStarted}
          >
            Medium
          </button>
          <button 
            data-mode='hard'
            className={`mode ${mode === 'hard' ? 'mode-active' :''} ${isGameStarted ? 'disabled-btn' : ''}`}
            onClick={handleModeChange}
            disabled={isGameStarted}
          >
            Hard
          </button>
          <button 
            data-mode='expert'
            className={`mode ${mode === 'expert' ? 'mode-active' :''} ${isGameStarted ? 'disabled-btn' : ''}`}
            onClick={handleModeChange}
            disabled={isGameStarted}
          >
            Expert
          </button>
          <button 
            data-mode='custom'
            className={`mode ${mode === 'custom' ? 'mode-active' :''} ${isGameStarted ? 'disabled-btn' : ''}`}
            onClick={handleModeChange}
            disabled={isGameStarted}
          >
            + Custom Puzzle
          </button>
        </div>
        <div className='game-section'>
          <div className='view-on-mobile game-mode-mobile justify-between'>
            <div className='difficulty basis-[50%]'>
              <label>
                Difficulty: 
                <select 
                  value={mode}
                  onChange={handleModeChange}
                  disabled={isGameStarted}
                >
                  <option value='easy' className='btn-2'>Easy</option>
                  <option value='medium' className='btn-2'>Medium</option>
                  <option value='hard' className='btn-2'>Hard</option>
                  <option value='expert' className='btn-2'>Expert</option>
                  <option value='custom' className='btn-2'>Custom</option>
                </select>
              </label>
            </div>
            <div 
              className='basis-[30%] start-btn'
              onClick={handleGameToggle}
            >
              {isGameStarted ? 'Finish' : 'Start'}
            </div>
          </div>
          <div className='game-info'>
            <p className='hide-on-mobile'>
              New Game
            </p>
            <p className='clock'>
              <span className=''>
                Time: {formatTime(timer)}
              </span>
              <button 
                className={`pause-btn ${!isGameStarted ? 'disabled-btn' : ''}`}
                onClick={handleTimerToggle}
                disabled={!isGameStarted}
              >
                <FontAwesomeIcon icon={isTimerPaused ? faPlay : faPause} />
              </button>
            </p>
            <p className='hide-on-mobile capitalize'>
              {mode}
            </p>
          </div>
          <div className='sudoku-board'>
            <div className='board'>
              <p className='info-text'>
                {infoText}
              </p>
              <Board />
              {
                isTimerPaused &&
                <div 
                  className='paused-popup'
                  onClick={handleTimerToggle}
                >
                  <FontAwesomeIcon icon={faCirclePlay} />
                </div>
              }
            </div>
            <div className='action'>

              <div className='action-buttons'>
                {
                  (mode === 'custom' && !isGameStarted) && 
                  <button 
                    className='action-btn btn-2 full-width'
                    onClick={handleCustomLock}
                  >
                    <FontAwesomeIcon icon={isCustomLocked ? faLockOpen : faLock} />
                    {isCustomLocked ? 'Unlock' : 'Lock'}
                  </button>
                }
                <button 
                  className=' action-btn btn-2'
                  onClick={handleUndo}
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                  Undo
                </button>
                <button 
                  className=' action-btn btn-2'
                  onClick={handleReset}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Reset
                </button>
                <button 
                  className={`action-btn btn-2 hint-btn ${((!isGameStarted && !isGameFinished) ||(isGameStarted && hints === 0) || isTimerPaused ) ? 'disabled-btn' : ''}`}
                  onClick={handleHints}
                  disabled={(!isGameStarted && !isGameFinished) ||
                  (isGameStarted && hints === 0) || isTimerPaused}
                >
                  <FontAwesomeIcon icon={faLightbulb} />
                  Hint
                  {
                    !isGameFinished &&
                    <span className='hints-left'>
                      {hints}
                    </span>
                  }
                </button>
                <button 
                  className={`action-btn btn-2 ${!isGameFinished ? 'disabled-btn' : ''}`}
                  onClick={handleSolvePuzzle}
                  disabled={!isGameFinished}
                >
                  <FontAwesomeIcon icon={faWandMagicSparkles} />
                  Solve Puzzle
                </button>
              </div>
            </div>
          </div>
          {
            finishGamePopup &&
            <div className='popup-container'>
              <FinishPopup setFinishGamePopup={setFinishGamePopup} status={status}/>
            </div>
          }
        </div>
        <div className='game-leaderboard'>
          <h3 className='leaderboard-heading'>Leaderboard</h3>
          <p className='empty-message'>Leaderboard is empty</p>
          {/* <div className='player-card'>
            <div>
              <h4>John Doe</h4>
              <p>04:32</p>
            </div>
            <div>
              Expert
            </div>
          </div> */}
        </div>
      </div>
    </main>
  )
}

export default Home