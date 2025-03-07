import { useState, memo } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {

  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const { avatar } = useSelector(state => state.user);

  return (
    <nav>
      <div className='container nav-container'>
        <Link to='/' className='logo-image'>
          SudokuMaster
        </Link>
        <div className='user-account'>
          <img 
            className='avatar' 
            src={avatar} 
            onClick={()=>{setIsProfileVisible(!isProfileVisible)}}
            alt='avatar-image' 
          />
          {
            isProfileVisible &&
            <div className='menu'>
              <Link to='/account' onClick={()=> {setIsProfileVisible(false)}}>Account</Link>
              <Link to='/leaderboard' onClick={()=> {setIsProfileVisible(false)}}>Leaderboard</Link>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}

export default memo(Navbar)