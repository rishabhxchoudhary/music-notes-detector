import React, { useState, useRef, useContext } from 'react';
import { fileContext } from '../../Context/fileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import "./AudioPlayer.css"

const AudioPlayer = () => {
  const { file, lyrics, setFile }= useContext(fileContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useState(()=>{
    setCurrentTime(0);
    setDuration(0);
  },[file,lyrics])

  const getLyric = () => {
    try {
      const currentTimeMs = Math.floor(audioRef.current.currentTime*1000);
      for (let key in lyrics) {
        const timeMs = parseInt(key);
        if (timeMs >= currentTimeMs) {
          return lyrics[key];
        }
      }
      return '';
    } catch (error) {
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleBackward = () => {
    // logic to play previous song or restart current song from beginning
    audioRef.current.currentTime = 0;
  };

  const handleForward = () => {
    // logic to play next song
    audioRef.current.currentTime = 0; // as no next song.
  };

  const handleTimeUpdate = () => {
    try {
      const { currentTime, duration } = audioRef.current;
      const d= Math.floor(duration);
      const dmins = Math.floor(d/60);
      const dseconds = d%60;
      setDuration(`${dmins}:${dseconds}`);
      const c = Math.floor(currentTime);
      const mins = Math.floor(c/60);
      const seconds = c%60;
      setCurrentTime(`${mins}:${seconds}`);
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
      // logic to update lyrics based on current time
    } catch (error) {
    }
  };

  const handleProgressClick = (e) => {
    const { duration } = audioRef.current;
    const progressWidth = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / progressWidth) * duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="music-player">
      <audio src={file} ref={audioRef} onTimeUpdate={handleTimeUpdate}></audio>
      <div className="controls">
      <FontAwesomeIcon icon={faBackward} onClick={handleBackward} />
      {isPlaying ? (
          <FontAwesomeIcon icon={faPause} onClick={handlePlayPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} onClick={handlePlayPause} />
        )}
        <FontAwesomeIcon icon={faForward} onClick={handleForward} />
      </div>
      <div className="timedata">
        <div className="">{currentTime}/{duration}</div>
      </div>
      <div className="progress-bar" onClick={handleProgressClick}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="lyrics">
        <p>Frequency of highest note detected : {getLyric()}</p>
      </div>
      <button onClick={()=>{setFile(null)}}>Choose Another?</button>
    </div>
  );
};

export default AudioPlayer;

