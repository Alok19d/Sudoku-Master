import { memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCell, setCustomCell } from '../redux/features/boardSlice'

const Board = () => {

  const dispatch = useDispatch();
  const { mode, isTimerPaused, isCustomLocked, board, initialBoard } = useSelector((state) => state.board);

  const [activeCell, setActiveCell] = useState(null);
  const [errorCell, setErrorCell] = useState(null);

  function isValid(row, col, value, board) {
    for (let i = 0; i < 9; i++) {
      setErrorCell(null);
      if (board[i][col] === value){
        setErrorCell({row: i, col: col});
        return false;
      }
      if(board[row][i] === value){
        setErrorCell({row: row,col: i});
        return false;
      }
      if(board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)] === value){
        setErrorCell({row: Math.floor(row / 3) * 3 + Math.floor(i / 3), col: Math.floor(col / 3) * 3 + (i % 3)});
        return false;
      }
    }
    return true;
  }

  function handleCellChange(row, col, value){
    if(mode === 'custom' && !isCustomLocked){
      if (value === ''){
        dispatch(setCustomCell({ row, col, value }))
      }
      else if((parseInt(value) >= 1 && parseInt(value) <= 9) && isValid(row, col, value, board)){
        dispatch(setCustomCell({ row, col, value }));
      }
    }
    
    if (value === ''){
      dispatch(updateCell({ row, col, value }))
    }
    else if((parseInt(value) >= 1 && parseInt(value) <= 9) && isValid(row, col, value, board)){
      dispatch(updateCell({ row, col, value }));
    }
  }

  return (
    <div className='board-container'>
      {
        board.map((row, r) => (
          <div className='board-row' key={r}>
            {
              row.map((cellValue, c) => (
                <input 
                  key={`${r}${c}`} 
                  type='number'
                  min="1"
                  max="9" 
                  className={`board-cell 
                    ${initialBoard[r][c] ? 'locked' : ''}
                    ${activeCell?.row === r && activeCell?.col === c ? 'active-cell' : ''}
                    ${activeCell?.row === r ? 'highlight-cell' : ''}
                    ${activeCell?.col === c ? 'highlight-cell' : ''}
                    ${Math.floor(activeCell?.row / 3) === Math.floor(r / 3) &&
                      Math.floor(activeCell?.col / 3) === Math.floor(c / 3) ? 'highlight-cell':''}
                    ${errorCell?.row === r && errorCell?.col === c ? 'error-highlight' : ''}
                    `
                  }
                  value={isTimerPaused ? "" : cellValue}
                  onFocus={()=>{setActiveCell({row:r,col: c})}}
                  onBlur={()=>{setActiveCell(null)}}
                  onChange={(e) => {
                    handleCellChange(r, c, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (["e", "E", "-", "+"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  disabled={
                    (initialBoard[r][c] !== "" && mode !== 'custom') ||
                    (initialBoard[r][c] !== "" && isCustomLocked) || 
                    isTimerPaused
                  }
                />
              ))
            }
          </div>
        ))
      }
    </div>  
  )
}

export default memo(Board)