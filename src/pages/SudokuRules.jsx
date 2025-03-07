import React from 'react'

const HowToPlay = () => {
  return (
    <main className='rules'>
      <div className='container rules-container'>
        <h1>How to Play Sudoku</h1>
        <h2>Introduction</h2>
        <p>
          Sudoku is a globally popular logic-based number puzzle. The goal is to fill a 9x9 grid so that each column, each row, and each of the nine 3x3 subgrids contains all the digits from 1 to 9 without repetition. The puzzle starts with some numbers pre-filled, and players must use logic and reasoning to complete the grid correctly.
        </p>
        <h2>Basic Rules</h2>
        <div className='basic-rules'>
          <div className='basic-rules-item'>
            <h3>Rule 1 - Each row must contain the numbers 1-9 without repeating</h3>
            <img src ='./Basic-Rules_01.png'/>
          </div>
          <div className='basic-rules-item'>
            <h3>Rule 2 - Each column must contain the numbers 1-9 without repeating</h3>
            <img src ='./Basic-Rules_02.png'/>
          </div>
          <div className='basic-rules-item'>
            <h3>Rule 3 - Each 3x3 subgrid must contain the numbers 1-9 without repeating </h3>
            <img src ='./Basic-Rules_03.png'/>
          </div>
        </div>
        
        <h2>How to Play Sudoku</h2>
        <ol>
          <li><span>Select Difficulty:</span> Choose a difficulty level based on your experience—Easy, Medium, Hard, or Expert. Beginners should start with Easy mode, while advanced players can challenge themselves with Expert mode.</li>
          <li><span>Analyze the Grid:</span> Observe the given numbers and find possible placements for missing numbers. Pay attention to patterns and numbers that appear frequently in certain rows or columns.</li>
          <li><span>Use Logical Deduction:</span> Identify the correct numbers by following the Sudoku rules. Look for rows, columns, or subgrids that have limited possibilities for specific numbers.</li>
          <li><span>Apply Common Techniques:</span>
            <ul>
              <li><span>Scanning:</span> Identify obvious placements by checking which numbers are missing in each row, column, or subgrid. Start by filling in the easiest numbers first.</li>
              <li><span>Pencil Marking:</span> Make small notes in empty cells to keep track of possible numbers before finalizing choices. This helps in visualizing potential solutions.</li>
              <li><span>Elimination Method:</span> Rule out numbers that cannot be placed in a certain cell based on existing numbers in the grid. If a number is already present in a row, column, or subgrid, it cannot be repeated.</li>
              <li><span>Naked and Hidden Pairs or Triples:</span> Identify groups of numbers that must go together in certain rows, columns, or boxes to help narrow down possibilities. For example, if two cells in a row can only contain the same two numbers, those numbers must be removed as possibilities from other cells in the row.</li>
              <li><span>X-Wing and Swordfish Techniques:</span> These advanced techniques help find patterns when a number appears in exactly two rows and two columns in a structured way, allowing further eliminations.</li>
              <li><span>Backtracking Strategy:</span> If you get stuck, revisit previous placements and see if a different approach works better. Sometimes, an incorrect early assumption can lead to a dead end.</li>
            </ul>
          </li>
          <li><span>Use Hints and Tools:</span> If you’re stuck, use features like hints, solve next cell, or solve the entire puzzle. However, relying too much on hints may take away the challenge, so use them wisely!</li>
          <li><span>Complete the Puzzle:</span> Continue placing numbers until the entire grid is correctly filled with no rule violations. Double-check each row, column, and subgrid to ensure correctness.</li>
          <li><span>Track Your Progress:</span> Check your statistics and aim to improve your solving speed and accuracy. Challenge yourself by solving puzzles faster or moving up in difficulty levels.</li>
          <li><span>Practice Regularly:</span> The more you play, the better you become. Try different techniques and see what works best for you. Sudoku is a game of patience and logical thinking, so enjoy the process!</li>
        </ol>
      </div>
    </main>
  )
}

export default HowToPlay