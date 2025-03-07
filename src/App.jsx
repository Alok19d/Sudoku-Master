import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import Account from './pages/Account'
import SudokuRules from './pages/SudokuRules'
import Leaderboard from './pages/Leaderboard'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/account' element={<Account />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/how-to-play-sudoku' element={<SudokuRules />}/>
        <Route path='/leaderboard' element={<Leaderboard />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App