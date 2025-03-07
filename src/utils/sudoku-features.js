class DLXNode {
  constructor() {
    this.left = this;
    this.right = this;
    this.up = this;
    this.down = this;
    this.column = null;
  }
}

class DLXColumn extends DLXNode {
  constructor(name) {
    super();
    this.name = name;
    this.size = 0;
  }
}

class DLX {
  constructor(matrix) {
    this.header = new DLXColumn("header");
    this.columns = [];
    this.solution = [];
    this.buildMatrix(matrix);
  }

  buildMatrix(matrix) {
    const numColumns = matrix[0].length;
    this.columns = Array.from(
      { length: numColumns },
      (_, i) => new DLXColumn(i)
    );

    for (let i = 0; i < numColumns; i++) {
      this.columns[i].right = this.header;
      this.columns[i].left = this.header.left;
      this.header.left.right = this.columns[i];
      this.header.left = this.columns[i];
      this.columns[i].up = this.columns[i].down = this.columns[i];
    }

    matrix.forEach((row, rowIndex) => {
      let first = null;
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          let node = new DLXNode();
          node.column = this.columns[colIndex];
          node.up = this.columns[colIndex].up;
          this.columns[colIndex].up.down = node;
          this.columns[colIndex].up = node;
          node.down = this.columns[colIndex];
          this.columns[colIndex].size++;
          if (first) {
            node.left = first.left;
            node.right = first;
            first.left.right = node;
            first.left = node;
          } else {
            first = node;
          }
        }
      });
    });
  }

  cover(column) {
    column.right.left = column.left;
    column.left.right = column.right;
    for (let row = column.down; row !== column; row = row.down) {
      for (let node = row.right; node !== row; node = node.right) {
        node.down.up = node.up;
        node.up.down = node.down;
        node.column.size--;
      }
    }
  }

  uncover(column) {
    for (let row = column.up; row !== column; row = row.up) {
      for (let node = row.left; node !== row; node = node.left) {
        node.column.size++;
        node.down.up = node;
        node.up.down = node;
      }
    }
    column.right.left = column;
    column.left.right = column;
  }

  solve() {
    if (this.header.right === this.header) return true;

    let column = this.header.right;
    for (let node = column.right; node !== this.header; node = node.right) {
      if (node.size < column.size) column = node;
    }

    this.cover(column);
    for (let row = column.down; row !== column; row = row.down) {
      this.solution.push(row);
      for (let node = row.right; node !== row; node = node.right) {
        this.cover(node.column);
      }

      if (this.solve()) return true;

      this.solution.pop();
      for (let node = row.left; node !== row; node = node.left) {
        this.uncover(node.column);
      }
    }
    this.uncover(column);
    return false;
  }

  getSolution() {
    return this.solution.map((row) => {
      let number, r, c;
      for (let node = row; ; node = node.right) {
        if (node.column.name < 81) {
          r = Math.floor(node.column.name / 9);
          c = node.column.name % 9;
        } else if (node.column.name < 162) {
          number = (node.column.name % 9) + 1;
        }
        if (node.right === row) break;
      }
      return { r, c, number };
    });
  }
}

// Converts a Sudoku board into an exact cover matrix
function sudokuToExactCover(board) {
  const matrix = Array(729)
    .fill(0)
    .map(() => Array(324).fill(0));

  let rowIndex = 0;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== 0) {
        let num = board[r][c] - 1;
        matrix[rowIndex] = createRow(r, c, num);
        rowIndex++;
      } else {
        for (let num = 0; num < 9; num++) {
          matrix[rowIndex++] = createRow(r, c, num);
        }
      }
    }
  }
  return matrix;
}

function createRow(r, c, num) {
  let row = Array(324).fill(0);
  let box = Math.floor(r / 3) * 3 + Math.floor(c / 3);
  row[r * 9 + c] = 1;
  row[81 + r * 9 + num] = 1;
  row[162 + c * 9 + num] = 1;
  row[243 + box * 9 + num] = 1;
  return row;
}

/* Solve Sudoku */
function solveBoard(board) {
  const newBoard = board.map((row) =>
    row.map((cell) => (cell === "" ? 0 : parseInt(cell)))
  );
  let matrix = sudokuToExactCover(newBoard);
  let dlx = new DLX(matrix);
  if (!dlx.solve()) {
    console.log("No solution found");
    return -1;
  }

  let solution = dlx.getSolution();
  solution.forEach(({ r, c, number }) => {
    newBoard[r][c] = number;
  });

  return newBoard;
}

/* Hint Function */
function suggestHint(initialBoard, board) {
  const newBoard = initialBoard.map((row) =>
    row.map((cell) => (cell === "" ? 0 : parseInt(cell)))
  );
  const userBoard = board.map((row) =>
    row.map((cell) => (cell === "" ? 0 : parseInt(cell)))
  );
  const solvedBoard = solveBoard(newBoard);

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (
        newBoard[row][col] === 0 &&
        userBoard[row][col] !== solvedBoard[row][col]
      ) {
        return { row, col, value: solvedBoard[row][col] };
      }
    }
  }
  return -1;
}

/* Generate Puzzle */
function generateFullSudoku() {
  let board = Array.from({ length: 9 }, () => Array(9).fill(0));
  let numbers = [...Array(9).keys()].map(x => x + 1);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function fillBoard() {
    let dlx = new DLX(sudokuToExactCover(board));
    dlx.solve();
    dlx.getSolution().forEach(({ r, c, number }) => {
      board[r][c] = number;
    });
  }
  
  shuffle(numbers).forEach((num, index) => {
    board[Math.floor(index / 3)][(index % 3) * 3] = num;
  });

  fillBoard();
  return board;
}

function hasUniqueSolution(board) {
  let solutions = 0;
  let maxSolutions = 2; // We only need to know if there are 1 or more than 1
  
  function countSolutions(board, depth = 0) {
    if (solutions >= maxSolutions) {
      return; 
    }
    
    // Find an empty cell
    let emptyCell = null;
    for (let r = 0; r < 9 && !emptyCell; r++) {
      for (let c = 0; c < 9 && !emptyCell; c++) {
        if (board[r][c] === 0) {
          emptyCell = [r, c];
        }
      }
    }
    
    // If no empty cells, we found a solution
    if (!emptyCell) {
      solutions++;
      return;
    }
    
    const [r, c] = emptyCell;
    
    // Try each number
    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(board, r, c, num)) {
        board[r][c] = num;
        countSolutions(board, depth + 1);
        board[r][c] = 0; // Backtrack
      }
    }
  }
  
  function isValidPlacement(board, row, col, num) {
    // Check row
    for (let c = 0; c < 9; c++) {
      if (board[row][c] === num) return false;
    }
    
    // Check column
    for (let r = 0; r < 9; r++) {
      if (board[r][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[boxRow + r][boxCol + c] === num) return false;
      }
    }
    
    return true;
  }
  
  // Make a copy of the board to avoid modifying the original
  const boardCopy = board.map(row => [...row]);
  countSolutions(boardCopy);
  
  return solutions === 1;
}

// Update the generateRandomSudoku function to use the new unique solution checker
function generateRandomSudoku(attempts) {
  let board = generateFullSudoku();
  let positions = [];
  
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push([r, c]);
    }
  }
  positions = positions.sort(() => Math.random() - 0.5);

  let cellsRemoved = 0;
  while(attempts > 0 && positions.length > 0) {
    let [r, c] = positions.pop();
    let backup = board[r][c];
    board[r][c] = 0;
    cellsRemoved++;

    // Use the improved unique solution checker
    if(!hasUniqueSolution(board)) {
      board[r][c] = backup;
      cellsRemoved--;
    } else {
      attempts--;
    }
  }

  return board;
}

function generatePuzzle(difficulty) {
  const clues = {
    easy: 45,
    medium: 35,
    hard: 30,
    expert: 24,
  };
  return generateRandomSudoku(81 - clues[difficulty]);
}

export { solveBoard, suggestHint, generatePuzzle };
