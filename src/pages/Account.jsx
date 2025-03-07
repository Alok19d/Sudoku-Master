import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts/LineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { changeFullname, changeUsername, changeAvatar, saveProfile } from '../redux/features/userSlice';

const Account = () => {
  
  const [editProfile, setEditProfile] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const [wlRatio,setWlRatio] = useState('');
  const [bestTime,setBestTime] = useState('');
  const [maxDifficulty,setMaxDifficulty] = useState('');
  const [performanceData,setPerformanceData] = useState(null);

  const [totalPages,setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { fullname, username, avatar, gamesPlayed } = useSelector(state => state.user);

  /* Calculate Best Game Played by User */
  function prec(diff){
    if(diff === 'expert'){
      return 4;
    }
    else if(diff === 'hard'){
      return 3;
    }
    else if(diff === 'medium'){
      return 2;
    }
    else if(diff === 'easy'){
      return 1;
    }
    return -1;
  }

  function calculateBestGame(solvedGames){
    let bG = null;
    solvedGames.map(game => {
      if(!bG){
        bG = game;
      }
      else if(prec(game.difficulty) > prec(bG.difficulty)){
        bG = game;
      }
      else if(prec(game.difficulty) === prec(bG.difficulty)){
        if(game.time > bG.time){
          bG = game;
        }
      }
    })

    if(bG){
      setBestTime(formatTime(bG.time));
      setMaxDifficulty(bG.difficulty);
    }
  }

  function getPerformanceData() {
    let data = [];
    let xAxis = [];
    
    for(let i = 0; i < Math.min(15, gamesPlayed.length); i++) {
      if(gamesPlayed[i].status === 'unsolved') {
        data.push(0);
      } else {
        data.push(prec(gamesPlayed[i].difficulty));
      }
      xAxis.push(i + 1);
    }
    return { data, xAxis };
  }

  /* Update if User Plays more Games */
  useEffect(() => {
    const solvedGames = [];
    let win = 0;

    setTotalPages(Math.ceil(gamesPlayed.length/10));

    gamesPlayed.forEach(game => {
      if(game.status === 'solved'){
        solvedGames.push(game);
        win++;
      }
    });

    setWlRatio(`${win} / ${gamesPlayed.length - win}`);
    setPerformanceData(getPerformanceData());
    calculateBestGame(solvedGames);
  },[gamesPlayed]);

  /* Formats Time given in seconds */
  function formatTime(seconds){
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function handleFullnameChange(e){
    dispatch(changeFullname(e.target.innerHTML));
  }

  function handleUsernameChange(e){
    dispatch(changeUsername(e.target.innerHTML));
  }

  function handleAvatarChange(idx){
    let newAvatar = `./Avatar_${idx<10?'0'+idx:idx}.png`;
    dispatch(changeAvatar(newAvatar));
    setEditAvatar(false);
  }

  function handleEditProfile(){
    if(editProfile === true){
      dispatch(saveProfile());      
    }
    setEditProfile(!editProfile);
    setEditAvatar(false);
  }

  function getPaginatedGames(){
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return gamesPlayed.slice(startIndex, endIndex);
  };

  return (
    <main className='account'>
      <div className='account-container container'>
        <div className='user-details'>
          {
            editAvatar &&
            <div className='avatar-selection'>
              {
                Array(25).fill(null).map((item, idx)=>{
                  return <img 
                    key={idx} 
                    src={`./Avatar_${(idx<9) ? '0'+ (idx+1) : idx+1}.png`}
                    onClick={()=>{handleAvatarChange(idx+1)}}
                  />
                })
              }
            </div>
          }
          <div className='user-info'>
            <div className='relative'>
              <img className='user-avatar' src={avatar}/>
              {
                editProfile &&
                <FontAwesomeIcon 
                  icon={faPenToSquare} 
                  className='avatar-edit-btn'
                  onClick={()=>{setEditAvatar(true)}}
                />
              }
            </div>
            <p 
              className='username' 
              onBlur={handleFullnameChange}
              contentEditable={editProfile}
            >
              {fullname}
            </p>
            <p 
              onBlur={handleUsernameChange}
              contentEditable={editProfile}
            >
              {username}
            </p>
            <button 
              className='btn-2 edit-profile-btn'
              onClick={handleEditProfile}
              >
              { editProfile ? 'Save' : 'Edit Profile'}
            </button>
          </div>
          <div className='user-statistics'>
            <h2>Statistics</h2>
            <div className='stats'>
              <div className='stat-item'>
                <p>Games Played</p>
                <p>{gamesPlayed.length}</p>
              </div>
              <div className='stat-item'>
                <p>Win/Loss Ratio</p>
                <p>{gamesPlayed.length === 0 ? 'NA': wlRatio}</p>
              </div>
              <div className='stat-item'>
                <p>Best Time</p>
                <p>{bestTime === '' ? 'NA': bestTime}</p>
              </div>
              <div className='stat-item'>
                <p>Max Difficulty</p>
                <p className='capitalize'>{maxDifficulty === '' ? 'NA': maxDifficulty}</p>
              </div>
            </div>
            <div className='user-performance'>
              <h3>Performance Graph</h3>
              <LineChart
                className='w-full'
                xAxis={[{
                  data: performanceData?.xAxis,
                  label: 'Games'
                }]}
                series={[
                  {
                    data: performanceData?.data,
                    curve: "linear",
                    label: 'Performance',
                  },
                ]}
                height={180}
                margin={{ left: 40, right: 40, top: 20, bottom: 30 }}
                slotProps={{
                  legend: {
                    hidden: true
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className='game-history'>
          <div>
            <h2>Game History</h2>
            {
              gamesPlayed.length === 0 ?
              <div className='text-center text-[#00000030]'>No Games Data</div>
              :
              
              getPaginatedGames().map(game => (
                <div key={game.id} className='game-played-info'>
                  <div>
                    <p className='font-semibold'>{game.dateAndTime}</p>
                    <p>Difficulty: <span className='capitalize'>{game.difficulty}</span></p>
                  </div>
                  <div>
                    <div>
                      <p>
                        <span className={`${ game.status === 'solved' ?  'px-10' : 'px-5'} font-semibold`}>
                          {formatTime(game.time)}
                        </span>
                        <span className={`capitalize ${game.status === 'solved' ? 'game-solved' : 'game-unsolved'}`}>{game.status}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          {
            totalPages > 1 &&

            <div className="pages-container">
              <div className="prev" 
                onClick={() => {
                  if(currentPage > 1){
                    setCurrentPage(currentPage-1)
                  }
                }}>
                Prev
              </div>
              
              {Array.from({ length: 5 }, (_, index) => {
                let startPage = currentPage <= 5 ? 1 : Math.floor((currentPage - 1) / 5) * 5 + 1;
                let pageNumber = startPage + index;
                
                return pageNumber <= totalPages ? (
                  <div 
                    className={currentPage === pageNumber ? "current page-number" : "page-number"} 
                    key={index} 
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </div>
                ) : null;
              })}
              
              <div className="next"
                onClick={() => {
                  if(currentPage < totalPages){
                    setCurrentPage(currentPage + 1)
                  }
              }}>
                Next
              </div>
            </div>
          }
        </div>
      </div>
    </main>
  )
}

export default Account