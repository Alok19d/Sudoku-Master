import React from 'react'

const About = () => {
  return (
    <main className='about'>
      <div className='container about-container'>
        <h1>About Sudoku Master</h1>
        <p>
          Welcome to Sudoku Master, your ultimate destination for solving and enjoying Sudoku puzzles. Our platform 
          offers an engaging and interactive Sudoku experience with multiple difficulty levels, advanced solving 
          algorithms, and a suite of helpful features designed for both beginners and experts.
        </p>

        <h2>Core Features</h2>
        <p>
          Our application provides multiple difficulty levels - Easy, Medium, Hard, and Expert - each carefully 
          calibrated to offer an appropriate challenge. The custom puzzle mode allows players to create and share 
          their own Sudoku challenges. We offer real-time validation, a hint system, and the ability to 
          undo moves, ensuring a smooth and enjoyable solving experience.
        </p>

        
        <h2>User Features</h2>
        <p>
          Sudoku Master is fully responsive, providing an optimal solving experience across all devices. The 
          interface automatically adapts to different screen sizes while maintaining full functionality and ease 
          of use.
        </p>
        <p>
          Players can track their progress through:
        </p>
        <ul className='list-disc list-inside'>
          <li>Game history with completion times and difficulty levels</li>
          <li>Performance tracking across different difficulty levels</li>
          <li>Custom avatar selection and profile customization</li>
          <li>Progress visualization through performance graphs</li>
        </ul>


        <h2>Technical Implementation</h2>
        <p>
          Built with modern web technologies including React 18 and Redux Toolkit, Sudoku Master delivers a 
          responsive and performant user experience. The application uses a state-of-the-art Dancing Links (DLX) 
          algorithm for puzzle solving and generation, ensuring efficient and accurate solutions.
        </p>

        <h2>Puzzle Generation Algorithm</h2>
        <p>
          Our puzzle generator implements a sophisticated algorithm that creates valid Sudoku grids and systematically 
          removes numbers while maintaining a unique solution. The difficulty levels are controlled by varying the 
          number of initial clues:
        </p>
        <ul>
          <li>Easy: 45 initial clues</li>
          <li>Medium: 35 initial clues</li>
          <li>Hard: 30 initial clues</li>
          <li>Expert: 24 initial clues</li>
        </ul>

        <h2>Dancing Links Algorithm</h2>
        <p>
          The core solving engine uses Donald Knuth's Dancing Links algorithm, which treats Sudoku as an exact cover 
          problem. This approach provides extremely fast solutions by efficiently managing the constraint matrix 
          through doubly-linked lists, making it possible to solve even the most challenging puzzles in milliseconds.
        </p>

        <h2>Future Development</h2>
        <p>
          We're constantly working to improve Sudoku Master. Upcoming features include:
        </p>
        <ul className='list-disc list-inside'>
          <li>Daily challenges</li>
          <li>Global leaderboards</li>
          <li>Additional puzzle variants</li>
        </ul>

      </div>
    </main>
  )
}

export default About