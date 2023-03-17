import React, { useState, useRef, useContext } from 'react';
import { fileContext } from '../../Context/fileContext';

const AudioPlayer = () => {
  const { file, lyrics }= useContext(fileContext);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getLyric = () => {
    const currentTimeMs = Math.floor(currentTime * 1000);
    for (let key in lyrics) {
      const timeMs = parseInt(key);
      if (timeMs >= currentTimeMs) {
        return lyrics[key];
      }
    }
    return '';
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={file}
        onTimeUpdate={handleTimeUpdate}
      />
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <div>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      <div>Detected Music Note : {getLyric()}</div>
    </div>
  );
};

export default AudioPlayer;

