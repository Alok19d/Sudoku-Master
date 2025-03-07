import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrain, faClock, faTriangleExclamation, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import {endGame, toggleTimer, resetTimer } from '../redux/features/boardSlice'
import { addgamesPlayed } from '../redux/features/userSlice';

const FinishPopup = ({ setFinishGamePopup, status }) => {

  const dispatch = useDispatch();
  const { timer, mode } = useSelector(state => state.board);

  function confirmFinish(){
    let d = new Date();
    const date = d.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    dispatch(addgamesPlayed({
      id: d.getTime(),
      dateAndTime: `${date} - ${time}`,
      time: timer,
      difficulty: mode,
      status: status
    }));

    dispatch(endGame());
    dispatch(resetTimer());
    setFinishGamePopup(false);
  }

  function resumeGame(e){
    e.preventDefault();
    dispatch(toggleTimer(false));
    setFinishGamePopup(false);
  }

  /* Formats Time given in seconds */
  function formatTime(seconds){
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return (
    <div className="popup-box">
      <h2 className="popup-heading">
        {
          status !== 'solved' ?
          'Finish Confirmation' :
          '🎉 Congratulations! You Did It! 🎉'
        }
      </h2>
        {
          status !== 'solved' ?
          <p className="popup-subheading">
            Are you sure you want to finish this game? 
          </p>
          :
          <p className="popup-subheading">
            You've completed the puzzle with <br /> precision and skill. Well done!
          </p>
        }
      <div>
        <div className="popup-info">
          <div>
            <FontAwesomeIcon icon={faBrain} />
          </div>
          <div>
            <p className="popup-info-heading">Difficulty</p>
            <p className="popup-info-subheading capitalize">{mode}</p>
          </div>
        </div>
        <div className="popup-info">
          <div>
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div>
            <p className="popup-info-heading">Time Taken</p>
            <p className="popup-info-subheading">{formatTime(timer)}</p>
          </div>
        </div>
        <div className="popup-info">
          <div>
            {
             status === 'solved' ? 
              <FontAwesomeIcon className="" icon={faCircleCheck} />
              :
              <FontAwesomeIcon icon={faTriangleExclamation} />
            }
          </div>
          <div>
            <p className="popup-info-heading">
              Status
            </p>
            <p className="popup-info-subheading capitalize">
              {status}
            </p>
          </div>
        </div>
      </div>
      {
        status !== 'solved' ?
        <>
          <button 
            className="btn-1 w-full"
            onClick={confirmFinish}
          >
            Confirm Finish
          </button>
          <button 
            className="btn-3 continue-playing-btn"
            onClick={resumeGame}
          >
            Continue Playing
          </button>
        </>
        :
        <button 
          className="btn-1 w-full"
          onClick={confirmFinish}
        >
          Close
        </button>
      }
    
    </div>
  );
};

export default FinishPopup;
