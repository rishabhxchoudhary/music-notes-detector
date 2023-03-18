import './App.css';
import AudioPlayer from './Components/AudioPlayer/AudioPlayer';
import DragAndDrop from './Components/DragAndDrop/DragAndDrop';
import { useState } from 'react';
import { fileContext } from './Context/fileContext';
// import MusicPlayer from './Components/MusicPlayer/MusicPlayer';

function App() {
  const [file, setFile] = useState(null);
  const [lyrics,setLyrics] = useState(null);
  return (
    <div className="App">
      <div className='logo'>Music Notes Detector </div>
      <fileContext.Provider value={{file,lyrics, setFile, setLyrics}}>
        {!file && <DragAndDrop /> }
        {file && <AudioPlayer/>}
      </fileContext.Provider>
    </div>
  );
}

export default App;
