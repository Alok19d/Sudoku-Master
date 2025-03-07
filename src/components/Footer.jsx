import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer>
      <div className='container footer-container'>
        <div className='mb-3'>
          <h2>SudokuMaster</h2>
          <p>©2025 All rights reserved.</p>
        </div>
        <Link to='/how-to-play-sudoku'>How to Play?</Link>
        <Link to='/leaderboard'>Leaderboard</Link>
        <Link to='/about' className='mb-3'>About</Link>
        <div>
          <a href='https://x.com/AlokAnand2901' target='0'><FontAwesomeIcon icon={faXTwitter} /></a>
          <a href=''><FontAwesomeIcon icon={faFacebook} /></a>
          <a href=''><FontAwesomeIcon icon={faInstagram} /></a>
          <a href='https://github.com/Alok19d' target='0'><FontAwesomeIcon icon={faGithub} /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer